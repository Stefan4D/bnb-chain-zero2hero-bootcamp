const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect, assert } = require("chai");

const uri1 = "bafkreihzhoox2hllfwjgebzqpclf7h7b7xmfp52yqd4kiexxjngmwjt7ze";
const uri2 = "bafkreihrg3aunktyev3shh3dhqxivyf6nv2kbrzwips3l2md6iflidfcz4";

describe("BadgerNFT", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function contractSetup() {
    // deployOneYearLockFixture
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("BadgerNFT");
    const contract = await Contract.deploy();

    return { contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("deploys successfully", async () => {
      const { contract } = await loadFixture(contractSetup);
      // const address = await smartContract.address;
      console.log(contract.address);
      // expect(contract.address).not.to.equal(0x0)

      assert.notEqual(contract.address, 0x0);
      assert.notEqual(contract.address, "");
    });

    it("Should set the right owner", async function () {
      const { contract, owner } = await loadFixture(contractSetup);

      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("Minting", () => {
    it("mints an NFT successfully to the owner", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        contractSetup
      );

      await contract.safeMint(owner.address, uri1); // mint an NFT to the owner

      assert.equal(await contract.balanceOf(owner.address), 1); // check that the account balance of the owner is correct having minted 1 NFT
    });

    it("mints and transfers NFT successfully from the owner to another account", async () => {
      const { contract, owner, otherAccount } = await loadFixture(
        contractSetup
      );

      await contract.safeMint(owner.address, uri1); // mint an NFT to the owner
      await contract.safeMint(owner.address, uri2); // mint an NFT to the owner

      await contract.transferFrom(owner.address, otherAccount.address, 1); // transfer the minted NFT from the owner to the otherAccount

      assert.equal(await contract.balanceOf(otherAccount.address), 1); // check that the account balance of the otherAccount is correct having received 1 NFT

      // Uncomment these to ensure that both the owner and otherAccount hold 1 NFT
      // console.log(await contract.balanceOf(owner.address));
      // console.log(await contract.balanceOf(otherAccount.address));
    });
  });
});
