import type { TestCase } from '../types/testCase'

interface TestCaseTableProps {
  testCases: TestCase[]
}

function TestCaseTable({ testCases }: TestCaseTableProps) {
  return (
    <div className="table-wrapper">
      <table className="test-case-table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Test case</th>
            <th scope="col">Area</th>
            <th scope="col">Priority</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {testCases.length === 0 ? (
            <tr>
              <td className="empty-state" colSpan={5}>
                No test cases match the current search and filters.
              </td>
            </tr>
          ) : (
            testCases.map((testCase) => (
              <tr key={testCase.id}>
                <td>TC-{String(testCase.id).padStart(3, '0')}</td>
                <td>{testCase.title}</td>
                <td>{testCase.area}</td>
                <td>
                  <span
                    className={`badge priority-${testCase.priority.toLowerCase()}`}
                  >
                    {testCase.priority}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge status-${testCase.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                  >
                    {testCase.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TestCaseTable
