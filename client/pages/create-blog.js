import { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { Loader, FormField, CustomButton } from "../components";
import { AppContext } from "../context/context";
import { checkIfImage } from "../utils";
export default function CreateBlog() {
  const [isLoading, setIsLoading] = useState(false);
  const { publishBlog } = useContext(AppContext);
  const [form, setForm] = useState({
    name: "",
    title: "",
    content: "",
    image: "",
  });
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await publishBlog({ ...form });
        setIsLoading(false);
        router.push("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });
  };

  return (
    <div className="bg-black flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}

      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Create a Blog
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            labelName="Your Name *"
            placeholder="John Doe"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange("name", e)}
          />
          <FormField
            labelName="Blog Title *"
            placeholder="Write a title"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange("title", e)}
          />
        </div>

        <FormField
          labelName="Blog Content"
          placeholder="Write your content"
          isTextArea
          value={form.content}
          handleChange={(e) => handleFormFieldChange("content", e)}
        />

        <FormField
          labelName="Blog image *"
          placeholder="Place image URL of your Blog"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1dc071]"
          />
        </div>
      </form>
    </div>
  );
}
