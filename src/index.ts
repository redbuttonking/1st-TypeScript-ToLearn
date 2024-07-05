import crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(public readonly prevHash: string, public readonly height: number, public readonly data: string) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  // Hash 생성하는 부분
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  // 블럭의 초기값 설정
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }

  //해쉬의 이전 값을 가져옴 길이가 0이면 '' / 그게 아니면 이전 값을 가져옴
  private getPrevHash() {
    if (this.blocks.length === 0) {
      return '';
    }
    return this.blocks[this.blocks.length - 1].hash;
  }

  // 블록을 추가함
  public addBlock(data: string) {
    const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(newBlock);
  }

  // 현재 가지고 있는 블록을 받아옴
  public getBlock() {
    return [...this.blocks]; // 새로운 배열로 리턴해줌
  }
}

const blockchain = new Blockchain();

blockchain.addBlock('1블럭');
blockchain.addBlock('2블럭');
blockchain.addBlock('3블럭');

console.log(blockchain.getBlock());
