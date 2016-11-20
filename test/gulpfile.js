'use strict';

// A simple gulpfile for manual testing

const gulp = require('gulp');
const del = require('del');
const chromeManifestIconify = require('../');

gulp.task('clean', () => del('build'));

gulp.task('default', ['clean'], () =>
    gulp.src('test-icon.png')
        .pipe(chromeManifestIconify({
            resizeMode: chromeManifestIconify.ResizeMode.NEAREST_NEIGHBOR
        }))
        .pipe(gulp.dest('build')));
