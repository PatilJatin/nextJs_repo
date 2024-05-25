import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { propertyEndpoints } from "./property.endpoints";
import { PROJECT_RESPONSE } from "@/types/properties.types";
import { auth } from "@/Firebase/firebaseClient";

const getAllProperties = async () => {
  const session = await getSession();
  const res = await api.get(propertyEndpoints.getAllProperties, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const getPropertyById = async (id: string) => {
  const session = await getSession();
  const res = await api.get(propertyEndpoints.getProjectById(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const addProperty = async (data: Partial<PROJECT_RESPONSE>) => {
  const session = await getSession();
  const res = await api.post(propertyEndpoints.addProject, data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const updateProperty = async (id: string, data: Partial<PROJECT_RESPONSE>) => {
  const session = await getSession();
  const res = await api.patch(propertyEndpoints.updateProject(id), data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const deleteProperty = async (id: string) => {
  const session = await getSession();
  const res = await api.delete(propertyEndpoints.deleteProject(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const filterPropertyByCategory = async (filter: string) => {
  const session = await getSession();
  const res = await api.get(propertyEndpoints.filterByCategory(filter), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const filterPropertyByClosingIn = async (filter: number) => {
  const session = await getSession();
  const res = await api.get(propertyEndpoints.filterByClosingIn(filter), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

export {
  getAllProperties,
  addProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  filterPropertyByCategory,
  filterPropertyByClosingIn,
};
