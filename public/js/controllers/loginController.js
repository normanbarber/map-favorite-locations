'use strict';
favorloca.module('favorloca.controllers', [])
	.controller('Login', function($rootScope, $log, $scope, $location, httpService, userDataCache){

        var userData = {
            get:function(){
                if(userDataCache.get('userdata') !== null)
                    return userDataCache.get('userdata');
            }
        };

        $scope.isLoggedIn = false;
        $scope.login = {username: ''};
        $scope.disabled = true;
        $scope.userLogin = function(){
            httpService.post('/login', $scope.login)
                .success(function(user, headers, status){
                    if(user.status === 'error'){
                        $scope.loginerror = user.error;
                        $log.debug('searchresults service error');
                    }
                    else{
                        $log.info(user);
                        userDataCache.put('userdata', user);
                        $rootScope.$broadcast('userLoggedIn');
                        $location.path('/welcome');
                    }
                })
                .error(function(error){
                    $log.debug('searchresults service error');
                });
        };

        $scope.$on('userLoggedIn', function () {
            $scope.isLoggedIn = true;

        });

	});