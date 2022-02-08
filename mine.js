const db = require('./db');
const Block = require('./model/Block');
const Transaction = require('./model/Transaction');
const UTXO = require("./model/UTXO");
const {MINER_PUBLIC_KEY} = require ("./config");

let mining = false;
let TARGET_DIFFICULTY = BigInt("0x0000" + "F".repeat(60));
let MINING_REWARD_AMOUNT = 10;

const startMining = () => {
    mining = true;
    mine();
}

const stopMining = () => {
    mining = false;
}

function mine() {
    if (!mining) {
        return;
    }

    const block = new Block();
    const miningRewardUTXO = new UTXO(MINER_PUBLIC_KEY, MINING_REWARD_AMOUNT);
    const miningRewardTransaction = new Transaction([], [miningRewardUTXO]);
    block.addTransaction(miningRewardTransaction);
    block.executeTransactions();

    // get transactions from mempool

    while (BigInt("0x" + block.hash()) >= TARGET_DIFFICULTY) {
        block.nonce++;
    }

    //console.log(block.transactions);

    db.blockchain.addBlock(new Block())
    console.log(`Block #${db.blockchain.blockHeight()} has been mined with hash ${block.hash()} at nonce ${block.nonce}`);

    setTimeout(mine, 5000);
}

module.exports = {
    startMining,
    stopMining,
};