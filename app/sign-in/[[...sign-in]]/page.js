import { SignIn } from "@clerk/nextjs";
import React from "react";
function page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {" "}
      <SignIn />{" "}
    </div>
  );
}
export default page;
