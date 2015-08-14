function ngDynamicquestion ($compile) {
    return {
        restrict: 'A',
        replace: true,
        //require: '^ngModel',
       
        link: function (scope, element, attributes) {
            var responseHTML = "";
            if (attributes.questionType == 'MultipleSelectionBox') {
                        
                responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">';
                responseHTML += '<select size="3" ng-multiple="true" ng-model="question.multipleAnswers" ng-blur="UpdateMultipleAnswerNew(question)" multiple class="form-control">';
                responseHTML += '<option ng-selected="question.multipleAnswersIds.indexOf(data.methodID) > -1"';
                responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data}}"';
                responseHTML += '>{{data.methodName}}';
                responseHTML += '</option>';
                responseHTML += '</select>';
                responseHTML += '</span>';
            }
            else if (attributes.questionType == 'DecisionSelectionBox') {
                //for multi check box
                responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">';
                responseHTML += '<select class="form-control">';
                responseHTML += '<option ng-click="UpdateMultipleAnswer(question, data)"';
                responseHTML += ' ng-selected="question.answerId.indexOf(data.methodID) > -1"';
                responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data.methodID}}"';
                responseHTML += '>{{data.methodName}}';
                responseHTML += '</option>';
                responseHTML += '</select>';
                responseHTML += '</span>';

            }
            else if (attributes.questionType == 'SelectionBox') {
                //for multi check box
                responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">';
                responseHTML += '<select class="form-control">';
                responseHTML += '<option ng-click="UpdateMultipleAnswer(question, data)"';
                responseHTML += ' ng-selected="question.answerId.indexOf(data.methodID) > -1"';
                responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data.methodID}}"';
                responseHTML += '>{{data.methodName}}';
                responseHTML += '</option>';
                responseHTML += '</select>';
                responseHTML += '</span>';

            }
            else if (attributes.questionType == 'CheckBox') {
                //for multi check box
                responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">'
                responseHTML += '<span ng-repeat="data in quesMaster.data">'
                responseHTML += '<div class="checkbox"><label><input type="radio" ng-model = "question.answerId" name="question.questionID"' 
                responseHTML += 'ng-checked="question.answerId==data.methodID"'
                responseHTML += 'ng-click="UpdateMultipleAnswer(question, data)"';
                responseHTML += 'value="{{data.methodID}}"/> {{data.methodName}}</label></div>';
                responseHTML += '</span>';
                responseHTML += '</span>';
            }
            else if (attributes.questionType == 'Currency') {
                //for multi check box
                responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">'
                //responseHTML += '<span ng-repeat="data in quesMaster.data">'
                responseHTML += '<input class="form-control form-control-small" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)"/>';
                responseHTML += '<select class="form-control form-control-small">';
                responseHTML += '<option ng-click="UpdateMultipleAnswer(question, data)"';
                responseHTML += ' ng-selected="question.answerId.indexOf(data.methodID) > -1"';
                responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data.methodID}}"';
                responseHTML += '>{{data.methodName}}';
                responseHTML += '</option>';
                responseHTML += '</select>';
                //responseHTML += '</span>';
                responseHTML += '</span>';

            }
            else if (attributes.questionType == 'Unit') {
                //for multi check box
                responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">'
                //responseHTML += '<span ng-repeat="data in quesMaster.data">'
                responseHTML += '<input class="form-control form-control-small" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)"/>';
                responseHTML += '<select class="form-control form-control-small">';
                responseHTML += '<option ng-click="UpdateMultipleAnswer(question, data)"';
                responseHTML += ' ng-selected="question.answerId.indexOf(data.methodID) > -1"';
                responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data.methodID}}"';
                responseHTML += '>{{data.methodName}}';
                responseHTML += '</option>';
                responseHTML += '</select>';
                //responseHTML += '</span>';
                responseHTML += '</span>';

            }
            else if (attributes.questionType == 'MultipleCheckBox')
            {
                //for multi check box
                responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">'
                responseHTML += '<span ng-repeat="data in quesMaster.data">'
                responseHTML += '<input class="form-control" type="checkbox" ng-checked="question.multipleAnswersIds.indexOf(data.methodID) > -1"'
                responseHTML += 'ng-click="UpdateMultipleAnswer(question, data)"';
                responseHTML += 'value="{{data.methodID}}"/> {{data.methodName}}';
                responseHTML += '</span>';
                responseHTML += '</span>';
                        
            }
            else if (attributes.questionType == 'Medium TextBox')
                responseHTML = '<input class="form-control" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)" />';
            else if (attributes.questionType == 'Multiline TextBox')
                responseHTML = '<input class="form-control" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)" />';
            else if (attributes.questionType == 'Small TextBox')
                responseHTML = '<input class="form-control" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)"/>';

            element.html(responseHTML);
            $compile(element.contents())(scope);
        }

    };
}