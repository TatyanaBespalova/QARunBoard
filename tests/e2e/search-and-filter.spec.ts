import { expect, test } from '@playwright/test'

test('searches and combines area, status, and priority filters', async ({
  page,
}) => {
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

  const search = page.getByLabel('Search')
  const area = page.getByLabel('Area', { exact: true })
  const status = page.getByLabel('Status', { exact: true })
  const priority = page.getByLabel('Priority')

  await expect(search).toHaveValue('')
  await expect(area).toHaveValue('All Areas')
  await expect(status).toHaveValue('All')
  await expect(priority).toHaveValue('All')
  await expect(area.locator('option')).toHaveText([
    'All Areas',
    'Authentication',
    'Cart',
    'Checkout',
  ])

  await expectStatistic('Total', '8')
  await expectStatistic('Passed', '3')
  await expectStatistic('Failed', '1')
  await expectStatistic('Blocked', '1')
  await expectStatistic('Not Run', '3')

  await area.selectOption('Authentication')
  await expect(testCaseRows).toHaveCount(3)
  await expect(testCaseRows).toContainText([
    'Authentication',
    'Authentication',
    'Authentication',
  ])
  await area.selectOption('Cart')
  await expect(testCaseRows).toHaveCount(3)
  await expect(testCaseRows).toContainText(['Cart', 'Cart', 'Cart'])
  await area.selectOption('Checkout')
  await expect(testCaseRows).toHaveCount(2)
  await expect(testCaseRows).toContainText(['Checkout', 'Checkout'])
  await area.selectOption('All Areas')
  await expect(testCaseRows).toHaveCount(8)

  await area.selectOption('Cart')
  await search.fill('quantity')
  await expect(testCaseRows).toHaveCount(1)
  await search.fill('')
  await priority.selectOption('Critical')
  await expect(testCaseRows).toHaveCount(1)
  await priority.selectOption('All')
  await status.selectOption('Passed')
  await expect(testCaseRows).toHaveCount(1)

  await area.selectOption('Authentication')
  await search.fill('password')
  await priority.selectOption('High')
  await expect(testCaseRows).toHaveCount(1)
  await expect(page.getByText('Error appears for an invalid password')).toBeVisible()
  await area.selectOption('Checkout')
  await expect(testCaseRows).toHaveCount(0)
  await area.selectOption('All Areas')
  await expect(testCaseRows).toHaveCount(1)
  await area.selectOption('Authentication')
  await priority.selectOption('Critical')
  await expect(testCaseRows).toHaveCount(0)
  await expect(page.getByText('0 cases', { exact: true })).toBeVisible()
  await expect(
    page.getByText('No test cases match the current search and filters.'),
  ).toBeVisible()

  await expectStatistic('Total', '8')
  await expectStatistic('Passed', '3')
  await expectStatistic('Failed', '1')
  await expectStatistic('Blocked', '1')
  await expectStatistic('Not Run', '3')

  await area.selectOption('All Areas')
  await status.selectOption('All')
  await priority.selectOption('All')
  await search.fill('005')
  await expect(testCaseRows).toHaveCount(1)
  await search.fill('TC-005')
  await expect(testCaseRows).toHaveCount(1)
  await search.fill('PASSWORD')
  await expect(testCaseRows).toHaveCount(2)
  await expect(page.getByText('Error appears for an invalid password')).toBeVisible()
  await expect(page.getByText('User can reset a forgotten password')).toBeVisible()

  await search.fill('')
  await status.selectOption('Passed')
  await expect(testCaseRows).toHaveCount(3)
  await expect(page.getByText('User can sign in with valid credentials')).toBeVisible()

  await priority.selectOption('Critical')
  await expect(testCaseRows).toHaveCount(2)
  await expect(page.getByText('Product can be added to the cart')).toBeVisible()
  await expect(page.getByText('Order confirmation is displayed after payment')).not.toBeVisible()

  await search.fill('password')
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

  const area = page.getByLabel('Area', { exact: true })
  const status = page.getByLabel('Status', { exact: true })
  const cartTotalStatus = page.getByRole('combobox', {
    name: 'Status for Cart total updates after quantity change (TC-005)',
  })

  await area.selectOption('Cart')
  await expect(cartTotalStatus).toHaveValue('Blocked')
  await expect(page.getByText('3 cases', { exact: true })).toBeVisible()

  await cartTotalStatus.selectOption('Passed')
  await expect(cartTotalStatus).toHaveValue('Passed')
  await expect(area).toHaveValue('Cart')
  await expect(page.getByText('3 cases', { exact: true })).toBeVisible()
  await expectStatistic('Passed', '4')
  await expectStatistic('Blocked', '0')

  await cartTotalStatus.selectOption('Blocked')
  await status.selectOption('Blocked')
  await expect(page.getByText('1 case', { exact: true })).toBeVisible()

  await cartTotalStatus.selectOption('Passed')
  await expect(page.getByText('0 cases', { exact: true })).toBeVisible()
  await expect(
    page.getByText('No test cases match the current search and filters.'),
  ).toBeVisible()
  await expect(area).toHaveValue('Cart')
  await expect(status).toHaveValue('Blocked')
  await expectStatistic('Passed', '4')
  await expectStatistic('Blocked', '0')

  await status.selectOption('Passed')
  await expect(page.getByText('2 cases', { exact: true })).toBeVisible()
  await expect(cartTotalStatus).toHaveValue('Passed')

  await page.reload()
  await expect(page.getByLabel('Search')).toHaveValue('')
  await expect(page.getByLabel('Area', { exact: true })).toHaveValue(
    'All Areas',
  )
  await expect(page.getByLabel('Status', { exact: true })).toHaveValue('All')
  await expect(page.getByLabel('Priority')).toHaveValue('All')
  await expect(
    page.getByRole('combobox', {
      name: 'Status for Cart total updates after quantity change (TC-005)',
    }),
  ).toHaveValue('Blocked')
  await expectStatistic('Passed', '3')
  await expectStatistic('Blocked', '1')
})
