const { src, dest, series, parallel, watch } = require('gulp');
const browserSync = require('browser-sync').create();
const pkg = require('./package.json');

// Copy third party libraries from /node_modules into /vendor
function vendor(done) {
  // Bootstrap
  src([
      './node_modules/bootstrap/dist/**/*',
      '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
      '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(dest('./vendor/bootstrap'))

  // jQuery
  src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(dest('./vendor/jquery'))

  // jQuery Easing
  src([
      'node_modules/jquery.easing/*.js'
    ])
    .pipe(dest('vendor/jquery-easing'));

  done();
}


// Watch task
function watchTask() {
  watch('./css/*.css', browserSync.reload);
  watch('./js/*.js', browserSync.reload);
  watch('./*.html', browserSync.reload);
}

// Default task
const defaultTask = series(vendor);

// Dev task
const dev = series(browserSyncTask, watchTask);

exports.vendor = vendor;
exports.browserSync = browserSyncTask;
exports.watch = watchTask;
exports.default = defaultTask;
exports.dev = dev;
