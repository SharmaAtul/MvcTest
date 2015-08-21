describe('myapp', function () {
    beforeEach(angular.mock.module('myapp'));
    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';
    var $httpBackend, $rootScope, $controller, authRequestHandler;

    beforeEach(inject(function ($injector) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');
        // backend definition common for all tests
        authRequestHandler = $httpBackend.when('POST', urlBase + 'authenticateUser', undefined)
                               .respond({ data: {}, statusCode: true }, { 'Auth_Token': 'test' });

        // Get hold of a scope (i.e. the root scope)
        $rootScope = $injector.get('$rootScope');
        // The $controller service is used to create instances of controllers
        $controller = $injector.get('$controller');
        //$controller = _$controller_;
        //createController = function () {
        //    return $controller('loginModel', { '$scope': $rootScope });
        //};
    }));

    //beforeEach(angular.mock.inject(function (_$controller_) {
    //    $controller = _$controller_;
    //}));

    describe('loginModel', function () {

        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('loginModel', { $scope: $scope });
        });

        it('test user login', function () {
            expect($scope.testFunction(2, 2)).not.toBeNull(4);
        });

        it('should send msg to server', function () {
            //var controller = createController();


            $scope.UserLogin = {
                username: "atul.sharma@exp-inc.com",
                password: "exp2000E",
                clientID: 0
            };

            // now you don’t care about the authentication, but
            // the controller will still send the request and
            // $httpBackend will respond without you having to
            // specify the expectation and response for this request

            $httpBackend.expectPOST(urlBase + 'authenticateUser', $scope.UserLogin).respond({ data: { prodUrl: "" }, statusCode: true }, 201, { 'Auth_Token': 'test' });

            $scope.Login();
            $httpBackend.flush();
            //expect($scope.status).toBe('Saving...');
            //$httpBackend.flush();
            //expect($scope.status).toBe('');
        });
    });
});