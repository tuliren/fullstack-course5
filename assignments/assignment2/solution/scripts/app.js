(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController (service) {
  var toBuy = this;

  toBuy.toBuyItems = service.getToBuyItems();

  toBuy.isAllBought = function () {
    return toBuy.toBuyItems.length == 0;
  };

  toBuy.checkToBuyItem = function (itemIndex) {
    service.checkItem(itemIndex);
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController (service) {
  var bought = this;

  bought.boughtItems = service.getBoughtItems();

  bought.isEmpty = function () {
    return bought.boughtItems.length == 0;
  };
}

function ShoppingListCheckOffService () {
  var service = this;

  var toBuy = [
    {
      name: 'bananas',
      quantity: 3
    },
    {
      name: 'apples',
      quantity: 2
    },
    {
      name: 'pears',
      quantity: 4
    },
    {
      name: 'peaches',
      quantity: 6
    },
    {
      name: 'mango',
      quantity: 2
    }
  ];
  var bought = [];

  service.getToBuyItems = function () {
    return toBuy;
  };

  service.getBoughtItems = function () {
    return bought;
  };

  service.checkItem = function (itemIndex) {
    var item = toBuy[itemIndex];
    toBuy.splice(itemIndex, 1);
    bought.push(item);
  };
}

})();
