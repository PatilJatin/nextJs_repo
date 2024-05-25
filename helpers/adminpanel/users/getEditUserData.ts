import { USER } from "@/types/user.types";

type EDIT_USER = {
  name: string;
  email: string;
};

export const getEditUserData = (data: USER): EDIT_USER => {
  return {
    email: data.email,
    name: data.name,
  };
};
