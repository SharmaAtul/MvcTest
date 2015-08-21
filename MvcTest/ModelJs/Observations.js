function Observations( $scope, $http, $location, $window) {
    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';
    //$rootScope.loading = true;
    $scope.displayFormat = 'MM-dd-yyyy';
    $scope.parserFormat = 'MM-dd-yyyy';
    //$scope.loading = true;
    $scope.observationData = [];
    $scope.totalCount = 100;
    $scope.maxSize = 5;

    $scope.observation = {
        "soTourID": "",
        "completed": "",
        "pending": "",
        "overdue": "",
        "completedColor": "",
        "pendingColor": "",
        "overdueColor": "",
        "reportNum": "",
        "tourDateTime": "",
        "details": "",
        "observationType": "",
        "createdBy": "",
        "locationPath": "",
        "locationID": ""
    }

    $scope.filterData = {
        "dLocationID": 0,
        "fromDate": "01-01-2010",
        "toDate": "07-30-2017",
        "pageNumber": 1,
        "pageSize": 10,
        "createdBy": 0,
        "details": "",
        "obsMethod": 0
    }
    $scope.data = {};

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
            }
        })
    }

    $scope.$watch("observationData", function () {
        
        for (var i = 0; i < $scope.observationData.length; i++)
        {
            var obs = $scope.observationData[i];
            obs.completedColor = $scope.getCompletedColor(obs.completed);
            obs.pendingColor = $scope.getPendingColor(obs.pending);
            obs.overdueColor = $scope.getOverdueColor(obs.overdue);
        }
    });

    $scope.onConfirmOK = function () {
        alert('OK');
    }
    //$rootScope.loading = false;

    $scope.LoadData = function () {
        $http.post(urlBase + "GetSOTList", $scope.filterData)
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $scope.observationData = result.data;
            }
        })
    }

    $scope.GetDetail = function (id) {
        $window.sessionStorage.masterData =  JSON.stringify($scope.data);
        $window.location.href = 'GetDetail#?id=' + id;
    }

    $scope.getCompletedColor = function (val) {
        if (val == 0)
            return 'gray';
        else
            return 'green';
    }

    $scope.getPendingColor = function (val) {
        if (val == 0)
            return 'gray';
        else
            return 'blue';
    }

    $scope.getOverdueColor = function (val) {
        if (val == 0)
            return 'gray';
        else
            return 'red';
    }

    if (angular.isUndefined($window.sessionStorage.masterData) || $window.sessionStorage.masterData === null || $window.sessionStorage.masterData=="{}")
        $scope.LoadMasterData();
    else
    {
        var data = JSON.parse($window.sessionStorage.masterData);
        //var data = $window.sessionStorage.data;
        $scope.data.locationModels = data.locationModels;
        $scope.data.locationLevelModel = data.locationLevelModel;
        $scope.data.personClassModels = data.personClassModels;
        $scope.data.safetyObservationType = data.safetyObservationType;
        $scope.data.recommendationLevelModels = data.recommendationLevelModels;
        $scope.data.currencies = data.currencies;
        $scope.data.soTourDynamicQuestions = data.soTourDynamicQuestions;
        $scope.data.soTourResultDynamicQuestions = data.soTourResultDynamicQuestions;
        $scope.data.unitGroupTypes = data.unitGroupTypes;
    }

    $scope.LoadData();
    $scope.loading = false;
}

