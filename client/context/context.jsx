import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constant";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        alert("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have Metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object found!");
    }
  };

  const publishBlog = async (form) => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("Going to pop wallet now to pay gas...");
        const tx = await contract.createBlog(
          form.title, // title
          form.content, // description
          // new Date(form.deadline).getTime(), // deadline,
          // form.target,
          form.image
        );
        await tx.wait();

        console.log("contract call success", tx);
      }
    } catch (error) {
      console.log("Create Campaign Failed", error);
    }
  };

  const getAllBlogs = async() => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const blogs = await contract.getBlogs()
        
        const parsedBlogs = blogs.map((blog, i) => ({
          blogId: i,
          author: blog.author,
          title: blog.title,
          content: blog.content,
          image: blog.image
        }))
        // console.log("contract call success", parsedBlogs);

        return parsedBlogs;
      }
    } catch (error) {
      console.log("Create Campaign Failed", error);
    }
  }



  return (
    <AppContext.Provider value={{ currentAccount, connectWallet, publishBlog, getAllBlogs }}>
      {children}
    </AppContext.Provider>
  );
};
