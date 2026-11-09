<!--
Sync Impact Report
Version change: unversioned scaffold -> 1.0.0 (initial adoption)
Principles defined from template slots:
- Principle 1 -> I. Content-First Portfolio
- Principle 2 -> II. Responsive Accessibility
- Principle 3 -> III. Dark-First Visual System
- Principle 4 -> IV. Intentional Motion
- Principle 5 -> V. Lean Performance
Added sections: Product and Technology Constraints; Delivery and Quality Workflow
Removed sections: None
-->

# Brent Portfolio Constitution

## Core Principles

### I. Content-First Portfolio

The site MUST make the engineer's identity, skills, experience, and work easy to understand.
Each page and interaction MUST serve that purpose; unrelated features require explicit product
justification. This keeps the portfolio focused on its primary audience and goal.

### II. Responsive Accessibility

All user-facing content and controls MUST use semantic HTML and remain usable with keyboard
navigation, assistive technology, and narrow viewports. Text and interactive states MUST remain
legible against their backgrounds. Responsive behavior and accessibility MUST be checked when
changing shared layouts or controls.

### III. Dark-First Visual System

The default appearance MUST use a minimalist dark theme with consistent typography, spacing,
color, and component treatments. New UI MUST follow the established visual system rather than
introducing one-off styles. A non-dark default or a theme switch requires explicit product
approval.

### IV. Intentional Motion

Framer Motion MUST be used only when an animation clarifies hierarchy, feedback, or navigation.
Motion MUST NOT delay access to content or make controls harder to use, and MUST respect the
user's reduced-motion preference with an equivalent low-motion experience.

### V. Lean Performance

The implementation MUST favor Next.js and Tailwind CSS conventions, server-rendered or static
content where practical, and client-side JavaScript only where interaction requires it. New
dependencies and client components MUST have a clear user-facing benefit. Media and animation
MUST be implemented to avoid unnecessary loading and rendering work.

## Product and Technology Constraints

The product is a personal software-engineering portfolio built with Next.js, HTML, and Tailwind
CSS. Framer Motion is the animation library for purposeful transitions. The site MUST be
responsive and minimalist, and MUST load in dark mode by default. Server-side services or
persistent data stores MUST NOT be introduced unless a separately approved feature requires them.

## Delivery and Quality Workflow

Changes MUST stay scoped to an approved portfolio need and reuse existing project conventions.
Before delivery, run the applicable project checks, including linting and production build checks
when available. Changes to layout, navigation, controls, or animation MUST also be checked at
mobile and desktop sizes and with keyboard navigation; motion changes MUST be checked with reduced
motion enabled. Any unavailable check or known failure MUST be reported rather than represented as
passed.

## Governance

This constitution governs product and implementation decisions for the portfolio. Amendments MUST
be made in this file, include a rationale, and update the version and last-amended date. The
version follows semantic versioning: MAJOR for backward-incompatible governance changes, MINOR
for new principles or materially expanded requirements, and PATCH for clarifications and
non-semantic wording changes. The ratification date records the original adoption date and MUST
remain unchanged by later amendments.

Contributors MUST review proposed changes against these principles before delivery. Any exception
MUST be explicitly justified in the change description and approved by the project owner. Review
MUST include relevant build, accessibility, responsive, or motion checks for the affected surface.

**Version**: 1.0.0 | **Ratified**: 2026-11-09 | **Last Amended**: 2026-11-09
