import BlogFormProvider from "@/components/blogs/form/BlogFormProvider";
import Header from "@/components/shared/header/Header";
import React from "react";

const newPodcast = () => {
  return (
    <>
      <Header
        description="Add your new Blog here"
        heading={`New Blog`}
        backBtn="/adminpanel/blogs"
      ></Header>
      <div className="border-b border-tertiary mb-8"></div>
      <BlogFormProvider />
    </>
  );
};

export default newPodcast;
