# Matter

A custom Drupal 11 base theme built around atomic design principles and a modern PostCSS workflow.

## Overview

Matter is a component-based Drupal base theme built on [atomic design](https://atomicdesign.bradfrost.com) principles by [Brad Frost](https://bradfrost.com) — atoms, molecules, and organisms — for a consistent and maintainable design system. Styles are written in plain, modern CSS using native features exclusively — no preprocessors (Sass, Stylus) or utility frameworks (Bootstrap, Tailwind).

## Requirements

- [Drupal 11](https://www.drupal.org/about/drupal-11)           - Drupal core 11 or higher
- [Components](https://www.drupal.org/project/components)       - Drupal module: maps source components to Twig templates
- [More Global Variables](https://www.drupal.org/project/mgv)   - Drupal module: provides additional global variables for use in Twig templates
- [UI Icons](https://www.drupal.org/project/ui_icons)           - Drupal module: integrates icon libraries
- [UI Patterns](https://www.drupal.org/project/ui_patterns)     - Drupal module: provides reusable UI patterns
- [UI Skins](https://www.drupal.org/project/ui_skins)           - Drupal module: allows for themeable UI skins
- [UI Styles](https://www.drupal.org/project/ui_styles)         - Drupal module: manages global UI styles
- [Node.js](https://nodejs.org)                                 - Node.js 14 or higher for asset compilation

## Structure

```
matter/
├── assets/                  # Browser-ready files served to the front end
│   ├── css/                 # Compiled and minified theme stylesheet
│   ├── js/                  # Compiled and minified theme scripts
│   └── images/              # Theme images and icon libraries
├── components/              # Drupal SDC definitions that map source components to Twig
│   ├── 01-atoms/            # SDC wiring for atom-level components
│   ├── 02-molecules/        # SDC wiring for molecule-level components
│   └── 03-organisms/        # SDC wiring for organism-level components
└── source/                  # Authored source — CSS, JS, and Twig templates
    ├── 00-nucleus/          # Design tokens, custom properties, typography, and reset styles
    ├── 01-atoms/            # Foundational UI elements: buttons, inputs, images
    ├── 02-molecules/        # Composite patterns assembled from atoms
    ├── 03-organisms/        # Self-contained page sections built from molecules
    ├── 04-symbiosis/        # Cross-component utilities and shared relationships
    └── 05-synergy/          # Full layout compositions and page-level templates
```

## Asset Pipeline

Styles and scripts are compiled with [Gulp](https://gulpjs.com/) and [PostCSS](https://postcss.org/).

Install dependencies:

```bash
npm install
```

Watch for changes during development:

```bash
npx gulp
```

The styles pipeline processes `source/matter.source.css` through PostCSS (import resolution, container query polyfill, Lightning CSS minification) and outputs `assets/css/matter.theme.css`.

The scripts pipeline processes `source/matter.source.js` through UglifyJS (minification with top-level mangling) and outputs `assets/js/matter.theme.js`.

## Regions

| Key          | Label      | Description                                                                      |
|--------------|------------|----------------------------------------------------------------------------------|
| `branding`   | Branding   | Site logo, name, and slogan                                                      |
| `navigation` | Navigation | Primary site navigation menus                                                    |
| `focus`      | Focus      | Skip-link and accessibility-focused elements                                     |
| `hero`       | Hero       | Full-width introductory or promotional content                                   |
| `highlight`  | Highlight  | Prominent callout content above the main area                                    |
| `content`    | Content    | Main page content                                                                |
| `sidebar`    | Sidebar    | Supplementary content alongside the main area                                    |
| `footer`     | Footer     | Site-wide footer content and secondary navigation                                |
| `buffer`     | Buffer     | Hidden region for parking blocks that must remain enabled but not render visibly |

## Icons

[Font Awesome Free](https://fontawesome.com) by [Fonticons, Inc.](https://fonticons.com) is included as a dependency and available throughout the theme. Icons are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), fonts under [SIL OFL 1.1](https://scripts.sil.org/OFL), and code under [MIT](https://opensource.org/licenses/MIT).

## Typography

Three members of the Roboto family are used throughout the theme, all designed by [Christian Robertson](https://fonts.google.com/?query=Christian+Robertson) and licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

| Typeface                                                         | Role                                    |
|------------------------------------------------------------------|-----------------------------------------|
| [Roboto](https://fonts.google.com/specimen/Roboto)               | Primary sans-serif for body and UI text |
| [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono)     | Monospace for code and technical content|
| [Roboto Slab](https://fonts.google.com/specimen/Roboto+Slab)     | Serif for headings and editorial content|
