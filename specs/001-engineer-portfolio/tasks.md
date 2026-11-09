---

description: "Implementation tasks for portfolio content-rule updates"

---

# Tasks: Engineer Portfolio Content Rules

**Input**: Design documents from `specs/001-engineer-portfolio/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/portfolio-content.schema.json`, and `quickstart.md`.

**Scope**: The existing portfolio and image/resume enhancements are implemented. This checklist
covers only outstanding updates from the clarified requirements: optional GitHub project links
and unrestricted experience/certification record counts. Completed baseline work is intentionally
omitted.

**Tests**: No new automated test framework is requested. Run the existing lint/build commands and
the focused content and browser validations in the final phase.

## Phase 1: Setup

**Purpose**: The existing Next.js project, static export, and dependencies are already set up.

No tasks.

---

## Phase 2: Foundational Content Contract

**Purpose**: Align the shared portfolio type, runtime validator, and JSON schema before updating
project-card behavior.

- [X] T001 [P] Update `Project` and `validatePortfolioContent` in
  `lib/portfolio-content.ts`: make `githubUrl` optional; accept a missing or empty-string value
  as absent; validate any non-empty value as an HTTPS GitHub URL; remove minimum-count checks for
  `experience` and `certifications` while continuing to validate every supplied record.
- [X] T002 [P] Update `specs/001-engineer-portfolio/contracts/portfolio-content.schema.json` to
  make `githubUrl` optional and allow either an empty string or a valid HTTPS GitHub URL; remove
  `minItems` constraints from `experience` and `certifications`; retain exactly three projects
  and the required project `liveUrl`.

**Checkpoint**: Runtime content validation and the published JSON contract accept absent/empty
GitHub URLs and zero-or-more experience/certification records.

---

## Phase 3: User Story 2 - Review Projects (Priority: P1)

**Goal**: Preserve each project's live destination and show its repository link only when a
non-empty GitHub URL is available.

**Independent Test**: With three projects, verify that projects with a non-empty GitHub URL show
the matching repository link, a project with an omitted or empty URL shows no repository link,
and all three project cards retain their matching live-project link and preview action.

### Implementation for User Story 2

- [X] T003 [P] [US2] Update `app/components/Projects.tsx` to render a project's GitHub anchor
  only when its optional `githubUrl` is non-empty; retain its live-project anchor and the
  project's preview link to the matching `liveUrl`, with no empty or nonfunctional anchors.

**Checkpoint**: All three cards remain usable when any project has no repository URL.

---

## Phase 4: User Story 7 - Review Resume-Based Career and Credentials (Priority: P2)

**Goal**: Display every supplied experience and certification record without requiring a
minimum number of entries.

**Independent Test**: Validate and render zero, one, and multiple experience/certification
records; confirm every supplied record appears, experience remains newest-start-first, and no
fabricated records or credential links appear.

### Implementation for User Story 7

- [X] T004 [P] [US7] Verify `app/components/Experience.tsx` and
  `app/components/Certifications.tsx` leave their section headings valid for zero-record lists
  without fabricated entries; confirm supplied records retain their required details, newest-first
  experience ordering, and optional credential-link behavior. Existing components already meet
  these conditions, so no UI code changes were needed.

**Checkpoint**: Empty and reduced content collections render without validator or UI count
assumptions.

---

## Phase 5: Polish & Cross-Cutting Validation

**Purpose**: Verify the updated content rules without changing the existing static-site behavior.

- [X] T005 Run `npm.cmd run lint` and `npm.cmd run build`; validate `lib/portfolio-content.ts`
  with portfolio content variants that omit `githubUrl`, set it to `""`, and provide a valid
  non-empty GitHub URL; verify invalid non-empty GitHub URLs are rejected and empty experience
  and certification arrays are accepted; serve the static export and complete the relevant
  optional-link and empty-list checks in `specs/001-engineer-portfolio/quickstart.md`.

**Checkpoint**: Lint, static build, and the changed behavior checks pass.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Already complete; no new setup task is required.
- **Foundational (Phase 2)**: T001 and T002 have no prerequisites and can run in parallel.
- **User Stories (Phases 3–4)**: Both depend on the foundational content contract. User Stories
  2 and 7 are independent after Phase 2 and can proceed in parallel.
- **Polish (Phase 5)**: T005 depends on T001–T004.

### User Story Completion Order

```text
T001 ─┐
      ├─> T003 [US2] ─┐
T002 ─┤                ├─> T005
      └─> T004 [US7] ─┘
```

## Parallel Execution Examples

### Foundational Contract

```text
Run T001 and T002 in parallel: runtime content validator and JSON schema are separate files.
```

### User Story Updates

```text
After T001 and T002, run T003 and T004 in parallel: project links and resume lists use separate
components.
```

## Implementation Strategy

1. Complete T001–T002 to establish consistent validator and schema behavior.
2. Deliver the P1 project-link change in T003 as the MVP increment.
3. Complete T004 so Experience and Certifications remain valid for any list size.
4. Run T005 and verify the resulting static export against the focused quickstart scenarios.

**MVP scope**: Foundational tasks T001–T002 plus User Story 2 task T003.

**Format validation**: Every task uses an unchecked checkbox, sequential task ID, appropriate
parallel/story labels, and explicit repository file paths.
