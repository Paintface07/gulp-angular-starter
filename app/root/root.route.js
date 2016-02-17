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
                },
                'header@home' : {
                    templateUrl: './header/main-header.html'
                },
                'footer@home' : {
                    templateUrl: './footer/main-footer.html'
                }
            }
        });

        $urlRouterProvider.otherwise('/');
    }
})();