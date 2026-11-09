# Data Model: Engineer Portfolio Site

## Portfolio Content

One JSON document supplies the complete public portfolio. It is read and validated at build time
so the static output includes its content. Routine content and asset updates do not require
application source changes.

| Entity | Fields | Validation and presentation |
|---|---|---|
| Owner Profile | `name`, `tagline`, `bio`, optional `portraitImage`, optional `portraitAlt` | Required profile text is non-empty. If supplied, portrait path must be a root-relative local asset path and alternative text must be non-empty. The portrait fields are supplied together. The portrait is square and may be hidden independently by removing its dedicated display component from the Hero. |
| Project | `id`, `name`, `description`, optional `githubUrl`, `liveUrl`, optional `previewImage`, optional `previewAlt` | Exactly three records; stable unique non-empty IDs; required text and HTTPS live-project destination. A GitHub URL is optional; missing or empty values produce no repository link, while a non-empty value must be a valid GitHub HTTPS URL. A preview is a root-relative local asset path; preview alternative text accompanies the image. Activating the preview opens the same record's `liveUrl`; a supplied repository link and the live-project link remain available. Missing or unavailable images render a neutral fallback. |
| Experience Record | `id`, `employer`, `title`, `location`, `startDate`, `endDate`, `description` | Each supplied record has required non-empty text; dates use a consistent month-and-year value, such as `2023-03`; `endDate` may be `null` for a current role. The list may be empty or contain any number of records. Display supplied records as month/year labels and order by start date newest first, preserving overlapping intervals. |
| Certification | `id`, `name`, `issuer`, `date`, optional `credentialUrl` | Each supplied record has a required non-empty name, issuer, and date. The list may be empty or contain any number of records. Initial records may include clearly identified HTTPS `example.com` placeholders until real links are supplied; credential URLs remain optional. |
| Contact | `email` | Required valid owner email used in the visible contact detail and mailto handoff. |
| Contact Message | `name`, `email`, `message` | Browser-only input; all values required, trimmed values non-empty, valid email required before handoff; not persisted. |

## Initial Resume-Based Content

The initial four experience records and four certifications are sourced from the owner-provided
2024 resume and listed in [spec.md](./spec.md). These are starting content only; the owner may
remove or add records, and neither collection has a minimum record count. The latest role is
labeled “Present” by that resume; the owner must confirm that it remains current before
publication. Credential destinations are placeholders, not verification evidence. Do not copy
unrelated resume details into the public content.

## Relationships and State

- Portfolio Content contains one Owner Profile, exactly three Projects, zero or more Experience
  Records, zero or more Certifications, and one Contact record.
- Each project has a required live-project destination and may have a GitHub destination.
  Missing and empty GitHub URL values both represent an absent repository link.
- IDs must remain stable and unique within each collection.
- `previewImage` and `previewAlt` must either both be present or both be omitted. Likewise,
  `portraitImage` and `portraitAlt` must either both be present or both be omitted.
- Image paths refer to files under `public/`; a project image failure does not disable its
  project links. The portrait is optional and its absence or removal leaves other Hero content
  intact.
- Projects and owner content do not change at runtime. Editing JSON or replacing a local asset
  and rebuilding publishes the updated values.
- A Contact Message is transient. Its progression is `editing` -> `invalid` (field feedback) or
  `ready` -> `email handoff requested`. The UI must not represent the final transition as email
  delivery.

The exact document shape and field constraints are defined in
[contracts/portfolio-content.schema.json](./contracts/portfolio-content.schema.json).
