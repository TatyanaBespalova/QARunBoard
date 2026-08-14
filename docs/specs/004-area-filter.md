# Feature Specification — Filter Test Cases by Area

## Goal

Allow a QA user to focus the Test Case table on test cases from a specific functional area, such as Authentication, Cart, or Checkout.

## Context

QARunBoard currently keeps the active test cases in canonical React state and provides client-side Search, Status, and Priority filters. The filters combine with AND semantics, the visible case count reflects the filtered rows, and summary cards continue to represent the full current test-case dataset.

Each test case already has an `area` value. This feature adds Area as another filter criterion without changing the demo data, status-editing behaviour, or existing table presentation.

## Constraints

- Add an accessible single-select Area filter alongside Search, Status, and Priority.
- Use `All Areas` as the default and filter-clearing option.
- Derive available Area options from the current canonical `testCases` data rather than maintaining a separate hard-coded list.
- Generate each Area option once. Preserve deterministic first-occurrence order from the current test-case data; with the existing demo data this is Authentication, Cart, then Checkout.
- Preserve `testCases` as the canonical source of truth and treat `demoTestCases` as immutable seed data.
- Keep available Area options and visible rows as derived values; do not store duplicated synchronized copies in React state.
- Do not use `useEffect` to derive options, synchronize filters, or calculate filtered rows.
- Preserve the existing Search, Status, Priority, status-editing, summary-card, visible-count, empty-state, and reload behaviours.
- Preserve the existing demo data and the final approved Test Case table presentation.
- Preserve accessibility, keyboard operation, focus-visible behaviour, responsive layout, and contained table scrolling.
- Reuse existing React, TypeScript, CSS, and Playwright patterns where appropriate.
- Do not weaken TypeScript safety or use `any`, unchecked assertions, or error suppression to bypass modelling problems.
- Do not add persistence, a backend, API calls, `localStorage`, global state management, new dependencies, or unrelated abstractions.
- Do not redesign the application or refactor unrelated code.

## Acceptance Criteria

### Area control and options

- [ ] An Area single-select filter is displayed alongside the existing Search, Status, and Priority controls.
- [ ] The control has a programmatically associated visible label of `Area` and remains keyboard operable.
- [ ] The default selected option is `All Areas`.
- [ ] `All Areas` is a filter-only value and is not added to any test-case data.
- [ ] Available Area options are derived from the `area` values in the current canonical `testCases` data.
- [ ] Duplicate area values produce one option each.
- [ ] Area options preserve first-occurrence order from `testCases`.
- [ ] With the existing demo data, the options after `All Areas` are Authentication, Cart, and Checkout.
- [ ] Existing demo test-case data is not changed to implement or validate the filter.

### Filtering behaviour

- [ ] With `All Areas` selected, Area places no additional constraint on visible rows.
- [ ] Selecting a specific Area displays only test cases whose `area` exactly matches the selected value.
- [ ] Area combines with Search, Status, and Priority using AND semantics.
- [ ] A row is visible only when it satisfies every active criterion.
- [ ] Existing Search matching, including numeric and formatted ID matching and case-insensitive title matching, remains unchanged.
- [ ] Existing Status and Priority filter options and matching behaviour remain unchanged.
- [ ] Clearing Search or selecting the clearing option for any filter restores only rows that satisfy the remaining active criteria.
- [ ] The visible case count reflects the rows remaining after all active criteria, including Area, are applied.
- [ ] When no rows match the combined criteria, the existing accessible empty-state message is displayed.
- [ ] Summary cards continue to derive from the complete current `testCases` dataset and do not change merely because a filter changes.

### Status editing and reload behaviour

- [ ] Row Status controls continue to support the existing `TestStatus` values and update the canonical test-case state immediately.
- [ ] With only an Area filter active, changing a matching row's Status does not remove it because its Area has not changed.
- [ ] When Area and Status filters are both active, changing a row so that its Status no longer matches removes it from the visible results while leaving the Area selection unchanged.
- [ ] A status change updates summary cards from the complete canonical dataset even when Area or other filters hide the edited row.
- [ ] Search, Area, Status, and Priority predicates re-evaluate against the updated canonical dataset after a status change.
- [ ] Reloading restores the unchanged demo statuses and the default filter state: empty Search, `All Areas`, Status `All`, and Priority `All`.

### Scope, accessibility, and presentation

- [ ] No persistence, backend, API integration, `localStorage`, global state library, or new dependency is introduced.
- [ ] No duplicated synchronized state or effect-based filtering is introduced.
- [ ] The Area control follows the existing labelled-control and focus-visible patterns.
- [ ] Search and all four filters remain usable with keyboard input.
- [ ] The controls remain usable at desktop, medium, and narrow/mobile widths without changing the approved table presentation.
- [ ] Existing table semantics, row Status accessible names, native Status control behaviour, and contained horizontal scrolling are preserved.
- [ ] No application functionality outside filtering is changed.

## Technical Approach

Use the smallest extension of the existing derived-filtering flow:

1. Keep the existing `testCases` state in `App` as the canonical current dataset.
2. Add one local Area filter state value initialized to the `All Areas` sentinel. Do not store selected rows or a second copy of test-case data.
3. Derive unique Area options during rendering from `testCases`, using `TestCase['area']` where appropriate. A `Set` or equivalent single-pass derivation may preserve first-occurrence order without a separate hard-coded list.
4. Keep `All Areas` separate from the derived domain values. Do not add it to the `TestCase` type or demo data.
5. Add an Area predicate to the existing `visibleTestCases` derivation. Return a row only when Search, Area, Status, and Priority predicates all match.
6. Continue deriving summary counts from the complete canonical `testCases` state, not `visibleTestCases`.
7. Reuse the existing controlled-select pattern and CSS control layout. Extend the responsive controls layout only as needed to accommodate the fourth criterion without redesigning the section.
8. Keep DOM values type-safe. Do not create an unrelated hard-coded Area union; if narrowing a runtime string is necessary, validate it against `All Areas` and the derived Area options rather than using an unchecked assertion.
9. Do not introduce `useEffect`, memoized synchronized copies, a reducer, context, or a global store for this change.

This approach adds one user-selected criterion while keeping both the option list and filtered rows deterministic derivations of existing state.

## Architectural Trade-offs

- **Derived options on render:** The current dataset is small, and deriving unique strings is inexpensive. Memoization would add complexity without a demonstrated need.
- **First-occurrence ordering:** Preserving source order avoids a second sorting rule and keeps options deterministic. Alphabetical or configurable ordering can be introduced later only if it becomes a product requirement.
- **String-backed Area values:** The existing `TestCase.area` field is a string because areas come from data. A hard-coded Area union would duplicate the dataset and conflict with the requirement that options be data-derived.
- **Local filter state:** Area is presentation state owned by `App`, alongside the existing filters. A global store or shared state layer would not improve the current one-screen flow.
- **Existing control layout:** Adding one control may require a small grid adjustment, but it does not justify redesigning the dashboard or table.

## Product-wide Impact and Regression Risk

- **Search and existing filters:** Adding the Area predicate could accidentally change existing matching or clearing behaviour. Preserve each existing predicate and extend their final AND combination.
- **Status changes:** Filters must evaluate the updated canonical data, and status changes must continue updating summaries and row visibility correctly while Area remains selected.
- **Summary cards:** Using filtered rows for summaries would be a regression. Counts must continue to use complete current state.
- **Visible count and empty state:** Both must reflect the final combined result, including after a status change removes the last matching row.
- **Option derivation:** A hard-coded list or non-unique output would create drift from current data. Derive unique options from canonical state.
- **TypeScript:** Runtime select values must not be hidden behind unsafe casts or a duplicated closed Area type.
- **Accessibility:** The fourth control requires a visible associated label, native keyboard operation, and preserved focus indication. Locators must remain unambiguous between the Area filter and the Area table column.
- **Responsive layout:** Four criteria may require different grid wrapping at medium and narrow widths. Preserve readable labels, usable control widths, and the existing contained table overflow.
- **Table presentation:** Filtering must not alter the approved Test Case capsule, Priority, Status, row alignment, or column sizing styles.

## Validation Notes

### Automated validation

Update Playwright coverage using accessible user-facing locators and web-first assertions. Do not use arbitrary sleeps or fixed waits.

Cover:

- initial load with Search empty, Area = `All Areas`, Status = `All`, and Priority = `All`;
- the Area control and its unique options: `All Areas`, Authentication, Cart, and Checkout;
- selecting each available Area and verifying that only matching rows remain;
- selecting `All Areas` and verifying that the Area constraint is removed;
- Area combined with Search;
- Area combined with Status;
- Area combined with Priority;
- Search + Area + Status + Priority together;
- a combined selection that produces the existing empty state and a visible count of zero;
- existing Search, Status, and Priority behaviour continuing to work;
- summary cards remaining based on the complete canonical dataset while Area is active;
- changing a row Status while only Area is active and verifying that the row remains visible;
- changing a row Status while Area and Status are active and verifying row removal, visible-count updates, empty-state behaviour when applicable, and correct summary recalculation;
- clearing or changing filters and verifying the edited row reappears with its updated Status;
- reloading and verifying unchanged demo statuses plus all default filter values.

Run:

- `npm run lint`;
- `npm run build`;
- `npm run test:e2e`;
- `git diff --check`.

### Manual/browser validation

Validate:

- mouse and keyboard operation of Search and all four filters;
- visible labels, focus indication, and unambiguous Area and Status controls;
- each Area option and representative two-, three-, and four-criterion combinations;
- visible-count, empty-state, summary-card, status-change, and reload behaviour;
- desktop and narrow/mobile layouts, including control wrapping and contained table scrolling;
- preservation of the final approved table presentation.

Applicable browser/manual validation is required before implementation can be reported as fully satisfying Definition of Done. If it cannot be performed, report the outstanding checks as a blocking validation gap while allowing implementation and independent review to complete.

## Open Questions

None.
