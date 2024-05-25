"use client";

import { signOut, useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data } = useSession();

  return (
    <>
      <div>test page</div>
      <h1>Welcome {data?.user.name}</h1>
      <button onClick={() => signOut()}>Logout</button>
    </>
  );
};

export default page;
