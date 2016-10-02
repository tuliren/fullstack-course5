(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (service) {
  var ctrl = this;

  ctrl.searchTerm = '';
  ctrl.found = [];

  ctrl.search = function () {
    ctrl.found = service.getMatchedMenuItems(ctrl.searchTerm.toLowerCase());
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, apiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    var response = $http({
      method: "GET",
      url: apiBasePath
    }).then(function (result) {
      var foundItems = [];
      var menuItems = result.data.menu_items;

      for (var i = 0; i < menuItems.length; i++) {
        if (menuItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
          foundItems.push(menuItems[i]);
        }
      }

      return foundItems;
    });

    return response;
  };
}

})();
