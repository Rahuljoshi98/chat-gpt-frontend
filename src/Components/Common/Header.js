import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import React from "react";

function Header() {
  return (
    <div className="z-10 bg-[#212121] px-2 sticky top-0 left-0 py-2 border-b border-[#ffffff0d] flex justify-between items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            size="lg"
            className="hover:bg-[#ffffff1a] px-3 py-2 rounded-lg text-[16px] flex items-center gap-1 cursor-pointer data-[state=open]:bg-[#ffffff1a] outline-none focus:outline-none"
          >
            <div className="">ChatGPT</div>
            <ChevronDown className="h-5 w-5 text-white" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-[#353535]"
          side={"bottom"}
          align={"start"}
          sideOffset={2}
          alignOffset={0}
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CircleUserRound className="text-[#afafaf]" />
              asdfasdf
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2">
        <div className="text-[#afafaf] font-medium">Saved memory full</div>
        <Info className="text-[#afafaf] h-4 w-4" />
      </div>

      <div className="flex items-center">
        {/* share btn */}
        <button
          size="lg"
          className="hover:bg-[#ffffff1a] px-4 py-2 rounded-3xl text-[16px] flex items-center gap-1 cursor-pointer"
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
            className="w-(--radix-dropdown-menu-trigger-width) w-fit rounded-lg bg-[#353535]"
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
  );
}

export default Header;
