'use strict';
var favorloca = favorloca || {};
favorloca.module = function(name, deps) {
    var module;
    deps = deps || ['favorloca.services'];
    try {
        module = angular.module(name);
    }
    catch(e) {
        module = angular.module(name, deps);
    }
    return module;
};

