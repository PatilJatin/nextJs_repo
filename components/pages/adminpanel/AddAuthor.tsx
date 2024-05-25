import AuthorFormProvider from "@/components/authors/form/AuthorFormProvider";
import Header from "@/components/shared/header/Header";
import React from "react";

const AddAuthor = () => {
  return (
    <>
      <Header
        backBtn={`/adminpanel/authors`}
        heading="New Author"
        description="Add new author here"
      />

      <div className="border-b border-tertiary"></div>

      <AuthorFormProvider variant="create" />
    </>
  );
};

export default AddAuthor;
