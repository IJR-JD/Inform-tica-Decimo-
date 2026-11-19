import {test,expect} from "@playwright/test";
test("typography is materially larger and readable",async({page})=>{
 await page.goto("/");
 const size=await page.locator("body").evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
 expect(size).toBeGreaterThanOrEqual(16);
 const buttonSize=await page.locator("#openLab").evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
 expect(buttonSize).toBeGreaterThanOrEqual(16);
 await page.locator("#topicGrid .theory-action").first().click();
 const paragraph=await page.locator(".ti10-chapter p").first().evaluate(el=>parseFloat(getComputedStyle(el).fontSize));
 expect(paragraph).toBeGreaterThanOrEqual(17);
});
test("animated diagrams render and remain keyboard operable across first four modules",async({page})=>{
 await page.goto("/");
 for(let i=0;i<4;i++){
  await page.locator("#topicGrid .theory-action").nth(i).click();
  const stage=page.locator(".ti10-motion-stage");
  await expect(stage).toBeVisible();
  await expect(stage.locator("svg")).toBeVisible();
  await expect(stage.locator(".ti10-motion-node")).toHaveCount(4);
  await expect(stage.locator(".ti10-motion-count")).toContainText("01 / 04");
  await stage.getByRole("button",{name:/Siguiente/}).click();
  await expect(stage.locator(".ti10-motion-count")).toContainText("02 / 04");
  await expect(stage.locator(".ti10-motion-node.active")).toHaveAttribute("data-step","1");
  await stage.getByRole("button",{name:/Anterior/}).click();
  await expect(stage.locator(".ti10-motion-count")).toContainText("01 / 04");
  await page.locator("#fromTheory").click();
 }
 await page.locator("#topicGrid .theory-action").nth(4).click();
 await expect(page.locator(".ti10-motion-stage")).toHaveCount(0);
});
test("play and pause work; motion preference reduces animation",async({page})=>{
 await page.goto("/");
 await page.locator("#topicGrid .theory-action").first().click();
 const stage=page.locator(".ti10-motion-stage");
 await stage.getByRole("button",{name:"Reproducir"}).click();
 await expect(stage.getByRole("button",{name:"Pausar"})).toHaveAttribute("aria-pressed","true");
 await stage.getByRole("button",{name:"Pausar"}).click();
 await expect(stage.getByRole("button",{name:"Reproducir"})).toHaveAttribute("aria-pressed","false");
 await page.emulateMedia({reducedMotion:"reduce"});
 await expect(stage).toHaveAttribute("data-motion","reduced");
 await stage.getByRole("button",{name:"Reproducir"}).click();
 await expect(stage.locator(".ti10-motion-count")).toContainText("02 / 04");
 await expect(stage).toHaveClass(/paused/);
});
test("motion stage is responsive without page overflow",async({page})=>{
 await page.goto("/");
 await page.locator("#topicGrid .theory-action").first().click();
 const dimensions=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));
 expect(dimensions.scroll).toBeLessThanOrEqual(dimensions.client+2);
 const stage=page.locator(".ti10-motion-stage");
 await expect(stage).toBeVisible();
 await expect(stage.getByRole("button",{name:/Siguiente/})).toBeVisible();
});
