"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const NoInternetConnection = (props: any) => {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(true);

  // On initization set the isOnline state.
  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  // event listeners to update the state
  if (typeof window !== "undefined")
    window.addEventListener("online", () => {
      setOnline(true);
    });

  if (typeof window !== "undefined")
    window.addEventListener("offline", () => {
      setOnline(false);
    });

  // if user is online, return the child component else return a custom component
  if (isOnline) {
    return props.children;
  } else {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Image
          src={"/assets/noInternetIcon.svg"}
          alt="no-internet-img"
          width={400}
          height={300}
        />
      </div>
    );
  }
};

export default NoInternetConnection;
