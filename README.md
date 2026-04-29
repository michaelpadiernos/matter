# Matter

A custom Drupal 11 base theme built around atomic design principles and a modern PostCSS workflow.

## Overview

Matter is a component-based theme that organizes UI elements following atomic design — atoms, molecules, and organisms — making it straightforward to build and maintain a consistent design system.

## Requirements

- [Drupal 11](https://www.drupal.org/about/drupal-11)
- [Components](https://www.drupal.org/project/components) module
- [Node.js](https://nodejs.org)

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
    ├── 00-core/             # Design tokens, custom properties, typography, and reset styles
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
gulp
```

The pipeline processes `source/matter.source.css` through PostCSS (import resolution, container query polyfill, Lightning CSS minification) and outputs `assets/css/matter.theme.css`.

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

[Roboto](https://fonts.google.com/specimen/Roboto) by [Christian Robertson](https://fonts.google.com/?query=Christian+Robertson) is used as the theme's primary typeface. Licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
