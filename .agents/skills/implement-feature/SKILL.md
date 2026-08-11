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
- check the current git status;
- identify existing user changes that must not be overwritten;
- determine the smallest coherent scope of implementation.

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
- `git diff`.

If application behaviour changed and an applicable test framework already exists, add or update behaviour-focused tests when they provide meaningful regression protection.

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
- no unnecessary dependencies were introduced;
- validation failures were not bypassed or suppressed.

Do not:

- weaken validation configuration merely to make the implementation pass;
- suppress TypeScript or lint errors merely to obtain a successful result;
- remove or weaken tests merely to obtain a passing result.

## 4. Inspect the result

After `code_writer` finishes:

- inspect the resulting `git diff`;
- verify that only intended files changed;
- verify that the requested behaviour was implemented;
- verify that no debugging or temporary code remains;
- preserve unrelated user changes.

## 5. Independent review

After implementation and validation, delegate review to the project `code_reviewer` agent.

The reviewer must:

- inspect the actual `git diff`;
- inspect relevant surrounding code;
- evaluate the implementation against the Engineering quality baseline in `AGENTS.md`;
- identify functional defects, regressions, edge cases, type-safety issues, accessibility issues where relevant, maintainability risks, and validation gaps;
- distinguish genuine defects from optional improvements;
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
5. independent review result;
6. remaining Low findings, assumptions, validation gaps, or residual risks.

Do not stage, commit, or push unless explicitly requested.