import type { TestCase } from '../types/testCase'

export const demoTestCases: TestCase[] = [
  {
    id: 1,
    title: 'User can sign in with valid credentials',
    area: 'Authentication',
    priority: 'Critical',
    status: 'Passed',
  },
  {
    id: 2,
    title: 'Error appears for an invalid password',
    area: 'Authentication',
    priority: 'High',
    status: 'Passed',
  },
  {
    id: 3,
    title: 'User can reset a forgotten password',
    area: 'Authentication',
    priority: 'High',
    status: 'Failed',
  },
  {
    id: 4,
    title: 'Product can be added to the cart',
    area: 'Cart',
    priority: 'Critical',
    status: 'Passed',
  },
  {
    id: 5,
    title: 'Cart total updates after quantity change',
    area: 'Cart',
    priority: 'High',
    status: 'Blocked',
  },
  {
    id: 6,
    title: 'User can remove a product from the cart',
    area: 'Cart',
    priority: 'Medium',
    status: 'Not Run',
  },
  {
    id: 7,
    title: 'Checkout form validates required fields',
    area: 'Checkout',
    priority: 'High',
    status: 'Not Run',
  },
  {
    id: 8,
    title: 'Order confirmation is displayed after payment',
    area: 'Checkout',
    priority: 'Critical',
    status: 'Not Run',
  },
]
