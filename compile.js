const path = require('path'); // built-in Node.js module, it generates a path which works either unix and windows systems
const fs = require('fs'); // built-in Node.js module, fs = file system
const solc = require('solc'); // Solidity compiler module
const { compile } = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // __dirname is a constant which is the root directory
const source = fs.readFileSync(inboxPath, 'utf-8'); // it reads the raw source content of the .sol files with the specific encoding utf-8

module.exports = solc.compile(source, 1).contracts[':Inbox']; // we pass the source code that we want to compile as first parameter, and the number of contracts that we'll compile as second parameter
// For testing, run 'node compile.js' in the temrinal with:
// console.log(solc.compile(source, 1));