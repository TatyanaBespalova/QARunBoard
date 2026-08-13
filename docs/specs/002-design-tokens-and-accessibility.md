# Feature Specification — Design Tokens and Accessibility Polish

## Goal

Introduce a lightweight design-token layer for QARunBoard and apply a small accessibility-focused UI polish without changing the product's visual identity or behaviour.

## Context

QARunBoard currently uses repeated raw CSS values for colours, spacing, border radii, and shadows across the application.

The application already has responsive layouts, visible focus styles, labelled controls, status badges, and accessible empty-state behaviour.

This change should improve CSS consistency, maintainability, and presentation quality while preserving the existing UI.

## Constraints

- Do not redesign the application.
- Preserve the existing visual appearance as closely as practical.
- Do not change application functionality or data behaviour.
- Do not introduce new dependencies.
- Do not create a full design system or component library.
- Use CSS custom properties for reusable design values.
- Only create tokens for values that are genuinely reusable across the current application.
- Do not convert layout-specific values such as container widths, table widths, control minimum heights, or breakpoints into design tokens solely for consistency.
- Preserve existing responsive behaviour.
- Preserve existing keyboard accessibility.
- Do not modify unrelated application code.

## Acceptance Criteria

### Design tokens

- [ ] A lightweight token layer is defined using CSS custom properties.
- [ ] Reusable surface, text, accent, border, spacing, radius, and shadow values are represented by clearly named tokens where appropriate.
- [ ] Existing repeated raw CSS values are replaced with those tokens where their meaning is shared.
- [ ] Layout-specific values remain local where they represent a specific component or responsive requirement.
- [ ] The token layer remains small and understandable rather than attempting to model every CSS value.
- [ ] Existing visual appearance is preserved without intentional redesign.

### Accessibility and UI polish

- [ ] Existing focus-visible behaviour for interactive controls is preserved or improved.
- [ ] Focus styling uses the shared visual token layer where appropriate.
- [ ] Search, Status, and Priority controls remain programmatically associated with visible labels.
- [ ] Interactive controls remain keyboard accessible.
- [ ] Status and priority information continues to be communicated by text as well as colour.
- [ ] Existing empty-state messaging remains accessible.
- [ ] Existing responsive layouts remain usable on desktop, medium, and narrow widths.
- [ ] Unnecessary `!important` usage is removed where it can be removed without changing the intended appearance or creating broader CSS specificity changes.

## Validation Notes

Validate:

- application appearance before and after the change;
- header and section panel styling;
- statistic card styling;
- Search, Status, and Priority controls;
- focus-visible behaviour;
- table borders and typography;
- status and priority badges;
- empty state;
- desktop layout;
- medium-width layout;
- narrow/mobile layout;
- keyboard navigation through interactive controls;
- visible labels remain associated with their controls.

Run:

- existing automated tests if an applicable framework is available;
- `npm run lint`;
- `npm run build`;
- Git validation required by the project workflow;
- browser/manual validation.

Do not introduce a new testing framework solely for this change. If no applicable automated test framework exists, report automated regression coverage as a validation gap.

## Open Questions

None.