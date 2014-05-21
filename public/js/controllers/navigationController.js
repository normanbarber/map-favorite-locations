"use strict";
favorloca.module('favorloca.controllers', [])
    .controller('NavigationController', function($rootScope, $scope, $log){

        function toggleDisabled(boolean) {
            $scope.disabled = (boolean) ? "disabled" : "";
        }
        toggleDisabled(true);

        $scope.toggleModal = function (e, boolean) {
            e.preventDefault();
            $rootScope.$broadcast("menuClick");
        };

        $scope.$on("userLoggedIn", function () {
                toggleDisabled();
        });

});

