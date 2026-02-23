# Aybuben Design System (v1)

## Principles
- Minimal interface for adult learners.
- High readability, low decorative noise.
- Consistent surfaces and controls in light and dark themes.

## Brand
- Accent color (fixed): `--primary-main: light-dark(#ff8f00, #ffb74d)`.
- Accent is used for active state, focus, and key actions.

## Theme Tokens
Defined in `/Users/sergejkozlov/git/armenian-alphabet/src/core/index.css`.

- Text:
  - `--text-primary`
  - `--text-secondary`
  - `--text-muted`
- Surfaces:
  - `--surface-base`
  - `--surface-elevated`
  - `--surface-raised`
  - `--surface-accent`
- Borders:
  - `--border-subtle`
  - `--border-strong`
- Effects:
  - `--shadow-soft`
  - `--shadow-medium`
- Semantic:
  - `--color-success`
  - `--color-warning`
  - `--color-danger`

## Layout
- App container max width: `960px`.
- Main content uses adaptive horizontal padding.
- Bottom navigation is a floating, rounded surface with blur.

## Components
- Button:
  - Rounded (`12px`), medium weight, no uppercase labels.
  - `primary` and `secondary` variants.
  - Clear hover, focus-visible, disabled states.
- Dialog/AlertDialog:
  - Elevated card with subtle border and medium shadow.
  - Compact typography and action row aligned to the right.
- Form controls:
  - Radio and switch use accent-based checked state.
  - Focus-visible ring follows accent.
- Links:
  - Underlined with controlled underline color transitions.

## Screens
- Alphabet:
  - Letter cards with clear border and hover.
  - Responsive grid: 4/3/2 columns by width.
- Quiz:
  - Question block as a card.
  - Result block split into answer preview and actions.
- Drawing:
  - Task description card + bounded drawing canvas card.
  - Actions placed around canvas with mobile tweaks.
- Settings:
  - Sections as independent cards.
  - Secondary section (licenses) stays visually lighter.

## Accessibility
- Focus-visible state on all interactive controls.
- Contrast improved via neutral surfaces and text hierarchy.
- Hit areas preserved for touch interaction.

## Follow-up
- Optional: create a small screenshot baseline set in both themes for visual regression checks.
