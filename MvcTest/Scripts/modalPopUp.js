function modalPopUp($scope, $modalInstance, $modal, $http, items) {
    //$scope.user = data;
    //alert(data.myName.toString());
    //$scope.items = items;
    //$scope.selected = {
    //    item: $scope.items[0]
    //};

    $scope.priorityList = [
        {
            priorityID: 1,
            priority: 'Low'
        }, {
            priorityID: 2,
            priority: 'Medium'
        }, {
            priorityID: 3,
            priority: 'High'
        }, {
            priorityID: 4,
            priority: 'Very High'
        }
    ]

    $scope.recommendationLevels = [
        {
            recommendationLevelID: 1,
            recommendationLevel:'Level - 1'
        }, {
            recommendationLevelID: 2,
            recommendationLevel: 'Level - 2'
        }, {
            recommendationLevelID: 3,
            recommendationLevel: 'Level - 3'
        }, {
            recommendationLevelID: 4,
            recommendationLevel: 'Level - 4'
        }, {
            recommendationLevelID: 5,
            recommendationLevel: 'Level - 5'
        },
    ]

    $scope.currencyList = [
            {
                methodID: 103,
                methodName: "USD"
            },
            {
                methodID: 104,
                methodName: "INR"
            },
            {
                methodID: 105,
                methodName: "EUR"
            }
    ]

    $scope.actionItem = items;
    //$scope.selected = {
    //    item: $scope.items[0]
    //};
    $scope.searchTerm = '';
    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';
    $scope.getUsers = function ()
    {
        var data = {
            dLocationID: 0,
            moduleName: '',
            searchTerm: $scope.searchTerm,
            workgroupID: 0,
            getInactive: true
        };

        $http.post(urlBase + "searchUsersByLocation", data)
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $scope.userData = result.data;
            }
        })
    }

    $scope.updateModel = function (updatedModel)
    {
        $scope.userData = updatedModel;
    }

    $scope.selectUser = function ()
    {
        $modalInstance.close($scope.userData);
    }

    $scope.ok = function () {
        $modalInstance.close($scope.actionItem);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  
    $scope.searchUser = function (size) {
        var modalInstance = $modal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: 'userModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return $scope.actionItem.assignedTo;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.actionItem.assignedTo = selectedItem[0];
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchApprover = function (size) {
        var modalInstance = $modal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: 'userModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return $scope.actionItem.approver;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.actionItem.approver = selectedItem[0];
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addCCUser = function (size) {
        if (!$scope.actionItem.ccUsers)
            $scope.actionItem.ccUsers = [];

        var modalInstance = $modal.open({
            //animation: $scope.animationsEnabled,
            templateUrl: 'userModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return $scope.actionItem.ccUsers;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.actionItem.ccUsers.push( selectedItem[0]);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.onCCUserDelete = function (indexToRemove)
    {
        $scope.actionItem.ccUsers.splice(indexToRemove-1, 1);
    }

    //$scope.hitEnter = function(evt){
    //    if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
    //        $scope.save();
    //}; // end hitEnter
}