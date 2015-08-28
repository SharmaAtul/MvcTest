(function()
{
    var app = angular.module('app', ['ui.bootstrap','ui.router']);

    app.directive('updateTitle', ['$rootScope', '$timeout',
      function ($rootScope, $timeout) {
          return {
              link: function (scope, element) {

                  var listener = function (event, toState) {

                      var title = 'Default Title';
                      if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle;

                      $timeout(function () {
                          element.text(title);
                      }, 0, false);
                  };

                  $rootScope.$on('$stateChangeSuccess', listener);
              }
          };
      }
    ]);

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

    app.config(function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, $locationProvider) {

        app.controllerProvider = $controllerProvider;
        app.compileProvider = $compileProvider;
        //app.routeProvider = $routeProvider;
        app.filterProvider = $filterProvider;
        app.provide = $provide;

        $httpProvider.interceptors.push('authInterceptor');
        $locationProvider
            .html5Mode(true)
            .hashPrefix('!');
        //$rootScope.isDataLoaded = false;
        //$sceDelegateProvider.resourceUrlWhitelist(['self', '**']);

        // Register routes with the $routeProvider
        $stateProvider
            .state('Login', {
                url:"/",
                templateUrl: 'Templates/Login',
                resolve: {
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
                },
                data: {
                    pageTitle : "Login"
                }
            })
            .state('Default', {
                templateUrl: 'Templates/Default'
                , resolve: {
                    deps: function ($q, $rootScope) {
                        var deferred = $q.defer();
                        var dependencies =
                        [
                            'ModelJs/logoutController.js',
                            'ModelJs/breadcrumb-directive.js'
                        ];

                        $script(dependencies, function () {
                            // all dependencies have now been loaded by $script.js so resolve the promise
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });

                        return deferred.promise;
                    }
                },
                abstract: true,
                data: {
                    proxy: "Default.Home"
                }
            })
            .state("Default.Home", {
                templateUrl: "Templates/Home",
                url: "/Home",
                data: {
                    displayName: "Home",
                    pageTitle: "Home"
                }
            })
            .state('Default.Home.Observations', {
                templateUrl: 'Templates/Observation',
                
                abstract: true,
                data: {
                    proxy: "Default.Home.Observations.List"
                }
            })
            .state('Default.Home.Observations.List', {
                url: "/CustomerUI/GetList",
                templateUrl: 'Templates/ObservationList'
                , resolve: {
                    deps: function ($q, $rootScope) {
                        var deferred = $q.defer();
                        var dependencies =
                        [
                            'ModelJs/Observations.js'
                        ];

                        $script(dependencies, function () {
                            // all dependencies have now been loaded by $script.js so resolve the promise
                            $rootScope.$apply(function () {
                                deferred.resolve();
                            });
                        });

                        return deferred.promise;
                    }
                },
                data: {
                    displayName: "Observations",
                    pageTitle:"Observation List"
                }
            })
            .state("Default.Home.Observations.ObservationDetail", {
            url: "/CustomerUI/GetDetail/:id",
            templateUrl: 'Templates/ObservationDetail',
            resolve: {
                deps: function ($q, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies = [
                        'ModelJs/ObservationDetail.js',
                        'ModelJs/modalPopUp.js',
                        'ModelJs/cancel-update.js',
                        'ModelJs/dynamicQuestionDirective.js',
                        'ModelJs/locationDirective.js',
                        'ModelJs/fileUploader.js',
                        'ModelJs/FileSaver.min.js'
                    ];

                    $script(dependencies, function () {
                        // all dependencies have now been loaded by $script.js so resolve the promise
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });

                    return deferred.promise;
                }
            },
            data: {
                displayName: "Detail",
                pageTitle: "Observation Detail"
            }
        })
        $urlRouterProvider.otherwise("");
    });
})();