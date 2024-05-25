import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { worksheetsEndpoints } from "./worksheets.endpoints";

export const getAllWorksheets = async () => {
  const session = await getSession();

  const res = await api.get(worksheetsEndpoints.getAllWorksheets, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

export const getWorksheetById = async (id: string) => {
  const session = await getSession();

  const res = await api.get(worksheetsEndpoints.getWorksheetById(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

export const filterWorksheetsNewToOld = async () => {
  const session = await getSession();

  const res = await api.get(worksheetsEndpoints.filterNewToOld, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

export const filterWorksheetsOldToNew = async () => {
  const session = await getSession();

  const res = await api.get(worksheetsEndpoints.filterOldToNew, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

export const deleteWorksheet = async (id: string) => {
  const session = await getSession();

  const res = await api.delete(worksheetsEndpoints.deleteWorksheet(id), {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

export const exportWorksheet = async () => {
  const session = await getSession();

  const res = await api.get(worksheetsEndpoints.exportWorksheet, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  console.log(res.data);

  return res.data;
};
