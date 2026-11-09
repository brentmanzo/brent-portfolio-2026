# Brent Manzo - Portfolio

A single-page, dark-first portfolio built with Next.js and exported as static files.

## Run locally

```powershell
npm install
npm run dev
```

## Edit portfolio content

Update [`data/portfolio.json`](./data/portfolio.json) to change the profile, projects,
experience, certifications, and contact email. The JSON is validated at build time; an
invalid or incomplete record stops the build with a field-specific error.

The three project entries and `you@example.com` contact address currently contain sample values.
Replace them with real project details, GitHub/live destinations, and the address you intend to
publish before deploying. The resume-based experience and certification entries should be checked
for accuracy; in particular, confirm that the latest role is still current. Certification links
are `example.com` placeholders and must be replaced with real destinations before publication.

## Replace project previews and portrait

Project preview images can be added under `public/images/projects/`. Set each project's
`previewImage` to its root-relative path (for example, `/images/projects/project-one.webp`) and
provide a descriptive `previewAlt`. The preview opens the matching live-project link. If no image
is supplied or the image cannot load, a neutral linked placeholder appears and the project's text
and direct links remain available.

To add a portrait, place your image under `public/images/portrait/` and set `portraitImage` and
`portraitAlt` in the profile. The Hero displays it in a square frame; without an image, it shows
a neutral placeholder. To hide the portrait component without changing the rest of the Hero,
comment out the `Portrait` import and `<Portrait profile={profile} />` invocation in
`app/components/Hero.tsx`. Do not use an image you do not have permission to publish.

## Validate and build for static hosting

```powershell
npm run lint
npm run build
```

The build produces the static site in `out/`. Deploy the contents of that directory to a static
host; no Next.js server, database, or API is required. After editing the JSON, rebuild to include
the updated content.

The contact form validates in the browser and opens the visitor's email application with a
pre-filled message. It does not send or confirm delivery; the configured email address remains
available as a direct alternative.
