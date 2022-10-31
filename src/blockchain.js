const Block = require("./block.js");

class BlockChain {
  constructor() {
    this.blockchain = [this.genesisBlock()];
  }
  genesisBlock() {
    return new Block({});
  }
  ultimoBlock() {
    return this.blockchain[this.blockchain.length - 1];
  }
  agregarBlock(newBlock) {
    newBlock.prevHash = this.ultimoBlock().hash;
    newBlock.hash = newBlock.calcularHash();
    newBlock.name = this.blockchain.length + 1;
    this.blockchain.push(newBlock);
  }
  checkValidity() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currBlock = this.blockchain[i];
      const prevBlock = this.blockchain[i - 1];
      if (currBlock.hash !== currBlock.calcularHash()) {
        return false;
      }
      if (currBlock.prevHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

module.exports = BlockChain;
