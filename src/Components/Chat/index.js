"use client";

import { useState, useRef, useEffect } from "react";
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
  AudioLines,
} from "lucide-react";

function index() {
  const [textValue, setTextValue] = useState("");
  const textareaRef = useRef(null);
  const maxHeight = 150;

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    const height = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${height}px`;
  };

  const handleInput = (e) => {
    setTextValue(e.target.value);
    resizeTextarea();
  };

  // Handle initial resize and focus
  useEffect(() => {
    resizeTextarea();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="h-[calc(100vh-70px)] flex flex-col">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 pt-10 pb-20">
        <div className="max-w-[calc(theme(maxWidth.3xl)-20px)] mx-auto"></div>
      </div>

      {/* Input Bar */}
      <div className="px-4 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#303030] border border-[#ffffff0d] rounded-[28px] px-2 py-2 shadow-lg flex flex-col">
            {/* Textarea always present */}
            <textarea
              ref={textareaRef}
              placeholder="Ask anything"
              value={textValue}
              onInput={handleInput}
              className="custom-scrollbar w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-lg placeholder:text-[#A0A0A0] resize-none px-3 text-white"
              rows={1}
            />

            {/* Button row */}
            <div className="flex items-center justify-between gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffffff1a] data-[state=open]:bg-[#ffffff1a] outline-none focus:outline-none">
                    <Plus className="h-6 w-6 text-white" />
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

              <div className="flex items-center gap-2">
                <button className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffffff1a] data-[state=open]:bg-[#ffffff1a] outline-none focus:outline-none">
                  <Mic className="h-5 w-5 text-white" />
                </button>
                <button className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffffff1a] data-[state=open]:bg-[#ffffff1a] outline-none focus:outline-none">
                  <AudioLines className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
