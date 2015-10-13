'use strict';

// Declare app level module which depends on views, and components
angular.module('Arq0', [
  'ngRoute',
  'Neangular.neander'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/neander'});
}]);
