function modalPopUp($scope, $modalInstance, $modal, $http, $document, items) {
    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';

    $scope.displayFormat = 'MM-dd-yyyy';
    $scope.parserFormat = 'MM-dd-yyyy';

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

    $scope.UpdateMultipleAnswer = function (questionModel, answerModel) {
        var multipleAnsIDs = questionModel.multipleAnswersIds.split(',');
        var multipleAns = questionModel.displayAnswer.replace('||', ',').split(',');

        var idx = $.inArray(answerModel.methodID.toString(), multipleAnsIDs);
        
        if (idx > -1) {
            multipleAnsIDs.splice(idx, 1);
            multipleAns.splice(idx, 1);
        }
        else {
            multipleAnsIDs.push(answerModel.methodID);
            multipleAns.push(answerModel.methodName);
        }

        questionModel.multipleAnswersIds = multipleAnsIDs.join(",");
        questionModel.displayAnswer = multipleAns.join("||");
    }

    $scope.UpdateAnswer = function (questionModel) {
        questionModel.answer = questionModel.displayAnswer;
    }

    $scope.recommendationLevels = []
    $scope.currencyList = []
    $scope.obsCategories = []
    $scope.obsClasses = []

    $scope.actionItem = {};
    $scope.obsResult = {};

    $scope.getObsResultDetail = function (soTourID, resultID) {
        $http.get(urlBase + "getObsResultDetails/+"+soTourID+"/"+resultID)
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $scope.obsResult = result.data;
                if (resultID == 0)
                {
                    $scope.obsResult.soCategory = "";
                    $scope.obsResult.classCode = "";
                    $scope.obsResult.lupClassId = 0;
                    $scope.obsResult.obsSubCategoryID = 0;
                    $scope.obsResult.obsCategoryID = 0;
                    $scope.obsResult.soTourID = items.soTourID;
                    $scope.obsResult.obsNum = items.obsNum;
                    $scope.obsResult.soTourResultID = 0;
                }
            }
        })
    }

    $scope.updateObsResultDetail = function () {
        $http.post(urlBase + "updateObsResult", $scope.obsResult)
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $scope.obsResult.soTourResultID = result.data;
                $modalInstance.close($scope.obsResult);
            }
        })
    }

    $scope.form = {};
    $scope.submitted = false;

    if (items.type == 'ActionItem') {

        $scope.actionItem = items.actionItem;
        $scope.recommendationLevels = items.recommendationLevels;
        $scope.currencyList = items.currencies;

        if ($scope.actionItem.actionID == -1)
            $scope.enableEdit = true;
        else
        {
            var datePart = $scope.actionItem.targetDate.toString().split('-');
            if (datePart.length > 2)
                $scope.actionItem.targetDate = new Date(parseInt(datePart[2]), parseInt(datePart[0]), parseInt(datePart[1]));

            datePart = $scope.actionItem.compDate.toString().split('-');
            if (datePart.length > 2)
                $scope.actionItem.compDate = new Date(parseInt(datePart[2]), parseInt(datePart[0]), parseInt(datePart[1]));

            datePart = $scope.actionItem.verifiedDate.toString().split('-');
            if (datePart.length > 2)
                $scope.actionItem.verifiedDate = new Date(parseInt(datePart[2]), parseInt(datePart[0]), parseInt(datePart[1]));

            if ($scope.actionItem.recommendationLevelID > 0) {
                var arrResult = $($scope.recommendationLevels).filter(function (i, n) { return n.lupID === $scope.actionItem.recommendationLevelID });
                if(arrResult.length>0){
                    $scope.actionItem.recommendationLevel = arrResult[0].lupValue
                }
            }
            $scope.enableEdit = false;
        }

        $scope.$watch("actionItem.priority", function () {
            if (!angular.isUndefined($scope.actionItem.priority))
            {
                var arrResult = $($scope.priorityList).filter(function (i, n) { return n.lupID === $scope.actionItem.priority });
                if (arrResult.length > 0) {
                    $scope.actionItem.priorityName = arrResult[0].lupValue
                }
            }
        });

        $scope.$watch("actionItem.recommendationLevelID", function () {
            if (!angular.isUndefined($scope.actionItem.recommendationLevelID))
            {
                var arrResult = $($scope.recommendationLevels).filter(function (i, n) { return n.lupID === $scope.actionItem.recommendationLevelID });
                if (arrResult.length > 0) {
                    $scope.actionItem.recommendationLevel = arrResult[0].lupValue
                }
            }
        });

        $scope.openTargetDate = function ($event) {
            $scope.openedTargetDt = true;
        };

        $scope.openCompletedDate = function ($event) {
            $scope.openedCompletedDt = true;
        };

        $scope.openVerifiedVDate = function ($event) {
            $scope.openedVerifiedDt = true;
        };

        $scope.$watch("actionItem.targetDate", function () {
            $scope.openedTargetDt = false;
        })

        $scope.$watch("actionItem.completedDate", function () {
            $scope.openedCompletedDt = false;
        })

        $scope.$watch("actionItem.verifiedDate", function () {
            $scope.openedVerifiedDt = false;
        })
    }
    else if (items.type == 'ObsResult') {
        //
        $scope.getObsResultDetail(items.soTourID, items.soTourResultID);
        
        $scope.obsCategories = items.obsCategories;
        $scope.obsClasses = items.obsClasses;
        $scope.soTourResultDynamicQuestions = items.soTourResultDynamicQuestions;
        $scope.enableEdit = true;

        $scope.updateCategory = function (categoryDC2)
        {
            var category = $scope.obsResult.soCategory.split('-');
            if (angular.isUndefined(category))
            { 
                $scope.obsResult.soCategory = categoryDC2;
            }
            else {
                category[0] = categoryDC2;
                $scope.obsResult.soCategory = category.join('-');
            } 
        }

        $scope.updateSubCategory = function (subCategoryLupValue)
        {
            var category = $scope.obsResult.soCategory.split('-');
            if(category.length>0)
            {
                category[1] = "> " + subCategoryLupValue;
                $scope.obsResult.soCategory = category.join('-');
            }
        }

        $scope.updateClass = function (classLupValue)
        {
            var selectedClass = classLupValue.split('-');
            if (angular.isUndefined(selectedClass)) {
                $scope.obsResult.classCode = classLupValue.split('-')[1];
            }
            else
                $scope.obsResult.classCode = classLupValue.split('-')[1];
        }
    }

    $scope.animationsEnabled = true;

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.myFile = args.file;
        });
    });

    $scope.searchTerm = '';
    
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

    $scope.selectedUser = {};

    $scope.updateSelectedUser = function (user)
    {
        $scope.selectedUser = user;
    }

    $scope.selectUser = function ()
    {
        $modalInstance.close($scope.selectedUser);
    }

    $scope.myFile;
    $scope.attachmentDescription;
    $scope.uploadAttachment = function ()
    {
        var attachmentObject = {}
        attachmentObject.file = $scope.myFile;
        attachmentObject.description = $scope.attachmentDescription
        $modalInstance.close(attachmentObject);
    }

    $(document).on('change', '.btn-file :file', function () {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $scope.ok = function () {
        if ($scope.form.actionItemForm.$valid) {
            $modalInstance.close($scope.actionItem);
        }
        else {
            $scope.submitted = true;
        }
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
  
    $scope.searchUser = function (size) {
        var item = {};
        item.modalTitle = "Search User";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'userModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (selectedUser) {
            //var selectedUser = JSON.parse(selectedItem);
            $scope.actionItem.assignedTo = selectedUser;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.searchApprover = function (size) {
        var item = {};
        item.modalTitle = "Search User";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'userModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (selectedUser) {
            //var selectedUser = JSON.parse(selectedItem);
            $scope.actionItem.approver = selectedUser;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addCCUser = function (size) {
        if (!$scope.actionItem.ccUsers)
            $scope.actionItem.ccUsers = [];
        var item = {};
        item.modalTitle = "Search User";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'userModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (selectedUser) {
            //var selectedUser = JSON.parse(selectedItem);
            $scope.actionItem.ccUsers.push(selectedUser);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.onCCUserDelete = function (indexToRemove)
    {
        $scope.actionItem.ccUsers.splice(indexToRemove, 1);
    }

    //$scope.hitEnter = function(evt){
    //    if(angular.equals(evt.keyCode,13) && !(angular.equals($scope.name,null) || angular.equals($scope.name,'')))
    //        $scope.save();
    //}; // end hitEnter
}