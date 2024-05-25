import { DefaultSession, DefaultUser } from "next-auth";

import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      name: string;
      email: string;
      projects: Array;
      isActive: boolean;
      isSuperAdmin: boolean;
      firebaseId: string;
      access_token: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    _id: string;
    name: string;
    email: string;
    projects: Array;
    isActive: boolean;
    isSuperAdmin: boolean;
    firebaseId: string;
    access_token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    isSuperAdmin: boolean;
    access_token: string;
    trigger: "signIn" | "signUp" | "update" | undefined;
  }
}
