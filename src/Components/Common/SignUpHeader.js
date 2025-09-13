"use client";
import React, { useEffect } from "react";
import { Logo } from "./Icons";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function SignUpHeader() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/c");
    }
  }, [isLoaded, isSignedIn]);

  return (
    <>
      <div className="z-10 bg-[#212121] px-6 sticky top-0 left-0 py-2 border-b border-[#ffffff0d] flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-3">
          {/* share btn */}
          <Link
            size="lg"
            className="bg-[#f9f9f9] hover:bg-[#ececec] text-[#0d0d0d] px-4 py-2 rounded-3xl text-[14px] sm:text-[16px] items-center gap-1 cursor-pointer flex"
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
