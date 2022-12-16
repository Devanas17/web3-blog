import React, { useState, useEffect } from "react";
import { Card } from "./";
import { useRouter } from "next/router";

const DisplayBlogs = ({ title, isLoading, blogs }) => {
  const router = useRouter();

  const handleNavigate = (blog) => {
    router.push(`/blogs/${blog.title}`, { state: blog });
  };
  return (
    <div className="text-black">
      <h1 className="font-epilogue font-semibold text-[18px]  text-left ">
        {title} ({blogs.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-10">
        {isLoading && (
          <img
            src="loader.svg"
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && blogs.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        <div className="grid sm:grid-cols-2 gap-20 lg:grid-cols-3">
          {!isLoading &&
            blogs.length > 0 &&
            blogs.map((blog) => (
              <Card
                key={blog.id}
                {...blog}
                handleClick={() => handleNavigate(blog)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayBlogs;
