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
  await page.getByLabel('Status', { exact: true }).selectOption('Passed')
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

test('changes a test status and keeps summaries and filters in sync', async ({
  page,
}) => {
  await page.goto('/')

  const statistics = page.getByRole('region', { name: 'Test run statistics' })
  const expectStatistic = async (label: string, value: string) => {
    const card = statistics.locator('article').filter({ hasText: label })

    await expect(card.getByText(value, { exact: true })).toBeVisible()
  }
  const signInStatus = page.getByRole('combobox', {
    name: 'Status for User can sign in with valid credentials (TC-001)',
  })

  await expect(signInStatus).toHaveValue('Passed')

  await signInStatus.selectOption('Failed')
  await expect(signInStatus).toHaveValue('Failed')
  await expectStatistic('Passed', '2')
  await expectStatistic('Failed', '2')

  await signInStatus.selectOption('Blocked')
  await expect(signInStatus).toHaveValue('Blocked')
  await expectStatistic('Failed', '1')
  await expectStatistic('Blocked', '2')

  await signInStatus.selectOption('Not Run')
  await expect(signInStatus).toHaveValue('Not Run')
  await expectStatistic('Blocked', '1')
  await expectStatistic('Not Run', '4')

  await signInStatus.selectOption('Passed')
  await expect(signInStatus).toHaveValue('Passed')
  await expectStatistic('Passed', '3')
  await expectStatistic('Not Run', '3')
  await expectStatistic('Total', '8')

  await page.getByLabel('Search').fill('quantity')
  await page.getByLabel('Priority').selectOption('High')
  await page.getByLabel('Status', { exact: true }).selectOption('Blocked')

  const cartTotalStatus = page.getByRole('combobox', {
    name: 'Status for Cart total updates after quantity change (TC-005)',
  })
  await expect(cartTotalStatus).toHaveValue('Blocked')
  await expect(page.getByText('1 case', { exact: true })).toBeVisible()

  await cartTotalStatus.selectOption('Passed')
  await expect(page.getByText('0 cases', { exact: true })).toBeVisible()
  await expect(
    page.getByText('No test cases match the current search and filters.'),
  ).toBeVisible()
  await expectStatistic('Passed', '4')
  await expectStatistic('Blocked', '0')

  await page.getByLabel('Status', { exact: true }).selectOption('Passed')
  await expect(cartTotalStatus).toHaveValue('Passed')

  await page.reload()
  await expect(
    page.getByRole('combobox', {
      name: 'Status for Cart total updates after quantity change (TC-005)',
    }),
  ).toHaveValue('Blocked')
  await expectStatistic('Passed', '3')
  await expectStatistic('Blocked', '1')
})
