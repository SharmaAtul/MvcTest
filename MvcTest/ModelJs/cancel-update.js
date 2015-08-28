angular.module('app').compileProvider.directive("cancelUpdate", function () {
    return {
        restrict: 'A',
        scope: {
            undoChanges: "&"
        },
        link: function (scope, element, attributes) {
            element.bind('click', function (e) {
                scope.undoChanges();
                scope.$apply();
            });
        }
    };
});