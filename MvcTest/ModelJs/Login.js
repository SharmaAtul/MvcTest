function loginModel($scope, $http, $location, $window, rememberMe, encryptModule) {

    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';

    $scope.UserLogin = {
        //"username": "atul.sharma@exp-inc.com",
        //"password": "exp2000E",
        //"clientID":"0"
    }
    $scope.data = {};
    $scope.errorMessage = "";

    $scope.remember = false;
    if (rememberMe('username') && rememberMe('password')) {
        $scope.remember = true;
        $scope.UserLogin.username = rememberMe('username');
        $scope.UserLogin.password = rememberMe('password'); //encryptModule.decode(rememberMe('password'));
        $scope.UserLogin.clientID = rememberMe('clientID');
    }
    $scope.rememberMeChk = function () {
        if ($scope.remember) {
            rememberMe('username', $scope.UserLogin.username);
            rememberMe('password', $scope.UserLogin.password); //encryptModule.encode($scope.UserLogin.password));
            rememberMe('clientID', $scope.UserLogin.clientID);
        } else {
            rememberMe('username', '');
            rememberMe('password', '');
            rememberMe('clientID', '0');
        }
    };

    $scope.form = {}
    $scope.submitted = false;
    $scope.resultData = {};
    $scope.isSuccess = false;

    $scope.testFunction = function (num1, num2) {
        return (num1 + num2);
    }

    $scope.validateUserLoginData = function ()
    {
        if (!$scope.form.userLoginForm.$valid) {
            $scope.submitted = true;
            return;
        } else {
            if ($scope.remember)
                $scope.rememberMeChk();

            $scope.Login();
        }
    }

    //$window.sessionStorage.masterData = null;
    $scope.Login = function () {
        $http.post(urlBase + 'authenticateUser', $scope.UserLogin)
            .success(function (data, status, header, config) {
                if (data.statusCode == true) {
                    if (data.data.prodUrl != "") {
                        $scope.UserLogin.clientID = data.data.clientID;
                        $scope.Login();
                        $scope.errorMessage = data.statusMessage;
                        
                        if ($scope.remember)
                            rememberMe('clientID', $scope.UserLogin.clientID);

                    } else {
                        $scope.resultData = data;
                        $scope.isSuccess = true;
                        $window.sessionStorage.token = header("Auth_Token");

                        if ($scope.remember)
                            rememberMe('clientID', 0);
                        
                        $scope.LoadMasterData();
                        // change the path
                        $window.location.href = '../CustomerUI/GetList';
                    }
                }
                else {
                    $scope.errorMessage = data.statusMessage;
                }
            }).error(function (error) {
                $scope.errorMessage = error;
            });
    }

    
    $scope.LoadMasterData = function () {
        $http.get(urlBase + "getMasterData/abc")
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $scope.data.locationModels = result.data.locationModels;
                $scope.data.locationLevelModel = result.data.locationLevelModel;
                $scope.data.personClassModels = result.data.personClassModels;
                $scope.data.safetyObservationType = result.data.safetyObservationType;
                $scope.data.recommendationLevelModels = result.data.recommendationLevelModels;
                $scope.data.currencies = result.data.currencies;
                $scope.data.soTourDynamicQuestions = result.data.soTourDynamicQuestions;
                $scope.data.soTourResultDynamicQuestions = result.data.soTourResultDynamicQuestions;
                $scope.data.unitGroupTypes = result.data.unitGroupTypes;

                $window.sessionStorage.masterData = JSON.stringify($scope.data);
            }
        })
    }
}

function encryptModule() {
    /* jshint ignore:start */
  
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
  
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
  
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
  
                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
  
            return output;
        },
  
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
  
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
  
            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));
  
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
  
                output = output + String.fromCharCode(chr1);
  
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
  
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
  
            } while (i < input.length);
  
            return output;
        }
    };
  
    /* jshint ignore:end */
}