﻿function ngLocation ($compile) {
    return {
        restrict: 'A',
        replace: true,
        //require: '^ngModel',
        //scope: {
        //    selectedLocation: '@'
        //},
        scope: true,
        link: function (scope, element, attributes) {
            var responseHTML = "";
            //for (var levelNo = 1; levelNo <= $scope.locationLevels; levelNo++) {
            //    if (levelNo == 1) {
            //        responseHTML.push('<tr ng-show="enableEdit">');
            //        responseHTML.push('<td>' + $scope.locationLevels[levelNo].levelName + '</td><td>');
            //        responseHTML.push('<select><option');
            //        responseHTML.push(' ng-repeat="location in locations" value="{{location.locationId}}"');
            //        responseHTML.push('>{{location.locationName}}');
            //        responseHTML.push('</option></select>');
            //        responseHTML.push('</td></tr>');
            //    } else {
            //        responseHTML.push('<tr ng-show="enableEdit">');
            //        responseHTML.push('<td>' + $scope.locationLevels[levelNo].levelName + '</td><td>');
            //        responseHTML.push('<select><option');
            //        responseHTML.push(' ng-repeat="location in locations" value="{{location.locationId}}"');
            //        responseHTML.push('>{{location.locationName}}');
            //        responseHTML.push('</option></select>');
            //        responseHTML.push('</td></tr>');
            //    }
            //}

            //scope.selection = scope.$parent.;
            //alert(attributes.parentLocid);
            // && parentLocId : selectedLocation[' + (attributes.levelNo - 1) + ']

            //responseHTML = '<tr ng-repeat="locationLevel in locationLevels" ng-show="enableEdit">';
            //responseHTML += '<td>{{levelName}}</td><td>';
            //responseHTML = '<span ng-repeat ="n in selectedItem track by $index | "';
            responseHTML = '<select class="form-control form-control-small"><option value="0" ng-click="updateLocations(locationLevel.levelNo,0)">-Select-</option><option'
            responseHTML += ' ng-selected="location.locationId == locationLevel.locId"'
            responseHTML += ' ng-click="updateLocations(locationLevel.levelNo,location.locationId)"'
            responseHTML += ' ng-repeat="location in locationData.locations | filter : {levelNo : locationLevel.levelNo} | filter : { parentLocId : locationLevel.parentLocId }" value="{{location.locationId}}"'
            responseHTML += '>{{location.locationName}}'
            responseHTML += '</option></select>'
            //responseHTML += '</td></tr>'
            
            element.html(responseHTML);
            $compile(element.contents())(scope);
        }

    };
}