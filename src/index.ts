import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string,
  ): string => CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

  constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock = new Block(0, '2020', '', 'hello', 123456);

const blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 10000);

const createNewBlock = (data: string): Block => {
  const previousBlock = getLatestBlock();
  const newIndex = previousBlock.index + 1;
  const newTimestamp = getNewTimeStamp();
  const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
  const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
  const blockchain = getBlockchain();

  blockchain.push(newBlock);

  return newBlock;
};

console.log(createNewBlock('hello'), createNewBlock('bye bey'));

export {};
