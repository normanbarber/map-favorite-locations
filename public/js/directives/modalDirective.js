favorloca.module('favorloca.directives', [])
    .directive('modalDir', function(){
    return {
        "scope": {
            "visible": "="
        },
        "transclude": true,
        "restrict": "C",
        "template": "<div data-ng-show='visible'><div class='modal' style='display: block;'><div class='modal-content ng-transclude'></div></div><div class='modal-backdrop' style='opacity: 0.45;'></div></div>",
        "controller": function ($scope) {
            $scope.close = function () {
                $scope.visible = false;
            };
        },
        "link": function (scope, element, attrs) {
            var modal = angular.element(element[0].getElementsByClassName("modal-content")),
                stage = angular.element(document);
            modal.css("width", attrs.width || "100%");
        }
    };
});
