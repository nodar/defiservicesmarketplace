require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "kovan.infura.io/v3/f23d6fe08fad4e0f886e5e73406aed81",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
