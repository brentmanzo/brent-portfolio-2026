# Research: Engineer Portfolio Site

## Static export and local JSON content

- **Decision**: Use the existing Next.js App Router with static export enabled. Import the
  owner-maintained JSON file into the page's build-time component tree; do not fetch it from a
  runtime route or backend.
- **Rationale**: Next.js documents that `output: 'export'` writes a deployable `out/` directory
  and that App Router Server Components are rendered during `next build`. This supports the
  requested static host and content-at-build workflow without a running server.
- **Constraint**: Avoid request-time server features and the default `next/image` optimization
  service in the exported site. Use local static assets directly if imagery is later needed.
- **Alternatives considered**: A server-rendered Next.js deployment or an API-backed JSON fetch
  would require a server runtime and are out of scope. A manually maintained `index.html` would
  duplicate the existing App Router.
- **Verified sources**:
  - [Next.js: Static Exports](https://nextjs.org/docs/app/guides/static-exports)
  - [Next.js: `page` convention](https://nextjs.org/docs/app/api-reference/file-conventions/page)

## Motion and reduced-motion behavior

- **Decision**: Keep Framer Motion usage selective. Use Motion's reduced-motion configuration or
  hook for the motion-bearing client surface, and keep essential content available without
  animation.
- **Rationale**: Motion's accessibility documentation describes respecting the system preference,
  disabling transform/layout motion, and using opacity as a lower-motion alternative.
- **Alternatives considered**: CSS-only transitions would avoid the existing motion dependency
  but would not align as directly with the constitution's Framer Motion guidance. Continuous
  parallax or entrance animation on all content is unnecessary and risks usability.
- **Verified source**:
  - [Motion: Accessibility](https://motion.dev/docs/react-accessibility)

## Tailwind CSS and existing application

- **Decision**: Continue using the installed Tailwind CSS 4 setup through the existing global
  stylesheet and PostCSS configuration; implement the visual system in the existing Next.js
  application.
- **Rationale**: The repository already imports `tailwindcss` from `app/globals.css` and has the
  matching PostCSS dependency. Tailwind's official Next.js guide uses this integration.
- **Alternatives considered**: Replacing the project styling system or creating a separate
  `styles.css` would duplicate existing structure with no user benefit.
- **Verified source**:
  - [Tailwind CSS: Install with Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)

## Contrast targets

- **Decision**: Verify normal text at 4.5:1 contrast, large text at 3:1, and meaningful visual
  indicators for controls at 3:1 against adjacent colors.
- **Rationale**: These are the applicable WCAG Level AA minimum ratios for text contrast and
  non-text contrast; light-weight display typography should not be assumed to receive the
  large-text exception without meeting its size definition.
- **Verified source**:
  - [W3C: Understanding Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)

## Contact handoff for a static-only site

- **Decision**: Validate the form in the browser, then prepare a `mailto:` handoff with the
  visitor's details; keep the owner address visible as a fallback and never report delivery as
  confirmed.
- **Rationale**: This preserves the specified static deployment without introducing a submission
  service. It follows the feature spec's stated static-safe assumption.
- **Alternatives considered**: A server endpoint or third-party form processor could send email
  directly but adds a runtime or external service not requested by the user.
- **Reference**: Feature specification FR-006, FR-007, and FR-009.

## Static project and portrait imagery

- **Decision**: Store owner-supplied project previews and the optional portrait as local files
  under `public/images/`, and reference them with root-relative paths in the content document.
  Keep the project image action linked to the matching live URL; retain the card's existing
  direct live-project link and show its direct GitHub link only when a non-empty GitHub URL is
  supplied. When a project image path is absent or fails to load, render a neutral visual
  fallback and keep the text and available direct links available. Use
  `next/image` with `unoptimized` so browser requests go directly to static files rather than an
  image optimization server; a small client component is necessary to replace an image that
  returns a load error.
- **Rationale**: Local public assets are copied into the existing static export, work without a
  server-side image optimizer or third-party image host, and can be replaced without editing
  application source. An anchor around the image provides the required pointer and keyboard
  action; its accessible name identifies the project and destination. Client-side behavior is
  limited to image-load failure handling.
- **Alternatives considered**: Remote-only imagery adds external availability and privacy
  dependencies; introducing an image-processing service conflicts with static-only delivery.
  Hiding all image content when a file fails would leave a broken preview area and weaker
  fallback behavior.
- **Portrait decision**: Keep the portrait optional and in a dedicated `Portrait` component
  rendered from `Hero`. Commenting out that component invocation removes only the portrait.
  Use the owner's image and a suitable alternative text; do not generate or infer personal
  imagery. The component uses the same static image and fallback strategy as project previews.

## Resume-derived records and placeholder links

- **Decision**: Start with the four roles and four certifications transcribed in the feature
  specification as editable starting content. The content model and validator must permit any
  number of experience and certification records, including empty lists. Preserve supplied role
  date labels and locations; sort roles by start date, newest first, so overlapping records retain
  their original dates. Show each supplied certification's issuer and date. Use clearly labelled
  `example.com` credential placeholders for the initial records until the owner supplies real
  destinations.
- **Rationale**: This satisfies the requested initial content while avoiding a false claim that
  the placeholder links verify credentials, without making those initial record counts a permanent
  content constraint. Other resume details, such as phone, education, and skills, are outside the
  approved portfolio changes.
- **Alternatives considered**: Leaving the lists empty would fail the new content request.
  Presenting placeholder links as verified records would mislead visitors.

## Optional project repository links

- **Decision**: Require a live-project URL for every project; treat `githubUrl` as optional.
  Missing and empty GitHub URL values both mean that the project card has no repository link.
- **Rationale**: The specification permits projects whose repository URL was not supplied while
  retaining a usable live destination. Omitting the link avoids an empty or nonfunctional anchor.
- **Alternatives considered**: Requiring a GitHub URL would reject valid project records without
  one; rendering an empty anchor would be inaccessible and misleading.

## No outstanding research blockers

The existing App Router, local JSON import and validation, CSS, and static export provide the
required integration points. Local image paths, placeholder links, content fields, and the
portrait toggle behavior are defined above; no additional stack choice or technical clarification
is needed.
