import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { aboutDetailsEndpoints } from "./aboutDetails.endpoints";
import { ABOUT_DETAILS_RESPONSE } from "@/types/aboutDetails.types";

const getAboutDetails = async () => {
  const session = await getSession();

  const res = await api.get(aboutDetailsEndpoints.getAboutDetails, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

const updateAboutDetails = async (data: Partial<ABOUT_DETAILS_RESPONSE>) => {
  const session = await getSession();

  const res = await api.put(aboutDetailsEndpoints.updateAboutDetails, data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

export { getAboutDetails, updateAboutDetails };
