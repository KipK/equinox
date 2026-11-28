# Review

## Scope
Diff reviewed (base..head), plan it implements.

## Findings
Ordered by severity. For each: file and line, the defect, the concrete failure scenario, the suggested fix.
- Correctness and regressions
- Architecture: the rules of `context/principles.md`, public contracts kept compatible
- Quality: readability, English comments, no shortcuts (swallowed errors, special-case flags, test-only branches, duplication)
- Performance
- Tests: coverage of the change and of edge cases
- Docs: current-state wording, no private references
- Memory: `.agents/context` diff matches the code diff

## Verdict
Ready / ready after the listed fixes / needs redesign.
