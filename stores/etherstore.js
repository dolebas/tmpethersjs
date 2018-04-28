module.exports = store;

var utils = require("ethers/utils");
var providers = require("ethers/providers");
var network = providers.networks.homestead;
var web3Provider = new providers.Web3Provider(web3.currentProvider, network);

function store(state, emitter) {
  state.balance = "";

  emitter.on("DOMContentLoaded", function() {
    emitter.on("balance:update", function(anything) {
      web3Provider.listAccounts().then(function(accounts) {
        var address = accounts[0];
        console.log("hello " + address);
        web3Provider.getBlockNumber().then(function(blockNumber) {
          console.log("Current block number: " + blockNumber);
        });
        web3Provider.getBalance(address).then(function(balance) {
          // balance is a BigNumber (in wei); format is as a sting (in ether)
          var etherString = utils.formatEther(balance);
          console.log("Balance: " + etherString);
          state.balance = etherString;
          emitter.emit(state.events.RENDER);
        });
      });
    });
  });
}
