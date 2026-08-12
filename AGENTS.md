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
- If implementation reveals a material ambiguity in product behaviour, scope, data, acceptance criteria, architecture, security, dependencies, or an irreversible action, stop and request clarification rather than choosing a requirement.

## React and TypeScript

- Use TypeScript correctly; do not bypass type errors with `any` unless there is a specific, documented justification.
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

- Use `git status --short` before and after significant changes to identify tracked, staged, and untracked files.
- Inspect tracked staged and unstaged changes against `HEAD` with `git diff HEAD` before considering work complete.
- Inspect relevant untracked files directly; they are not included in `git diff HEAD`.
- Run `git diff --check` and, when staged changes exist, `git diff --cached --check`.
- Do not stage files unless explicitly requested.
- Do not commit unless explicitly requested.
- Do not push to GitHub unless explicitly requested.
- Do not modify unrelated uncommitted user changes.

## Code review

When reviewing code:

- Use `git status --short` to establish the complete change scope, review tracked staged and unstaged changes with `git diff HEAD`, and inspect relevant untracked files directly.
- Look for functional defects, regressions, edge cases, type-safety issues, maintainability problems, missing validation, and relevant security risks.
- Distinguish real defects from optional improvements.
- Base findings on concrete evidence from the diff, surrounding code, observable behaviour, or validation results.
- When possible, identify the affected file or behaviour and a concrete reproduction scenario.
- Do not report a hypothetical concern as a defect without sufficient evidence.
- If expected behaviour cannot be established from requirements, code, or documented project decisions, report this as a validation gap or unresolved question rather than inventing the expected behaviour.
- Prioritize findings by severity.
- Do not change code during a review unless explicitly requested.

## Educational workflow

When implementing a meaningful change:

- Briefly explain what was changed.
- Identify the main React or TypeScript concepts involved.
- Point out important design decisions.
- Avoid unnecessary complexity that would make the implementation harder to understand.

## Engineering quality baseline

All implementation and review work must follow established engineering practices relevant to the existing project.

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
- Do not use Effects to derive values that can be calculated during rendering.
- Do not use Effects for ordinary user-event logic when the logic belongs in an event handler.
- Keep components focused on clear responsibilities.
- Preserve stable and meaningful keys when rendering collections.
- Prefer existing component patterns before introducing new architectural patterns.
- Preserve React StrictMode unless there is an explicit, justified reason to change it.

### TypeScript

- Respect the project's existing TypeScript configuration.
- Do not weaken TypeScript compiler settings to make code pass.
- Prefer explicit, meaningful types at component and data boundaries.
- Avoid `any` unless there is a specific, documented justification.
- Do not use `@ts-ignore` or equivalent suppression merely to bypass a type error.
- Model nullable, optional, and finite-value states explicitly where relevant.
- Treat external or unknown data as untrusted until it has been appropriately narrowed or validated.
- Prefer discriminated unions and exhaustive handling when modelling finite application states where they improve correctness and clarity.
- Avoid unsafe casts that hide modelling or validation problems.

### Accessibility

For user-facing UI changes:

- Prefer semantic HTML elements.
- Ensure interactive controls have accessible names.
- Preserve keyboard usability.
- Associate labels or instructions with form controls when applicable.
- Do not use visual styling as the only way to communicate meaning.

### Security

For application and dependency changes:

- Do not place secrets, credentials, private tokens, or sensitive values in client-exposed environment variables or application code.
- Treat `VITE_*` environment variables as client-visible.
- Avoid `dangerouslySetInnerHTML` unless it is genuinely required and the content is appropriately sanitised.
- Do not weaken browser security controls such as Content Security Policy merely to silence warnings.
- Consider the security and maintenance impact before introducing or upgrading dependencies.

### Testing

When behaviour changes and an applicable test framework already exists:

- Add or update tests for meaningful behaviour and edge cases.
- Prefer tests that verify externally observable behaviour rather than implementation details.
- Do not weaken, delete, or bypass tests merely to obtain a passing result.

Do not introduce a new testing framework solely to satisfy this rule unless explicitly requested.

### Quality gates

Treat validation failures as engineering signals rather than obstacles to bypass.

When applicable, successful completion requires:

- relevant automated tests;
- lint;
- TypeScript/build validation;
- inspection of tracked staged and unstaged changes against `HEAD` and relevant untracked files.

A task is not complete merely because the application compiles.

### Definition of Done

A meaningful implementation is complete only when, where applicable:

- the requested behaviour and acceptance criteria are satisfied;
- relevant automated tests pass;
- lint passes;
- TypeScript/build validation passes;
- tracked staged and unstaged changes against `HEAD` and relevant untracked files have been inspected;
- user-facing UI changes have been manually or browser-validated for the affected behaviour;
- no Critical, High, or Medium review findings remain;
- any validation that could not be performed is explicitly reported as a validation gap;
- unresolved questions and residual risks are reported rather than silently assumed away.

For an applicable user-facing UI change, relevant browser or manual validation is required before the task can be reported as fully complete. If it cannot be performed, report it as a blocking validation gap, do not claim that the task fully satisfies this Definition of Done, and clearly state what validation remains outstanding. Implementation and independent review may still be completed.

## Agent orchestration

For meaningful implementation tasks, use the project subagents as follows.

### Implementation workflow

1. Delegate implementation to `code_writer`.
2. Allow `code_writer` to inspect the relevant existing code before making changes.
3. After implementation and available validation are complete, delegate an independent review to `code_reviewer`; a blocking browser or manual validation gap does not prevent the review.
4. `code_reviewer` must use `git status --short`, review tracked staged and unstaged changes with `git diff HEAD`, inspect relevant untracked files directly, and inspect relevant surrounding code.
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
- report any remaining Low findings, validation gaps, unresolved questions, or residual risks.
