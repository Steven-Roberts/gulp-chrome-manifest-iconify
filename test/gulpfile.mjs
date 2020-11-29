// A simple gulpfile for manual testing

import gulp from 'gulp';
import del from 'del';
import chromeManifestIconify from '../index.js';

const clean = () => del('build');
const iconify = () => gulp.src('test-icon.png')
  .pipe(chromeManifestIconify({
    manifest: 'manifests/manifest.json',
    resizeMode: 'nearest'
  }))
  .pipe(gulp.dest('build'));
const build = gulp.series(clean, iconify);

export { clean, build, build as default };
