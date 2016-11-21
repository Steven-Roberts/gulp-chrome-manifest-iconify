'use strict';

const chromeManifestIconify = require('../');
const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const streamAssert = require('stream-assert');

// Congifure Chai
const chai = require('chai');

chai.should();

const getPath = path.join.bind(null, __dirname);
const getManifestPath = getPath.bind(null, 'manifests');

describe('gulp-chrome-manifest-iconify', () => {
    it('should emit error on streamed files', (cb) => {
        gulp.src(getPath('test-icon.png'), {
            buffer: false
        })
            .pipe(chromeManifestIconify({
                manifest: getManifestPath('manifest.json')
            }))
            .on('error', (err) => {
                err.should.be.an.instanceOf(gutil.PluginError)
                    .and.have.property('message', 'Streams are not supported');
                cb();
            });
    });

    it('should let null files pass through', (cb) => {
        gulp.src(getPath('test-icon.png'), {
            read: false
        })
            .pipe(chromeManifestIconify({
                manifest: getManifestPath('manifest.json')
            }))
            .on('data', (chunk) => {
                cb(new Error(`Stream contains ${chunk}`));
            })
            .pipe(streamAssert.end(cb));
    });

    it('should emit error when icon generation fails', (cb) => {
        gulp.src(getPath('test-icon.png'))
            .pipe(chromeManifestIconify({
                manifest: Math.PI
            }))
            .on('error', (err) => {
                err.should.be.an.instanceOf(gutil.PluginError)
                    .and.have.property('message',
                        'The manifest path must be a string');
                cb();
            });
    });

    it('should generate icons', (cb) => {
        const expectedFilePaths = [
            getManifestPath('icon-16.png'),
            getManifestPath('icon-128.bmp'),
            getManifestPath('a', 'icon-38.jpg')
        ];

        gulp.src(getPath('test-icon.png'))
            .pipe(chromeManifestIconify({
                manifest: getManifestPath('manifest.json')
            }))
            .pipe(streamAssert.length(expectedFilePaths.length))
            .pipe(streamAssert.all((i) => {
                i.should.have.property('path')
                    .that.is.oneOf(expectedFilePaths);

                i.should.have.property('base', getManifestPath());

                i.should.have.property('contents')
                    .that.has.length.at.least(0)
                    .and.is.an.instanceOf(Buffer);
            }))
            .pipe(streamAssert.end(cb));
    });
});
