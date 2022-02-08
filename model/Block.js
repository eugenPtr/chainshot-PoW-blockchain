const SHA256 = require('crypto-js/sha256');

class Block {
    constructor() {
        this.transactions = [];
        this.timestamp = new Date();
        this.nonce = 0;
    }
    hash() {
        return SHA256("" + this.timestamp + this.nonce + JSON.stringify(this.transactions)).toString();
    }
    addTransaction(tx) {
        this.transactions.push(tx);
    }
    executeTransactions() {
        this.transactions.forEach(tx => tx.execute());
    }

}

module.exports = Block;