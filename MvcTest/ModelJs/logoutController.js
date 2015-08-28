angular.module('app').controllerProvider.register('logoutController', ['$scope', '$window', '$location', '$state', function ($scope, $window, $location, $state) {
    $scope.logout = function () {
        $window.sessionStorage.clear();
        $state.go("Login");
    }
}]);