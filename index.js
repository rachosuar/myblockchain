const BlockChain = require("./src/blockchain");
const Block = require("./src/block");
const CryptoJS = require("crypto-js");

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
