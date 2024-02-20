// import { test, expect } from '@playwright/test'

// async function goto(page) {
//    await page.goto('http://localhost:3000/forms')
//    await page.waitForTimeout(1500) 
// }

// test(`form validation: checkbox`, async function({ page }) {
//    await goto(page)
//    await page.click('button', { delay:333 })

//    const check = await page.locator('[type="checkbox"]')
//    const checkHandle = await check!.evaluateHandle(x => x['validationMessage'])
//    const validationMessage = await checkHandle.jsonValue()

//    expect(validationMessage).toBe('Please check this box if you want to proceed')
// })

// test(`form validation: input`, async function({ page }) {
//    await goto(page)
//    await page.click('[uid="14"]')
//    await page.click('button', { delay:333 })

//    const input = await page.evaluate(() => document.querySelector('[bind="mode"]'))
//    const validationMessage = input && input['validationMessage']

//    // const input = await page.$('[bind="mode"]');
//    // const inputHandle = await input!.evaluateHandle(x => x['validationMessage'])
//    // const validationMessage = await inputHandle.jsonValue()

//    expect(validationMessage).toBe('Mode is required!')
// })

// test(`form action: errors feedback`, async function({ page }) {
//    await goto(page)

//    const checkbox = await page.getByLabel('Accepted?')
//    await checkbox.click()

//    await page.getByLabel('Accepted?').click()
//    await page.fill('[bind="mode"]', 'ok', { timeout:99 })
//    await page.click('button', { delay:333 })

//    const progress = await page.locator('progress').isVisible()
//    expect(progress).toBe(true)

//    await page.waitForTimeout(333)

//    const li = await page.locator('ul > li').innerHTML()
//    expect(li).toContain('URL not found')
// })