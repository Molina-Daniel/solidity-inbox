const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// Connect to a specific network (Rinkeby in this case) and unlocks an account in that network
const provider = new HDWalletProvider(
   'YOUR_12_MNEMONIC_ACCOUNT_WORDS', // this unlocks your public and private key in the network
   'YOUR_INFURA_RINKEBY_API_LINK' // connects to a Rinkeby network node through Infura API
);
const web3 = new Web3(provider);

// The only reason of making this function is to be able to use the async/await
const deploy = async () => {
   const accounts = await web3.eth.getAccounts();

   console.log('Attempting to deploy from account', accounts[0]);

   const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: ['Hello World!'] })
      .send({ gas: '1000000', gasPrice: '5000000000', from: accounts[0] });

   console.log('Contract deployed to:', result.options.address);
};

deploy();
// Contract deployed on 0x77C45ADB236098efB0D4D318F518B2C86E827938
// from: 0xdB6DA777a8245324254a6486784401913AfC3363