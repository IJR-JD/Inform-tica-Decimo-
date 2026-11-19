import { test, expect } from "@playwright/test";
const noCriticalErrors = page => {
  const issues = [];
  page.on("pageerror",e=>issues.push(e.message));
  return issues;
};
test("landing page: 12 modules, term map and original layout",async({page})=>{
 const errors=noCriticalErrors(page);
 await page.goto("/");
 await expect(page.locator("#topicGrid .hub-topic-card")).toHaveCount(12);
 await expect(page.locator(".ti10-project-card")).toHaveCount(3);
 await expect(page.locator('img[src$="periodo-1-consolidado.svg"]')).toBeVisible();
 await expect(page.locator('img[src$="periodo-1-consolidado.svg"]')).toHaveJSProperty("naturalWidth",1080);
 expect(errors).toEqual([]);
});
test("modules 1–4 display expanded theory, technical diagrams and working source files",async({page,request})=>{
 const errors=noCriticalErrors(page);
 await page.goto("/");
 for(let i=0;i<4;i++){
  await page.locator("#topicGrid .theory-action").nth(i).click();
  await expect(page.locator("#theory")).toBeVisible();
  await expect(page.locator("#ti10-foundations")).toBeVisible();
  await expect(page.locator("#ti10-foundations .ti10-chapter")).toHaveCount(4);
  await expect(page.locator("#ti10-foundations .ti10-solved-case li")).toHaveCount(6);
  const img=page.locator("#ti10-foundations img");
  await expect(img).toBeVisible();
  await expect.poll(()=>img.evaluate(e=>e.complete&&e.naturalWidth>0)).toBe(true);
  const url=await img.getAttribute("src");
  const resp=await request.get(url);
  expect(resp.ok(),url).toBe(true);
  const tex=await page.locator("#ti10-foundations a[download]").getAttribute("href");
  const texResp=await request.get(tex);
  expect(texResp.ok(),tex).toBe(true);
  await page.locator("#fromTheory").click();
 }
 await page.locator("#topicGrid .theory-action").nth(4).click();
 await expect(page.locator("#ti10-foundations")).toBeHidden();
 expect(errors).toEqual([]);
});
test("worked example is not a copy of concept; navigation works",async({page})=>{
 await page.goto("/");
 await page.locator("#topicGrid .theory-action").first().click();
 const concept=await page.locator("#theoryConcept").innerText();
 const example=await page.locator("#theoryExample").innerText();
 expect(example).not.toBe(concept);
 expect(example.length).toBeGreaterThan(60);
 await page.locator("#nextTopic").click();
 await expect(page.locator("#theoryNo")).toContainText("TOPIC 02");
 await page.locator("#prevTopic").click();
 await expect(page.locator("#theoryNo")).toContainText("TOPIC 01");
});
test("assessment: incorrect answer, correction and completed checkpoint",async({page})=>{
 await page.goto("/");
 await page.locator("#topicGrid .workshop-action").first().click();
 const options=page.locator("#choices input");
 await options.nth(1).check();
 await page.locator("#checkAnswer").click();
 await expect(page.locator("#assessmentResult")).toContainText("Review and retry");
 await options.nth(0).check();
 await page.locator("#checkAnswer").click();
 await expect(page.locator("#assessmentResult")).toContainText("Checkpoint passed");
 await expect(page.locator("#workshopPercent")).toHaveText("100%");
 await page.reload();
 await expect(page.locator("#globalPercent")).toHaveText("8%");
});
test("project evidence is local and resettable",async({page})=>{
 await page.goto("/");
 await page.locator("#topicGrid .workshop-action").first().click();
 await page.locator(".ti10-checkline input").first().check();
 await page.locator(".ti10-evidence-form textarea").fill("Se construyó un modelo de prueba y se revisaron las cotas.");
 await page.getByRole("button",{name:"Save draft on this device"}).click();
 await page.reload();
 await page.locator("#topicGrid .workshop-action").first().click();
 await expect(page.locator(".ti10-checkline input").first()).toBeChecked();
 await expect(page.locator(".ti10-evidence-form textarea")).toContainText("modelo de prueba");
 page.once("dialog",d=>d.accept());
 await page.getByRole("button",{name:"Clear this topic's draft"}).click();
 await expect(page.locator(".ti10-checkline input").first()).not.toBeChecked();
});
test("project labs: three accessible, functional modules",async({page})=>{
 const errors=noCriticalErrors(page);
 await page.goto("/");
 await page.locator("#openLab").click();
 await page.locator("#labP1").click();
 await page.locator("#roomW").fill("3.5");
 await page.locator("#roomL").fill("4");
 await page.locator("#roomT").fill("12");
 await page.locator("#runLab").click();
 await expect(page.locator("#labResult")).toContainText("14.00");
 await page.locator("#labP2").click();
 await page.locator("#wallA").fill("45");
 await page.locator("#cover").fill("10");
 await page.locator("#coats").fill("2");
 await page.locator("#runLab").click();
 await expect(page.locator("#labResult")).toContainText("9.00");
 await page.locator("#labP3").click();
 await page.locator("#kbTest").click();
 await expect(page.locator("#kbOut")).toContainText("5 / 5");
 expect(errors).toEqual([]);
});
test("responsive layout: no document-wide horizontal overflow",async({page})=>{
 await page.goto("/");
 const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client+2);
 await page.locator("#topicGrid .theory-action").first().click();
 const theory=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(theory.scroll).toBeLessThanOrEqual(theory.client+2);
});
