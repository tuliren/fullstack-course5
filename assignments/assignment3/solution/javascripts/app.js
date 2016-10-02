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
  ctrl.error = '';

  ctrl.searchMenu = function () {
    var promise = service.getMatchedMenuItems();
    var searchTerm = ctrl.searchTerm.toLowerCase();

    promise.then(function (menuItems) {
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

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, apiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function () {
    var resonse = $http({
      method: "GET",
      url: apiBasePath
    });

    return responese.data.menu_items;
  };
}

})();
