import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for(const state of ["overview","theory","workshop","lab"]){
 test("WCAG 2.1 AA — "+state,async({page})=>{
  await page.goto("/");
  if(state==="theory")await page.locator("#topicGrid .theory-action").first().click();
  if(state==="workshop")await page.locator("#topicGrid .workshop-action").first().click();
  if(state==="lab")await page.locator("#openLab").click();
  const result=await new AxeBuilder({page})
    .include("#"+state)
    .withTags(["wcag2a","wcag2aa","wcag21a","wcag21aa"])
    .analyze();
  expect(result.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
 });
}
