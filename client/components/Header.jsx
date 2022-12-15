import React from "react";

const Header = ({ account, connectWallet }) => {
  return (
    <div className="bg-black flex items-center justify-center ">
      <div className="mt-12">
        {account ? (
          <button className="bg-red-400 text-white px-5 py-2  rounded-md text-center mb-14">
            {account.slice(0, 4)}...{account.slice(-4)}
          </button>
        ) : (
          <button
            className="bg-red-400 text-white px-5 py-2  rounded-md text-center mb-14"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
