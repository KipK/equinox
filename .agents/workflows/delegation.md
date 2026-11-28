# Delegation: which agent for which task

Goal: spend strong models on thinking, cheaper models on execution. Profiles exist for Claude Code (`.claude/agents/*.md`) and Codex (`.codex/agents/*.toml`) with the same names and the same instructions. They are generated from one source: edit the list in `.agents/scripts/gen_profiles.py`, run it, never edit the generated files by hand.

| Profile | Claude model / effort | Codex model / effort | Use for |
| --- | --- | --- | --- |
| equinox-explorer | haiku / low | gpt-6-luna / low | locate code, callers, tests, configuration keys; read-only |
| equinox-developer | sonnet / medium | gpt-6.1-terra / medium | implement a well-specified change with its tests |
| equinox-test-engineer | sonnet / medium | gpt-6.1-terra / medium | write, repair and run tests |
| equinox-senior-developer | opus / high | gpt-6.1-sol / high | changes needing judgement: data mapping from VT and SmartPI attributes, chart and history integration, rendering performance |
| equinox-debugger | opus / high | gpt-6.1-sol / high | root cause of a bug; may run tests, does not edit product code |
| equinox-reviewer | opus / high | gpt-6.1-sol / high | independent review of a diff against its plan; read-only |

Codex model names may change; if a profile fails on an unknown model, adjust the name in the generator or remove it to inherit the session's model. "Read-only" profiles keep a shell tool and are read-only by instruction. Sub-agents cannot spawn other agents: the orchestrating session chains them.

## Routing rules

1. Default to the cheapest adequate profile. Escalate when a cheaper agent reports it cannot decide, or when the change touches data mapping from VT and SmartPI attributes, chart and history integration, rendering performance.
2. Feature: plan (orchestrating session) -> user validation -> senior-developer or developer -> test-engineer -> reviewer.
3. Bug: debugger (root cause, failing test) -> developer or senior-developer (fix) -> reviewer for non-trivial fixes.
4. **Fresh agent per task** with a self-contained brief built from the task's `handoff.md`: goal, files to read, what was ruled out, rules, expected report. Resume an agent only for a short follow-up on the same task.
5. **Tight briefs**: point to files instead of restating them; ask for a short report (what was done, verified, unverified, open questions). Include the standing rules: no commit, no polling (long jobs in the background, wait for the notification), stay in scope.
6. Parallel agents only for independent, read-mostly work. Do not duplicate an agent's work while it runs.
7. The orchestrator validates each step before the next and re-reads delegated diffs.
