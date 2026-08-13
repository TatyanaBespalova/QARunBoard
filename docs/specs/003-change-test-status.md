# Feature Specification — Change Test Status

## Goal

Allow a user to change the Status of an individual test case directly from the Test Case table and immediately see the dashboard reflect that change.

## Context

QARunBoard currently renders a local demo dataset with summary cards and client-side Search, Status, and Priority filtering. Status is displayed as read-only text in each table row, and the imported demo data is used directly to calculate summaries and visible rows.

This feature makes Status editable for the current browser session. It does not add persistence: reloading the application restores the original demo data.

## Constraints

- Preserve the existing Test Case table, initial demo data, Search behaviour, Status filtering, Priority filtering, empty state, and summary-card presentation except where status changes require their displayed values to update.
- Use only the existing `TestStatus` values: `Passed`, `Failed`, `Blocked`, and `Not Run`.
- Use an accessible single-select control for each test case row.
- Apply status changes immediately in React state.
- Keep all test-case data client-side and in memory for the current page session.
- Do not add persistence, a backend, local storage, API calls, or new dependencies.
- Reloading the application must restore the original values from `demoTestCases`.
- Preserve responsive and keyboard-accessible behaviour.
- Do not redesign the application or modify the initial demo dataset.
- Reuse existing React, TypeScript, component, CSS, and Playwright patterns where appropriate.
- Keep the implementation focused; do not refactor unrelated code or introduce speculative abstractions.

## Acceptance Criteria

### Status editing

- [ ] Every visible test case row provides a single-select Status control.
- [ ] Each row control contains exactly the existing `TestStatus` options: `Passed`, `Failed`, `Blocked`, and `Not Run`; it does not include the filter-only `All` value.
- [ ] Each row control initially displays that test case's current status from the demo data.
- [ ] Each row control has an accessible name that identifies both its purpose and the relevant test case, so controls remain distinguishable when multiple rows are present.
- [ ] A user can reach and operate each row Status control with the keyboard.
- [ ] Selecting a different status updates that test case immediately without a page reload or a separate save action.
- [ ] The changed status remains in effect while the current application session remains mounted.
- [ ] Reloading the application restores all statuses to the unchanged initial `demoTestCases` values.

### Dashboard updates

- [ ] After a status change, the affected row immediately displays the newly selected status.
- [ ] The `Total` summary remains equal to the complete number of test cases.
- [ ] The `Passed`, `Failed`, `Blocked`, and `Not Run` summaries are immediately recalculated from the updated complete test-case dataset.
- [ ] A status change decrements the previous status summary and increments the new status summary by one; all unrelated summary values remain correct.
- [ ] The visible case count continues to represent the number of rows that satisfy the active Search, Status, and Priority criteria.

### Filtering and regression behaviour

- [ ] Existing Search behaviour remains unchanged and evaluates the updated canonical test-case dataset.
- [ ] Existing Priority filtering remains unchanged and evaluates the updated canonical test-case dataset.
- [ ] Existing Status filtering evaluates the updated status values.
- [ ] Search, Status, and Priority criteria continue to combine with AND semantics.
- [ ] If an active Status filter is applied and a visible test case is changed to a status that no longer matches, that row immediately disappears from the filtered results.
- [ ] When that disappearance leaves no matching rows, the existing accessible empty-state message is displayed.
- [ ] Clearing or changing the active filters can reveal the updated test case again with its new status selected.
- [ ] Updating one test case does not change any other test case's data or the ordering of the remaining visible rows.

### Scope and presentation

- [ ] No persistence, backend, local storage, API integration, global state library, or new dependency is introduced.
- [ ] The initial demo data file remains unchanged.
- [ ] The existing visual identity and table layout are preserved without a redesign.
- [ ] The table and row Status controls remain usable at desktop, medium, and narrow/mobile widths.
- [ ] Existing labels, focus-visible behaviour, status text, and other accessibility affordances remain available.

## Technical Approach

Use the smallest state change that fits the current architecture:

1. In `App`, create one canonical `TestCase[]` React state value initialized from `demoTestCases`. Treat `demoTestCases` as immutable seed data; do not mutate the imported array or its objects.
2. Calculate `Total`, per-status summary counts, and filtered rows from the canonical test-case state during rendering. Do not store those derived values in separately synchronized state.
3. Add a typed status-change event handler at the state-owning level. It should identify a test case by its stable `id` and immutably replace only that test case with a copy containing the new `TestStatus`.
4. Preserve the existing `App` and `TestCaseTable` responsibilities. Pass the updated rows and a typed status-change callback to `TestCaseTable`; render the row-level accessible single-select control in the existing Status column.
5. Reuse the existing `TestStatus` type and a single shared list of supported status values where practical, rather than duplicating incompatible string unions. Values read from a DOM control are runtime strings and must be safely narrowed or validated before being used as `TestStatus`; do not use `any` or an unchecked assertion merely to satisfy TypeScript.
6. Keep Search, Status, and Priority controls as their existing local UI state. Apply their existing predicates to the canonical test-case state so a status update naturally changes filtered results.
7. Do not use `useEffect` to synchronize summaries, filtered rows, or duplicated test-case state. These values are deterministic derivations and belong in render-time calculations.

This direction preserves a single source of truth, immutable React updates, existing component boundaries, and current TypeScript safety without adding global state or architectural layers.

## Architectural Trade-offs

### Approaches intentionally not introduced

- **Global state management:** The status-editing state is consumed by `App`, summary cards, filtering logic, and the directly nested table. Lifting state to `App` is sufficient at the current scale. A global store could become appropriate if multiple distant routes or independently mounted features need to read and update the same test-run state.
- **Persistence or API layer:** The product requirement explicitly defines session-only changes and reset-on-reload behaviour. Persistence would add unsupported data ownership, loading, error, conflict, and security requirements. It may become appropriate when saved test runs, multi-user access, or server-owned data are required.
- **`localStorage`:** Browser persistence would contradict reset-on-reload behaviour and introduce versioning and validation concerns. It may be reconsidered only if offline persistence becomes an explicit product requirement.
- **State-synchronization effects:** Summary counts and filtered rows can be calculated from canonical state and filter inputs. Effects would create duplicated state and synchronization risk. Effects may be justified later for genuine external synchronization, such as writing confirmed changes to an API.
- **Additional abstraction layers:** A reducer, custom store, service layer, or generic table-editing framework would add indirection without solving a current requirement. Such abstractions may be warranted if editing expands to several fields, supports undo/bulk actions, or develops complex transition rules.
- **Broader component restructuring:** The existing `App`/`TestCaseTable` boundary supports state ownership and row rendering with a typed callback. Splitting row or control components should occur only if implementation complexity or reuse provides a concrete reason.

### Chosen trade-off

Keeping the canonical array in `App` increases the amount of state-aware logic in that component, but it is the least-coupled change for the present application. It avoids prop drilling beyond one component boundary and keeps summaries, filters, and edits consistent by construction.

## Product-wide Impact and Regression Risk

- **Summary cards:** They currently derive from imported demo data. They must instead derive from canonical state or they will become stale after edits. Regression risk is incorrect increments/decrements or an accidentally filtered total.
- **Search:** Search fields (`id` and `title`) do not change, but search must operate on canonical state. Regression risk is accidentally continuing to filter the imported seed array and therefore showing stale status values.
- **Status filtering:** This is the highest interaction risk. A changed row may cease to match and disappear immediately; this is required behaviour, not data loss. The visible count and empty state must update in the same render.
- **Priority filtering:** Priority values do not change, but the predicate must remain combined with Search and Status against canonical state.
- **Empty state:** It must still appear whenever the updated data and active filters yield no rows, including when the last matching row changes status.
- **Accessibility:** Repeated Status controls require unique, descriptive accessible names associated with their rows. Native single-select keyboard behaviour and visible focus indication must be preserved. Status must continue to be conveyed as text, not colour alone.
- **Responsive behaviour:** Adding controls inside the Status column may change table width and horizontal scrolling. Validate the existing contained table scrolling and control usability at all supported widths without redesigning the page.
- **Existing Playwright coverage:** The current Search and Filter journey must continue to pass. It verifies initial rows, filtering, combined criteria, empty state, and full-dataset summary totals; its locators must remain unambiguous after row-level Status controls are introduced.

## Validation Notes

### Automated validation

Extend Playwright coverage with a focused user journey that:

- loads the unchanged initial demo statuses;
- changes a test case from its initial status to each supported `TestStatus` value, using valid user interactions;
- verifies the selected row updates immediately;
- verifies correct recalculation of `Passed`, `Failed`, `Blocked`, and `Not Run` summary cards after changes;
- verifies `Total` remains unchanged;
- applies an active Status filter, changes a matching row so it no longer matches, and verifies the row immediately disappears;
- verifies the visible count and accessible empty state when the final matching row disappears;
- clears or changes filters and verifies the edited row reappears with its updated status;
- verifies status editing while Search and Priority criteria are active;
- preserves and reruns the existing Search and Filter coverage.

Playwright tests should prefer accessible user-facing locators such as `getByRole` and `getByLabel`, use web-first assertions, and must not use arbitrary sleeps or fixed waits.

Run:

- `npm run test:e2e`;
- `npm run lint`;
- `npm run build`;
- Git validation required by the project workflow.

### Manual/browser validation

Validate in the browser:

- changing a representative row to every supported status;
- immediate row text/control updates;
- summary-card recalculation after each change;
- active Status filter removal behaviour;
- Search and Priority interactions before and after edits;
- visible count and empty state;
- reload restoring the initial demo statuses;
- keyboard navigation, accessible names, selection, and focus visibility for row controls;
- desktop, medium-width, and narrow/mobile layouts, including contained table scrolling.

Applicable browser/manual validation is required before implementation can be reported as fully satisfying Definition of Done. If it cannot be performed, report the outstanding checks as a blocking validation gap while allowing implementation and independent review to complete.

## Open Questions

None.
