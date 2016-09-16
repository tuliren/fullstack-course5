(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.checkLunchContent = function() {
    if (!$scope.lunchContent) {
      $scope.message = 'Please enter data first';
      $scope.validation = 'error';
      return 0;
    }

    var count = $scope.lunchContent.split(',').reduce(function (prev, curr, i, array) {
      return prev + (isEmpty(array[i]) ? 0 : 1)
    }, 0);

    if (count <= 3) {
      $scope.message = 'Enjoy!';
    } else {
      $scope.message = 'Too much!';
    }
    $scope.validation = 'success';
  };

  var isEmpty = function (string) {
    return string.length === 0 || !string.trim().length;
  };
}

})();
