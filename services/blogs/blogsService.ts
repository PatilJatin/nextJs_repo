import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { blogsEndpoints } from "./blog.endpoints";
import { BLOG_FORM_FIELDS, BLOG_RESPONSE } from "@/types/blogs.types";

export const getAllBlogs = async () => {
  const session = await getSession();
  const res = await api.get(blogsEndpoints.getAllBlogs, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export const getBlog = async (id: string) => {
  const session = await getSession();
  const res = await api.get(blogsEndpoints.getBlog(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export const deleteBlog = async (id: string) => {
  const session = await getSession();
  const res = await api.delete(blogsEndpoints.deleteBlog(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export const createBlog = async (data: Partial<BLOG_FORM_FIELDS>) => {
  const session = await getSession();
  const res = await api.post(
    blogsEndpoints.createBlog,
    {
      title: data.title,
      authorId: data.authorId?.value,
      about: data.description,
      bannerUrl: data.bannerUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );
  return res.data;
};

export const updateBlog = async (
  id: string,
  data: Partial<BLOG_FORM_FIELDS>
) => {
  const session = await getSession();
  const res = await api.patch(
    blogsEndpoints.updateBlog(id),
    {
      title: data.title,
      authorId: data.authorId?.value,
      about: data.description,
      bannerUrl: data.bannerUrl,
      isRelatedToHowToScreen: data.isRelatedToHowToScreen,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );

  return res.data;
};
