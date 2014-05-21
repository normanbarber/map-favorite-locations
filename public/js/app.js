'use strict';
favorloca.module('favorloca', ['favorloca.controllers', 'favorloca.services', 'favorloca.directives', 'ngRoute', 'ngCookies'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/',
            {
                templateUrl: 'login',
                controller: 'Login'
            })
            .when('/welcome',
            {
                templateUrl: 'welcome',
                controller: 'Welcome'
            })
            .when('/signup',
            {
                templateUrl: 'signup',
                controller: 'Signup'
            });
        $routeProvider
            .otherwise({redirectTo: '/'});
        $locationProvider
            .html5Mode(true);
    }]);