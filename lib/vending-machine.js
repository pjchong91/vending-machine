class VendingMachine {
  constructor(inventory) {
    this.inventory = [
      {
        name: "cola",
        count: 10,
        cost: 3.25
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
        name: "nickel",
        count: 10,
        value: 0.05
      },
      {
        name: "dime",
        count: 10,
        value: 0.1
      },
      {
        name: "quarter",
        count: 10,
        value: 0.25
      },
      {
        name: "loonie",
        count: 10,
        value: 1.0
      },
      {
        name: "toonie",
        count: 10,
        value: 2.0
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
}

module.exports = VendingMachine;
