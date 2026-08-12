---
name: implement-feature
description: Implement a focused React or TypeScript feature or code change in QARunBoard. Use when asked to add, change, fix, or refactor application functionality.
---

# Implement Feature

Use the project `code_writer` subagent for the actual implementation.

## 1. Inspect and define the task

Before delegation:

- inspect the relevant existing code;
- understand the requested behaviour;
- use `git status --short` to identify tracked, staged, and untracked files;
- identify existing user changes that must not be overwritten;
- determine the smallest coherent scope of implementation.

If the task is materially ambiguous, do not invent missing requirements. Follow the clarification rules defined in the applicable `AGENTS.md`.

When a feature specification is provided:

- treat the specification as the primary source for intended product behaviour;
- verify that Goal, Context, Constraints, and Acceptance Criteria are sufficiently clear before implementation;
- do not silently expand or reinterpret the acceptance criteria;
- resolve material Open Questions before implementation.

For planned product features, prefer a feature specification based on `docs/specs/FEATURE_SPEC_TEMPLATE.md`.

## 2. Delegate implementation

Spawn or reactivate the project `code_writer` agent.

Give `code_writer`:

- the requested behaviour;
- the relevant files or components;
- any constraints discovered during inspection;
- explicit instruction not to modify unrelated files.

The `code_writer` must perform the actual application-code changes.

During implementation, the `code_writer` must follow the Engineering quality baseline defined in `AGENTS.md`.

In particular:

- follow existing project conventions before introducing new patterns;
- prefer the smallest coherent solution;
- avoid unnecessary abstraction and unrelated refactoring;
- keep React components and Hooks predictable;
- avoid unnecessary React state;
- preserve TypeScript type safety;
- consider meaningful empty, error, boundary, and unexpected-data cases;
- preserve accessibility for user-facing UI changes;
- avoid introducing dependencies unless they are genuinely required.

## 3. Validate

Require `code_writer` to run, when applicable:

- relevant automated tests;
- `npm run lint`;
- `npm run build`;
- `git diff --check`;
- `git diff --cached --check` when staged changes exist;
- inspection of tracked staged and unstaged changes against `HEAD` with `git diff HEAD`;
- direct inspection of relevant untracked files.

If application behaviour changed and an applicable test framework already exists, add or update behaviour-focused tests when they provide meaningful regression protection.

For user-facing UI changes:

- perform relevant browser or manual validation of the affected behaviour before reporting the task as fully complete;
- include responsive, interaction, accessibility, or state checks where relevant to the change;
- if required browser or manual validation cannot be performed, report it explicitly as a blocking validation gap, do not claim that the task fully satisfies the Definition of Done, and clearly state what validation remains outstanding; implementation and independent review may still be completed.

Failures introduced by the implementation must be corrected before the implementation is considered complete.

### Engineering quality checks

During validation, verify that the implementation follows the Engineering quality baseline from `AGENTS.md`.

Confirm that:

- the implementation follows existing project conventions;
- the solution is the smallest coherent change;
- no unnecessary abstraction or unrelated refactoring was introduced;
- React components and Hooks remain predictable;
- no unnecessary React state was introduced;
- TypeScript type safety is preserved;
- meaningful empty, error, boundary, and unexpected-data cases were considered;
- accessibility is preserved for relevant user-facing changes;
- relevant security requirements from `AGENTS.md` are preserved;
- no unnecessary dependencies were introduced;
- validation failures were not bypassed or suppressed.

Do not:

- weaken validation configuration merely to make the implementation pass;
- suppress TypeScript or lint errors merely to obtain a successful result;
- remove or weaken tests merely to obtain a passing result;
- weaken security controls merely to eliminate warnings or validation failures.

## 4. Inspect the result

After `code_writer` finishes:

- use `git status --short` to identify tracked, staged, and untracked files;
- inspect tracked staged and unstaged changes against `HEAD` with `git diff HEAD`;
- inspect relevant untracked files directly;
- verify that only intended files changed;
- verify that the requested behaviour was implemented;
- verify that no debugging or temporary code remains;
- preserve unrelated user changes.

## 5. Independent review

After implementation and available validation, delegate review to the project `code_reviewer` agent. A blocking browser or manual validation gap does not prevent the review.

The reviewer must:

- use `git status --short` to identify tracked, staged, and untracked files;
- inspect tracked staged and unstaged changes against `HEAD` with `git diff HEAD`;
- inspect relevant untracked files directly;
- inspect relevant surrounding code;
- evaluate the implementation against the Engineering quality baseline in `AGENTS.md`;
- identify functional defects, regressions, edge cases, type-safety issues, accessibility issues, security issues where relevant, maintainability risks, and validation gaps;
- distinguish genuine defects from validation gaps, unresolved questions, and optional improvements;
- not modify application files.

If the reviewer reports a Critical, High, or Medium defect:

1. return the finding to `code_writer`;
2. ask for the smallest appropriate correction;
3. repeat validation;
4. run `code_reviewer` again.

Repeat until no Critical, High, or Medium findings remain.

## 6. Report

Return:

1. what changed;
2. files changed;
3. validation performed;
4. validation results;
5. browser or manual validation performed, when applicable;
6. independent review result;
7. remaining Low findings, validation gaps, unresolved questions, or residual risks.

Do not stage, commit, or push unless explicitly requested.
