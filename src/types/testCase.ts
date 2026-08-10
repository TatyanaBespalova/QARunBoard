export type TestStatus = 'Not Run' | 'Passed' | 'Failed' | 'Blocked'

export type Priority = 'Low' | 'Medium' | 'High' | 'Critical'

export interface TestCase {
  id: number
  title: string
  area: string
  priority: Priority
  status: TestStatus
}
