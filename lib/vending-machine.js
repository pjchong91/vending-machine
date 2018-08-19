class VendingMachine {
  constructor(inventory) {
    this.inventory = [
      {
        name: "cola",
        count: 10,
        cost: 3.26
      },
      {
        name: "fanta",
        count: 8,
        cost: 1.77
      },
      {
        name: "fruit punch",
        count: 5,
        cost: 5.24
      },
      {
        name: "pocky",
        count: 0,
        cost: 8.17
      }
    ];

    this.change = [
      {
        name: "toonie",
        count: 10,
        value: 2.0
      },
      {
        name: "loonie",
        count: 10,
        value: 1.0
      },
      {
        name: "quarter",
        count: 10,
        value: 0.25
      },
      {
        name: "dime",
        count: 10,
        value: 0.1
      },
      {
        name: "nickel",
        count: 10,
        value: 0.05
      }
    ];
  }

  getInventory() {
    let i = 0;
    let inventory = {};
    for (i = 0; i < this.inventory.length; i++) {
      let name = this.inventory[i].name;
      inventory[name] = { count: this.inventory[i].count };
    }
    return inventory;
  }

  refillInventory(itemName, amount) {
    if (
      this.inventory.find(item => item.name === itemName) === undefined ||
      typeof itemName !== "string"
    ) {
      return "Not a valid stock choice!";
    }
    if (typeof amount !== "number" || amount < 1) {
      return "Please indicate amount to be refilled using numbers greater than 0";
    }
    let currentAmount = 0;
    let result = this.inventory.find(item => item.name === itemName);
    currentAmount = result.count;
    result.count = currentAmount + amount;
    let refilledItem = {};
    refilledItem.name = result.name;
    refilledItem.count = result.count;
    return refilledItem;
  }
  resupplyChange(coinName, amount) {
    if (
      this.change.find(coin => coin.name === coinName) === undefined ||
      typeof coinName !== "string"
    ) {
      return "Not a valid currency choice!";
    }
    if (typeof amount !== "number" || amount < 1) {
      return "Please indicate amount to be refilled using numbers greater than 0";
    }
    let currentAmount = 0;
    let result = this.change.find(coin => coin.name === coinName);
    currentAmount = result.count;
    result.count = currentAmount + amount;
    let refilledCoin = {};
    refilledCoin.name = result.name;
    refilledCoin.count = result.count;
    return refilledCoin;
  }

  makePurchase(productChoice, money) {
    let purchase = {
      change: null,
      coinsInMachine: {},
      drink: {}
    };
    if (typeof productChoice !== "string") {
      return "Not a valid product choice!";
    }
    if (
      this.inventory.find(item => item.name === productChoice) === undefined
    ) {
      return "Sorry, we dont carry that.  How about cola?";
    }

    if (typeof money !== "number") {
      return "Payment error.  Please input money in number format";
    }

    let item = this.inventory.find(soda => soda.name === productChoice);
    if (item.count === 0) {
      this.refillInventory(item.name, 10);
      return "Oops. We seem to be fresh out of that.  Please make another selection";
    }

    if (money < item.cost) {
      return "Please insert more change!";
    }
    if (money === item.cost) {
      let i = 0;
      for (i = 0; i < this.change.length; i++) {
        let coins = this.change[i];
        purchase.coinsInMachine[coins.name] = coins.count;
      }
      purchase.change = null;
      purchase.drink = { name: productChoice };

      return purchase;
    }
    if (money > item.cost) {
      let changeReturned = money - item.cost;
      changeReturned = (Math.round(changeReturned * 20) / 20).toFixed(2);
      this.change.reduce((acc, currentCoin) => {
        let coinsGiven = 0;

        while (changeReturned >= currentCoin.value && currentCoin.count > 0) {
          coinsGiven++;
          currentCoin.count--;
          changeReturned = changeReturned - currentCoin.value;
          changeReturned = (Math.round(changeReturned * 20) / 20).toFixed(2);
        }
        if (coinsGiven > 0) {
          acc[currentCoin.name] = coinsGiven;
          coinsGiven = 0;
        }
        purchase.change = acc;
        return acc;
      }, {});

      if (changeReturned > 0) {
        return "Not enough change in the machine.  Please input less money!";
      }
      let i = 0;
      for (i = 0; i < this.change.length; i++) {
        let coins = this.change[i];
        purchase.coinsInMachine[coins.name] = coins.count;
      }

      purchase.coinsInMachine;
      purchase.drink = { name: productChoice };

      return purchase;
    }
  }

  replaceProduct(oldProduct, newProduct, quantity, cost) {
    if (
      this.inventory.find(item => item.name === oldProduct) === undefined ||
      typeof oldProduct !== "string" ||
      typeof newProduct !== "string"
    ) {
      return "Not a valid item choice!";
    }
    if (typeof quantity !== "number" || quantity < 1) {
      return "Please indicate amount to be refilled using numbers greater than 0";
    }
    if (typeof cost !== "number" || cost < 1) {
      return "Please indicate cost of item to be refilled to be refilled using numbers greater than 0";
    }
    let item = this.inventory.find(item => item.name === oldProduct);
    item.name = newProduct;
    item.count = quantity;
    item.cost = cost;

    return `Great we have taken out ${oldProduct} and added ${newProduct} to the machine.  It costs ${cost}!`;
  }
}

module.exports = VendingMachine;
