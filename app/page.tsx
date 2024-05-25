"use client";

import { navAssets } from "@/public/assets/navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  console.log("logo is", navAssets.logo);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Image
        src={`${navAssets.logo.src}`}
        alt="logo"
        width={200}
        height={100}
        className=""
      />
    </div>
  );
};

export default page;
