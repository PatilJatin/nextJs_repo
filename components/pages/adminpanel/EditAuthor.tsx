"use client";

import AuthorFormProvider from "@/components/authors/form/AuthorFormProvider";
import Header from "@/components/shared/header/Header";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { mapResponseToAuthorForm } from "@/redux/features/adminpanel/authors/authors.mapper";
import {
  authorsSelector,
  getAuthorByIdAction,
} from "@/redux/features/adminpanel/authors/authors.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import React, { useEffect } from "react";

const EditAuthor = ({ id }: { id: string }) => {
  const dispatch = useAppDispatch();
  const { author, status } = useAppSelector(authorsSelector);

  useEffect(() => {
    dispatch(getAuthorByIdAction(id));
  }, []);

  return (
    <>
      <Header
        backBtn={`/adminpanel/authors`}
        heading="Edit Author"
        description="Add author here"
      />

      <div className="border-b border-tertiary"></div>

      {status === "loading" && (
        <div className="h-[50vh] w-full flex justify-center items-center">
          <PrimarySpinner />
        </div>
      )}

      {status === "succeeded" && (
        <AuthorFormProvider
          variant="edit"
          id={id}
          editData={mapResponseToAuthorForm(author)}
        />
      )}
    </>
  );
};

export default EditAuthor;
