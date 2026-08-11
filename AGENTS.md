# QARunBoard — Codex Project Instructions

## Project purpose

This is an educational React and TypeScript project.

The goal is to produce clean, understandable, production-style code while keeping the implementation easy to review and learn from.

## Working rules

- Inspect the existing implementation before making changes.
- Understand the current project structure and conventions before adding new code.
- Make small, focused changes.
- Do not rewrite unrelated code.
- Do not introduce new dependencies unless they are genuinely required.
- Prefer existing project patterns and utilities over creating unnecessary abstractions.
- Preserve existing functionality unless the task explicitly requires changing it.

## React and TypeScript

- Use TypeScript correctly; do not bypass type errors with `any` unless there is a strong reason.
- Keep React components focused and reasonably small.
- Prefer clear names over clever or abbreviated names.
- Keep data structures and component responsibilities explicit.
- Do not suppress TypeScript, ESLint, or build errors just to make validation pass.

## Validation

After implementation, when applicable:

1. Run the relevant tests.
2. Run:

   npm run lint

3. Run:

   npm run build

4. Inspect the resulting errors or warnings.
5. Fix issues caused by the implementation before declaring the task complete.

Never remove or weaken tests merely to make them pass.

## Git safety

- Inspect `git status` before and after significant changes.
- Review `git diff` before considering work complete.
- Do not stage files unless explicitly requested.
- Do not commit unless explicitly requested.
- Do not push to GitHub unless explicitly requested.
- Do not modify unrelated uncommitted user changes.

## Code review

When reviewing code:

- Review the actual diff, not only the final files.
- Look for functional defects, regressions, edge cases, type-safety issues, maintainability problems, and missing validation.
- Distinguish real defects from optional improvements.
- Prioritize findings by severity.
- Do not change code during a review unless explicitly requested.

## Educational workflow

When implementing a meaningful change:

- Briefly explain what was changed.
- Identify the main React or TypeScript concepts involved.
- Point out important design decisions.
- Avoid unnecessary complexity that would make the implementation harder to understand.

## Engineering quality baseline

All implementation and review work must follow established engineering
practices relevant to the existing project.

### General engineering

- Prefer the smallest coherent solution that fully satisfies the requirement.
- Follow existing project conventions before introducing new patterns.
- Avoid unnecessary abstractions and premature generalization.
- Keep responsibilities clear and code easy to understand and maintain.
- Avoid duplicated business logic when an existing reusable solution is appropriate.
- Do not refactor unrelated code as part of a focused task.
- Do not introduce new dependencies unless they provide clear value and are genuinely required.

### React

- Keep components and Hooks predictable and free of render-time side effects.
- Keep state minimal and place it at the appropriate level.
- Do not introduce state for values that can be derived safely from existing data or props.
- Keep components focused on clear responsibilities.
- Preserve stable and meaningful keys when rendering collections.
- Prefer existing component patterns before introducing new architectural patterns.

### TypeScript

- Respect the project's existing TypeScript configuration.
- Do not weaken TypeScript compiler settings to make code pass.
- Prefer explicit, meaningful types at component and data boundaries.
- Avoid `any` unless there is a specific, documented justification.
- Do not use `@ts-ignore` or equivalent suppression merely to bypass a type error.
- Model nullable, optional, and finite-value states explicitly where relevant.

### Accessibility

For user-facing UI changes:

- prefer semantic HTML elements;
- ensure interactive controls have accessible names;
- preserve keyboard usability;
- associate labels or instructions with form controls when applicable;
- do not use visual styling as the only way to communicate meaning.

### Testing

When behaviour changes and an applicable test framework already exists:

- add or update tests for meaningful behaviour and edge cases;
- prefer tests that verify externally observable behaviour rather than implementation details;
- do not weaken, delete, or bypass tests merely to obtain a passing result.

Do not introduce a new testing framework solely to satisfy this rule unless explicitly requested.

### Quality gates

Treat validation failures as engineering signals rather than obstacles to bypass.

When applicable, successful completion requires:

- relevant automated tests;
- lint;
- TypeScript/build validation;
- inspection of the actual git diff.

A task is not complete merely because the application compiles.

## Agent orchestration

For meaningful implementation tasks, use the project subagents as follows.

### Implementation workflow

1. Delegate implementation to `code_writer`.
2. Allow `code_writer` to inspect the relevant existing code before making changes.
3. After implementation and validation are complete, delegate an independent review to `code_reviewer`.
4. `code_reviewer` must review the actual git diff and relevant surrounding code.
5. Do not ask `code_reviewer` to modify the implementation.

### Review findings

If `code_reviewer` reports a Critical, High, or Medium defect:

1. Return the finding to `code_writer`.
2. Ask `code_writer` to make the smallest appropriate correction.
3. Run the relevant validation again.
4. Delegate another independent review to `code_reviewer`.

Repeat this cycle until no Critical, High, or Medium defects remain.

Low-severity findings may be reported without automatically changing the code unless they represent a clear defect.

### Final response

Before reporting that implementation is complete:

- confirm that relevant validation has passed;
- confirm that an independent review was completed;
- summarize the files changed;
- summarize the validation performed;
- report any remaining Low findings, assumptions, or residual risks.

Do not stage, commit, or push changes unless explicitly requested by the user.