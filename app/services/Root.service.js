(function() {
  'use strict';

  angular.module('app').service('RootService', rootService);

  rootService.$inject = ['$http'];

  return { rootService : rootService };

  function rootService($http) {
    this.getMessage = function() {
      return $http({method: 'GET', url: '/api'});
    };
  }
})();
