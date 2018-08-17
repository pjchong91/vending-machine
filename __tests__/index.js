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
    it("should return the correct product, the correct amount of change, and deplete change reserves", () => {
      expect(vendingMachine.makePurchase("cola", 5.3)).toEqual({
        change: {
          nickel: 1,
          toonie: 1
        },
        coinsInMachine: {
          nickel: 9,
          toonie: 9
        },
        drink: {
          name: "cola"
        }
      });
    });
    it("should throw an error if product choice does exist", () => {
      expect(vendingMachine.makePurchase("pepsi", 7)).toEqual(
        "Sorry, we dont carry that.  How about cola?"
      );
    });
    it("should throw an error if product choice is not type of string", () => {
      expect(vendingMachine.makePurchase(400, 7)).toEqual(
        "Not a valid product choice!"
      );
    });
    it("should throw an error if amount of money given is not a positive integer", () => {
      expect(vendingMachine.makePurchase("cola", "seven")).toEqual(
        "Payment error.  Please input money in number format"
      );
    });
  });
  describe("when consumer provides choice but insufficient money", () => {
    it("should prompt consumer for more money", () => {
      expect(vendingMachine.makePurchase("fanta", 0.05)).toEqual(
        "Please insert more change!"
      );
    });
  });
  describe("when consumer provides exact change for product", () => {
    it("should return no change", () => {
      expect(vendingMachine.makePurchase("fanta", 1.77)).toEqual(0);
    });
  });
});
