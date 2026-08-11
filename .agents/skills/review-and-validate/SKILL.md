---
name: review-and-validate
description: Independently review and validate existing QARunBoard React or TypeScript changes without implementing them. Use when asked to review code, inspect current changes, assess a diff, identify defects, or validate an existing implementation.
---

# Review and Validate

Use this workflow to independently review existing implementation changes.

Do not implement new functionality or fix the reviewed code as part of this workflow.

## 1. Establish the review scope

Before review:

- inspect `git status`;
- inspect the actual `git diff`;
- identify changed and newly added files;
- identify existing user changes that must be preserved;
- inspect the surrounding code necessary to understand the implementation;
- understand the requested or intended behaviour where it can be determined.

## 2. Delegate independent review

Spawn or reactivate the project `code_reviewer` agent.

The `code_reviewer` must perform the actual review.

The reviewer must:

- inspect the actual `git diff`;
- inspect relevant surrounding implementation;
- inspect relevant types and data flow;
- evaluate behaviour affected by the changes;
- evaluate the implementation against the Engineering quality baseline defined in `AGENTS.md`;
- remain independent from the implementation process;
- not modify application files.

## 3. Review criteria

Evaluate both functional correctness and engineering quality.

### Functional correctness

Check for:

- incorrect behaviour;
- regressions;
- missing requirements;
- incorrect assumptions;
- meaningful edge cases;
- incorrect handling of empty, invalid, unexpected, or boundary data.

### React

When relevant, check for:

- render-time side effects;
- unnecessary or duplicated state;
- incorrect state ownership;
- stale or inconsistent derived values;
- unstable or incorrect list keys;
- incorrect Hook usage;
- unnecessary component complexity;
- behaviour inconsistent with existing project patterns.

### TypeScript

Check for:

- unsafe or inaccurate types;
- unjustified use of `any`;
- suppressed type errors;
- incorrect optional or nullable handling;
- unsafe assertions or casts that hide a modelling problem;
- weakening of existing type safety.

### Accessibility

For relevant user-facing UI changes, check:

- semantic HTML;
- accessible names for interactive controls;
- associated labels or instructions where required;
- keyboard usability;
- whether information relies only on visual styling, colour, or position.

### Testing and validation

Check whether:

- relevant automated tests exist and pass;
- changed behaviour has appropriate regression coverage when an applicable test framework exists;
- tests focus on meaningful observable behaviour;
- lint validation was performed;
- TypeScript/build validation was performed;
- validation failures were bypassed, suppressed, or ignored.

Do not require introduction of a new testing framework solely for the purpose of this review unless explicitly requested.

### Maintainability

Report maintainability problems only when they create a concrete engineering risk.

Check for:

- unnecessary duplication;
- unnecessary abstraction;
- excessive coupling;
- unclear responsibilities;
- avoidable complexity;
- unrelated refactoring;
- changes inconsistent with established project conventions;
- unnecessary new dependencies.

Do not treat subjective style preferences as defects.

## 4. Severity

Classify findings as:

- Critical
- High
- Medium
- Low

For every finding provide:

- severity;
- file and location when possible;
- what is wrong;
- why it matters;
- expected correction.

Distinguish genuine defects from optional improvements.

## 5. Validation assessment

Summarize the validation evidence available, including when relevant:

- automated tests;
- lint;
- TypeScript checks;
- build;
- manual verification;
- `git diff` inspection.

Clearly identify:

- validation that was not performed;
- behaviour that remains untested;
- assumptions;
- residual risks.

A successful build alone is not sufficient evidence that the implementation is correct.

## 6. Report

Return:

1. findings ordered by severity;
2. validation evidence reviewed;
3. validation gaps;
4. assumptions;
5. residual risks.

If no significant defect is found, explicitly state:

"No significant issues found."

Do not modify, create, delete, stage, commit, or push application changes.