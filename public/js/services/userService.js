'use strict';
favorloca.module('favorloca.services', ['ngCookies']).factory('user', ['$cookies', function($cookies) {
    function run(m1, m2, s) {
      if (window[m1]) { return window[m1](s); } else { return base64[m2](s); }
    }

    var user = { };
    try {
        user.data = JSON.parse(run('atob', 'decode', $cookies.userData));
    }
    catch(err) {}

    user.atob = function(s) { return run('atob', 'decode', s); };
    user.btoa = function(s) { return run('btoa', 'encode', s); };

    return user;
  }]);
