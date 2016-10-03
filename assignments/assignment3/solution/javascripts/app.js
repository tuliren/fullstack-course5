(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuFetchService', MenuFetchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json")
.directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuFetchService'];
function NarrowItDownController (service) {
  var ctrl = this;

  ctrl.searchTerm = '';
  ctrl.found = [];
  ctrl.error = '';

  ctrl.searchMenu = function () {
    if (!ctrl.searchTerm.trim() || ctrl.searchTerm.length === 0) {
      console.log(searchTerm);
      ctrl.found = [];
      ctrl.error = '';
      return;
    }

    var searchTerm = ctrl.searchTerm.toLowerCase();

    service.getAllMenuItems().then(function (response) {
      ctrl.error = '';
      var menuItems = response.data.menu_items;
      ctrl.found = [];

      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
          ctrl.found.push(menuItems[i]);
        }
      }
    }).catch(function (error) {
      ctrl.found = [];
      ctrl.error = error.statusText;
      console.log(error);
    });
  };
}

MenuFetchService.$inject = ['$http', 'ApiBasePath'];
function MenuFetchService ($http, apiBasePath) {
  var service = this;

  service.getAllMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: apiBasePath
    });
  };
}

function FoundItems () {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: 'E',
    scope: {
      items: '<foundItems'
      // onRemove: '&'
    }
  };

  return ddo;
}

})();
