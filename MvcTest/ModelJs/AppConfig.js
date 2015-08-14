

function authInterceptor($rootScope, $q, $window) {
    //var pleaseWaitDiv = $(" Please Wait <!– –> Processing );
    return {
        request: function (config) {
            $rootScope.loading = true;
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Auth_Token = $window.sessionStorage.token;
            }
            return config;
        },
        requestError: function (rejection) {
            $rootScope.loading = false;
            //$log.error('Request error:', rejection);
            return $q.reject(rejection);
        },
        response: function (response) {
            $rootScope.loading = false;
            if (response.status === 401) {
                // handle the case where the user is not authenticated
            }
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            $rootScope.loading = false;
            //$log.error('Response error:', rejection);
            return $q.reject(rejection);
        }
    };
}

function ngConfirmClick() {
    return {
        link: function (scope, element, attr) {
            var msg = attr.ngConfirmClick || "Are you sure?";
            var clickAction = attr.confirmedClick;
            element.bind('click', function (event) {
                if (window.confirm(msg)) {
                    scope.$apply(clickAction)
                }
            });
        }
    };
}


        function rememberMe() {
            function fetchValue(name) {
                var gCookieVal = document.cookie.split("; ");
                for (var i=0; i < gCookieVal.length; i++)
                {
                    // a name/value pair (a crumb) is separated by an equal sign
                    var gCrumb = gCookieVal[i].split("=");
                    if (name === gCrumb[0])
                    {
                        var value = '';
                        try {
                            value = angular.fromJson(gCrumb[1]);
                        } catch(e) {
                            value = unescape(gCrumb[1]);
                        }
                        return value;
                    }
                }
                // a cookie with the requested name does not exist
                return null;
            }
            return function(name, values) {
                if(arguments.length === 1) return fetchValue(name);
                var cookie = name + '=';
                if(typeof values === 'object') {
                    var expires = '';
                    cookie += (typeof values.value === 'object') ? angular.toJson(values.value) + ';' : values.value + ';';
                    if(values.expires) {
                        var date = new Date();
                        date.setTime( date.getTime() + (values.expires * 24 *60 * 60 * 1000));
                        expires = date.toGMTString();
                    }
                    cookie += (!values.session) ? 'expires=' + expires + ';' : '';
                    cookie += (values.path) ? 'path=' + values.path + ';' : '';
                    cookie += (values.secure) ? 'secure;' : '';
                } else {
                    cookie += values + ';';
                }
                document.cookie = cookie;
            }
        }
//Use this service in your login controller like this
//app.controller("LoginCtl", ["$scope", '$remember', function($scope, $remember){
//    $scope.remember = false;
//    if ($remember('username') && $remember('password') ) {
//        $scope.remember = true;
//        $scope.username = $remember('username');
//        $scope.password = $remember('password');
//    }
//    $scope.rememberMe = function() {
//        if ($scope.remember) {
//            $remember('username', $scope.username);
//            $remember('password', $scope.password);
//        } else {
//            $remember('username', '');
//            $remember('password', '');
//        }
//    };
//}]);