---
name: review-and-validate
description: Independently review and validate existing React or TypeScript changes in QARunBoard. Use when asked to review code, assess a diff, find defects, or validate an implementation.
---

# Review and Validate

Use this workflow to independently review existing implementation changes.

Do not implement new functionality or fix the reviewed code as part of this workflow.

## 1. Establish the review scope

Before review:

- use `git status --short` to identify tracked, staged, and untracked files;
- inspect tracked staged and unstaged changes against `HEAD` with `git diff HEAD`;
- inspect relevant untracked files directly;
- run `git diff --check` and, when staged changes exist, `git diff --cached --check`;
- identify existing user changes that must be preserved;
- inspect the surrounding code necessary to understand the implementation;
- understand the requested or intended behaviour where it can be determined.

If expected behaviour cannot be established from the task, documented requirements, applicable `AGENTS.md`, existing code, or previous explicit project decisions, treat this as a validation gap or unresolved question rather than inventing the expected behaviour.

## 2. Delegate independent review

Spawn or reactivate the project `code_reviewer` agent.

The `code_reviewer` must perform the actual review.

The reviewer must:

- use `git status --short` to identify tracked, staged, and untracked files;
- inspect tracked staged and unstaged changes against `HEAD` with `git diff HEAD`;
- inspect relevant untracked files directly;
- inspect relevant surrounding implementation;
- inspect relevant types and data flow;
- evaluate behaviour affected by the changes;
- evaluate the implementation against the Engineering quality baseline defined in `AGENTS.md`;
- remain independent from the implementation process;
- not modify application files.

## 3. Review criteria

Evaluate both functional correctness and engineering quality.

Base defect findings on concrete evidence from the diff, surrounding code, observable behaviour, validation results, or documented requirements.

Do not report hypothetical concerns as defects without sufficient evidence.

When possible, identify a concrete reproduction scenario or triggering condition.

### Functional correctness

Check for:

- incorrect behaviour;
- regressions;
- unmet documented requirements;
- incorrect handling of meaningful edge cases;
- incorrect handling of empty, invalid, unexpected, or boundary data.

Do not infer undocumented requirements merely to create a finding.

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

### Security

When relevant, check for:

- secrets, credentials, tokens, or sensitive values exposed in client code;
- unsafe handling of external or unknown data;
- unsafe HTML rendering;
- weakened browser security controls;
- dependency changes that introduce concrete security or maintenance risk.

### Testing and validation

Check whether:

- relevant automated tests exist and pass;
- changed behaviour has appropriate regression coverage when an applicable test framework exists;
- tests focus on meaningful observable behaviour;
- lint validation was performed;
- TypeScript/build validation was performed;
- relevant browser or manual validation was performed for user-facing behaviour;
- `git diff --check` was performed;
- `git diff --cached --check` was performed when staged changes exist;
- validation failures were bypassed, suppressed, or ignored.

Do not require introduction of a new testing framework solely for the purpose of this review unless explicitly requested.

For an applicable user-facing UI change, missing relevant browser or manual validation is a blocking validation gap: the task must not be reported as fully satisfying the Definition of Done. Implementation and independent review may still be completed, but the outstanding validation must be stated clearly.

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

## 4. Findings and severity

Distinguish:

- genuine defects;
- validation gaps;
- unresolved questions;
- optional improvements.

Classify genuine defects as:

- Critical
- High
- Medium
- Low

For every defect finding provide:

- severity;
- file and location when possible;
- affected behaviour;
- what is wrong;
- why it matters;
- reproduction scenario or triggering condition when possible;
- expected correction.

## 5. Validation assessment

Summarize the validation evidence available, including when relevant:

- automated tests;
- lint;
- TypeScript checks;
- build;
- browser or manual verification;
- `git diff --check`;
- inspection of tracked staged and unstaged changes against `HEAD`;
- direct inspection of relevant untracked files.

Clearly identify:

- validation that was not performed;
- behaviour that remains untested;
- unresolved questions;
- residual risks.

A successful build alone is not sufficient evidence that the implementation is correct.

## 6. Report

Return:

1. findings ordered by severity;
2. validation evidence reviewed;
3. validation gaps;
4. unresolved questions;
5. residual risks.

If no significant defect is found, explicitly state:

"No significant issues found."

Do not modify, create, delete, stage, commit, or push application changes.
