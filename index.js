'use strict';

/**
 * The gulp-chrome-manifest-iconify module
 * @module gulp-chrome-manifest-iconify
 * @example
 * const gulp = require('gulp');
 * const chromeManifestIconify = require('gulp-chrome-manifest-iconify');
 *
 * gulp.task('default', () =>
 *     gulp.src('icon.png')
 *         .pipe(chromeManifestIconify({
 *             manifest: 'src/manifest.json',
 *             resizeMode: chromeManifestIconify.ResizeMode.HERMITE
 *         }))
 *         .pipe(gulp.dest('build')));
 */

// Local Imports
const pluginName = require('./package.json').name;

// NPM Imports
const through2 = require('through2');
const gutil = require('gulp-util');
const chromeManifestIconify = require('chrome-manifest-iconify');
const Promise = require('bluebird');
const path = require('path');

/**
 * A Gulp plugin that generates icon set for a Chrome extension or app by
 * parsing the v2 manifest.
 * @borrows module:chrome-manifest-iconify.ResizeMode as ResizeMode
 * @param {object} options - The options for generating the icons
 * @param {string} [options.manifest=manifest.json] - The path to the v2
 * manifest.json
 * @param {module:gulp-chrome-manifest-iconify.ResizeMode}
 * [options.resizeMode=ResizeMode.BILINEAR] - The algorithm for resizing the
 * master Icon
 * @returns {Stream} A Node stream that produces the icons
 */
module.exports = (options) =>
    through2.obj(function transform (file, enc, cb) {
        if (file.isStream()) {
            cb(new gutil.PluginError(pluginName, 'Streams are not supported'));

            return;
        }

        if (file.isNull()) {
            cb();

            return;
        }

        // Create the options object by merging properties
        const actualOptions = Object.assign({
            // If no manifest is provided, use this as the default
            manifest: 'manifest.json'
        }, options, {
            // Always use the file contents for the masterIcon property
            masterIcon: file.contents
        });

        Promise.try(chromeManifestIconify.async.bind(null, actualOptions))
            .then((icons) => {
                // eslint-disable-next-line no-invalid-this
                icons.forEach((i) => this.push(new gutil.File({
                    path: i.path,
                    contents: i.contents,
                    base: path.dirname(options.manifest)
                })));
            })
            .then(cb, (err) => {
                cb(new gutil.PluginError(pluginName, err));
            });
    });

module.exports.ResizeMode = chromeManifestIconify.ResizeMode;
