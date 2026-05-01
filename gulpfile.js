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
import postcss_import         from 'postcss-import'
import postcss_imports        from 'postcss-import-ext-glob'
import postcss_lightningcss   from 'postcss-lightningcss'
import postcss_media          from 'postcss-custom-media'
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

function styles() {
  const processors = [
    postcss_cq,
    postcss_imports,
    postcss_import,
    postcss_media(),

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
