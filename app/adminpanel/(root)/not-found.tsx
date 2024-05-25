import Image from "next/image";
import React from "react";

function NotFound() {
  return (
    <div className="h-full flex justify-center items-center">
      <Image
        src={`/assets/notFound.svg`}
        height={361.08}
        width={457.88}
        alt="Page Not Found"
      />
    </div>
  );
}

export default NotFound;
