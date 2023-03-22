const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
require("@nomicfoundation/hardhat-chai-matchers");
const { ethers } = require("hardhat");

describe("DogCoin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function contractSetup() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("DogCoin");
    const contract = await Contract.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Minting and Balances", () => {
    // Increase totalSupply in 1000 increments
    it("can increase the supply in incremental units of 1000", async () => {
      const { contract, owner } = await loadFixture(contractSetup);

      await contract.mint();
      const newBalance = await contract.getBalance(owner.address);
      // console.log(`newBalance:` + newBalance.toString());
      // console.log(`string comparison:` + "1001000000000000000000000");
      assert.equal(newBalance.toString(), "2001000");
    });

    // Verify only the owner can mint tokens
    it("returns an error when a user other than the owner tries to mint", async () => {
      const { contract, otherAccount } = await loadFixture(contractSetup);

      try {
        await contract.connect(otherAccount).mint();
        assert.fail("Expected mint to fail");
      } catch (error) {
        expect(error.message).to.contain("You are not the contract owner");
      }
    });

    // Ensure correct events are produced when transfers occur
    it("emits a transfer event when tokens are transferred", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        contractSetup
      );

      // console.log(otherAccount.address);
      const tx = await contract.transfer(10_000, otherAccount.address);

      const resolvedTx = await tx.wait();

      // console.log(resolvedTx);
      // console.log(resolvedTx.events[0].event);

      // think this test only works because there is a single event
      expect(resolvedTx.events[0].event).to.equal("tokenTransfer");
      // assert.equal(await contract.balanceOf(otherAccount.address), 10_000);
    });
  });
});
