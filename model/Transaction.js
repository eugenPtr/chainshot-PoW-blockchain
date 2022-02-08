const db = require("../db");

class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;
        this.outputUTXOs = outputUTXOs;
    }
    execute() {
        this.inputUTXOs.forEach(utxo => {
            utxo.spent = true;
        })
        this.outputUTXOs.forEach(utxo => {
            db.utxos.push(utxo)
        })
    }
}

module.exports = Transaction;