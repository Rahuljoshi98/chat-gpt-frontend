"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Paperclip,
  BookOpen,
  Image,
  Mic,
  AudioWaveform,
  Plus,
} from "lucide-react";

function index() {
  return (
    <div className="h-[calc(100vh-70px)] flex flex-col">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-10 pb-20">
        <div className="max-w-[calc(theme(maxWidth.3xl)-20px)] mx-auto"></div>
      </div>

      {/* Input Bar */}
      <div className="px-4 pb-6">
        <div className=" max-w-3xl mx-auto">
          <div className="flex items-center bg-[#303030] border border-[#ffffff0d] rounded-full px-2 py-2 gap-2 shadow-lg">
            {/* + button with dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffffff1a] data-[state=open]:bg-[#ffffff1a] outline-none focus:outline-none">
                  <Plus className="h-5 w-5 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-[#1e1e1e] text-[#ddd] border border-[#333] rounded-lg"
                align="start"
                side="top"
              >
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#2c2c2c]">
                  <Paperclip size={16} />
                  Add photos & files
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#333]" />
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#2c2c2c]">
                  <BookOpen size={16} />
                  Study and learn
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#2c2c2c]">
                  <Image size={16} />
                  Create image
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Input */}
            <input
              type="text"
              placeholder="Ask anything"
              className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-lg placeholder:text-[#A0A0A0]"
            />

            {/* Mic button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-8 h-8 p-0 text-white hover:bg-[#2c2c2c]"
            >
              <Mic size={18} />
            </Button>

            {/* Waveform button */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-8 h-8 p-0 text-white hover:bg-[#2c2c2c]"
            >
              <AudioWaveform size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
