---
name: Charleston Caves
description: A direct, photographic site for custom rooms in Charleston.
colors:
  paper: "#f1f0ec"
  ink: "#302722"
  muted: "#655d56"
  line: "#c8c3ba"
  wash: "#e5e2dc"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(48px, 5.5vw, 84px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.035em"
  heading:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(34px, 3.4vw, 48px)"
    fontWeight: 500
    lineHeight: 1.08
  body:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
spacing:
  control: "24px"
  section: "120px"
components:
  button:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "16px 22px"
    height: "56px"
---
# Design System: Charleston Caves

## Overview
**Creative North Star: "Plainly built"**

The service and the visitor’s room lead. Typography is direct, photographs are real and credited, and room guides explain actual planning decisions. The user rejected the previous generated lifestyle scenes and ornamental luxury treatment.

**Key Characteristics:**
- Warm white and brown with high text contrast.
- One sans-serif family and a compact stacked wordmark.
- Square photographs, plain lists and native form controls.
- Clear project inquiry as the main action.

## Colors
Ink carries primary text and the contact section. Paper is the main surface. Muted text supports the hierarchy; wash groups process and planning information. Dividers separate actionable rows.

**The Contrast Rule.** Use paper text on ink and ink text on paper. Do not place important copy over photography.

## Typography
Archivo carries the wordmark, headlines, body and controls. Headings use medium weight; the wordmark uses bold. There are no italic display phrases or decorative labels.

**The Plain Language Rule.** Headings name the offer, room or decision. Body copy gives useful information instead of repeating the headline.

## Layout
Desktop uses a shared two-column alignment for the hero, section introductions, process, FAQs and inquiry. Room types are wide linked rows. The main content width caps at 1440px with 48px side margins.

Below 680px the main sections stack with 20px margins and 72px section spacing. The header keeps the wordmark and project link. The room list keeps a short description beneath each title. Very narrow form rows stack.

## Elevation & Depth
Photography supplies visual depth. There are no shadows, glass panels, gradients, mock textures or arrival animations. Hover feedback is a small background or color change.

## Shapes
Photographs and controls are square. Dividers are thin and neutral. Native radio circles make the finish selection recognizable.

## Components
- The header links to rooms, process and inquiry; its location is secondary.
- The hero states the offer beside a credited reference photograph.
- Room rows link to six concise planning guides.
- Finish radios carry preferences into the inquiry and announce selection in text.
- Native FAQ disclosures expose practical cost, schedule and preparation guidance.
- The inquiry has visible labels, optional preferences, validation and persistent success/error messages.
- Buttons use ink on light sections and paper on the dark contact section.

## Do's and Don'ts
- Do use real photographs with clear source and project-status captions.
- Do keep the inquiry and room-guide paths functional.
- Do make content readable without animation or visual effects.
- Don't imply reference photographs are completed projects.
- Don't reintroduce synthetic lifestyle scenes, invented project stories or repetitive luxury slogans.
- Don't add founders, reviews, prices or business contact details without supplied facts.
