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
      console.log(name);
      inventory[name] = { count: this.inventory[i].count };
      //   inventory.this.inventory[i].name = this.inventory[i].count;
    }
    return inventory;
  }

  refillInventory(string, amount) {
    let result = this.inventory.find(item => item.name === string);
    currentAmount = result.count;
    result.count = currentAmount + amount;
    return this.inventory.find(item => item.name === string);
  }
}

module.exports = VendingMachine;
