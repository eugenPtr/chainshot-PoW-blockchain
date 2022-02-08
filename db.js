const Blockchain = require("./model/Blockchain.js");

const db = {
    blockchain: new Blockchain(),
    utxos: []
}

module.exports = db