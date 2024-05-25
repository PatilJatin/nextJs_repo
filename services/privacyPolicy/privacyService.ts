import { getSession } from "next-auth/react";
import { api } from "../apiService";
import { privacyPolicyEndpoints } from "./privacy.endpoints";

const getPrivacyPolicy = async () => {
  const session = await getSession();
  const res = await api.get(privacyPolicyEndpoints.getPrivacyPolicy, {
    headers: {
      Authorization: `Bearer ${session?.user.access_token}`,
    },
  });
  return res.data;
};

const updatePrivacyPolicy = async (data: string) => {
  const session = await getSession();
  const res = await api.put(
    privacyPolicyEndpoints.updatePrivacyPolicy,
    {
      content: data,
    },
    {
      headers: {
        Authorization: `Bearer ${session?.user.access_token}`,
      },
    }
  );
  return res.data;
};
export { getPrivacyPolicy, updatePrivacyPolicy };
