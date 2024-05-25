import React from "react";
import OutlinedButton from "./OutlinedButton";
import Image from "next/image";
import { navAssets } from "@/public/assets/navbar";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <OutlinedButton type="button" colorType="red" onClick={() => signOut()}>
      <div className="flex justify-center items-center gap-2">
        <Image src={navAssets.logout} height={18} width={18} alt="Logout" />
        <p>Logout</p>
      </div>
    </OutlinedButton>
  );
};

export default LogoutButton;
