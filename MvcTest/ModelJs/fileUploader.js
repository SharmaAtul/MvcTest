function fileUpload($http) {

    var urlBase = 'http://localhost:26996/ServiceIOS.svc/';

    this.uploadFileToUrl = function (file) {
        var fd = new FormData();
        fd.append('file', file);
        $http.post(urlBase + 'uploadFileTemp', fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function () {
        })
        .error(function () {
        });
    }
}

function fileModel($parse) {
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
}
