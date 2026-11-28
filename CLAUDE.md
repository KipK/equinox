@AGENTS.md

## Claude Code specifics

- Project sub-agents are in `.claude/agents/` (`equinox-*`); routing rules in `.agents/workflows/delegation.md`. Prefer `sonnet` agents for implementation and tests, `haiku` for exploration, `opus` for judgement-heavy implementation, debugging and review.
- Project permissions (`.claude/settings.json`) ask before `git commit`, `git push` and `git tag`.
- Keep the current task's `.agents/local/tasks/<task-slug>/handoff.md` up to date at each milestone. Project hooks (`.claude/settings.json`) ask the automatic compaction summary to keep the task state, and after a compaction remind you to re-read `plan.md` and `handoff.md` and update `handoff.md`. Task state never goes to the long-term memory.
- Your personal auto-memory is per machine; durable project knowledge belongs in `.agents/context/`.
