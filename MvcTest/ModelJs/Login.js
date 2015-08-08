function loginModel($scope,$http,$location,$window) {

    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';

    $scope.UserLogin = {
        "username": "atul.sharma@exp-inc.com",
        "password": "exp2000E",
        "clientID":"0"
    }
    $scope.data = {};
    $scope.errorMessage = "";

    $scope.Login = function () {
        $http.post(urlBase + 'authenticateUser', $scope.UserLogin)
            .success(function (data, status, header, config) {
                if (data.statusCode == true) {
                    if (angular.isUndefined(data.data.prodUrl) || data.data.prodUrl == null || data.data.prodUrl != "") {
                        $scope.UserLogin.clientID = data.data.clientID;
                        $scope.Login();
                        $scope.errorMessage = data.statusMessage;

                    } else {
                        $scope.data = data;
                        $window.sessionStorage.token = header("Auth_Token");

                        // change the path
                        $window.location.href = 'CustomerUI/GetList';
                    }
                }
                else {
                    $scope.errorMessage = data.statusMessage;
                }
            }).error(function (error) {
                $scope.errorMessage = error;
            });
    }


}