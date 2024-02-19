import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
   testDir: './tst',
   outputDir: './tst/results',
   fullyParallel: true,
   forbidOnly: !!process.env.CI,
   retries: process.env.CI ? 2 : 0,
   workers: process.env.CI ? 1 : undefined,
   reporter: [
      ['html', { outputFolder: 'tst/results' }],
      // ['allure', { outputDir: '/tst/results' }],
   ],
   use: {
      baseURL: 'http://localhost:3000',
      trace: 'on-first-retry',
   },
   webServer: {
      url: 'http://localhost:3000',
      command: 'bun run poc/index.tsx',
      reuseExistingServer: !process.env.CI,
   },
});