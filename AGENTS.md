# AGENTS.md — Studio SDK

This file documents workflows and guidelines for **AI coding agents** working in this repository.
Human contribution rules (branching, commits, PR acceptance) live in [CONTRIBUTING.md](CONTRIBUTING.md).

---

- [AGENTS.md — Studio SDK](#agentsmd--studio-sdk)
    - [General](#general)
    - [Working with AI Agents](#working-with-ai-agents)
        - [Branch before commit (never commit on `main`)](#branch-before-commit-never-commit-on-main)
        - [First commit / PR title](#first-commit--pr-title)
        - [Follow-up commits](#follow-up-commits)
        - [Creating pull requests](#creating-pull-requests)
    - [Project Structure](#project-structure)
    - [Coding conventions](#coding-conventions)
    - [Package Manager](#package-manager)
    - [Workflows](#workflows)
        - [Install, build, and test](#install-build-and-test)

---

## General

This repository is the open-source **GraFx Studio SDK** monorepo. It publishes `@chili-publish/studio-sdk` (and related packages such as connectors/actions): a lightweight, **stateless** abstraction over the Studio editor engine (client ↔ engine messaging via Penpal).

`main` is the long-lived integration branch. Changes go through pull requests. PR title prefixes (`[Fix]` / `[Feature]`) drive automatic version behavior — see [CONTRIBUTING.md](CONTRIBUTING.md) and `images/pr_flow.svg`.

---

## Working with AI Agents

**Before making any code changes, an AI agent MUST ask the user for a ticket reference if one has not been provided.**
Do not proceed with any file edits, commits, or pull requests until a ticket is confirmed (or an explicit `NO-TICKET` decision).

Accepted ticket references:

- A **JIRA** key (e.g. `WRS-1234`, `GRAFX-…`)
- A **GitHub issue** (e.g. `#42` or a full issue URL)
- Explicit **`NO-TICKET`** (no tracker item at all)

If the branch that is being used already contains a JIRA key, GitHub issue number, or `NO-TICKET`, use that for the change.

If the task description includes neither a ticket reference nor an explicit `NO-TICKET` decision, stop and ask: _"What is the ticket reference for this task (JIRA key, GitHub issue, or NO-TICKET)?"_ Do not ask that question when a valid no-ticket decision is already provided.

[`check-description.yml`](.github/workflows/check-description.yml) is a **JIRA link check only**. The `No JIRA ticket` label means this PR has **no JIRA ticket** (skip that check). It does **not** mean there is no ticket of any kind — you may still link a GitHub issue under Related tickets.

When creating a PR, keep the title and description concise.

Follow [CONTRIBUTING.md](CONTRIBUTING.md) for branch names, commit/PR title format, and acceptance criteria.

### Branch before commit (never commit on `main`)

`main` is protected integration history. **AI agents MUST NOT commit, amend, or push directly on `main`.**

Required order before the first commit of a change:

1. Confirm the ticket reference, or an explicit `NO-TICKET` decision.
2. If not already on a correctly named feature branch, create and check it out from up-to-date `main` using the naming in [CONTRIBUTING.md](CONTRIBUTING.md) (typically `fix/…` or `feature/…`).
3. Make changes and commit **only on that branch**.
4. Open a pull request into `main` (do not merge locally into `main`).

If work was accidentally committed on `main`, move it onto a correctly named branch and reset local `main` to `origin/main` before continuing. Never push those commits to `origin/main`.

### First commit / PR title

Use the format from [CONTRIBUTING.md](CONTRIBUTING.md). Prefer prefixing the PR title with `[Fix]` or `[Feature]` as required for version behavior. The first commit message should align with the PR title.

Prefer putting those prefixes only on the first commit / PR title, not on follow-up commits.

### Follow-up commits

After the first commit, follow-up commits **may** use a short `chore:` (or similar) message without repeating the ticket reference:

```text
chore: fix linting
chore: update tests
```

### Creating pull requests

**Reuse the repo PR template.** Do not invent a custom body (e.g. Summary / Test plan).

Source of truth:

- [`.github/pull_request_template.md`](.github/pull_request_template.md)

When creating a PR (including via `gh pr create`), base the description on that template and fill it in:

```markdown
This PR
<one short sentence or bullet list of what changed>

## PR Guidelines

- [ ] I have read the [contribution and PR guidelines](/chili-publish/studio-sdk/blob/main/CONTRIBUTING.md)

## Related tickets

- [WRS-NUMBER](https://chilipublishintranet.atlassian.net/browse/WRS-NUMBER)

## Screenshots
```

Rules:

- Prefer a **JIRA** browse link when a JIRA ticket exists (required by [`check-description.yml`](.github/workflows/check-description.yml)).
- For **GitHub-issue-only** or **`NO-TICKET`** work, still keep the template structure; link the GitHub issue under Related tickets when applicable; apply the `No JIRA ticket` label so the JIRA check is skipped.
- Keep the title concise and aligned with the first commit message (see [CONTRIBUTING.md](CONTRIBUTING.md)).
- Do **not** include Cursor attribution in the PR body (e.g. "Made with Cursor", "Generated by Cursor", or similar footers).

---

## Project Structure

```text
packages/
  sdk/                 # @chili-publish/studio-sdk (main public API)
    src/
      controllers/     # Domain APIs (Frame, Document, Variable, …)
      next/            # Experimental / next-major API surface
      types/, utils/, interactions/, exceptions/
      sdk.ts, index.ts
      tests/
  actions/             # Action helpers / types (CDN artifacts)
  connectors/          # @chili-publish/studio-connectors
  connector-types/     # Shared connector TypeScript types (private)
examples/sdk/          # Consumer examples
cicd.js                # Runs yarn commands across packages/
.github/               # Actions workflows
```

Root scripts fan out via `node cicd.js <packages> <command>` (not Yarn/npm workspaces).

---

## Coding conventions

- Keep the SDK **stateless** — do not add client-side state that duplicates the editor engine.
- Prefer exporting the public API through `packages/sdk/src/index.ts`; treat published types/exports as a stable contract.
- Put domain behavior in `*Controller` classes under `packages/sdk/src/controllers/`.
- Place experimental or breaking preview APIs under `packages/sdk/src/next/`.
- Respect `packages/sdk/editor-engine.json` for compatible engine versioning.
- Tests: Jest + colocated `*.test.ts` / `src/tests/`; run `yarn cover` before opening a PR.
- Follow ESLint + Prettier; resolve TypeScript errors before opening a PR.

---

## Package Manager

Use **Yarn Classic (v1)** — not npm, not pnpm, not Yarn Berry.

| Requirement | Value |
| ----------- | ----- |
| Yarn | Classic v1 (per-package lockfiles) |
| Node | CI uses `22.x` |

```bash
yarn install
```

Do not mix package managers. Prefer `yarn <script>` from the **repo root** (delegates via `cicd.js`).

---

## Workflows

### Install, build, and test

```bash
yarn install
yarn build
yarn test
yarn cover
yarn lint
```

Useful scripts: `yarn build:dev`, `yarn ci-lint`, `yarn format`, `yarn build-docs-md`, `yarn build-docs-html`, `yarn validate-licenses`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for local setup detail and [RELEASE_PIPELINE.md](RELEASE_PIPELINE.md) for release flows.
