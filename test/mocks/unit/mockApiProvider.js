(function () {
	'use strict';
    favorloca.module('favorloca.services')
		.factory('httpService', ['$timeout', '$log', '$rootScope', '$q', 'mockDataService', function ($timeout, $log, $scope, $q, mockDataService) {
			var Service = {}, deferred;

			Service.callFunction = function (method, action, params) {
				var data = { result: {} };
				if(action === 'login'){
					data.result = mockDataService.login;
					return data;
				}
				if(action === 'signup'){
					data.result = mockDataService.signup;
					return data;
				}
				if(action === 'signuperror_invalidusername'){
					data.result = mockDataService.signuperror_invalidusername;
					return data;
				}
				if(action === 'signuperror_password'){
					data.result = mockDataService.signuperror_password;
					return data;
				}
				if(action === 'signuperror_nousername'){
					data.result = mockDataService.signuperror_nousername;
					return data;
				}


				deferred = $q.defer();
				setTimeout(function () {
					$scope.$apply(deferred.resolve(
						data
					));
				}, 100);
				return deferred.promise;
			};
			return Service;
		}]);
})();



