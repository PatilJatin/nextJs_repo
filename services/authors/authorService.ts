import { getSession } from "next-auth/react";
import { authorEndpoints } from "./author.endpoints";
import { api } from "../apiService";
import { AUTHORS_RESPONSE } from "@/types/authors.types";

const getAllAuthors = async () => {
  const session = await getSession();
  const res = await api.get(authorEndpoints.getAllAuthors, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const getAuthorById = async (id: string) => {
  const session = await getSession();
  const res = await api.get(authorEndpoints.getAuthorById(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const createAuthor = async (data: Partial<AUTHORS_RESPONSE>) => {
  const session = await getSession();
  const res = await api.post(authorEndpoints.createAuthor, data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const updateAuthor = async (id: string, data: Partial<AUTHORS_RESPONSE>) => {
  const session = await getSession();
  const res = await api.patch(authorEndpoints.updateAuthor(id), data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const deleteAuthor = async (id: string) => {
  const session = await getSession();
  const res = await api.delete(authorEndpoints.deleteAuthor(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
