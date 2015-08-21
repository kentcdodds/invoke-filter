import angular from 'angular';

const ngModuleName = 'invokeFilter';
export default ngModuleName;

const ngModule = angular.module(ngModuleName, []);
ngModule.filter('invoke', () => invokeFilter);

function invokeFilter(fn, ...remainingArgs) {
  fn(...remainingArgs);
}

