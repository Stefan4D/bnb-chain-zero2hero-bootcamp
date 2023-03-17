const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
require("@nomicfoundation/hardhat-chai-matchers");
const { ethers } = require("hardhat");

describe("BadgerCoin", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function contractSetup() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("BadgerCoin");
    const contract = await Contract.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Supply", function () {
    it("has a totalSupply of 1,000,000", async () => {
      const { contract } = await loadFixture(contractSetup);

      expect(Number(await contract.totalSupply())).to.equal(
        Number(1_000_000 * 10 ** 18)
      );
      // console.log(Number(await contract.totalSupply()));
      // console.log(Number(1_000_000 * 10 ** 18));
    });

    it("has 18 decimal places", async function () {
      const { contract } = await loadFixture(contractSetup);

      expect(await contract.decimals()).to.equal(18);
    });
  });

  describe("Minting and Balances", () => {
    it("mints the initial supply to the owner", async () => {
      const { contract, owner } = await loadFixture(contractSetup);

      expect(Number(await contract.balanceOf(owner.address))).to.equal(
        Number(1_000_000 * 10 ** 18)
      );
      // assert.equal(
      //   await contract.balanceOf(owner.address),
      //   Number(1_000_000 * 10 ** 18)
      // );
    });

    it("transfers tokens correctly", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        contractSetup
      );

      await contract.transfer(otherAccount.address, 10_000);

      assert.equal(await contract.balanceOf(otherAccount.address), 10_000);
    });

    // it("returns an error when transferring more tokens than are held", async () => {
    //   const { contract, owner, otherAccount } = await loadFixture(
    //     contractSetup
    //   );

    //   const result = await contract
    //     .connect(otherAccount)
    //     .transfer(owner.address, 100_000);

    //   await expect(
    //     contract.connect(otherAccount).transfer(owner.address, 100_000)
    //   ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    //   // console.log(
    //   //   await contract.connect(otherAccount).transfer(owner.address, 100_000)
    //   // );
    // });

    it("returns an error when transferring more tokens than are held", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        contractSetup
      );

      try {
        await contract.connect(otherAccount).transfer(owner.address, 100_000);
        assert.fail("Expected transfer to fail");
      } catch (error) {
        expect(error.message).to.contain(
          "ERC20: transfer amount exceeds balance"
        );
      }
    });
  });
});
