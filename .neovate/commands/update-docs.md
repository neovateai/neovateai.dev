---
description: Update documentation based on a commit or PR from neovate-code repository
---

Fetch the commit or PR from $ARGUMENTS and analyze the changes.

If it's a PR link, append .diff to get the diff (e.g., https://github.com/org/repo/pull/123.diff).
If it's a commit link, append .diff to get the diff (e.g., https://github.com/org/repo/commit/abc123.diff).

Based on the changes:
1. Identify what documentation needs to be updated
2. Update both English (content/en/) and Chinese (content/zh-CN/) documentation
3. Keep documentation consistent across both languages

Don't implement or fix directly, tell me what changes are needed and ask questions if unclear.
