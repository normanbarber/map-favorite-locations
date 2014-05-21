'use strict';
favorloca.module('favorloca.services', [])
	 .factory('httpService', function($http) {
		var service = {};

		angular.forEach(['get', 'delete', 'head', 'jsonp'], function(name){
			service[name] = function(url){
				return $http[name](url);
			};
		});
		angular.forEach(['post', 'put'], function(name){
			service[name] = function(url, data){
				return $http[name](url, data);
			};
		});
		return service;
});