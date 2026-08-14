# AI engineering learnings

QARunBoard uses AI agents to support implementation within an explicit validation and review workflow. This document records development observations, including some uncommitted work that is not preserved in Git, alongside workflow principles visible in the current repository.

## Case 1: An overly broad Skill rewrite

### What happened

During development, an earlier uncommitted draft intended to add feature-specification support to the `implement-feature` Skill also changed broader sections. That draft and its review discussion are not preserved in the repository.

### How it was detected

The preserved Git history shows the final focused implementation: a small addition to the existing Skill and a feature-specification template. Current project rules also require small, focused changes and prohibit unrelated rewrites.

### What changed

Only the focused feature-specification support is present in the committed history; the earlier draft should be treated as a development observation rather than a reproducible Git event.

### Reusable lesson

Prefer the smallest coherent diff. Do not rewrite established sections when a focused addition satisfies the requirement.

## Case 2: Ambiguous requirements must not be invented

### What happened

In an unpreserved development exercise, a deliberately ambiguous product requirement omitted information that materially affected intended behaviour. The original prompt and agent response are not retained, so the exercise is recorded as an observation rather than independently reproducible history.

### How it was detected

The current repository directly supports the resulting principle: missing information that could materially change behaviour or acceptance criteria requires clarification rather than an invented interpretation.

### What changed

The explicit clarification rule was introduced in the project workflow and later reinforced through the feature-specification process. The rules allow routine implementation decisions within defined requirements, but do not authorize agents to invent missing product requirements.

### Reusable lesson

Ask for clarification when ambiguity materially affects behaviour, scope, data handling, acceptance criteria, architecture, security, dependencies, or an irreversible action.

## Case 3: Unknown expected behaviour is not automatically a defect

### What happened

An unpreserved review discussion considered test-case priority ordering. The repository specifications define priority filtering but do not define priority-based ordering of test-case rows.

### How it was detected

Because no priority-based row order is specified, the repository does not provide evidence that a different ordering would violate a known requirement. The original reviewer discussion itself is not preserved.

### What changed

The current review workflow distinguishes confirmed defects from unresolved requirements, questions, and validation gaps. Unknown expected behaviour may be reported as an unresolved requirement or question, or as a validation gap, depending on context; it is not asserted as a defect without supporting evidence.

### Reusable lesson

Findings must be evidence-based: cite a known requirement or demonstrate incorrect behaviour before classifying an observation as a defect.

## How these learnings changed the workflow

The workflow reinforces focused diffs, clarification for material product ambiguity, and evidence-based review findings. Implementation and independent review remain separate responsibilities. Applicable validation gates form part of the Definition of Done, while validation that cannot be completed must be reported as a gap rather than silently treated as complete. These principles are captured in reusable project rules so future changes can apply the same safeguards.
