function logoutController($scope, $window)
{
    $scope.logout = function ()
    {
        $window.sessionStorage.clear();
        $window.location.href = 'Login';
    }
}