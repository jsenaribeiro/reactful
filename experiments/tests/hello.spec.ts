import { test, expect } from '@playwright/test'

const cases = [
   ['local', 'hi!', '[id="1"]', '#l1'],
   ['global (outer)', 'hi!', '[id="2"]', '#l2'],
   ['global (inner)', 'hi!', '[id="3"]', '#l2'],
]

cases.forEach(function(scenario) {
   const [ scope, text, inputId, labelId ] = scenario

   test(`hello: ${scope} props binding`, async function({ page }) {
      await page.goto('http://localhost:3000/hello')
      await page.waitForTimeout(99) 

      for await (const char of text.split('')) {
         await page.waitForTimeout(99) 
         await page.type(inputId, char, { delay: 99 })
      }

      await page.waitForTimeout(99) 
      const result = await page.locator(labelId).innerText()
      expect(result).toBe(text)
   })
})