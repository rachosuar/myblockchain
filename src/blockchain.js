const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");

const crypto = require("crypto");

class Block {
  constructor(data, prevHash = "") {
    this.timestamp = Date.now();
    this.tx = data.from;
    this.rx = data.to;
    this.data = data.amount;
    this.prevHash = prevHash;
    this.hash = this.calcularHash();
    this.valid = data.valid;
  }

  calcularHash() {
    let strBlock = this.prevHash + this.timestamp + JSON.stringify(this.data);
    return CryptoJS.SHA256(strBlock).toString(CryptoJS.enc.Hex);
  }
}

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
let createTxHash = () => {
  return CryptoJS.SHA256(`${Math.trunc(Math.random() * 1000)}`).toString(
    CryptoJS.enc.Hex
  );
};

let chain = new BlockChain();
console.log(chain);
setInterval(() => {
  let nuevoBloque = new Block({
    from: createTxHash(),
    to: createTxHash(),
    amount: `$ ${Math.trunc(Math.random() * 100)},00`,
    valid: chain.checkValidity(),
  });
  chain.agregarBlock(nuevoBloque);
  console.log(chain);
}, 5000);
