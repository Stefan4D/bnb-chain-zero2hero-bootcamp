const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect, assert } = require("chai");
require("@nomicfoundation/hardhat-chai-matchers");
const { ethers } = require("hardhat");

describe("BadgerCoin and BadgerStake", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function contractSetup() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const TokenContract = await ethers.getContractFactory("BadgerCoin");
    const tokenContract = await TokenContract.deploy();

    const StakingContract = await ethers.getContractFactory("BadgerStake");
    const stakingContract = await StakingContract.deploy(tokenContract.address);

    return { tokenContract, stakingContract, owner, otherAccount };
  }

  describe("Token Contract Deployment", function () {
    it("has a totalSupply of 1,000,000", async () => {
      const { tokenContract } = await loadFixture(contractSetup);

      expect(Number(await tokenContract.totalSupply())).to.equal(
        Number(1_000_000 * 10 ** 18)
      );
    });

    it("mints the initial supply to the owner", async () => {
      const { tokenContract, owner } = await loadFixture(contractSetup);

      expect(Number(await tokenContract.balanceOf(owner.address))).to.equal(
        Number(1_000_000 * 10 ** 18)
      );
    });

    it("emits a transfer event when tokens are transferred", async () => {
      const { tokenContract, owner, otherAccount } = await loadFixture(
        contractSetup
      );

      const tx = await tokenContract.transfer(otherAccount.address, 10_000);
      // const resolvedTx = await tx.wait();

      expect(tx).to.emit("Transfer");
    });

    it("transfers tokens correctly", async () => {
      const { tokenContract, owner, otherAccount } = await loadFixture(
        contractSetup
      );

      await tokenContract.transfer(otherAccount.address, 10_000);

      assert.equal(await tokenContract.balanceOf(otherAccount.address), 10_000);
    });
  });

  describe("Staking Contract Deployment", () => {
    // this isn't behaving as I would expect so doing directly in each test
    // beforeEach(async () => {
    //   const { tokenContract, stakingContract, owner, otherAccount } =
    //     await loadFixture(contractSetup);

    //   await tokenContract.mint(owner.address, 100_000);
    //   await tokenContract.mint(otherAccount.address, 100_000);
    // });
    it("deploys and shows a zero balance staked for the owner", async () => {
      const { tokenContract, stakingContract, owner, otherAccount } =
        await loadFixture(contractSetup);
      expect(Number(await stakingContract.balanceOf(owner.address))).to.equal(
        0
      );
      await tokenContract.mint(otherAccount.address, 1_000_000);

      //   console.log(await tokenContract.balanceOf(owner.address));
      //   console.log(await tokenContract.balanceOf(otherAccount.address));
    });

    it("allows a token spend approval", async () => {
      const { tokenContract, stakingContract, owner, otherAccount } =
        await loadFixture(contractSetup);
      await tokenContract.mint(otherAccount.address, 1_000_000);
      const otherAccountBalance = await tokenContract.balanceOf(
        otherAccount.address
      );

      expect(otherAccountBalance).to.equal(1_000_000);

      await tokenContract
        .connect(otherAccount)
        .approve(stakingContract.address, 100_000);

      await stakingContract.connect(otherAccount).stake(10_000);

      const stakedBalance = await stakingContract.balanceOf(
        otherAccount.address
      );

      expect(stakedBalance).to.equal(10_000);
    });
  });
});
