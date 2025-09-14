"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Archive,
  ChevronDown,
  CircleUserRound,
  Flag,
  Info,
  MoreHorizontal,
  Share,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { AppSidebar } from "../Sidebar";
import { ChatGptGoIcon, ChatGptReact, HamIcon } from "./Icons";
import { useDispatch } from "react-redux";
import { getProjectsList, whoAmI } from "@/src/store/slices/project";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { clearUserDetails, setUserDetails } from "@/src/store/slices/user";
import { getAllChats } from "@/src/store/slices/chats";
import { handleErrorMessage } from "@/src/helpers/CommonFunctions";

function Header() {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = useState(false);
  const { isSignedIn, isLoaded, user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();
  const { getToken } = useAuth();

  const fetchDetails = async () => {
    try {
      const token = await getToken();
      dispatch(whoAmI({ token }));
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  useEffect(() => {
    if (isSignedIn && isLoaded && user) {
      dispatch(getAllChats());
      dispatch(getProjectsList());
      fetchDetails();
      dispatch(
        setUserDetails({
          email: user?.primaryEmailAddress?.emailAddress || "",
          name: `${user?.fullName}`.trim(),
          image: user?.imageUrl || "",
        })
      );
    } else if (isLoaded && !isSignedIn) {
      dispatch(clearUserDetails());
      router.push("/");
    }
  }, [isSignedIn, isLoaded]);

  return (
    <>
      <AppSidebar openMobile={openMobile} setOpenMobile={setOpenMobile} />
      <div className="z-10 bg-[#212121] px-2 sticky top-0 left-0 py-2 border-b border-[#ffffff0d] flex justify-between items-center">
        <div className="flex items-center">
          {isMobile && (
            <button
              className="hover:bg-[#ffffff1a] px-1 py-2 rounded-lg cursor-pointer"
              onClick={() => setOpenMobile(true)}
            >
              <HamIcon />
            </button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                size="lg"
                className="hover:bg-[#ffffff1a] px-3 py-2 rounded-lg text-[16px] flex items-center gap-1 cursor-pointer data-[state=open]:bg-[#ffffff1a] outline-none focus:outline-none"
              >
                <div className="text-lg">ChatGPT</div>
                <ChevronDown className="h-5 w-5 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-fit rounded-lg bg-[#353535]"
              side={"bottom"}
              align={"start"}
              sideOffset={2}
              alignOffset={0}
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className={`opacity-50 cursor-not-allowed`}>
                  <div className="flex items-center gap-2">
                    <ChatGptGoIcon />
                    <div>
                      <p className="text-white text-lg font-medium">
                        ChatGPT Go
                      </p>
                      <p className="text-sm font-normal text-[#afafaf]">
                        Our smartest model & more
                      </p>
                    </div>
                    <button className=" rounded-xl bg-[#212121] hover:bg-[#2f2f2f] text-sm cursor-pointer text-medium border-1 border-[#ffffff26] hover:shadow px-3  py-1">
                      Upgrade
                    </button>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuItem className={`opacity-50 cursor-not-allowed`}>
                  <div className="flex items-center gap-2">
                    <ChatGptReact />
                    <div>
                      <p className="text-white text-lg font-medium">ChatGPT</p>
                      <p className="text-sm font-normal text-[#afafaf]">
                        Great for everyday tasks
                      </p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="items-center gap-2 sm:flex hidden">
          <div className="text-[#afafaf] font-medium">Saved memory full</div>
          <Info className="text-[#afafaf] h-4 w-4" />
        </div>

        <div className="flex items-center">
          {/* share btn */}
          <button
            size="lg"
            className="hover:bg-[#ffffff1a] px-4 py-2 rounded-3xl text-[16px] items-center gap-1 cursor-pointer sm:flex hidden"
          >
            <div className="">Share</div>
            <Share className="w-5 h-5 text-white" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                size="lg"
                className="hover:bg-[#ffffff1a] px-3 py-2 rounded-lg text-[16px] flex items-center gap-1 cursor-pointer data-[state=open]:bg-[#ffffff1a] outline-none focus:outline-none"
              >
                <MoreHorizontal className="w-5 h-5 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-fit rounded-lg bg-[#353535]"
              side={"bottom"}
              align={"end"}
              sideOffset={2}
              alignOffset={2}
            >
              <DropdownMenuGroup>
                <DropdownMenuItem className={`flex items-center gap-2`}>
                  <Archive className="w-5 h-5 text-white" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className={`flex items-center gap-2`}>
                  <Flag className="w-5 h-5 text-white" />
                  Report
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={`text-red-400 focus:text-red-400 flex items-center gap-2`}
                >
                  <Trash2 className="w-5 h-5 text-red-400" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}

export default Header;
