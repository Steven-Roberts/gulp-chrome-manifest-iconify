# gulp-chrome-manifest-iconify

[![NPM version](https://img.shields.io/npm/v/gulp-chrome-manifest-iconify.svg?style=flat)](https://www.npmjs.com/package/gulp-chrome-manifest-iconify)
[![node](https://img.shields.io/node/v/gulp-chrome-manifest-iconify.svg)](https://www.npmjs.com/package/gulp-chrome-manifest-iconify)
[![Build Status](https://travis-ci.org/Steven-Roberts/gulp-chrome-manifest-iconify.svg?branch=master)](https://travis-ci.org/Steven-Roberts/gulp-chrome-manifest-iconify)
[![Coverage Status](https://coveralls.io/repos/github/Steven-Roberts/gulp-chrome-manifest-iconify/badge.svg?branch=master)](https://coveralls.io/github/Steven-Roberts/gulp-chrome-manifest-iconify?branch=master)
[![dependencies Status](https://david-dm.org/Steven-Roberts/gulp-chrome-manifest-iconify/status.svg)](https://david-dm.org/Steven-Roberts/gulp-chrome-manifest-iconify)
[![devDependencies Status](https://david-dm.org/Steven-Roberts/gulp-chrome-manifest-iconify/dev-status.svg)](https://david-dm.org/Steven-Roberts/gulp-chrome-manifest-iconify?type=dev)

A [Gulp](https://github.com/gulpjs/gulp) plugin for
[chrome-manifest-iconify](https://github.com/Steven-Roberts/chrome-manifest-iconify)

When creating a Chrome extension, you need to provide a set of icons for context menus, browser actions, page actions, and the Chrome Web Store. Usually, these are just resized versions of the same image. The goal of gulp-chrome-manifest-iconify is to intellegently automate the tedious process of generated all these resized clones. In a [Gulp](https://github.com/gulpjs/gulp) task, simply pipe this plugin a master icon and indicate the path to a v2 manifest. It will parse the manifest to determine the sizes, names, types, and paths of the icons it needs to generate. You can choose from several resizing algorithms as provide by [Sharp](https://sharp.dimens.io/en/stable/) so your entire icon set looks awesome.

## Installation

```shell
npm install --save-dev gulp-chrome-manifest-iconify
```

## API

<a name="module_gulp-chrome-manifest-iconify"></a>

### gulp-chrome-manifest-iconify
The gulp-chrome-manifest-iconify module

**Example**  
```js
const gulp = require('gulp');
const chromeManifestIconify = require('gulp-chrome-manifest-iconify');

gulp.task('default', () =>
    gulp.src('icon.png')
        .pipe(chromeManifestIconify({
            manifest: 'src/manifest.json',
            resizeMode: 'nearest'
        }))
        .pipe(gulp.dest('build')));
```
<a name="exp_module_gulp-chrome-manifest-iconify--module.exports"></a>

#### module.exports(options) ⇒ <code>Stream</code> ⏏
A Gulp plugin that generates icon set for a Chrome extension or app by
parsing the v2 manifest.

**Kind**: Exported function  
**Returns**: <code>Stream</code> - A Node stream that produces the icons  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>object</code> |  | The options for generating the icons |
| [options.manifest] | <code>string</code> | <code>&quot;manifest.json&quot;</code> | The path to the v2 manifest.json |
| [options.resizeMode] | <code>string</code> |  | The name of a [Sharp kernel](http://sharp.pixelplumbing.com/en/stable/api-resize) |


