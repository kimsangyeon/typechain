"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, timestamp, data) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
    }
}
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + data + timestamp).toString();
Block.isValidateBlock = (block) => typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.timestamp === 'number' &&
    typeof block.data === 'string';
const genesisBlock = new Block(0, '2020', '', 123456, 'hello');
const blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 10000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, newTimestamp, data);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (block) => Block.calculateBlockHash(block.index, block.previousHash, block.timestamp, block.data);
const isBlockValid = (candidateBlock, previousblock) => {
    if (!Block.isValidateBlock(candidateBlock)) {
        return false;
    }
    else if (previousblock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousblock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock('second Block');
createNewBlock('third Block');
createNewBlock('fourth Block');
console.log(blockchain);
//# sourceMappingURL=index.js.map