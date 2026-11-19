import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function start(page,code){
 await page.goto("/");
 await expect(page.locator("#topicGrid .hub-topic-card")).toHaveCount(12);
 await page.locator("#diagnosticEntry .diag-start").click();
 await expect(page.locator("#diagnostic h1")).toContainText("Diagnóstico");
 if(code!==undefined)await page.locator("#diagCode").fill(code);
 await page.getByRole("button",{name:/Comenzar diagnóstico/}).click();
 await expect(page.locator("#diagnostic .diag-fieldset")).toBeVisible();
}
async function answerAll(page,choiceFn){
 for(let i=0;i<24;i++){
  const option=choiceFn(i);
  await page.locator('#diagnostic input[name="diagAnswer"][value="'+option+'"]').check();
  const next=page.locator("#diagnostic .diag-form .diag-actions .button-dark");
  await next.click();
 }
 await expect(page.locator("#diagnostic h1")).toContainText("Revisa");
 await expect(page.locator("#diagnostic .diag-review-group")).toHaveCount(6);
 await page.getByRole("button",{name:/Finalizar y ver perfil/}).click();
 await expect(page.locator("#diagnostic h1")).toContainText("Tu perfil");
}
test("Module 0 opens independently and preserves existing 12 lessons",async({page})=>{
 await start(page);
 await expect(page.locator(".diag-progress-track")).toHaveAttribute("aria-valuemax","24");
 await expect(page.locator("#diagnostic .diag-option")).toHaveCount(5);
 await page.locator("#diagnostic .diag-form .diag-actions .button-light").last().click();
 await expect(page.getByRole("button",{name:/Finalizar y ver perfil/})).toBeDisabled();
 await expect(page.locator("#diagnostic .diag-review-button")).toHaveCount(24);
});
test("Answers can be revisited and completion is blocked if unfinished",async({page})=>{
 await start(page);
 await page.locator('#diagnostic input[name="diagAnswer"][value="1"]').check();
 await page.locator("#diagnostic .diag-form .button-dark").click();
 await page.locator("#diagnostic .diag-form .button-light").first().click();
 await expect(page.locator('#diagnostic input[name="diagAnswer"][value="1"]')).toBeChecked();
 await page.locator('#diagnostic input[name="diagAnswer"][value="-1"]').check();
 await expect(page.locator(".diag-progress-track")).toHaveAttribute("aria-valuenow","1");
 await page.locator("#diagnostic .diag-form .button-light").last().click();
 await expect(page.getByRole("button",{name:/Finalizar y ver perfil/})).toBeDisabled();
});
test("All correct: six full domain scores, CSV and JSON download",async({page})=>{
 test.setTimeout(55000);
 await start(page,"G10-A07");
 await answerAll(page,i=>i%4);
 await expect(page.locator(".diag-big-score")).toContainText("100 %");
 await expect(page.locator(".diag-score-card")).toHaveCount(6);
 await expect(page.locator(".diag-score-card")).toHaveText(/4 \/ 4/);
 await expect(page.locator(".diag-report-hero")).toContainText("Ruta C");
 const csvPromise=page.waitForEvent("download");
 await page.getByRole("button",{name:"Descargar informe CSV"}).click();
 const csv=await csvPromise;expect(csv.suggestedFilename()).toBe("ti10-modulo0-G10-A07.csv");
 const jsonPromise=page.waitForEvent("download");
 await page.getByRole("button",{name:"Descargar informe JSON"}).click();
 const json=await jsonPromise;expect(json.suggestedFilename()).toBe("ti10-modulo0-G10-A07.json");
 const serialized=await page.evaluate(()=>window.TI10Diagnostic.score(Object.fromEntries(Array.from({length:24},(_,i)=>["D"+String(i+1).padStart(2,"0"),i%4]))));
 expect(serialized.percentage).toBe(100);
 expect(serialized.domains.map(d=>d.correct)).toEqual([4,4,4,4,4,4]);
});
test("All unsure: 0% without penalizing unanswered as missing; clear reset",async({page})=>{
 test.setTimeout(55000);
 await start(page);
 await answerAll(page,()=>-1);
 await expect(page.locator(".diag-big-score")).toContainText("0 %");
 await expect(page.locator(".diag-report-hero")).toContainText("24");
 await expect(page.locator(".diag-report-hero")).toContainText("Ruta A");
 page.once("dialog",d=>d.accept());
 await page.getByRole("button",{name:"Repetir diagnóstico"}).click();
 await expect(page.locator("#diagCode")).toHaveValue("");
 await expect(page.locator("#diagnostic .diag-form")).toHaveCount(0);
});
test("Diagnostic uses session-only memory and does not transmit student answers",async({page})=>{
 const outgoing=[];
 page.on("request",r=>{if(["POST","PUT","PATCH","DELETE"].includes(r.method()))outgoing.push(r.url())});
 await start(page,"CLASE-01");
 await page.locator('#diagnostic input[name="diagAnswer"][value="0"]').check();
 await expect(page.locator(".diag-progress-track")).toHaveAttribute("aria-valuenow","1");
 const storage=await page.evaluate(()=>Object.keys(localStorage));
 expect(storage.some(k=>k.toLowerCase().includes("diagnostic")||k.toLowerCase().includes("modulo0"))).toBe(false);
 expect(outgoing).toEqual([]);
 await page.reload();
 await page.locator("#diagnosticEntry .diag-start").click();
 await expect(page.locator("#diagCode")).toHaveValue("");
 await expect(page.locator("#diagnostic .diag-form")).toHaveCount(0);
});
test("axe WCAG 2.1 AA — intro, question, results",async({page})=>{
 await page.goto("/");
 await page.locator("#diagnosticEntry .diag-start").click();
 for(const state of ["intro","question","results"]){
  if(state==="question")await page.getByRole("button",{name:/Comenzar diagnóstico/}).click();
  if(state==="results"){
   test.setTimeout(55000);
   for(let i=0;i<24;i++){await page.locator('#diagnostic input[name="diagAnswer"][value="-1"]').check();await page.locator("#diagnostic .diag-form .button-dark").click()}
   await page.getByRole("button",{name:/Finalizar y ver perfil/}).click();
  }
  const results=await new AxeBuilder({page}).include("#diagnostic").withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"]).analyze();
  expect(results.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),state).toEqual([]);
 }
});
test("Module 0 does not create horizontal overflow on viewport",async({page})=>{
 await start(page);
 const sizes=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(sizes.scroll).toBeLessThanOrEqual(sizes.client+2);
});
