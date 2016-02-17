(function() {
    'use strict';

    angular.module('app').config(appConfig);

    appConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function appConfig($stateProvider, $urlRouterProvider) {

        $stateProvider.state('home', {
            url: '/',
            views: {
                'layout' : {
                    controller: 'RootController as rc',
                    templateUrl: './root/main.layout.html'
                }
            }
        });

        $urlRouterProvider.otherwise('/');

        console.log($stateProvider.state);
        console.log($urlRouterProvider);
    }
})();