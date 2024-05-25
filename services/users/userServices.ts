import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { usersEndpoints } from "./endpoints";
import { USER } from "@/types/user.types";

// const getAllUsers = async (token: string) => {
const getAllUsers = async () => {
  const session = await getSession();
  const res = await api.get(usersEndpoints.getAllUsers, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const deleteUser = async (id: string) => {
  const session = await getSession();
  const res = await api.delete(usersEndpoints.deleteUser(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const createUser = async (data: Partial<USER>) => {
  const session = await getSession();
  const res = await api.post(usersEndpoints.createUser, data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const updateUser = async (id: string, data: Partial<USER>) => {
  const session = await getSession();
  console.log(id, data);

  const res = await api.patch(usersEndpoints.updateUser(id), data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  console.log(res);

  return res.data;
};

export { getAllUsers, deleteUser, createUser, updateUser };
