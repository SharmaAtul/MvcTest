angular.module('app').provide.service('fileUpload', ['$http', function ($http) {

    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';

    this.uploadFileToUrl = function (file) {
        var fd = new FormData();
        fd.append('description', file.description);
        fd.append('file', file.file);
        fd.append('source', file.source);
        fd.append('sourceID', file.sourceID);
        $http.post(urlBase + 'uploadFileTemp', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function (data) {
            //return data;
        })
        .error(function () {
        });
    }
}]);

angular.module('app').compileProvider.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        //scope:{
        //    myFile:"="
        //},
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                //scope.$apply(function () {
                scope.$emit("fileSelected", { file: element[0].files[0] });

                //    modelSetter(scope, element[0].files[0]);
                //    scope.myFile = element[0].files[0];

                //});
            });
        }
    };
}]);
