# Karthik 3D Portfolio

## Build
- Replace the blank home page with a complete single-page portfolio: fixed navigation, 3D hero, portrait placeholder, About/Education, Experience, Projects, Skills, and Contact.
- Use a premium near-black developer-lab design with cyan accents, fine grid texture, restrained glass surfaces, strong typography, and responsive layouts.
- Add a lightweight React Three Fiber hero scene with floating geometry, orbiting nodes, particles, pointer parallax, smooth camera motion, and reduced-motion/static fallback.
- Add purposeful motion: loading reveal, scroll progress, section entrances, interactive experience timeline, project tilt, project detail dialogs, and an accessible skills constellation.
- Make navigation, project dialogs, contact links, and form behavior functional. The form will open the visitor's email app rather than claim a submission service exists.
- Add route-specific SEO and social metadata, keyboard focus states, semantic structure, and mobile navigation.

## Content constraints
- Use only the supplied resume facts; do not invent dates, employers, metrics, awards, or credentials.
- Keep `/karthik-portrait.jpg` as the single obvious portrait path with a polished fallback if the image has not yet been added.
- Since the resume text did not include actual email, GitHub, or LinkedIn URLs, display them as unavailable rather than fabricate contact details.

## Technical details
- Add `three`, `@react-three/fiber`, `@react-three/drei`, and `framer-motion`.
- Keep the 3D scene client-safe and performance-conscious: low geometry counts, capped device pixel ratio, no post-processing, and paused animation for reduced-motion users.
- Extend the global design tokens and use existing shadcn buttons/dialogs/inputs for interactive controls.
- Validate the result in the live preview at desktop and mobile sizes, including dialogs, navigation, and missing-image fallback.
