require("dotenv").config();

const config = {
  privateKey: process.env.PRIVATE_KEY,
  rpcEndpoint: process.env.RPC_ENDPOINT,
  bscscanApiKey: process.env.BSCSCAN_API_KEY,
};

module.exports = {
  config,
};
