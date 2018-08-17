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

  refillInventory(string, amount) {
    if (
      this.inventory.find(item => item.name === string) === undefined ||
      typeof string !== "string"
    ) {
      return "Not a valid stock choice!";
    }
    if (typeof amount !== "number" || amount < 1) {
      return "Please indicate amount to be refilled using numbers greater than 0";
    }
    let currentAmount = 0;
    let result = this.inventory.find(item => item.name === string);
    currentAmount = result.count;
    result.count = currentAmount + amount;
    let refilledItem = {};
    refilledItem.name = result.name;
    refilledItem.count = result.count;
    return refilledItem;
  }
}

module.exports = VendingMachine;
