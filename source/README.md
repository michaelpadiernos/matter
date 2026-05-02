# Source

This directory contains all authored source files for the Matter theme — component CSS, JavaScript behaviors, and Twig templates. Everything here is hand-written working source organized by atomic design layer; nothing in this directory is generated or compiled output.

## Structure

Directories follow atomic design conventions, ordered from the most fundamental to the most composed:

| Directory       | Role                                                                                                 |
| --------------- | -----------------------------------------------------------------------------------------------------|
| `00-nucleus/`   | Design tokens (CSS custom properties), global resets, base HTML element styles, and utility defaults |
| `01-atoms/`     | The smallest indivisible UI elements: labels, regions, and other single-purpose components           |
| `02-molecules/` | Groups of atoms forming simple, reusable UI patterns (navigation, titles, brand items)               |
| `03-organisms/` | Complex UI sections composed of molecules and atoms (site header, footer, main content area)         |
| `04-symbiosis/` | Full page-level layouts that arrange organisms into a cohesive structure                             |
| `05-synergy/`   | Contextual overrides and compositions that cross atomic boundaries                                   |

## Entry Points

- `matter.source.css` — CSS entry point; compiled via PostCSS into `assets/css/matter.theme.css`
- `matter.source.js` — JavaScript entry point; compiled via Gulp into `assets/js/matter.theme.js`
