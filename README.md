# invoke-filter

Status:
[![npm version](https://img.shields.io/npm/v/invoke-filter.svg?style=flat-square)](https://www.npmjs.org/package/invoke-filter)
[![npm downloads](https://img.shields.io/npm/dm/invoke-filter.svg?style=flat-square)](http://npm-stat.com/charts.html?package=invoke-filter&from=2015-08-01)
[![Build Status](https://img.shields.io/travis/kentcdodds/invoke-filter.svg?style=flat-square)](https://travis-ci.org/kentcdodds/invoke-filter)
[![Code Coverage](https://img.shields.io/codecov/c/github/kentcdodds/invoke-filter.svg?style=flat-square)](https://codecov.io/github/kentcdodds/invoke-filter)

An optimization for calling pure functions in the template of an Angular application

## Installation

You can get this via:

```
npm install --save invoke-filter
```

Then add the dependency to your project:

### Using CommonJS

```javascript
var yourApp = angular.module('yourModule', [
  require('invoke-filter');
]);
```

### Using AMD

```javascript
define(['invoke-filter'], function(invokeFilter) {
  var yourApp = angular.module('yourModule', [invokeFilter]);
});
```

### Using Global

```javascript
var yourApp = angular.module('yourModule', [invokeFilter]);
```

## Usage

In your template, instead of doing this:

```html
<div>{{vm.someFunctionOnYourController(vm.a, 'foo', vm.arg3)}}</div>
```

Do this:

```html
<div>{{vm.someFunctionOnYourController | invoke:vm.a:'foo':vm.arg3}}</div>
```

## Why is this better?

One benefit to using filters is that as of
[Angular
1.3](https://github.com/angular/angular.js/blob/master/CHANGELOG.md#130-rc2-tactile-perception-2014-09-16),
all filters are considered "stateless" (ie "pure functions") by default. This means that if the inputs don't change,
then Angular wont call the filter. So if your controller function is a stateless function (returns the same output for a
given input), then you can pass it to this `invoke` filter and your function will only be called when the inputs change.

This is definitely a performance optimization and I recommend you make certain that you really need it. This is likely
most useful for functions that make complex computations or if you use it a lot (like in an `ng-repeat`).

