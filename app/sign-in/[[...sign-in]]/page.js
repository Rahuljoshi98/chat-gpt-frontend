import { SignIn } from "@clerk/nextjs";
import React from "react";
function page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#212121]">
      {" "}
      <SignIn />{" "}
    </div>
  );
}
export default page;
