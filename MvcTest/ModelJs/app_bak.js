(function()
{
    var app = angular.module('app', ['ui.bootstrap','ngRoute']);

    app.factory('authInterceptor', ['$rootScope', '$window', function ($rootScope, $window) {

        // Active request count
        var requestCount = 0;

        function startRequest(config) {
            // If no request ongoing, then broadcast start event
            if (!requestCount) {
                $rootScope.$broadcast('httpLoaderStart');
            }
            config.headers = config.headers || {};

            if ($window.sessionStorage.token) {
                config.headers.Auth_Token = $window.sessionStorage.token;
            }

            requestCount++;
            return config;
        }

        function endRequest(arg) {
            // No request ongoing, so make sure we don’t go to negative count
            if (!requestCount)
                return;

            requestCount--;
            // If it was last ongoing request, broadcast event
            if (!requestCount) {
                $rootScope.$broadcast('httpLoaderEnd');
            }

            return arg;
        }

        // Return interceptor configuration object
        return {
            'request': startRequest,
            'requestError': endRequest,
            'response': endRequest,
            'responseError': endRequest
        };
    }]);

    app.directive('httpLoader', [function () {
        return {
            restrict: 'A',
            link: function (scope, element) {
                // Store original display mode of element
                var shownType = element.css('display');
                function hideElement() {
                    element.css('display', 'none');
                }

                scope.$on('httpLoaderStart', function () {
                    element.css('display', shownType);
                });

                scope.$on('httpLoaderEnd', hideElement);

                // Initially hidden
                hideElement();
            }
        };
    }]);

    app.directive('ngConfirmClick', [function () {
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
    }]);

    app.config(function ($routeProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, $locationProvider) {

        app.controllerProvider = $controllerProvider;
        app.compileProvider = $compileProvider;
        app.routeProvider = $routeProvider;
        app.filterProvider = $filterProvider;
        app.provide = $provide;

        $httpProvider.interceptors.push('authInterceptor');
        $locationProvider.html5Mode(true);
        //$sceDelegateProvider.resourceUrlWhitelist(['self', '**']);

        // Register routes with the $routeProvider
        $routeProvider.when('/', {
            templateUrl: 'Templates/Login', resolve: {
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies = [
                        'ModelJs/Login.js'
                    ];

                    $script(dependencies, function () {
                        // all dependencies have now been loaded by $script.js so resolve the promise
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });

                    return deferred.promise;
                }
            }

        }).when('/CustomerUI/GetList', {
            templateUrl: 'Templates/ObservationList', resolve: {
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies =
                    [
                        'ModelJs/Observations.js',
                        'ModelJs/logoutController.js'
                    ];

                    $script(dependencies, function () {
                        // all dependencies have now been loaded by $script.js so resolve the promise
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });

                    return deferred.promise;
                }
            }
        }).when("/CustomerUI/GetDetail/:id", {
            templateUrl: 'Templates/ObservationDetail', resolve: {
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies = [
                        'ModelJs/ObservationDetail.js',
                        'ModelJs/modalPopUp.js',
                        'ModelJs/cancel-update.js',
                        'ModelJs/dynamicQuestionDirective.js',
                        'ModelJs/locationDirective.js',
                        'ModelJs/fileUploader.js',
                        'ModelJs/FileSaver.min.js',
                        'ModelJs/logoutController.js',
                    ];

                    $script(dependencies, function () {
                        // all dependencies have now been loaded by $script.js so resolve the promise
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });

                    return deferred.promise;
                }
            }

        }).otherwise({redirectTo : "/" })
    });
})();