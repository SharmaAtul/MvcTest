function pdfDownload() {
    return {
        restrict: 'E',
        templateUrl: '/path/to/pdfDownload.tpl.html',
        scope: true,
        link: function (scope, element, attr) {
            var anchor = element.children()[0];

            // When the download starts, disable the link
            scope.$on('download-start', function () {
                $(anchor).attr('disabled', 'disabled');
            });

            // When the download finishes, attach the data to the link. Enable the link and change its appearance.
            scope.$on('downloaded', function (event, data) {
                $(anchor).attr({
                    href: 'data:'+scope.GenerateFileType()+';base64,' + data,
                    download: attr.filename
                })
                    .removeAttr('disabled')
                    .text('Save')
                    .removeClass('btn-primary')
                    .addClass('btn-success');

                // Also overwrite the download pdf function to do nothing.
                scope.downloadPdf = function () {
                };
            });
        },
        controller: ['$scope', '$attrs', '$http', function ($scope, $attrs, $http) {
            $scope.downloadPdf = function () {
                $scope.$emit('download-start');
                $http.get($attrs.url).then(function (response) {
                    $scope.$emit('downloaded', response.data);
                });
            };

            $scope.GenerateFileType = function (fileExtension) {
                switch (fileExtension.toLowerCase()) {
                    case "doc":
                    case "docx":
                        $scope.FileType = "application/msword";
                        break;
                    case "xls":
                    case "xlsx":
                        $scope.FileType = "application/vnd.ms-excel";
                        break;
                    case "pps":
                    case "ppt":
                        $scope.FileType = "application/vnd.ms-powerpoint";
                        break;
                    case "txt":
                        $scope.FileType = "text/plain";
                        break;
                    case "rtf":
                        $scope.FileType = "application/rtf";
                        break;
                    case "pdf":
                        $scope.FileType = "application/pdf";
                        break;
                    case "msg":
                    case "eml":
                        $scope.FileType = "application/vnd.ms-outlook";
                        break;
                    case "gif":
                    case "bmp":
                    case "png":
                    case "jpg":
                        $scope.FileType = "image/JPEG";
                        break;
                    case "dwg":
                        $scope.FileType = "application/acad";
                        break;
                    case "zip":
                        $scope.FileType = "application/x-zip-compressed";
                        break;
                    case "rar":
                        $scope.FileType = "application/x-rar-compressed";
                        break;
                }
            }
        }]
    }
}