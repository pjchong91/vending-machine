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

        while (changeReturned >= currentCoin.value) {
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

      let i = 0;
      for (i = 0; i < this.change.length; i++) {
        let coins = this.change[i];
        purchase.coinsInMachine[coins.name] = coins.count;
      }

      purchase.coinsInMachine;
      purchase.drink = { name: productChoice };

      //   while (changeReturned >= 2.0) {
      //     let toonie = this.change.find(coin => coin.name === "toonie");
      //     let currentToonies = toonie.count;
      //     toonie.count = currentToonies--;
      //     changeReturned = (changeReturned - 2).toFixed(2);
      //   }
      //   while (changeReturned >= 1.0) {
      //     let loonie = this.change.find(coin => coin.name === "loonie");
      //     let currentLoonies = loonie.count;
      //     loonie.count = currentLoonies--;
      //     changeReturned = (changeReturned - 2).toFixed(2);
      //   }
      //   while (changeReturned >= 0.25) {
      //     let quarter = this.change.find(coin => coin.name === "quarter");
      //     let currentQuarter = quarter.count;
      //     quarter.count = currentQuarter--;
      //     changeReturned = (changeReturned - 2).toFixed(2);
      //   }
      //   while (changeReturned >= 0.1) {
      //     let dime = this.change.find(coin => coin.name === "dime");
      //     let currentDime = dime.count;
      //     dime.count = currentDime--;
      //     changeReturned = (changeReturned - 2).toFixed(2);
      //   }
      //   while (changeReturned >= 0.05) {
      //     let nickel = this.change.find(coin => coin.name === "nickel");
      //     let currentNickels = nickel.count;
      //     nickel.count = currentNickels--;
      //     changeReturned = (changeReturned - 2).toFixed(2);
      //   }
      //   console.log(changeReturned, "change returned");
      //   console.log(purchase, "purchased");

      //   return {
      //     change: { nickel: 1, toonie: 1 },
      //     coinsInMachine: {
      //       dime: 10,
      //       loonie: 10,
      //       nickel: 9,
      //       quarter: 10,
      //       toonie: 9
      //     },
      //     drink: { name: "cola" }
      //   };
      return purchase;
    }
  }
}

module.exports = VendingMachine;
