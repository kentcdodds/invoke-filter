/* eslint-env node */
var path = require('path');

var _ = require('lodash');
var here = require('path-here');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

var coverage = process.env.COVERAGE === 'true';
var ci = process.env.NODE_ENV === 'test:ci';
if (coverage) {
  console.log('-- recording coverage --');
}

var webpackConfig = require('./webpack.config');
var entry = path.join(webpackConfig.context, webpackConfig.entry);
var preprocessors = {};
preprocessors[entry] = ['webpack'];

module.exports = function(config) {
  var defaultConfig = config.set({
    basePath: './',
    frameworks: ['sinon-chai', 'chai', 'mocha', 'sinon'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      entry
    ],
    exclude: [],
    preprocessors: preprocessors,
    reporters: getReporters(),
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'}
      ]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: !ci,
    browsers: ['Firefox'],
    singleRun: ci,
    browserNoActivityTimeout: 180000,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sinon-chai',
      'karma-sinon',
      'karma-chai',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};

function getReporters() {
  var reps = ['progress'];
  if (coverage) {
    reps.push('coverage');
  }
  return reps;
}

