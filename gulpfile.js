/// <reference path="./types/gulpfile.d.ts" />

const { emitWarning } = process;

process.emitWarning =
  (warning, type, code, ...extraArgs) =>
    code !== 'DEP0180' && emitWarning(warning, type, code, ...extraArgs);

import gulp, { src, dest, series, watch } from 'gulp'

import gulp_postcss           from 'gulp-postcss'
import gulp_rename            from 'gulp-rename'
import gulp_uglify            from 'gulp-uglify'

import postcss_cq             from 'cqfill/postcss'
import postcss_font           from 'postcss-font-magician'
import postcss_import         from 'postcss-import'
import postcss_imports        from 'postcss-import-ext-glob'
import postcss_lightningcss   from 'postcss-lightningcss'
import postcss_media          from 'postcss-custom-media'
import postcss_nested         from 'postcss-nested'
import postcss_reporter       from 'postcss-reporter'

import stylelint              from 'stylelint'

const path = {
  styles: {
    src: './source/matter.source.css',
    dest: './assets/css/'
  },
  scripts: {
    src: './source/matter.source.js',
    dest: './assets/js/'
  }
}

function lint() {
  return src(['./source/**/*.css', '!./source/matter.source.css'])
    .pipe(gulp_postcss([
      stylelint(),
      postcss_reporter({ clearReportedMessages: true, throwError: true })
    ]))
}

function postcss_fonts() {
  return postcss_font({
    custom: {
      'Roboto': {
        variants: {
          normal: {
            100: { url: { ttf: '../fonts/roboto/regular/Roboto-Thin.ttf' } },
            300: { url: { ttf: '../fonts/roboto/regular/Roboto-Light.ttf' } },
            400: { url: { ttf: '../fonts/roboto/regular/Roboto-Regular.ttf' } },
            500: { url: { ttf: '../fonts/roboto/regular/Roboto-Medium.ttf' } },
            700: { url: { ttf: '../fonts/roboto/regular/Roboto-Bold.ttf' } },
            900: { url: { ttf: '../fonts/roboto/regular/Roboto-Black.ttf' } },
          },
          italic: {
            100: { url: { ttf: '../fonts/roboto/regular/Roboto-ThinItalic.ttf' } },
            300: { url: { ttf: '../fonts/roboto/regular/Roboto-LightItalic.ttf' } },
            400: { url: { ttf: '../fonts/roboto/regular/Roboto-Italic.ttf' } },
            500: { url: { ttf: '../fonts/roboto/regular/Roboto-MediumItalic.ttf' } },
            700: { url: { ttf: '../fonts/roboto/regular/Roboto-BoldItalic.ttf' } },
            900: { url: { ttf: '../fonts/roboto/regular/Roboto-BlackItalic.ttf' } },
          },
        },
      },
      'Roboto Mono': {
        variants: {
          normal: {
            100: { url: { ttf: '../fonts/roboto/mono/RobotoMono-Thin.ttf' } },
            300: { url: { ttf: '../fonts/roboto/mono/RobotoMono-Light.ttf' } },
            400: { url: { ttf: '../fonts/roboto/mono/RobotoMono-Regular.ttf' } },
            500: { url: { ttf: '../fonts/roboto/mono/RobotoMono-Medium.ttf' } },
            700: { url: { ttf: '../fonts/roboto/mono/RobotoMono-Bold.ttf' } },
          },
          italic: {
            100: { url: { ttf: '../fonts/roboto/mono/RobotoMono-ThinItalic.ttf' } },
            300: { url: { ttf: '../fonts/roboto/mono/RobotoMono-LightItalic.ttf' } },
            400: { url: { ttf: '../fonts/roboto/mono/RobotoMono-Italic.ttf' } },
            500: { url: { ttf: '../fonts/roboto/mono/RobotoMono-MediumItalic.ttf' } },
            700: { url: { ttf: '../fonts/roboto/mono/RobotoMono-BoldItalic.ttf' } },
          },
        },
      },
      'Roboto Slab': {
        variants: {
          normal: {
            100: { url: { ttf: '../fonts/roboto/slab/RobotoSlab-Thin.ttf' } },
            300: { url: { ttf: '../fonts/roboto/slab/RobotoSlab-Light.ttf' } },
            400: { url: { ttf: '../fonts/roboto/slab/RobotoSlab-Regular.ttf' } },
            700: { url: { ttf: '../fonts/roboto/slab/RobotoSlab-Bold.ttf' } },
          },
        },
      },
    },
  })
}

function styles() {
  const processors = [
    postcss_cq,
    postcss_fonts(),
    postcss_imports,
    postcss_import,
    postcss_media(),
    postcss_nested,

    postcss_lightningcss({
      browsers: 'last 2 versions, not dead',
      lightningcssOptions: {
        minify: true,
        sourceMap: true,
        drafts: {
          nesting: true,
          customMedia: true,
        },
        analyzeDependencies: true,
        errorRecovery: true,
      },
    })
  ]

  return src(path.styles.src, { sourcemaps: true })
    .pipe(gulp_postcss(processors))
    .pipe(gulp_rename('matter.theme.css'))
    .pipe(dest(path.styles.dest, { sourcemaps: '.' }))
}

function scripts() {
  return src(path.scripts.src)
    .pipe(gulp_uglify({
      mangle: {
        toplevel: true
      }
    }))
    .pipe(gulp_rename('matter.theme.js'))
    .pipe(dest(path.scripts.dest))
}

gulp.task('lint', lint)
gulp.task('styles', styles)
gulp.task('scripts', scripts)

gulp.task('build', series(lint, styles, scripts))

gulp.task('watch-styles', () => {
  return watch('./source/**/*.css', series(lint, styles))
})

gulp.task('watch-scripts', () => {
  return watch('./source/**/*.js', scripts)
})

gulp.task('watch', () => {
  watch('./source/**/*.css', series(lint, styles))
  watch('./source/**/*.js', scripts)
})

gulp.task('default', series('build', 'watch'))
