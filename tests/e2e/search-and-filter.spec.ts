import { expect, test } from '@playwright/test'

test('searches and combines status and priority filters', async ({ page }) => {
  await page.goto('/')

  const testCaseRows = page.getByRole('row', { name: /TC-\d{3}/ })
  const statistics = page.getByRole('region', { name: 'Test run statistics' })
  const expectStatistic = async (label: string, value: string) => {
    const card = statistics.locator('article').filter({ hasText: label })

    await expect(card.getByText(label, { exact: true })).toBeVisible()
    await expect(card.getByText(value, { exact: true })).toBeVisible()
  }

  await expect(page.getByRole('heading', { name: 'QA RunBoard' })).toBeVisible()
  await expect(testCaseRows).toHaveCount(8)
  await expect(page.getByText('User can sign in with valid credentials')).toBeVisible()
  await expect(page.getByText('Order confirmation is displayed after payment')).toBeVisible()

  await expectStatistic('Total', '8')
  await expectStatistic('Passed', '3')
  await expectStatistic('Failed', '1')
  await expectStatistic('Blocked', '1')
  await expectStatistic('Not Run', '3')

  await page.getByLabel('Search').fill('password')
  await expect(testCaseRows).toHaveCount(2)
  await expect(page.getByText('Error appears for an invalid password')).toBeVisible()
  await expect(page.getByText('User can reset a forgotten password')).toBeVisible()

  await page.getByLabel('Search').fill('')
  await page.getByLabel('Status').selectOption('Passed')
  await expect(testCaseRows).toHaveCount(3)
  await expect(page.getByText('User can sign in with valid credentials')).toBeVisible()

  await page.getByLabel('Priority').selectOption('Critical')
  await expect(testCaseRows).toHaveCount(2)
  await expect(page.getByText('Product can be added to the cart')).toBeVisible()
  await expect(page.getByText('Order confirmation is displayed after payment')).not.toBeVisible()

  await page.getByLabel('Search').fill('password')
  await expect(testCaseRows).toHaveCount(0)
  await expect(
    page.getByText('No test cases match the current search and filters.'),
  ).toBeVisible()

  await expectStatistic('Total', '8')
  await expectStatistic('Passed', '3')
  await expectStatistic('Failed', '1')
  await expectStatistic('Blocked', '1')
  await expectStatistic('Not Run', '3')
})
