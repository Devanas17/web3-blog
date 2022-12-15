const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Blog", async () => {
  let blog;
  let address1, address2;

  beforeEach(async () => {
    [address1, address2] = await ethers.getSigners();
    const Blog = await ethers.getContractFactory("Blog");
    blog = await Blog.deploy();
  });

  describe("Create Blog Post", async () => {
    it("Should Create Blog", async () => {
      const txn = await blog.createBlog(
        "Javascript",
        "Javascript is my favorite Programming language.",
        "https://images.pexels.com/photos/14558366/pexels-photo-14558366.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
      );
      await txn.wait();
    });
  });

  describe("Edit Blog Post", async () => {
    it("Should edit the blog", async () => {});
  });
});
