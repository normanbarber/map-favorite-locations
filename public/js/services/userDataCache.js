'use strict';
favorloca.module('favorloca.services', [])
	.factory('userDataCache', function($cacheFactory) {
		return $cacheFactory('favorlocacache');
	});
