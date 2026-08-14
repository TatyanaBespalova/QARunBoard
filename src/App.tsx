import { useState } from 'react'
import './App.css'
import StatCard from './components/StatCard'
import TestCaseTable from './components/TestCaseTable'
import { demoTestCases } from './data/demoTestCases'
import {
  testStatuses,
  type Priority,
  type TestCase,
  type TestStatus,
} from './types/testCase'

type StatusFilter = TestStatus | 'All'
type PriorityFilter = Priority | 'All'

const priorities: Priority[] = ['Low', 'Medium', 'High', 'Critical']
const allAreas = 'All Areas'

function App() {
  const [testCases, setTestCases] = useState<TestCase[]>(() =>
    demoTestCases.map((testCase) => ({ ...testCase })),
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [areaFilter, setAreaFilter] = useState(allAreas)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All')
  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>('All')

  const total = testCases.length
  const passed = testCases.filter(
    (testCase) => testCase.status === 'Passed',
  ).length
  const failed = testCases.filter(
    (testCase) => testCase.status === 'Failed',
  ).length
  const blocked = testCases.filter(
    (testCase) => testCase.status === 'Blocked',
  ).length
  const notRunStatus: TestStatus = 'Not Run'
  const notRun = testCases.filter(
    (testCase) => testCase.status === notRunStatus,
  ).length
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const areas = [
    ...testCases.reduce(
      (uniqueAreas, testCase) => uniqueAreas.add(testCase.area),
      new Set<TestCase['area']>(),
    ),
  ]
  const visibleTestCases = testCases.filter((testCase) => {
    const numericId = String(testCase.id)
    const formattedId = `TC-${numericId.padStart(3, '0')}`.toLowerCase()
    const matchesSearch =
      normalizedQuery === '' ||
      numericId.includes(normalizedQuery) ||
      formattedId.includes(normalizedQuery) ||
      testCase.title.toLowerCase().includes(normalizedQuery)
    const matchesStatus =
      statusFilter === 'All' || testCase.status === statusFilter
    const matchesArea =
      areaFilter === allAreas || testCase.area === areaFilter
    const matchesPriority =
      priorityFilter === 'All' || testCase.priority === priorityFilter

    return matchesSearch && matchesArea && matchesStatus && matchesPriority
  })

  const handleStatusChange = (id: number, status: TestStatus) => {
    setTestCases((currentTestCases) =>
      currentTestCases.map((testCase) =>
        testCase.id === id ? { ...testCase, status } : testCase,
      ),
    )
  }

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
          <p aria-live="polite">
            {visibleTestCases.length}{' '}
            {visibleTestCases.length === 1 ? 'case' : 'cases'}
          </p>
        </div>

        <div className="test-case-controls" aria-label="Filter test cases">
          <div className="control-field search-field">
            <label htmlFor="test-case-search">Search</label>
            <input
              id="test-case-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by ID or title"
            />
          </div>

          <div className="control-field">
            <label htmlFor="area-filter">Area</label>
            <select
              id="area-filter"
              value={areaFilter}
              onChange={(event) => setAreaFilter(event.target.value)}
            >
              <option value={allAreas}>{allAreas}</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="control-field">
            <label htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as StatusFilter)
              }
            >
              <option value="All">All</option>
              {testStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="control-field">
            <label htmlFor="priority-filter">Priority</label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(event) =>
                setPriorityFilter(event.target.value as PriorityFilter)
              }
            >
              <option value="All">All</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
        </div>

        <TestCaseTable
          testCases={visibleTestCases}
          onStatusChange={handleStatusChange}
        />
      </section>
    </main>
  )
}

export default App
