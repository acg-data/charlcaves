---
name: Charleston Caves
description: Warm private rooms, presented through timber, leather, ivory and bronze.
colors:
  bronze: "#c8a77a"
  ink: "#14120f"
  surface: "#1e1a16"
  paper: "#f0e8da"
  muted: "#bdb2a1"
  line: "#3a332a"
  parchment: "#e6dbc7"
  parchment-ink: "#2e271e"
  parchment-muted: "#645341"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(60px, 5.6vw, 82px)"
    fontWeight: 400
    lineHeight: 1.01
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(42px, 4.7vw, 68px)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-.025em"
  title:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "31px"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Inter Tight, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Inter Tight, Arial, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  control: "4px"
  image: "6px"
  enclosure: "12px"
spacing:
  compact: "20px"
  regular: "24px"
  roomy: "32px"
  wide: "40px"
  section: "132px"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "15px 23px"
  palette-option:
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  palette-option-selected:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
  input:
    backgroundColor: "#14120f80"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    height: "49px"
  navigation:
    backgroundColor: "#1e1a16b8"
    textColor: "{colors.paper}"
    rounded: "{rounded.enclosure}"
    padding: "16px 22px 16px 28px"
---

# Design System: Charleston Caves

## Overview

**Creative North Star: "The Warm Private Club"**

The established identity is a dimly lit private club: timber and leather photography, ivory serif headlines, bronze emphasis and restrained glass navigation. Large photographic surfaces and generous space make the room the subject; controls remain quiet and legible.

Parchment interrupts the dark sequence for design explanation and planning. It shares the same typography and warm material character. Room detail pages extend this identity rather than introducing a separate visual language.

**Key Characteristics:**
- Warm photographic atmosphere with honest illustrative captions.
- Large, light serif headings paired with compact sans-serif utility text.
- Bronze emphasis, ivory actions and fine warm dividers.
- Spacious desktop compositions that become direct mobile stacks.

## Colors

The palette moves between dark timber tones and warm paper, with bronze as the consistent accent.

### Primary
- **Bronze:** Italic heading phrases, arrows, underlines, focus rings and small process numbers.

### Neutral
- **Ink:** Page background and text on ivory actions.
- **Surface:** Tonal material-section background and image loading surface.
- **Paper:** Headings, primary controls and selected palette options.
- **Muted:** Body copy, captions and supporting labels on dark backgrounds.
- **Line:** Gallery, process, feature and FAQ dividers.
- **Parchment:** Design-study and room-planning backgrounds.
- **Parchment Ink / Parchment Muted:** Heading and supporting text on light planning surfaces.

**The Material Contrast Rule.** Pair light sections with their dark text colors; do not carry muted ivory copy onto parchment.

## Typography

**Display Font:** Instrument Serif, with Georgia and serif fallbacks.
**Body Font:** Inter Tight, with Arial and sans-serif fallbacks.

The serif supplies warmth and scale; the sans serif keeps navigation, planning notes and forms economical. Headings use regular weight and short balanced lines. Italic serif phrases carry bronze emphasis.

### Hierarchy
- **Display:** The homepage uses the frontmatter display ramp; room titles use a room-specific ramp (`clamp(56px, 5.8vw, 86px)`).
- **Headline:** Fluid section headings, with tighter sizes in room planning and related-room sections.
- **Title:** Regular serif room captions and finish names; process and feature titles sit close to this size.
- **Body:** The base body role governs paragraphs; introductions rise to 17-18px, supporting detail uses 15px, and disclosure captions use 11-13px.
- **Label:** Sans-serif navigation, form labels and finish choices. Sentence case is the default.

**The Two Voices Rule.** Use the serif for room atmosphere and the sans serif for decisions, explanations and controls.

## Layout

Room concepts, room detail photographs and finish previews use the full 3:2 composition on desktop and mobile. The consistent landscape finish frame keeps controls stable when the selected material study changes. Responsive WebP variants preserve the same composition. The five-person bar scene remains the distinct hero; on mobile it sits in normal flow above the copy, without a fixed-height overlay darkening or covering it.

The desktop content container is capped at 1280px with 56px side margins. At 1000px the margins reduce to 32px; at 680px they reduce to 20px. Major section spacing steps from 132px to 100px to 76px at those breakpoints.

Room galleries use two unequal columns with a 65px stagger on alternating tiles, then a single unstaggered column on mobile. Introductory, materials, concept, FAQ and room-detail compositions use paired columns before stacking. The process remains a two-column sequence on mobile. The bar detail page gives the wide room image its own row. Property planning uses a ruled two-column composition, with its introduction beside a list of planning considerations; it stacks at the mobile breakpoint.

Mobile puts the full-width hero photograph above the copy. Preserve the scene when choosing image crops; room atmosphere and human subjects are meaningful content. Detail figures stop sticking on mobile. The contact form collapses paired fields into a single column by 1000px.

## Elevation & Depth

Depth comes from photography, tonal backgrounds and restrained borders, not box shadows. Navigation alone uses a translucent warm surface with a 22px backdrop blur. The hero uses dark directional gradients to protect text contrast. Cards remain flat; hover feedback brightens and gently scales their photographs.

Motion is limited to direct feedback and one hero arrival. The shared easing is `cubic-bezier(.16,1,.3,1)`; buttons transition over 250ms, gallery imagery over 800ms and the hero arrives over 1.1s. Reduced-motion preferences disable animation, transitions and smooth scrolling.

## Shapes

Controls and material chips have restrained corners, photographs use slightly softer corners, and navigation and the form use the largest enclosure radius. Thin rules organize content without enclosing every section. Palette choices are compact rectangular controls rather than rounded pills. The concept floor plan uses architectural linework and a fine rectangular frame.

## Components

### Buttons
Ivory primary buttons use dark text and a separated directional arrow. They are at least 54px high on desktop and 52px on mobile. Hover warms the fill and lifts the button by 2px; active returns it to rest. Disabled submission buttons fade and use a wait cursor. Secondary text links use bronze underlines instead of filled containers.

### Palette Choices
Native radio inputs drive bordered labels. The selected label inverts to ivory with dark text; keyboard focus appears around the visible label. Selection updates the photograph, description and three labeled color samples, then carries into the inquiry. The palette action opens the optional finish disclosure in the form. The form can also select an undecided state. Color samples remain explicitly illustrative.

### Cards / Containers
Gallery tiles combine a full 3:2 photograph in a rounded frame with a serif caption, bronze arrow and bottom divider. Desktop hover scales the photograph to 1.035 and moves the arrow diagonally; photo scaling is disabled at tablet and phone sizes to preserve the composition. Related-room tiles reuse the same component without the stagger. Light planning containers reuse parchment rather than introducing another surface color.

### Inputs / Fields
Dark translucent fields use warm strokes, visible labels and the shared control radius. Input text remains 16px on mobile. Focus uses a bronze outline with a 5px offset; hover strengthens the border. Submission keeps visible sending, success and error states, with a polite live status region. Form enclosures use a fine bronze border and a faint warm fill. The inquiry begins with a required property-stage selection. An optional public listing or floor-plan link uses the same field styling with a small supporting note. Optional finish selection sits behind a native disclosure with a top rule, compact muted summary and visible focus. The property-planning action prefills the house-hunting stage.

### Navigation
The serif wordmark, compact section links and underlined inquiry action sit in one translucent enclosure. The property-planning entry uses the direct label “Buying a home?” alongside room, finish and process links. At 680px the section links disappear while the wordmark and inquiry action remain. Detail pages add wrapping breadcrumbs and keep the same navigation treatment.

### FAQ
Native disclosure elements form a ruled vertical list. Sans-serif questions have bronze plus/minus indicators; expanded answers use supporting paragraph styling. Visible focus and native keyboard behavior remain intact.

## Do's and Don'ts

### Do:
- **Do** preserve the timber, leather, ivory and bronze identity across room pages.
- **Do** use parchment for design explanation with the matching dark text palette.
- **Do** keep meaningful room imagery legible when moving from desktop to mobile.
- **Do** retain visible focus, labeled controls, reduced-motion support and persistent form feedback.
- **Do** distinguish illustrative concepts from verified project photography.

### Don't:
- **Don't** replace the established type pairing or warm palette for a new section.
- **Don't** turn restrained flat gallery tiles into floating shadow cards.
- **Don't** let decorative motion obscure reading or form interaction.
