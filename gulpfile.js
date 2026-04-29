/// <reference path="./types/gulpfile.d.ts" />

const { emitWarning } = process;

process.emitWarning =
  (warning, type, code, ...extraArgs) =>
    code !== 'DEP0180' && emitWarning(warning, type, code, ...extraArgs);

import gulp, { src, dest, series, watch } from 'gulp'

// gulp.js modules
import gulp_postcss           from 'gulp-postcss'
import gulp_rename            from 'gulp-rename'
import gulp_uglify            from 'gulp-uglify'

// postcss modules (only used ones)
import postcss_cq             from 'cqfill'
import postcss_import         from 'postcss-import'
import postcss_imports        from 'postcss-import-ext-glob'
import postcss_lightningcss   from 'postcss-lightningcss'

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

function styles() {

  // Optimized processor pipeline - Lightning CSS handles most transformations
  const processors = [
    // Modules without configuration - processed first
    postcss_cq,
    postcss_import,
    postcss_imports,

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

// Individual tasks
gulp.task('styles', styles)
gulp.task('scripts', scripts)

// Build tasks (one-time execution)
gulp.task('build', series(styles, scripts))

// Watch tasks (continuous execution)
gulp.task('watch-styles', () => {
  return watch('./source/**/*.css', styles)
})

gulp.task('watch-scripts', () => {
  return watch('./source/**/*.js', scripts)
})

gulp.task('watch', () => {
  watch('./source/**/*.css', styles)
  watch('./source/**/*.js', scripts)
})

// Default task (build + watch)
gulp.task('default', series('build', 'watch'))
