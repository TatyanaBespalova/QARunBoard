import {
  isTestStatus,
  testStatuses,
  type TestCase,
  type TestStatus,
} from '../types/testCase'

interface TestCaseTableProps {
  testCases: TestCase[]
  onStatusChange: (id: number, status: TestStatus) => void
}

function TestCaseTable({ testCases, onStatusChange }: TestCaseTableProps) {
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
                <td>
                  <span className="test-case-title">{testCase.title}</span>
                </td>
                <td>{testCase.area}</td>
                <td>
                  <span
                    className={`badge priority-${testCase.priority.toLowerCase()}`}
                  >
                    {testCase.priority}
                  </span>
                </td>
                <td>
                  <select
                    className={`status-select status-${testCase.status
                      .toLowerCase()
                      .replace(' ', '-')}`}
                    aria-label={`Status for ${testCase.title} (TC-${String(testCase.id).padStart(3, '0')})`}
                    value={testCase.status}
                    onChange={(event) => {
                      const status = event.target.value

                      if (isTestStatus(status)) {
                        onStatusChange(testCase.id, status)
                      }
                    }}
                  >
                    {testStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
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
