import angular from 'angular';

const ngModuleName = 'invokeFilter';
const ngModule = angular.module(ngModuleName, []);
ngModule.filter('invoke', () => invokeFilter);

function invokeFilter(fn, ...remainingArgs) {
  return fn(...remainingArgs);
}

export default ngModuleName;
