import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/context";
import { useRouter } from 'next/router'
import Link from 'next/link';
import {CustomButton} from "../components"



const Header = () => {
  const { currentAccount, connectWallet, name } = useContext(AppContext);
  const [isActive, setIsActive] = useState('Create-Blog');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const router = useRouter()


  return (
    <div className=" ">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
        <Link href="/">
          <img src="logo.jpg" className=" w-14 h-14 rounded-full" alt="logo" />
        </Link>
          <h1 className="text-xl font-semibold">WebdevAnas</h1>
        </div>
        <div className="flex items-center space-x-3">
        <CustomButton 
          btnType="button"
          title={currentAccount ? 'Create Blog' : 'Connect'}
          styles={currentAccount ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={() => {
            if(currentAccount) router.push('create-blog')
            else connectWallet()
          }} />

          <Link href="/profile">
          <div className="w-16 h-16 rounded-full bg-blue-900  flex justify-center items-center cursor-pointer">
            <img src="avatar.png" alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
          </Link>

        </div>
      </nav>
    </div>
  );
};

export default Header;
