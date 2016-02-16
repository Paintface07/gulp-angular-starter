(function() {
  'use strict';

  angular.module('app').controller('RootController', rootController);

  rootController.$inject = ['RootService'];

  function rootController(rootService) {
    var vm = this;
    vm.myVal = '';

    getTestMessage();

    function getTestMessage() {
      rootService.getMessage().then(function success(response) {
        vm.myVal = response.data;
        console.log(response);
      }, function error(response) {
        vm.myVal = data.status;
        console.log(response);
      });
    }
  }

})();
