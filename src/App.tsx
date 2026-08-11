import './App.css'
import StatCard from './components/StatCard'
import TestCaseTable from './components/TestCaseTable'
import { demoTestCases } from './data/demoTestCases'
import type { TestStatus } from './types/testCase'

function App() {
  const total = demoTestCases.length
  const passed = demoTestCases.filter(
    (testCase) => testCase.status === 'Passed',
  ).length
  const failed = demoTestCases.filter(
    (testCase) => testCase.status === 'Failed',
  ).length
  const blocked = demoTestCases.filter(
    (testCase) => testCase.status === 'Blocked',
  ).length
  const notRunStatus: TestStatus = 'Not Run'
  const notRun = demoTestCases.filter(
    (testCase) => testCase.status === notRunStatus,
  ).length

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="app-label">QA workspace</p>
        <h1>QA RunBoard</h1>
        <p className="app-description">
          Track test cases and follow the progress of a test run.
        </p>
      </header>

      <section className="statistics" aria-label="Test run statistics">
        <StatCard label="Total" value={total} />
        <StatCard label="Passed" value={passed} />
        <StatCard label="Failed" value={failed} />
        <StatCard label="Blocked" value={blocked} />
        <StatCard label="Not Run" value={notRun} />
      </section>

      <section className="test-cases-section" aria-labelledby="test-cases-title">
        <div className="section-heading">
          <div>
            <p className="section-label">Current test run</p>
            <h2 id="test-cases-title">Test cases</h2>
          </div>
          <p>{demoTestCases.length} cases</p>
        </div>

        <TestCaseTable testCases={demoTestCases} />
      </section>
    </main>
  )
}

export default App
