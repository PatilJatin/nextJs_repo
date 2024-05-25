import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { homeDetailsEndpoints } from "./homeDetails.endpoints";
import { HOME_DETAILS_RESPONSE } from "@/types/homeDetails.types";

export const getHomeDetails = async () => {
  const session = await getSession();
  const res = await api.get(homeDetailsEndpoints.getHomeDetails, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

export const updateHomeDetails = async (
  data: Partial<HOME_DETAILS_RESPONSE>
) => {
  const session = await getSession();
  const res = await api.patch(homeDetailsEndpoints.updateHomeDetails, data, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};
