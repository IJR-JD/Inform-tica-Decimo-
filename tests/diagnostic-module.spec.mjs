import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const API="https://rlfxnjbqxbozjdzkbwlz.supabase.co";
const identity={id:"01a1a1a1-1111-4444-aaaa-111111111111",email:"alumno@ijr.edu.co",email_confirmed_at:"2026-11-01T12:00:00Z"};
async function mockBackend(page,saved=[]){
 await page.route(API+"/**",async route=>{
  const req=route.request(),url=new URL(req.url()),p=url.pathname;
  if(p==="/auth/v1/otp")return route.fulfill({status:200,json:{}});
  if(p==="/auth/v1/verify")return route.fulfill({status:200,json:{access_token:"mock_access_token",expires_in:3600,refresh_token:"mock_refresh"}});
  if(p==="/auth/v1/user")return route.fulfill({status:200,json:identity});
  if(p==="/rest/v1/ti10_diagnostic_profiles_v1"){
   const data=req.postDataJSON();saved.push(data);
   return route.fulfill({status:201,json:[{...data,id:"1"}]});
  }
  return route.fulfill({status:404,json:{message:"Test route not mocked"}});
 });
}
async function start(page,saved=[]){
 await mockBackend(page,saved);
 await page.goto("/");
 await expect(page.locator("#topicGrid .hub-topic-card")).toHaveCount(12);
 await page.locator("#diagnosticEntry .diag-start").click();
 await expect(page.locator("#diagnostic h1")).toContainText("Diagnóstico");
 await page.locator("#diagEmail").fill(identity.email);
 await page.getByRole("button",{name:"Enviar enlace al correo institucional"}).click();
 await expect(page.locator("#diagAuthStatus")).toContainText("enlace de verificación");
 await page.locator('input[autocomplete="one-time-code"]').fill("123456");
 await page.getByRole("button",{name:"Verificar código"}).click();
 await expect(page.locator("#diagAuthStatus")).toContainText("verificado");
 await page.getByRole("button",{name:/Comenzar diagnóstico/}).click();
 await expect(page.locator("#diagnostic .diag-fieldset")).toBeVisible();
}
async function answerAll(page,choiceFn){
 for(let i=0;i<24;i++){
  await page.locator('#diagnostic input[name="diagAnswer"][value="'+choiceFn(i)+'"]').check();
  await page.locator("#diagnostic .diag-form .button-dark").click();
 }
 await expect(page.locator("#diagnostic h1")).toContainText("Revisa");
 await page.getByRole("button",{name:/Finalizar y ver perfil/}).click();
 await expect(page.locator("#diagnostic h1")).toContainText("Tu perfil");
}
test("Institutional email is required, noninstitutional domain rejected",async({page})=>{
 await mockBackend(page);
 await page.goto("/");
 await page.locator("#diagnosticEntry .diag-start").click();
 await expect(page.locator("#diagCode")).toHaveCount(0);
 await expect(page.getByRole("button",{name:/Comenzar diagnóstico/})).toHaveCount(0);
 await page.locator("#diagEmail").fill("estudiante@gmail.com");
 await page.getByRole("button",{name:"Enviar enlace al correo institucional"}).click();
 await expect(page.locator("#diagAuthStatus")).toContainText("@ijr.edu.co");
 await expect(page.getByRole("button",{name:/Comenzar diagnóstico/})).toHaveCount(0);
});
test("Verified institutional email unlocks 24-question diagnostic",async({page})=>{
 await start(page);
 await expect(page.locator(".diag-progress-track")).toHaveAttribute("aria-valuemax","24");
 await expect(page.locator("#diagnostic .diag-option")).toHaveCount(5);
 await page.locator("#diagnostic .diag-form .diag-actions .button-light").last().click();
 await expect(page.getByRole("button",{name:/Finalizar y ver perfil/})).toBeDisabled();
});
test("Student can return to questions and incomplete submission is blocked",async({page})=>{
 await start(page);
 await page.locator('#diagnostic input[name="diagAnswer"][value="1"]').check();
 await page.locator("#diagnostic .diag-form .button-dark").click();
 await page.locator("#diagnostic .diag-form .button-light").first().click();
 await expect(page.locator('#diagnostic input[name="diagAnswer"][value="1"]')).toBeChecked();
 await page.locator('#diagnostic input[name="diagAnswer"][value="-1"]').check();
 await page.locator("#diagnostic .diag-form .button-light").last().click();
 await expect(page.getByRole("button",{name:/Finalizar y ver perfil/})).toBeDisabled();
});
test("All correct: six scores and single RLS-bound Supabase summary (not raw answers)",async({page})=>{
 test.setTimeout(60000);
 const saved=[];await start(page,saved);await answerAll(page,i=>i%4);
 await expect(page.locator(".diag-big-score")).toContainText("100 %");
 for(let i=0;i<6;i++)await expect(page.locator(".diag-score-card").nth(i)).toContainText("4 / 4");
 await expect(page.locator("#diagSaveStatus")).toContainText("guardado");
 expect(saved.length).toBe(1);
 expect(saved[0].institutional_email).toBe(identity.email);
 expect(saved[0].auth_user_id).toBe(identity.id);
 expect(saved[0].correct_count).toBe(24);
 expect(saved[0].domain_scores.digital.correct).toBe(4);
 expect(JSON.stringify(saved[0])).not.toContain('"D01"');
 const csvPromise=page.waitForEvent("download");
 await page.getByRole("button",{name:"Descargar informe CSV"}).click();
 expect((await csvPromise).suggestedFilename()).toBe("ti10-modulo0-reporte.csv");
 const jsonPromise=page.waitForEvent("download");
 await page.getByRole("button",{name:"Descargar informe JSON"}).click();
 expect((await jsonPromise).suggestedFilename()).toBe("ti10-modulo0-reporte.json");
});
test("All unsure: remains formative and can reset",async({page})=>{
 test.setTimeout(60000);
 await start(page);await answerAll(page,()=>-1);
 await expect(page.locator(".diag-big-score")).toContainText("0 %");
 await expect(page.locator("#diagSaveStatus")).toContainText("guardado");
 page.once("dialog",d=>d.accept());
 await page.getByRole("button",{name:"Repetir diagnóstico"}).click();
 await expect(page.locator("#diagEmail")).toHaveValue(identity.email);
});
test("Unverified identity is denied even with a fabricated token",async({page})=>{
 await page.route(API+"/**",route=>{
  if(route.request().url().includes("/auth/v1/user"))return route.fulfill({json:{...identity,email:"other@gmail.com"}});
  return route.fulfill({status:200,json:{}});
 });
 await page.goto("/#access_token=fake&expires_in=3600");
 await expect(page.locator("#diagnostic h1")).toContainText("Diagnóstico");
 await expect(page.getByRole("button",{name:/Comenzar diagnóstico/})).toHaveCount(0);
});
test("Institutional auth, intro, question, results pass axe WCAG 2.1 AA",async({page})=>{
 test.setTimeout(65000);
 await mockBackend(page);
 await page.goto("/");
 await page.locator("#diagnosticEntry .diag-start").click();
 for(const state of ["intro","question","results"]){
  if(state==="question"){
   await page.locator("#diagEmail").fill(identity.email);
   await page.locator('input[autocomplete="one-time-code"]').fill("123456");
   await page.getByRole("button",{name:"Verificar código"}).click();
   await page.getByRole("button",{name:/Comenzar diagnóstico/}).click();
  }
  if(state==="results"){
   for(let i=0;i<24;i++){await page.locator('#diagnostic input[name="diagAnswer"][value="-1"]').check();await page.locator("#diagnostic .diag-form .button-dark").click()}
   await page.getByRole("button",{name:/Finalizar y ver perfil/}).click();
  }
  const r=await new AxeBuilder({page}).include("#diagnostic").withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),state).toEqual([]);
 }
});
test("No horizontal overflow after authenticating",async({page})=>{
 await start(page);
 const x=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(x.scroll).toBeLessThanOrEqual(x.client+2);
});
