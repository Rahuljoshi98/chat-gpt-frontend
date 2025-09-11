"use client";
import React from "react";
import { Logo } from "./Icons";
import Link from "next/link";

function SignUpHeader() {
  return (
    <>
      <div className="z-10 bg-[#212121] px-6 sticky top-0 left-0 py-2 border-b border-[#ffffff0d] flex justify-between items-center">
        <Logo />
        <div className="flex items-center">
          {/* share btn */}
          <Link
            size="lg"
            className="hover:bg-[#ffffff1a] px-4 py-2 rounded-3xl text-[16px] items-center gap-1 cursor-pointer sm:flex hidden"
            href="/sign-in"
          >
            <div className="">Log in</div>
          </Link>

          <Link
            size="lg"
            className="hover:bg-[#ffffff1a] px-4 py-2 rounded-3xl text-[16px] items-center gap-1 cursor-pointer sm:flex hidden"
            href="/sign-up"
          >
            <div className="">Sign Up</div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default SignUpHeader;
