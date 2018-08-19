# ADP Project 3: Vending Machine

- Author: P. Chong, ADP Student @ RED Academy 2018 Q3

## Description and Objective:

- The objective for this project is to create a vending machine in Javascript. A test-driven development(TDD) approach should be taken and 10 well-formed and tests should be created and eventually passed.
- The vending machine does not require a UI

<!-- More information about the project and learnings can be found on the wiki. -->

## 10 Tests:

1. A list of inventory can be requested
   - it should return a list of items and their counts
1. When inventory is refilled
   - it should return the name of the item filled and the new count
   - this test assumes one item is refilled at a time
1. When change is resupplied
   - it should return the name of the coin filled and the new count
   - this test assumes one type of coin is refilled at a time
1. When user makes purchase request with more money than is required
   - it should return the correct product, the correct amount of change(in the form of coins), and coin reserves in the machine should be updated
1. When user makes purchase request with the exact amount of money that is required
   - it should return the correct product, change as null, and coin reserves should in the machine should show no change
1. When user attempts to make purchase with an insufficient amount of money
   - it prompts the user to insert more change
1. When change is to be returned
   - it should return the smallest amount of coins required to provide the accurate amount of change
1. When user requests purchase of item has 0 stock
   - it should prompt the user of product inavailability
   - it should run function to restock the empty item with 10 items
1. When machine owner wants to change products
   - it should replace a pre-existing item with a new item and the inventory should reflect the replacement

## Questions and Learnings

- TDD Approach to Development
  - In this week of classes we discussed the benefits of writing tests first and then writing code. TDD promotes the consideration of functionality and edge-cases. ie. What exactly do we want our code to achieve? By having a better idea of what we want, the code we write is cleaner.
  - TDD allows for greater maintainability of code as it becomes more complex. By having a pre-established set of tests that can be run between changes, we can be confident that the code still works if the tests still pass (provided, we have written good tests!)

## Using:

- Javascript
- Jest for testing

## Set Up

1. Download the repo
1. Run npm install
1. Run npx jest

<!-- ## Goals for Future Improvement: -->
