const {startMining, stopMining} = require('./mine');
const jayson = require('jayson');
const {PORT} = require('./config');
const db = require('./db');

const server = new jayson.Server({
    startMining: function(_, callback) {
      startMining()
      callback(null, 'success!');
    },

    stopMining: function(_, callback) {
      stopMining()
      callback(null, 'success!');
    },

    getBalance: function([address], callback) {
      let sum = 0;
      db.utxos.forEach(utxo => {
        if (utxo.owner === address) {
          sum += utxo.amount;
        }
      })
      console.log(`Address ${address} holds ${sum} tokens`);
      callback(null, 'success!');
    },

  });
  
server.http().listen(PORT);