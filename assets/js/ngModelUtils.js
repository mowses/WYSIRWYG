angular.module('ngModelUtils', [])

.directive('ngModelSetter', function() {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs, $ngModelCtrl) {

            var setExpression = $attrs.ngModelSetter;

            $scope.$watch($attrs.ngModel, function(e) {
                $scope.$value = $ngModelCtrl.$viewValue;
                $scope.$eval(setExpression);
                delete $scope.$value;
            });
        }
    };
})