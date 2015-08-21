function ngDynamicquestion ($compile) {
    return {
        restrict: 'A',
        replace: true,
        //require: '^ngModel',
        //scope: {
        //    ngModel:"@"
        //},
        link: function (scope, element, attributes) {
            var responseHTML = "";
            if (attributes.questionType == 'MultipleSelectionBox') {

                responseHTML += '<select class="form-control form-control-small" size="3" ng-show="enableEdit" ng-multiple="true" ng-model="question.multipleAnswers" ng-change="UpdateMultipleAnswerNew(question)" multiple>';
                responseHTML += '<option ng-selected="question.multipleAnswersIds.indexOf(data.questionLupAnswerId) > -1"';
                responseHTML += ' ng-repeat="data in dynamicQuestion.questionsAnswers" value="{{data}}"';
                responseHTML += '>{{data.answer}}';
                responseHTML += '</option>';
                responseHTML += '</select>';

                //responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">';
                //responseHTML += '<select size="3" ng-multiple="true" ng-model="question.multipleAnswers" ng-blur="UpdateMultipleAnswerNew(question)" multiple class="form-control">';
                //responseHTML += '<option ng-selected="question.multipleAnswersIds.indexOf(data.methodID) > -1"';
                //responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data}}"';
                //responseHTML += '>{{data.methodName}}';
                //responseHTML += '</option>';
                //responseHTML += '</select>';
                //responseHTML += '</span>';
            }
            else if (attributes.questionType == 'DecisionSelectionBox') {
                //for multi check box
                responseHTML += '<select class="form-control form-control-small" ng-show="enableEdit">';
                responseHTML += '<option ng-click="updateAnswerId(question, data)"';
                responseHTML += ' ng-selected="question.answerId.indexOf(data.questionLupAnswerId) > -1"';
                responseHTML += ' ng-repeat="data in dynamicQuestion.questionsAnswers" value="{{data.questionLupAnswerId}}"';
                responseHTML += '>{{data.answer}}';
                responseHTML += '</option>';
                responseHTML += '</select>';

                //responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">';
                //responseHTML += '<select class="form-control">';
                //responseHTML += '<option ng-click="UpdateMultipleAnswer(question, data)"';
                //responseHTML += ' ng-selected="question.answerId.indexOf(data.methodID) > -1"';
                //responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data.methodID}}"';
                //responseHTML += '>{{data.methodName}}';
                //responseHTML += '</option>';
                //responseHTML += '</select>';
                //responseHTML += '</span>';

            }
            else if (attributes.questionType == 'SelectionBox') {
                //for multi check box

                responseHTML += '<select class="form-control form-control-small" ng-show="enableEdit">';
                responseHTML += '<option ng-click="updateAnswerId(question, data)"';
                responseHTML += ' ng-selected="question.answerId.indexOf(data.questionLupAnswerId) > -1"';
                responseHTML += ' ng-repeat="data in dynamicQuestion.questionsAnswers" value="{{data.questionLupAnswerId}}"';
                responseHTML += '>{{data.answer}}';
                responseHTML += '</option>';
                responseHTML += '</select>';

                //responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">';
                //responseHTML += '<select class="form-control">';
                //responseHTML += '<option ng-click="UpdateMultipleAnswer(question, data)"';
                //responseHTML += ' ng-selected="question.answerId.indexOf(data.methodID) > -1"';
                //responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data.methodID}}"';
                //responseHTML += '>{{data.methodName}}';
                //responseHTML += '</option>';
                //responseHTML += '</select>';
                //responseHTML += '</span>';

            }
            else if (attributes.questionType == 'CheckBox') {
                //for multi check box
                responseHTML += '<span ng-repeat="data in dynamicQuestion.questionsAnswers" ng-show="enableEdit">'
                responseHTML += '<div class="checkbox"><label><input type="radio" ng-model = "question.answerId" name="question.questionID"'
                responseHTML += 'ng-checked="question.answerId==data.questionLupAnswerId"'
                responseHTML += 'ng-click="updateAnswerId(question, data)"';
                responseHTML += 'value="{{data.questionLupAnswerId}}"/> {{data.answer}}</label></div>';
                responseHTML += '</span>';

                //responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">'
                //responseHTML += '<span ng-repeat="data in quesMaster.data" ng-show="enableEdit">'
                //responseHTML += '<div class="checkbox"><label><input type="radio" ng-model = "question.answerId" name="question.questionID"' 
                //responseHTML += 'ng-checked="question.answerId==data.methodID"'
                //responseHTML += 'ng-click="UpdateMultipleAnswer(question, data)"';
                //responseHTML += 'value="{{data.methodID}}"/> {{data.methodName}}</label></div>';
                //responseHTML += '</span>';
                //responseHTML += '</span>';
            }
            else if (attributes.questionType == 'Currency') {
                //for multi check box

                responseHTML += '<input class="form-control form-control-x-small" ng-show="enableEdit" type="text" ng-model="question.answer" ng-blur="UpdateDisplayAnswer(question)"/>';
                responseHTML += '<select class="form-control form-control-small" ng-model="question.answerId" ng-show="enableEdit">';
                responseHTML += '<option ng-selected="question.answerId==data.unitID"';
                responseHTML += ' ng-repeat="data in currencies" value="{{data.unitID}}"';
                responseHTML += '>{{data.unitName}}';
                responseHTML += '</option>';
                responseHTML += '</select>';

                //responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">'
                //responseHTML += '<input class="form-control form-control-small" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)"/>';
                //responseHTML += '<select class="form-control form-control-small">';
                //responseHTML += '<option ng-click="UpdateMultipleAnswer(question, data)"';
                //responseHTML += ' ng-selected="question.answerId.indexOf(data.methodID) > -1"';
                //responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data.methodID}}"';
                //responseHTML += '>{{data.methodName}}';
                //responseHTML += '</option>';
                //responseHTML += '</select>';
                //responseHTML += '</span>';

            }
            else if (attributes.questionType == 'Unit') {
                //for multi check box
                responseHTML = '<span ng-repeat="units in unitGroupTypes | filter : { unitGroupID : question.unitGroupID }" ng-show="enableEdit">'
                //responseHTML += '<span ng-repeat="data in quesMaster.data">'
                responseHTML += '<input class="form-control form-control-x-small" ng-show="enableEdit" type="text" ng-model="question.answer" ng-blur="UpdateDisplayAnswer(question)"/>';
                responseHTML += '<select class="form-control form-control-small" ng-model="question.answerId">';
                responseHTML += '<option ng-selected="question.answerId==data.unitID"';
                responseHTML += ' ng-repeat="data in units.unitTypes" value="{{data.unitID}}"';
                responseHTML += '>{{data.unitName}}';
                responseHTML += '</option>';
                responseHTML += '</select>';
                //responseHTML += '</span>';
                responseHTML += '</span>';

                //responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">'
                ////responseHTML += '<span ng-repeat="data in quesMaster.data">'
                //responseHTML += '<input class="form-control form-control-small" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)"/>';
                //responseHTML += '<select class="form-control form-control-small">';
                //responseHTML += '<option ng-click="UpdateMultipleAnswer(question, data)"';
                //responseHTML += ' ng-selected="question.answerId.indexOf(data.methodID) > -1"';
                //responseHTML += ' ng-repeat="data in quesMaster.data" value="{{data.methodID}}"';
                //responseHTML += '>{{data.methodName}}';
                //responseHTML += '</option>';
                //responseHTML += '</select>';
                ////responseHTML += '</span>';
                //responseHTML += '</span>';

            }
            else if (attributes.questionType == 'MultipleCheckBox')
            {
                responseHTML += '<span ng-repeat="data in dynamicQuestion.questionsAnswers">'
                responseHTML += '<input class="form-control" type="checkbox" ng-checked="question.multipleAnswersIds.indexOf(data.methodID) > -1"'
                responseHTML += 'ng-click="UpdateMultipleAnswer(question, data)"';
                responseHTML += 'value="{{data.questionLupAnswerId}}"/> {{data.answer}}';
                responseHTML += '</span>';

                ////for multi check box
                //responseHTML = '<span ng-repeat="quesMaster in questionMaster | filter : { questionID : question.questionID }" ng-show="enableEdit">'
                //responseHTML += '<span ng-repeat="data in quesMaster.data">'
                //responseHTML += '<input class="form-control" type="checkbox" ng-checked="question.multipleAnswersIds.indexOf(data.methodID) > -1"'
                //responseHTML += 'ng-click="UpdateMultipleAnswer(question, data)"';
                //responseHTML += 'value="{{data.methodID}}"/> {{data.methodName}}';
                //responseHTML += '</span>';
                //responseHTML += '</span>';
                        
            }
            else if (attributes.questionType == 'Medium TextBox')
                responseHTML = '<input class="form-control form-control-small" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)" />';
            else if (attributes.questionType == 'Multiline TextBox')
                responseHTML = '<input class="form-control form-control-small" multiline row="3" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)" />';
            else if (attributes.questionType == 'Small TextBox')
                responseHTML = '<input class="form-control form-control-x-small" ng-show="enableEdit" type="text" ng-model="question.displayAnswer" ng-blur="UpdateAnswer(question)"/>';

            element.html(responseHTML);
            $compile(element.contents())(scope);
        }

    };
}