import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as sass from 'sass';
import sassGlob from 'gulp-sass-glob';
import autoprefixer from 'gulp-autoprefixer';
import pxtorem from 'gulp-pxtorem';
import postcss from 'gulp-postcss';
import gulpPrettier from 'gulp-prettier';
import rename from 'gulp-rename';

// pxToRemOptions
const pxToRemOptions = {
  rootValue: 16, // Set the base font size (1rem = 16px)
  unitPrecision: 5, // The decimal numbers to allow in rem units
  propList: ['*'], // Convert all properties
  selectorBlackList: [], // Ignore selectors
  replace: true, // Replace px values with rem values
  mediaQuery: false, // Ignore media queries
};

const sassCompiler = gulpSass(sass);

// PRETTIER
export async function sassPrettier() {
  return gulp.src([
      './sass/**/*.scss',
      '!./sass/_variables.scss',
      '!./sass/base.scss',
      '!./sass/ckeditor.scss',
      '!./sass/components.scss',
      '!./sass/fonts.scss',
      '!./sass/layout.scss',
      '!./sass/root.scss',
      '!./sass/theme.scss',
    ])
    .pipe(sassGlob())
    .pipe(gulpPrettier())
    .pipe(postcss())
    .pipe(gulp.dest('./sass'));
}

export async function componentsPrettier() {
  return gulp.src('./components/*/sass/*.scss', { base: './components' })
    .pipe(sassGlob())
    .pipe(gulpPrettier())
    .pipe(postcss())
    .pipe(gulp.dest('./components'));
}

// CSS
export function sassTask() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sassGlob())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(pxtorem(pxToRemOptions))
    .pipe(autoprefixer())
    .pipe(postcss())
    .pipe(gulpPrettier())
    .pipe(gulp.dest('./css'));
}

export function componentsTask() {
  return gulp.src('./components/*/sass/**/*.scss', { base: './components' })
    .pipe(sassGlob())
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(pxtorem(pxToRemOptions))
    .pipe(autoprefixer())
    .pipe(postcss())
    .pipe(gulpPrettier())
    .pipe(rename(path => {
      path.dirname = path.dirname.replace('sass', '.');
    }))
    .pipe(gulp.dest('./components'));
}

// WATCH
export function watchFiles() {
  gulp.watch('./sass/**/*.scss', gulp.series(sassTask));
  gulp.watch('./components/*/sass/**/*.scss', gulp.series(componentsTask));
}

// DEFAULT
gulp.task('default', gulp.series(sassTask, componentsTask, watchFiles));

// TASKS
gulp.task('scss', gulp.series(sassPrettier, componentsPrettier));
gulp.task('sass', gulp.series(sassTask, componentsTask));
