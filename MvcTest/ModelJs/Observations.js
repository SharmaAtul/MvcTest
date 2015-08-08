function Observations($scope, $http, $location, $window) {
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
        "fromDate": "01-01-2014",
        "toDate": "07-30-2015",
        "pageNumber": 1,
        "pageSize": 2,
        "createdBy": 0,
        "details": "",
        "obsMethod": 0
    }

    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';

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

    $scope.LoadData = function () {
        $http.post(urlBase + "GetSOTList", $scope.filterData)
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $scope.observationData = result.data;
            }
        })
    }

    $scope.GetDetail = function (id) {
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

    $scope.LoadData();

    //$scope.filteredTodos = [];
    //$scope.itemsPerPage = 25;
    //$scope.currentPage = 1;
    //$scope.totalItemCount = 0;

    //$scope.makeTodos = function () {
    //    $scope.todos = [];
    //    for (i = 1; i <= 1000; i++) {
    //        $scope.todos.push({ text: 'todo ' + i, done: false });
    //    }
    //};

    //$scope.figureOutTodosToDisplay = function () {

    //    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    //    var end = begin + $scope.itemsPerPage;
    //    $scope.filteredTodos = $scope.todos.slice(begin, end);
    //};

    //$scope.makeTodos();
    //$scope.figureOutTodosToDisplay();

    //$scope.pageChanged = function () {
    //    $scope.LoadData();
    //};
}

