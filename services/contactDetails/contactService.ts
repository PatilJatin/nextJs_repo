import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { contactDetailsEndpoints } from "./contact.endpoints";
import { CONTACT_DETAILS_RESPONSE } from "@/types/contactDetails.types";

const getContactDetails = async () => {
  const session = await getSession();

  const res = await api.get(contactDetailsEndpoints.getContactDetails, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });

  return res.data;
};

const updateContactDetails = async (
  data: Partial<CONTACT_DETAILS_RESPONSE>
) => {
  const session = await getSession();

  const res = await api.patch(
    contactDetailsEndpoints.updateContactDetails,
    data,
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );

  return res.data;
};

export { getContactDetails, updateContactDetails };
