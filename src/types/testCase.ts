export type TestStatus = 'Not Run' | 'Passed' | 'Failed' | 'Blocked'

export const testStatuses: readonly TestStatus[] = [
  'Passed',
  'Failed',
  'Blocked',
  'Not Run',
]

export function isTestStatus(value: string): value is TestStatus {
  return testStatuses.some((status) => status === value)
}

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical'

export interface TestCase {
  id: number
  title: string
  area: string
  priority: Priority
  status: TestStatus
}
