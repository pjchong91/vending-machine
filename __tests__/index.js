const VendingMachine = require("../lib/vending-machine.js");

let vendingMachine = new VendingMachine();
describe("Vending Machine", () => {
  describe("when list of inventory (name and amount) is requested", () => {
    it("should return a list of objects", () => {
      expect(vendingMachine.getInventory()).toEqual({
        cola: { count: 10 },
        fanta: { count: 8 },
        "fruit punch": { count: 5 }
      });
    });
  });
  describe("when inventory is refilled", () => {
    it("should return object of the item that has been refilled", () => {
      expect(vendingMachine.refillInventory("fruit punch", 7)).toEqual({
        name: "fruit punch",
        count: 12
      });
    });
    it("should throw an error if item to be refilled does not exist", () => {
      expect(vendingMachine.refillInventory("pepsi", 7)).toEqual(
        "Not a valid stock choice!"
      );
    });
    it("should throw an error if item to be refilled is not type of string", () => {
      expect(vendingMachine.refillInventory(400, 7)).toEqual(
        "Not a valid stock choice!"
      );
    });
    it("should throw an error if amount to be refilled is not a positive integer", () => {
      expect(vendingMachine.refillInventory("cola", "seven")).toEqual(
        "Please indicate amount to be refilled using numbers greater than 0"
      );
    });
  });
  describe("when change is resupplied to the vending machine", () => {
    it("should return an updated count of the coins available", () => {
      expect(vendingMachine.resupplyChange("quarter", 10)).toEqual({
        name: "quarter",
        count: 20
      });
    });
    it("should throw an error if coin to be refilled does not exist", () => {
      expect(vendingMachine.resupplyChange("rupee", 7)).toEqual(
        "Not a valid currency choice!"
      );
    });
    it("should throw an error if coin to be refilled is not type of string", () => {
      expect(vendingMachine.resupplyChange(400, 7)).toEqual(
        "Not a valid currency choice!"
      );
    });
    it("should throw an error if amount to be refilled is not a positive integer", () => {
      expect(vendingMachine.resupplyChange("loonie", "seven")).toEqual(
        "Please indicate amount to be refilled using numbers greater than 0"
      );
    });
  });
  describe("when consumer provides extra sufficient money and choice", () => {
    it("should return the correct amount of change", () => {
      expect(vendingMachine.provideChange(5.3)).toEqual([
        { nickel: 1 },
        { quarter: 1 },
        { loonie: 1 },
        { toonie: 1 }
      ]);
    });
    it("should deplete change reserves from vending machine", () => {
      expect(vendingMachine.provideChange(5.3)).toEqual([
        { nickel: 9 },
        { quarter: 9 },
        { loonie: 9 },
        { toonie: 9 }
      ]);
    });
    it("should dispense the correct product", () => {
      expect(vendingMachine.provideProduct("fanta")).toEqual("fanta");
    });
  });
  describe("when consumer provides choice but insufficient money", () => {
    it("should prompt consumer for more money", () => {
      expect(vendingMachine.provideProduct("fanta")).toEqual(
        "Please insert more change!"
      );
    });
  });
  describe("when consumer provides exact change for product", () => {
    it("should return no change", () => {
      expect(vendingMachine.provideChange(2.0)).toEqual(0);
    });
  });
  describe("when consumer provides unavailable choice", () => {
    it("should inform user their choice is not available", () => {
      expect(vendingMachine.provideProduct("pepsi")).toEqual(
        "Sorry we dont carry pepsi.  How about cola?"
      );
    });
  });
  describe("when item selection is not a string", () => {
    it("should return a selection error", () => {
      expect(vendingMachine.provideProduct(400)).toEqual(
        "Selection error.  Please provide a string."
      );
    });
  });
  describe("when money input is not an integer", () => {
    it("should return a payment error", () => {
      expect(vendingMachine.provideProduct(400)).toEqual(
        "Payment error.  Please provide an integer."
      );
    });
  });
});
