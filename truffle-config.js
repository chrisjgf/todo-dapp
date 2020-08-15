const HDWalletProvider = require("@truffle/hdwallet-provider");
const path = require("path");
require('dotenv').config()

const INFURA = process.env.INFURA;
const MNEMONIC = process.env.MNEMONIC;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, `https://rinkeby.infura.io/v3/${INFURA}`, 0, 1, true)
      ,
      network_id: "4",
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(MNEMONIC, `https://ropsten.infura.io/v3/${INFURA}`, 0, 1, true)
      ,
      network_id: "3",
    }
  }
};
