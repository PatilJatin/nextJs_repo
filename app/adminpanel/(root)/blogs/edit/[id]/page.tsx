import EditBlogPage from "@/components/pages/adminpanel/EditBlogPage";
import Header from "@/components/shared/header/Header";
import React from "react";

const EditBlog = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <Header
        description="Edit blog here"
        heading={`Edit Blog`}
        backBtn="/adminpanel/blogs"
      ></Header>

      <div className="border-b border-tertiary mb-8"></div>

      <EditBlogPage id={id} />
    </>
  );
};

export default EditBlog;
