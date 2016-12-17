(function () {
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
   var toBuy = this;

   toBuy.itemsToBuy = ShoppingListCheckOffService.getItems();
   toBuy.BoughtTheItem = function(itemIndex) {
     ShoppingListCheckOffService.buyItems(itemIndex);
    }
   }

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }

  function ShoppingListCheckOffService() {
    var CheckOffService = this;

    var toBuyItems = [
      {name : "Butter",
       quantity : "8 sticks"},
       {name : "Milk",
       quantity : "2 cartons"},
       {name : "potatoes",
        quantity : "2 bags"},
       {name : "bread",
        quantity : "3 loafs"},
       {name : "Ice cream",
        quantity : "3 tubs"}
    ];

    var alreadyBoughtItems = [];
    var boughtItem = "";

    CheckOffService.getItems = function() {
       return toBuyItems;
    };

    CheckOffService.buyItems = function(itemIndex) {
      boughtItem = toBuyItems[itemIndex];
      alreadyBoughtItems.push(boughtItem);
      toBuyItems.splice(itemIndex, 1);

      if(toBuyItems.length < 1)
       throw new Error("Everything is bought");
    };

    CheckOffService.getBoughtItems = function() {
      return alreadyBoughtItems;
    };
 }
})();
