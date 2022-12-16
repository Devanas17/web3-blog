import React from 'react'

const Card = ({author, title, content, image, handleClick }) => {
  return (
    <div className="  rounded-[15px]  cursor-pointer -[400px] border" >

      <img src={image} alt="" className=' w-full h-[250px] object-cover ' />
      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[18px]">
          <img src="logo.jpg" alt="tag" className="w-[17px] h-[17px] object-contain"/>
          <p className="ml-[12px] mt-[2px]  font-medium text-[12px] text-gray-500">Education</p>
        </div>

        <div className="block">
          <h3 className=" font-semibold text-[16px] text-black text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px]  font-normal text-gray-500 text-left leading-[18px] truncate">{content}</p>
        </div>

       

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src="avatar.png" alt="user" className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="flex-1  font-normal text-[12px] text-gray-500 truncate pl-5">by <span className="text-[#b2b3bd]">{author}</span></p>
        </div>
      </div> 
    </div>
  )
}

export default Card