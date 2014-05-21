'use strict';
favorloca.module('favorloca.controllers', [])
	.controller('Signup', function($rootScope, $scope, $log, $location, httpService, userDataCache){
        $scope.frienderror = null;
//        $scope.user = user.data;

        $scope.signUpUser = function(){
            httpService.post('/signup', $scope.signup)
                .success(function(user){
                    if(user.status === 'error'){
                        $scope.signuperror = user.error;
                        $location.path('/signup');
                        $log.debug('signup error');
                    }
                    else{
                        userDataCache.put('userdata', user);
                        $location.path('/welcome');
                        $rootScope.$broadcast('userLoggedIn');
                    }
                })
                .error(function(error){
                    $log.debug('at error on client');
                    $log.debug('http service error posting to signup. Error Msg: ' + error);
                });
        }
	});
