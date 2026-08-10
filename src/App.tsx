import './App.css'
import TestCaseTable from './components/TestCaseTable'
import { demoTestCases } from './data/demoTestCases'

function App() {
  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="app-label">QA workspace</p>
        <h1>QA RunBoard</h1>
        <p className="app-description">
          Track test cases and follow the progress of a test run.
        </p>
      </header>

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
