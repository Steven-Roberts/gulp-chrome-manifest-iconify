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
 *             resizeMode: 'nearest'
 *         }))
 *         .pipe(gulp.dest('build')));
 */

const {name} = require('./package.json');
const {async} = require('chrome-manifest-iconify');
const {dirname} = require('path');
const {Transform} = require('stream');
const PluginError = require('plugin-error');
const Vinyl = require('vinyl');

/**
 * A Gulp plugin that generates icon set for a Chrome extension or app by
 * parsing the v2 manifest.
 * @param {object} options - The options for generating the icons
 * @param {string} [options.manifest=manifest.json] - The path to the v2
 * manifest.json
 * @param {string} [options.resizeMode] - The name of a
 * {@link http://sharp.pixelplumbing.com/en/stable/api-resize Sharp kernel}
 * @returns {Stream} A Node stream that produces the icons
 */

module.exports = (options) => {
    const actualOptions = {
        manifest: 'manifest.json',
        ...options
    };
    const base = dirname(actualOptions.manifest);
    const iconToFile = async (icon) => new Vinyl({
        path: icon.path,
        contents: await icon.contents,
        base
    });

    return new Transform({
        objectMode: true,
        transform (file, enc, cb) {
            if (file.isStream()) {
                cb(new PluginError(name, 'Streams are not supported'));

                return;
            }

            if (file.isNull()) {
                cb();

                return;
            }

            async({
                ...actualOptions,
                masterIcon: file.contents
            })
                .then(async (icons) => {
                    const files = await Promise.all(icons.map(iconToFile));
                    for (const f of files) {
                        this.push(f);
                    }
                })
                .then(
                    () => cb(),
                    (err) => cb(new PluginError(name, err))
                );
        }
    });
};
