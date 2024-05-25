"use client";
import BlogFormProvider from "@/components/blogs/form/BlogFormProvider";
import PrimarySpinner from "@/components/shared/loaders/PrimarySpinner";
import { mapBlogToModel } from "@/redux/features/adminpanel/blog/blogs.mapper";
import {
  blogSelector,
  getBlogAction,
} from "@/redux/features/adminpanel/blog/blogs.slice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hook";
import { BLOG_MODEL } from "@/types/blogs.types";
import axios from "axios";
import React, { useEffect, useState } from "react";

const EditBlogPage = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<BLOG_MODEL>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const res = await dispatch(getBlogAction(id));
      console.log(res);
      setBlog(() => mapBlogToModel(res.payload.data));
      setLoading(false);
    };
    fetch();
  }, [id]);
  return (
    <>
      {loading ? (
        <div className="h-[50vh]">
          <PrimarySpinner />
        </div>
      ) : (
        blog && (
          // <div>1</div>
          <BlogFormProvider
            id={id}
            variant="edit"
            editData={{
              authorId: {
                label: blog.blogAuthor.authorName,
                value: blog.blogAuthor.authorId,
              },
              bannerImgInput: "",
              bannerUrl: blog.blogBanner,
              description: blog.blogDescription,
              title: blog.blogTitle,
              isRelatedToHowToScreen: blog.isRelatedToHowToScreen,
            }}
          />
        )
      )}
    </>
  );
};

export default EditBlogPage;
