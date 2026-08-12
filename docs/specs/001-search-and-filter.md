# Feature Specification — Search and Filter Test Cases

## Goal

Allow users to quickly find relevant test cases in the Test Case table using text search and filters.

## Context

QARunBoard currently displays a static list of test cases with properties including status and priority.

As the number of test cases grows, users need a faster way to locate specific test cases and narrow the visible results.

## Constraints

- Preserve the existing Test Case table and existing test case data.
- Do not introduce new dependencies.
- Do not introduce a new automated testing framework as part of this feature.
- Reuse existing React and TypeScript project patterns.
- Preserve responsive behaviour and accessibility.
- Filtering and searching must happen client-side using the existing data.
- Do not change unrelated application behaviour.

## Acceptance Criteria

- [ ] A search input is displayed above the Test Case table.
- [ ] On initial load, the search input is empty, Status is set to `All`, and Priority is set to `All`.
- [ ] With the initial control values, all existing test cases are visible and the visible case count equals the total number of test cases.
- [ ] Search matches test cases by Test Case ID or title.
- [ ] Search is case-insensitive.
- [ ] Test Case ID search supports both the numeric ID and the displayed formatted ID.
- [ ] For test case `TC-001`, queries including `1`, `001`, `TC-001`, and `tc-001` produce a match.
- [ ] Partial Test Case ID matching uses case-insensitive substring matching against both the numeric ID representation and the displayed formatted ID.
- [ ] Therefore queries such as `0`, `TC-0`, and `01` may match `TC-001` when those characters occur within one of its searchable ID representations.
- [ ] A Status filter is available.
- [ ] The Status filter supports all existing test statuses plus an `All` option.
- [ ] A Priority filter is available.
- [ ] The Priority filter supports all existing priorities plus an `All` option.
- [ ] Status and Priority filters are single-select.
- [ ] Search, Status, and Priority criteria work together.
- [ ] A test case is displayed only when it satisfies all active criteria.
- [ ] Selecting `All` removes that filter constraint.
- [ ] Clearing the search input restores results that satisfy the active filters.
- [ ] The case count displayed above the table reflects the number of currently visible filtered test cases.
- [ ] Existing summary statistics continue to represent the complete test-case dataset rather than only the filtered rows.
- [ ] When no test cases match, an accessible empty-state message is displayed.
- [ ] Selecting `Low` with the existing demo dataset is expected to produce the empty state because the current dataset contains no Low-priority test case.
- [ ] Existing demo test-case data is not modified solely to create filter validation scenarios.

## Validation Notes

Validate:

- initial state with empty search, Status = `All`, Priority = `All`;
- all existing test cases are visible initially;
- search by numeric Test Case ID;
- search by formatted Test Case ID;
- `1`, `001`, `TC-001`, and `tc-001` against `TC-001`;
- substring ID searches such as `0`, `TC-0`, and `01`;
- exact and partial title search;
- case-insensitive search;
- each Status option;
- each Priority option;
- `Low` priority producing the expected empty state with the existing dataset;
- combined search + Status + Priority;
- clearing search;
- selecting `All`;
- visible case count updates with filtering;
- summary statistics remain based on the complete dataset;
- no-results behaviour;
- keyboard accessibility of controls;
- responsive layout.

Run:

- existing automated tests if an applicable test framework is available;
- `npm run lint`;
- `npm run build`;
- Git validation required by the project workflow;
- browser/manual validation.

Do not introduce a new testing framework solely for this feature. If no applicable automated test framework exists, report automated regression coverage as a validation gap.

## Open Questions

None.