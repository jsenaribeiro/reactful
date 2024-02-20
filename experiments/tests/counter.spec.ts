import { test, expect } from '@playwright/test'

test('counter: statefull props', async ({ page }) => {
   await page.goto('http://localhost:3000/counter')
   await page.waitForTimeout(99)   
   await page.click('button', { delay:99 })
   await page.click('button', { delay:99 })
   await page.click('button', { delay:99 })
   await page.waitForTimeout(99)

   const btn = await page.locator('button').innerText()
   expect(btn.trim()).toBe('COUNTED: 3')
 })

 test('counter: shown custom props directive', async ({ page }) => {
   await page.goto('http://localhost:3000/counter')
   const h2IsVisible = await page.locator('h6').isVisible()   
   expect(h2IsVisible).toBe(false)
 })