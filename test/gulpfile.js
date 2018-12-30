'use strict';

// A simple gulpfile for manual testing

const gulp = require('gulp');
const del = require('del');
const chromeManifestIconify = require('../');

const clean = () => del('build');
const iconify = () => gulp.src('test-icon.png')
    .pipe(chromeManifestIconify({
        manifest: 'manifests/manifest.json',
        resizeMode: 'nearest'
    }))
    .pipe(gulp.dest('build'));
const build = gulp.series(clean, iconify);

exports.clean = clean;
exports.build = build;
exports.default = build;
