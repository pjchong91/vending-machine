class VendingMachine {
  constructor(inventory) {
    this.inventory = [{ cola: 10 }, { fanta: 8 }, { "fruit punch": 5 }];
  }

  getInventory() {
    return this.inventory;
  }
}

module.exports = VendingMachine;
