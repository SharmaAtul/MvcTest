function ObservationDetail($rootScope, $scope, $http, $location, $window, $modal, fileUpload) {
    
    $scope.observation = {
        "details": "",
        "locationID": 0,
        "locationPath": "",
        "observationType": "",
        "safetyObservationTypeID": "",
        "peopleContacted": 0,
        "reportNum": "",
        "soTourTeam": [],
        "sotActionItems": [],
        "sotAttachments": [],
        "sotEditors": [],
        "sotDynamicQs": [],
        "sotMethodDynamicQs": [],
        "tourDateTime": ""
    }

    $scope.soTourTeamMember = {
        "isActive": false,
        "name": "",
        "personClassID": 0,
        "personClassName": "",
        "roleName": "",
        "soTourID": 0,
        "soTourTeamID": 0,
        "userEmail": "",
        "userID": 0
    }

    $scope.questionAnswer = {
        "answer": "",
        "answerId": 0,
        "displayAnswer": "",
        "isRequired": false,
        "multipleAnswersIds": "",
        "question": "",
        "questionId": 0,
        "questionType": "",
        "repeatQuestionID": 0,
        "unitGroupID": 0
    }

    $scope.questions = {
        "answer": "",
        "answerId": 0,
        "displayAnswer": "",
        "isRequired": false,
        "multipleAnswersIds": "",
        "question": "",
        "questionId": 0,
        "questionType": "",
        "repeatQuestionID": 0,
        "unitGroupID": 0
    }

    $rootScope.loading = true;

    $scope.obsMethods = {data:[]};

    $scope.questionMaster = [
        {
            questionID: 13057,
            data: [
                        {
                            methodID: 2485,
                            methodName: "Test"
                        },
                        {
                            methodID: 2486,
                            methodName: "Test-2"
                        },
                        {
                            methodID: 2487,
                            methodName: "Test-3"
                        }
            ]
        },
        {
            questionID: 19860,
            data: [
                        {
                            methodID: 12926,
                            methodName: "Yes"
                        },
                        {
                            methodID: 12927,
                            methodName: "No"
                        }
            ]
        },
        {
            questionID: 10571,
            data: [
                        {
                            methodID: 1176,
                            methodName: "Yes"
                        },
                        {
                            methodID: 1177,
                            methodName: "No"
                        }
            ]
        },
        {
        questionID: 2799,
        data: [
                    {
                        methodID: 548,
                        methodName: "Yes"
                    },
                    {
                        methodID: 549,
                        methodName: "No"
                    }
            ]
        },
        {
            questionID: 2800,
            data: [
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
        },
        {
            questionID: 19858,
            data: [
                    {
                        methodID: 12923,
                        methodName: "431"
                    },
                    {
                        methodID: 12924,
                        methodName: "432"
                    },
                    {
                        methodID: 12925,
                        methodName: "433"
                    }
            ]
        },
        {
            questionID: 2801,
            data: [
                    {
                        methodID: 5,
                        methodName: "KWh"
                    },
                    {
                        methodID: 6,
                        methodName: "MWh"
                    },
                    {
                        methodID: 7,
                        methodName: "Joule"
                    }
            ]
        }

    ];

    $scope.locationLevelData = { locationLevels : [ ] }

    $scope.personClasses = []
    
    $scope.locationData = {locations: []}

    $scope.animationsEnabled = true;
    //$scope.currentTpl = "";

    $scope.open = function ($event) {
        $scope.openedTargetDt = true;
    };

    $scope.$watch("observation.tourDateTime", function () {
        $scope.openedCompletedDt = false;
    })

    $scope.displayFormat = 'MM-dd-yyyy';
    $scope.parserFormat = 'MM-dd-yyyy';

    

    $scope.obsCategories = [
        {
            lupID: 1,
            lupValue: "Category-1",
            obsSubCategories : [
                {
                    lupID: 1,
                    lupValue: "Sub-Category-1"
                },
                {
                    lupID: 2,
                    lupValue: "Sub-Category-2"
                },
            ]
        }
    ]

    $scope.obsClasses = [
        {
            lupID: 1,
            lupValue: "ObsClass-1"
        },{
            lupID: 2,
            lupValue: "ObsClass-2"
        }
    ]

    $scope.editObservationResult = function (size,soTourID, soTourResultID, obsNum, indexNum) {
        var data = {};
        data.soTourID = soTourID;
        data.soTourResultID = soTourResultID;

        var safetyObsTypeData = $scope.observation.safetyObservation; //JSON.search($scope.obsMethods, '//*[lupID="' + $scope.observation.safetyObservationTypeID + '"]')[0];
        data.obsClasses = safetyObsTypeData.soClass;
        data.obsCategories = safetyObsTypeData.categories;
        data.type = "ObsResult";

        data.modalTitle = "Edit Observation Result (" + obsNum + ")";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'obsResultPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.observation.soTResults[indexNum] = selectedItem;
        }, function () {
        });
    };

    $scope.addResult = function (size) {
        var data = {};
        data.soTourID = $scope.observation.soTourID;
        data.soTourResultID = 0;
        data.obsNum = $scope.observation.reportNum +"_R"+ ($scope.observation.soTResults.length+1).toString();
        var safetyObsTypeData = $scope.observation.safetyObservation;//JSON.search($scope.obsMethods, '//*[lupID="' + $scope.observation.safetyObservationTypeID + '"]')[0];
        data.obsClasses = safetyObsTypeData.soClass;
        data.obsCategories = safetyObsTypeData.categories;
        data.type = "ObsResult";

        data.modalTitle = "Add Observation Result";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'obsResultPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            selectedItem.soTourID = $scope.observation.soTourID;
            selectedItem.obsNum = $scope.observation.reportNum + "_R" + ($scope.observation.soTResults.length + 1).toString();
            $scope.observation.soTResults.push(selectedItem);
        }, function () {
        });
    };

    $scope.addObservationResult = function (size) {
        var data = {};
        data.soTourID = $scope.observation.soTourID;
        data.soTourResultID = 0;
        data.obsNum = $scope.observation.reportNum + "_R" + ($scope.observation.soTResults.length + 1).toString();
        var safetyObsTypeData = $scope.observation.safetyObservation; //JSON.search($scope.obsMethods, '//*[lupID="' + $scope.observation.safetyObservationTypeID + '"]')[0];
        data.obsClasses = safetyObsTypeData.soClass;
        data.obsCategories = safetyObsTypeData.categories;
        data.type = "ObsResult";

        data.modalTitle = "Add Observation Result";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'obsObservationResultPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            selectedItem.soTourID = $scope.observation.soTourID;
            selectedItem.obsNum = $scope.observation.reportNum + "_R" + ($scope.observation.soTResults.length + 1).toString();
            $scope.observation.soTResults.push(selectedItem);
        }, function () {
        });
    };

    $scope.editActionItem = function (size, actionIndex) {
        var actionItem = $scope.observation.sotActionItems[actionIndex];
        var data = {};
        data.actionItem = actionItem;
        data.actionItem.reportNum = $scope.observation.reportNum;
        data.recommendationLevels = $scope.recommendationLevels;
        data.currencies = $scope.currencies;
        data.type = "ActionItem";

        if (actionItem.priority == 1)
            actionItem.priorityName = "Low";
        else if (actionItem.priority == 2)
            actionItem.priorityName = "Medium";
        else if (actionItem.priority == 3)
            actionItem.priorityName = "High";
        else if (actionItem.priority == 4)
            actionItem.priorityName = "Very High";

        actionItem.modalTitle = "Edit Action Item (" + data.actionItem.actionNum + ")";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'actionItemModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $http.post(urlBase + "updateActionItem", selectedItem)
            .success(function (result, status, header, config) {
                if (result.statusCode) {
                    selectedItem.actionID = result.data;
                }
            })
            $scope.observation.sotActionItems[actionIndex] = selectedItem;
            //alert($scope.selected);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    //$scope.actionItem = {};
    $scope.addActionItem = function (size) {
        var actionItem = {};
        actionItem.modalTitle = "Add New Action Item";
        actionItem.assignedTo = {};
        actionItem.approver = {};
        actionItem.ccUsers = [];
        actionItem.actionID = -1;
        var data = {};
        data.actionItem = actionItem
        data.recommendationLevels = $scope.recommendationLevels;
        data.currencies = $scope.currencies;

        data.type = "ActionItem";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'actionItemModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return data;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            selectedItem.actionNum = $scope.observation.reportNum + '_' + ($scope.observation.sotActionItems.length+1).toString();
            selectedItem.actionSourceDescription = $scope.observation.details;
            selectedItem.actionID = 0;
            selectedItem.sourceID = $scope.id;
            selectedItem.source = 'OTour';

            $http.post(urlBase + "UpdateActionItem", selectedItem)
            .success(function (result, status, header, config) {
                if (result.statusCode) {
                    selectedItem.actionID=result.data;
                }
            })
            $scope.observation.sotActionItems.push(selectedItem)
        }, function () {
            
        });
    };

    $scope.searchMember = function (member) {
        var item = {};
        item.modalTitle = "Search User";
        item.type = "User";

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'userModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            //size: size,
            resolve: {
                items: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (selectedUser) {
            //var selectedUser = JSON.parse(selectedItem);
            member.name = selectedUser.alias;
            member.userID = selectedUser.userID;
            member.userEmail = selectedUser.userEmail;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addEditors = function () {
        var item = {};
        item.modalTitle = "Search User";
        item.type = "User";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'userModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            //size: size,
            resolve: {
                items: function () {
                    return item;
                }
            }
        });

        modalInstance.result.then(function (selectedUser) {
            //var selectedUser = JSON.parse(selectedItem);
            $scope.observation.sotEditors.push(
                {
                    editor: selectedUser.alias,
                    userEmail: selectedUser.userEmail,
                    isActive: true,
                    editorID: selectedUser.userID,
                    eid: 0
                });
            //$scope.observation.sotEditors.push(selectedItem);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addAttachment = function (member) {
        //var item = {};
        //item.modalTitle = "Search User";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'attachmentModalPopUp.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            //size: size,
            resolve: {
                items: function () {
                    return '';
                }
            }
        });

        modalInstance.result.then(function (attachmentDetails) {
            var attachment = attachmentDetails;
            attachment.source = 'OTour';
            attachment.sourceID = $scope.observation.soTourID;
            attachment = $scope.uploadFileToUrl(attachment);
            
            //$scope.sotAttachments = attachment;
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.uploadFileToUrl = function (file) {
        var fd = new FormData();
        fd.append('description', file.description);
        fd.append('file', file.file);
        fd.append('source', file.source);
        fd.append('sourceID', file.sourceID);
        $http.post(urlBase + 'uploadFileTemp', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function (attachment) {
            $scope.observation.sotAttachments.push(attachment.data);
        })
        .error(function () {
        });
    }

    $scope.fileUploaded= function(attachment)
    {
        $scope.observation.sotAttachments.push(attachment);
    }

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.onDeleteActionItem = function (indexToRemove) {
        $scope.observation.sotActionItems.splice(indexToRemove, 1);
    };

    function openSaveAsDialog(filename, content, mediaType) {
        var blob = new Blob([content], { type: mediaType });
        saveAs(blob, filename);
    }

    $scope.downloadFile = function (fileName) {
        var fileData = fileName.split('.')
        //var fileExtension = fileData[fileData.length - 1];
        //fileName = fileName.replace('','');
        $http.get(urlBase + 'downloadFileTemp/' + fileData[0] + '/' + fileData[1], { responseType: 'arraybuffer' }).success(function (data, status, headers) {
            
            var octetStreamMime = 'application/octet-stream';
            var success = false;

            // Get the headers
            headers = headers();

            // Get the filename from the x-filename header or default to "download.bin"
            var filename = headers['x-filename'] || 'download.bin';

            // Determine the content type from the header or default to "application/octet-stream"
            var contentType = headers['content-type'] || octetStreamMime;

            openSaveAsDialog(fileName, data, contentType);

        }).error(function (data, status) {

            console.log("Request failed with status: " + status);

            // Optionally write the error out to scope
            //$scope.errorDetails = "Request failed with status: " + status;
        });
    }

    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';
    var searchData = $location.search();

    $scope.getLocation = function(locationId) {
        return $scope.locations.locationId === locationId;
    }

    $scope.id = searchData.id;

    $scope.myFile = {};

    $scope.uploadFile = function () {
        var file = $scope.myFile;
        //console.dir(file);
        //var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file);
    }

    $scope.updateLocations = function updateLocations(levelNo, locationId)
    {
        $scope.locationLevelData.locationLevels[levelNo].parentLocId = locationId;
        $scope.observation.locationID = locationId;

        for (var index = levelNo+1; index <= $scope.locationLevelData.locationLevels.length; index++)
        {
            $scope.locationLevelData.locationLevels[index].parentLocId = 0;
            $scope.locationLevelData.locationLevels[index - 1].locId = 0;
        }
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

    //$scope.observationMasterData = {};

    $scope.data = {};
    $scope.LoadMasterData = function () {
        $http.get(urlBase + "getObservationMasterData")
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                
                $scope.locationData.locations = result.data.locationModels;
                $scope.locationLevelData.locationLevels = result.data.locationLevelModel;
                $scope.personClasses = result.data.personClassModels;
                $scope.obsMethods = result.data.safetyObservationType;
                $scope.recommendationLevels = result.data.recommendationLevelModels;
                $scope.currencies = result.data.currencies;
            }
        })
    }

    if ($window.sessionStorage.masterData == null || angular.isUndefined($window.sessionStorage.masterData) || $window.sessionStorage.masterData == "{}") {
        $scope.LoadMasterData();
        //$window.sessionStorage.masterData = JSON.stringify($scope.data);
    }
    else {
        var data = JSON.parse($window.sessionStorage.masterData);
        //var data = $window.sessionStorage.data;
        $scope.locationData.locations = data.locationModels;
        $scope.locationLevelData.locationLevels = data.locationLevelModel;
        $scope.personClasses = data.personClassModels;
        $scope.obsMethods = data.safetyObservationType;
        $scope.recommendationLevels = data.recommendationLevelModels;
        $scope.currencies = data.currencies;
    }

    $scope.LoadData = function () {
        
        $http.get(urlBase + "GetSOTDetails/" + $scope.id)
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $scope.observation = result.data;
                //$scope.observation.locationID = 122;
                var datePart = $scope.observation.tourDateTime.split('-');
                $scope.observation.tourDateTime = new Date(parseInt(datePart[2]), parseInt(datePart[0]), parseInt(datePart[1]));
                for (var i = 0; i < $scope.observation.soTResults.length; i++) {
                    var result = $scope.observation.soTResults[i];
                    result.completedColor = $scope.getCompletedColor(result.completed);
                    result.pendingColor = $scope.getPendingColor(result.pending);
                    result.overdueColor = $scope.getOverdueColor(result.overdue);
                }

                var locData = [];

                var currLoc = JSON.search($scope.locationData, '//*[dLocationID="' + $scope.observation.locationID + '"]')[0];
                while (true)
                {
                    if (!currLoc)
                        break;

                    locData.push(currLoc.dLocationID);
                    //alert(currLoc.locationId);
                    if (currLoc.parentLocId == 0)
                        break;
                    currLoc = JSON.search($scope.locationData, '//*[dLocationID="' + currLoc.parentDLocationID + '"]')[0]; //$scope.getLocation(currLoc.parentLocId);
                }

                //alert(locData.length);
                var locData = locData.reverse();
                $scope.locationLevelData.locationLevels[0].locId = locData[0];
                for (var index = 1; index < locData.length; index++)
                {
                    //alert(locData[index-1]);
                    $scope.locationLevelData.locationLevels[index].parentLocId = locData[index - 1];
                    $scope.locationLevelData.locationLevels[index].locId = locData[index];
                }
                
                //$rootScope.loading = false;
            }
        })
    }
    $scope.sotRowEditNum = -1;

    $scope.addTeamMember = function () {
        var team = $scope.observation.soTourTeam.length + 1;
        //var item = new String('Item ' + c)
        $scope.sotRowEditNum = 0;
        var newTeamMember = {}
        newTeamMember.soTourTeamID = 0;
        newTeamMember.soTourID = $scope.observation.soTourID;
        $scope.observation.soTourTeam.splice(0, 0, newTeamMember);
    };

    $scope.editTeamMember = function (index) {
        $scope.sotRowEditNum = index;
    };

    $scope.openedTourDate = true;
    $scope.openTourDate = function ($event) {
        $scope.openedTourDate = true;
    };

    $scope.$watch("actionItem.targetDate", function () {
        $scope.openedTourDate = false;
    })

    $scope.updateSafetyMethodType = function ()
    {
        if ($scope.observation.safetyObservation != "") {
            var selectedObsMethos = JSON.parse($scope.observation.safetyObservation);
            $scope.observation.safetyObservationTypeID = selectedObsMethos.lupID;
            $scope.observation.observationType = selectedObsMethos.lupValue;
        }
    }

    $scope.cancelTeamMember = function () {
        if ($scope.observation.soTourTeam[$scope.sotRowEditNum].soTourTeamID<=0)
            $scope.observation.soTourTeam.splice($scope.sotRowEditNum, 1);
        $scope.sotRowEditNum = -1;
        $scope.teamSubmitted = false;
    };

    $scope.updateMember = function (member) {
        var selectedPerson = JSON.parse(member.personClass);
        member.personClassID = selectedPerson.lupID;
        member.personClassName = selectedPerson.lupValue;
    }

    $scope.teamSubmitted = false;
    $scope.saveTeamMember = function (member) {
        if ($scope.form.soTeamForm.$valid) {
            $scope.sotRowEditNum = -1;
        } else {
            $scope.teamSubmitted = true;
        }
    };

    $scope.deleteTeamMember = function (indexNum) {
        $scope.observation.soTourTeam.splice(indexNum, 1);
    };

    $scope.onDeleteResult = function (indexNum) {
        $scope.observation.soTResults.splice(indexNum, 1);
    };

    $scope.onDeleteAttachment = function (indexNum) {
        $scope.observation.sotAttachments.splice(indexNum, 1);
    };

    $scope.onDeleteEditor = function (indexNum) {
        $scope.observation.sotEditors.splice(indexNum, 1);
    };
    $scope.form = {};
    $scope.submitted = false;
    $scope.SaveData = function () {
        $scope.observation.soTourID = $scope.id;
        if ($scope.form.observationForm.$valid) {
            $http.post(urlBase + "UpdateSOTour", $scope.observation)
            .success(function (result, status, header, config) {
                if (result.statusCode) {
                    $window.location.href = 'GetList';
                }
            })
        } else {
            $scope.submitted = true;
        }

        
    }

    $scope.UpdateAnswer = function (questionModel) {
        questionModel.answer = questionModel.displayAnswer;
    }

    $scope.CancelData = function () {
        $window.location.href = 'GetList';
    }

    $scope.UpdateMultipleAnswerNew = function (question)
    {
        var questionIDs = [];
        var displayAns = [];
        for (i = 0; i <= question.multipleAnswers.length - 1; i++)
        {
            var selectedItem = JSON.parse(question.multipleAnswers[i]);
            questionIDs.push(selectedItem.methodID);
            displayAns.push(selectedItem.methodName);
        }
        question.multipleAnswersIds = questionIDs.join(',');
        question.displayAnswer = displayAns.join('|| ');
    }

    $scope.UpdateMultipleAnswer = function (questionModel, answerModel)
    {
        var multipleAnsIDs = questionModel.multipleAnswersIds.split(',');
        var multipleAns = questionModel.displayAnswer.replace('||', ',').split(',');

        var idx = $.inArray(answerModel.methodID.toString(), multipleAnsIDs);
        // is currently selected
        if (idx > -1) {
            multipleAnsIDs.splice(idx, 1);
            multipleAns.splice(idx, 1);
        }
            // is newly selected
        else {
            multipleAnsIDs.push(answerModel.methodID);
            multipleAns.push(answerModel.methodName);
        }

        questionModel.multipleAnswersIds = multipleAnsIDs.join(",");
        questionModel.displayAnswer = multipleAns.join("||");
    }

    $scope.enableEdit = false;
    $scope.state = "Click to Edit";
    $scope.toggleView = function () {
        if ($scope.enableEdit) {
            $scope.enableEdit = false;
            //$scope.state = "Click to Edit";
        } else {
            $scope.enableEdit = true;
            //$scope.state = "Click to View";
        }
    }

    //$scope.LoadMasterData();

    $scope.LoadData();
    
}

