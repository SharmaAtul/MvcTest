function ObservationDetail($scope, $http, $location, $window, $modal, $templateCache, fileUpload) {
    
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

    //$scope.$watch("observation.sotDynamicQs", function () {
    //    for (var i = 0; i < $scope.observation.sotDynamicQs.length; i++)
    //    {
    //        var question = $scope.observation.sotDynamicQs[i];
    //        var str = question.multipleAnswersIds;//"1,2,3,4,5,6";
    //        alert(str);
    //        question.arrMultipleAnswersIds = new Array();
    //        // this will return an array with strings "1", "2", etc.
    //        question.arrMultipleAnswersIds = str.split(",");
    //    }
    //})

    //$scope.upload = function (files) {
    //    console.log("if you got here, the file selection dialog was shown, so this should work.");
    //    console.log(files);
    //};

    //$scope.showModal = function () {
    //    $modal.open({
    //        template: "<div style='height:200px'><div class='button' ng-file-select='' ng-file-change='upload($files)'>Select File doesn't work</div></div>"
    //    });
    //};

    $scope.obsMethods = {
        data:[
                    {
                        methodID: 1,
                        methodName: "Test"
                    },
                    {
                        methodID: 2,
                        methodName: "Test-2"
                    },
                    {
                        methodID: 5,
                        methodName: "Test-3"
                    }
        ]};

    $scope.WhatIfQuestionTmp = {
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
    };

    

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
                        methodName: "Is Supervised"
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

    //$scope.optionData = [2485,2486];
    $scope.locationLevelData = {
        locationLevels : [
        {
            levelNo: 1,
            levelName: 'Loc Level 1',
            parentLocId: 0,
            locId: 0
        },
        {
            levelNo: 2,
            levelName: 'Loc Level 2',
            parentLocId: 0,
            locId: 0
        },
        {
            levelNo: 3,
            levelName: 'Loc Level 3',
            parentLocId: 0,
            locId: 0
        }
        ]
    }


    $scope.locationData = {
        locations: [
            {
                levelNo: 1,
                locationName: 'test loc 1',
                locationId: 1,
                parentLocId: 0
            },
            {
                levelNo: 2,
                locationName: 'test loc 11',
                locationId: 31,
                parentLocId: 1
            },
            {
                levelNo: 3,
                locationName: 'test loc 111',
                locationId: 111,
                parentLocId: 31
            },
            {
                levelNo: 3,
                locationName: 'test loc 112',
                locationId: 112,
                parentLocId: 31
            },
            {
                levelNo: 2,
                locationName: 'test loc 12',
                locationId: 12,
                parentLocId: 1
            },
            {
                levelNo: 3,
                locationName: 'test loc 121',
                locationId: 121,
                parentLocId: 12
            },
            {
                levelNo: 3,
                locationName: 'test loc 122',
                locationId: 122,
                parentLocId: 12
            },
            {
                levelNo: 1,
                locationName: 'test loc 2',
                locationId: 2,
                parentLocId: 0
            },
            {
                levelNo: 2,
                locationName: 'test loc 21',
                locationId: 21,
                parentLocId: 2
            },
            {
                levelNo: 3,
                locationName: 'test loc 211',
                locationId: 111,
                parentLocId: 21
            },
            {
                levelNo: 3,
                locationName: 'test loc 212',
                locationId: 112,
                parentLocId: 21
            },
            {
                levelNo: 2,
                locationName: 'test loc 22',
                locationId: 22,
                parentLocId: 2

            },
            {
                levelNo: 3,
                locationName: 'test loc 221',
                locationId: 221,
                parentLocId: 22
            },
            {
                levelNo: 3,
                locationName: 'test loc 222',
                locationId: 222,
                parentLocId: 22
            }
        ]
    }

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;
    $scope.currentTpl = "";

    $scope.editActionItem = function (size, actionItem) {
        actionItem.reportNum = $scope.observation.reportNum;
        actionItem.modalTitle = "Edit Action Item (" + actionItem.actionNum + ")";
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return actionItem;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            alert($scope.selected);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
    //$scope.actionItem = {};
    $scope.addActionItem = function (size) {
        var actionItem = {};
        actionItem.modalTitle = "Add New Action Item";
        
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',// $templateCache.get('myModalContent.html'),
            controller: 'modalPopUp',
            size: size,
            resolve: {
                items: function () {
                    return actionItem;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            alert($scope.selected);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    //$scope.myName = "test";

    // $scope.addActionItem= function(){
    //     dlg = $dialogs.create('/dialogs/whatsyourname.html', 'modalPopUp', { name: $scope.myName }, { key: false, back: 'static' });
    //     dlg.result.then(function (name) {
    //         $scope.name = name;
    //         alert($scope.name);
    //     }, function () {
    //         $scope.name = 'You decided not to enter in your name, that makes me sad.';
    //     });
    //}

    function openSaveAsDialog(filename, content, mediaType) {
        var blob = new Blob([content], { type: mediaType });
        console.log(blob);
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

    //listen for the file selected event
    $scope.$on("fileSelected", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.myFile = args.file;
        });
    });

    $scope.uploadFile = function () {
        var file = $scope.myFile;
        console.dir(file);
        //var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file);
    }

    $scope.updateLocations = function updateLocations(levelNo, locationId)
    {
        $scope.locationLevelData.locationLevels[levelNo].parentLocId = locationId;

        for (var index = levelNo+1; index <= $scope.locationLevelData.locationLevels.length; index++)
        {
            $scope.locationLevelData.locationLevels[index].parentLocId = 0;
            $scope.locationLevelData.locationLevels[index-1].locId = 0;
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

    $scope.LoadData = function () {
        
        $http.get(urlBase + "GetSOTDetails/" + $scope.id)
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $scope.observation = result.data;
                //$scope.observation.locationID = 122;

                for (var i = 0; i < $scope.observation.soTResults.length; i++) {
                    var result = $scope.observation.soTResults[i];
                    result.completedColor = $scope.getCompletedColor(result.completed);
                    result.pendingColor = $scope.getPendingColor(result.pending);
                    result.overdueColor = $scope.getOverdueColor(result.overdue);
                }

                var locData = [];

                var currLoc = JSON.search($scope.locationData, '//*[locationId="' + $scope.observation.locationID + '"]')[0];
                while (true)
                {
                    if (!currLoc) break;
                    locData.push(currLoc.locationId);
                    //alert(currLoc.locationId);
                    if (currLoc.parentLocId == 0)
                        break;
                    currLoc = JSON.search($scope.locationData, '//*[locationId="' + currLoc.parentLocId + '"]')[0]; //$scope.getLocation(currLoc.parentLocId);
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
                //$scope.selectedLocation = locData.reverse();
            }
        })
    }

    $scope.SaveData = function () {

        $http.post(urlBase + "UpdateSOTour" , $scope.observation)
        .success(function (result, status, header, config) {
            if (result.statusCode) {
                $window.location.href = 'GetList';
            }
        })
    }

    $scope.UpdateAnswer = function (questionModel) {
        questionModel.answer = questionModel.displayAnswer;
    }

    $scope.CancelData = function () {
        $window.location.href = 'GetList';
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

    $scope.LoadData();
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
}

