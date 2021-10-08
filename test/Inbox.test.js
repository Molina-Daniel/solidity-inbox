const assert = require('assert'); // built-in Node.js module
const ganache = require('ganache-cli'); // it's gona serves as our local ethereum test network
const Web3 = require('web3'); // Web3 is always used as constructor function, we'll always create a new instance of Web3 each time we work with it (reason because it starts with capital letters)
const web3 = new Web3(ganache.provider()); // this creates an instance of Web3 and feed it with ganache as test network in our local, we'll change this provider depending on which network we want to connect to (Ethereum, Rinkeby, Ropsten, etc)
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;
const initialString = 'Hello World!'

beforeEach(async () => {
   // Get a list of all accounts
   accounts = await web3.eth.getAccounts()

   // Use one of those accounts to deploy the contract
   // The below 'inbox' object is a JavaScript representation of our contract that will be deployed into the blockchain
   inbox = await new web3.eth.Contract(JSON.parse(interface)) // Tells web3 that there's a Ethereum contract and the interface to interact with
      .deploy({ // Creates a transaction object. Tells web3 that we want to deploy a new copy of this contract. And we pass the contract data/code (bytecode) and the arguments for the constructor that we need to initialitate the contract (initialMessage in this case)
         data: bytecode,
         arguments: [initialString] // If we'd have a second parameter in the constructor function, we'd pass it as second argument inside this array
      })
      .send({ // Tells web3 to comunicate with the network and to send out this transaction to create the contract 
         from: accounts[0],
         gas: '1000000'
      })
});

describe('Inbox', () => {
   it('deploys a contract successfully', () => {
      // checks that exists a deploy address
      assert.ok(inbox.options.address);
   });

   it('has a default message', async () => {
      // call a method of our contract that checks the message with the initial message
      const message = await inbox.methods.message().call();
      assert.equal(message, initialString);
   });
});









// MOCHA TEST EXAMPLE

// class Car {
//    park() {
//       return 'stopped';
//    }

//    drive() {
//       return 'vroom';
//    }
// }

// let car; // we have to declare the variable outside beforeEach in order to the rest of test functions have access to it

// beforeEach(() => { // it runs before each test function (it)
//    car = new Car();
// })

// describe('Car', () => {
//    it('Car can park', () => {
//        assert.equal(car.park(), 'stopped');
//    });

//    it('Car can drive', () => {
//       assert.equal(car.drive(), 'vroom');
//    });
// });