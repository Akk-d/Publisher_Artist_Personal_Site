---
description: Save task outcome to project memory and commit.
disable-model-invocation: true
---
## Changes this session
!`git status --short`
!`git diff --stat`

## Instructions
1. Update `docs/memory/PROGRESS.md`: current state, anything unfinished (exactly where it stopped), next steps. Keep it under 40 lines; delete stale items instead of piling up.
2. If we made a decision with a lasting reason, append one line to `docs/memory/DECISIONS.md`.
3. If files or folders were added, moved, or removed, update `docs/memory/ARCHITECTURE.md`.
4. Update `CLAUDE.md` only if commands or conventions changed.
5. Propose a clear commit message and run `git add -A && git commit` only after I approve.
