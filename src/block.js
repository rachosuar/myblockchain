const CryptoJS = require("crypto-js");
class Block {
  constructor(data, prevHash = "") {
    this.timestamp = Date.now();
    this.name = "Genesis Block" || `Bloque ${name}`;
    this.tx = data.from || "S/N";
    this.rx = data.to || "S/N";
    this.data = data.amount || "S/N";
    this.prevHash = prevHash || "S/N";
    this.hash = this.calcularHash();
    this.valid = data.valid || "No prev hash";
  }

  calcularHash() {
    let strBlock = this.prevHash + this.timestamp + JSON.stringify(this.data);
    return CryptoJS.SHA256(strBlock).toString(CryptoJS.enc.Hex);
  }
}

module.exports = Block;
