import * as CryptoJS from 'crypto-js';

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public timestamp: number;
  public data: string;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string,
  ): string => CryptoJS.SHA256(index + previousHash + data + timestamp).toString();

  static isValidateBlock = (block: Block): boolean =>
    typeof block.index === 'number' &&
    typeof block.hash === 'string' &&
    typeof block.previousHash === 'string' &&
    typeof block.timestamp === 'number' &&
    typeof block.data === 'string';

  constructor(index: number, hash: string, previousHash: string, timestamp: number, data: string) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}

const genesisBlock = new Block(0, '2020', '', 123456, 'hello');

const blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 10000);

const createNewBlock = (data: string): Block => {
  const previousBlock = getLatestBlock();
  const newIndex = previousBlock.index + 1;
  const newTimestamp = getNewTimeStamp();
  const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
  const newBlock = new Block(newIndex, newHash, previousBlock.hash, newTimestamp, data);

  return newBlock;
};

const getHashForBlock = (block: Block): string =>
  Block.calculateBlockHash(block.index, block.previousHash, block.timestamp, block.data);

const isBlockValid = (candidateBlock: Block, previousblock: Block): blooan => {
  if (!Block.isValidateBlock(candidateBlock)) {
    return false;
  } else if (previousblock.index + 1 !== candidateBlock.index) {
    return false;
  } else if (previousblock.hash !== candidateBlock.previousHash) {
    return false;
  } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

export {};
