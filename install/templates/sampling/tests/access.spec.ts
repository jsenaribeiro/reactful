import { test, expect } from '@playwright/test'

const cases = [
   ['/about', 'About'],
   ['/clock', 'World Clock'],
   ['/htmlx', 'HTML-X'],
   ['/system', 'Server OS'],
   ['/quotes', 'My custom error component', 'Philosophy quote of the day'],
   ['/counter', 'Counter'],
   ['/hello', 'Hello Forms'],
   ['/forms', 'Uncontrolled Components'],
   ['/profile/123', 'Profile'],
]

cases.forEach(function(scenario) {
   const [ href, head, that ] = scenario

   test(href, async ({ page }) => {
      await page.goto('http://localhost:3000/')
      await page.goto(href)
      await page.waitForTimeout(333)
      await page.waitForURL(`http://localhost:3000${href}`);

      const h1 = await page.locator(`h1`).innerHTML()    
      const ok = [head,that].includes(h1)

      if (!ok) expect(h1).toBe(that || head)      
    })
})
