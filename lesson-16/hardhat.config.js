require("@nomicfoundation/hardhat-toolbox");
const { config } = require("./config.js");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      chainId: 56,
      forking: {
        url: config.qnEndpoint,
      },
    },
  },
  solidity: "0.8.18",
};
