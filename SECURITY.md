# Security Policy

## Reporting a vulnerability or a data leak

If you find a security issue, or **personal/proprietary data that was committed
by mistake** (names, emails, credentials, API keys, client or financial data),
please report it privately rather than opening a public issue.

- Use GitHub's [private vulnerability reporting](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)
  on this repository, **or**
- Open a minimal issue that says "security report, please make contact" with no
  sensitive details, and a maintainer will reach out.

We will acknowledge within a few days, confirm the issue, and remove leaked
content (including from history where warranted) as quickly as possible.

## Scope

These skills run inside Claude Code on a user's machine and act through the
user's own connected tools and MCP servers. They ship no secrets and request no
credentials. The most likely "vulnerability" in a skills repo is **accidentally
committed private data** — that is explicitly in scope and we want to hear about
it.

## For users

- Review a skill's `SKILL.md` before installing if it will read your files or
  act on your behalf.
- Never paste credentials into a skill. Connect tools through MCP, which manages
  auth separately.
- Keep your real data (`business/`, `personal/`, etc.) in a private repo, never
  in a public fork of a marketplace. The `.gitignore` here is a backstop, not a
  guarantee.
