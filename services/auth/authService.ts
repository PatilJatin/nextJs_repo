import { api } from "../apiService";

const loginUser = async (token: string) => {
  const res = await api.post(
    "/admins/login",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export { loginUser };
