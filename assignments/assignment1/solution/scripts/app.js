(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.checkLunchContent = function() {
    if (!$scope.lunchContent) {
      $scope.message = 'Please enter data first';
      return 0;
    }

    var count = $scope.lunchContent.split(',').reduce(function (prev, curr, i, array) {
      return prev + (array[i] ? 1 : 0)
    }, 0);

    if (count <= 3) {
      $scope.message = 'Enjoy!';
    } else {
      $scope.message = 'Too much!';
    }
  };
}

})();
