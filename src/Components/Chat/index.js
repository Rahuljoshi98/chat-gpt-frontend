"use client";

import { useState, useRef, useEffect } from "react";
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
  Plus,
  AudioLines,
  Copy,
  ArrowUp,
} from "lucide-react";
import { createHighlighter } from "shiki";
import axios from "axios";
import apiKeys from "@/src/helpers/api/apiKeys";
import { handleErrorMessage } from "@/src/helpers/CommonFunctions";

function CodeBlock({ language = "jsx", code }) {
  const [highlighted, setHighlighted] = useState("");

  useEffect(() => {
    (async () => {
      const highlighter = await createHighlighter({
        themes: ["vitesse-dark"],
        langs: [language],
      });
      const html = highlighter.codeToHtml(code, {
        lang: language,
        theme: "vitesse-dark",
      });
      setHighlighted(html);
    })();
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative my-3 w-full border border-[#333] rounded-lg overflow-hidden bg-[#2a2a2a]">
      <div className="flex justify-between items-center bg-[#2a2a2a] px-3 py-2 text-sm text-gray-300">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-sm hover:text-white cursor-pointer"
        >
          <Copy className="text-white h-4 w-4" />
          Copy code
        </button>
      </div>

      <pre
        className="sm:text-lg text-sm font-mono overflow-x-auto custom-scrollbar p-3"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}

export default function ChatPage() {
  const [textValue, setTextValue] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello 👋 How can I help you today?" },
  ]);
  const textareaRef = useRef(null);
  const chatContainerRef = useRef(null);
  const bottomRef = useRef(null);
  const maxHeight = 150;

  const scrollToBottom = (behavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
  };

  useEffect(() => {
    scrollToBottom("smooth");
  }, [messages]);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    if (textarea.value.trim() === "") {
      textarea.style.height = "auto";
      return;
    }

    const height = Math.min(textarea.scrollHeight, maxHeight);
    textarea.style.height = `${height}px`;
  };

  const handleInput = (e) => {
    setTextValue(e.target.value);
    resizeTextarea();
  };

  useEffect(() => {
    resizeTextarea();
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleChat = async () => {
    if (!textValue.trim()) return;

    const userMsg = { role: "user", content: textValue };
    setMessages((prev) => [...prev, userMsg]);
    setTextValue("");

    // Reset textarea height when cleared
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const res = await axios.post(
        apiKeys.chats,
        { text: userMsg.content },
        { withCredentials: true }
      );

      if (res.data?.success && res.data?.data) {
        const { role, content } = res.data.data;
        const newMsg =
          content.type === "code"
            ? {
                role,
                type: "code",
                language: content.language || "jsx",
                content: content.data,
              }
            : { role, content: content.data };

        setMessages((prev) => [...prev, newMsg]);
      }
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  return (
    <div className="h-[calc(100dvh-70px)] flex flex-col text-white">
      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 pt-10 pb-20 custom-scrollbar"
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "user" ? (
                <div className="px-4 py-2 whitespace-pre-line bg-[#303030] text-white rounded-[28px] max-w-[60%] sm:text-lg text-sm border border-[#444]">
                  {msg.content}
                </div>
              ) : msg.type === "code" ? (
                <div className="w-full">
                  <CodeBlock language={msg.language} code={msg.content} />
                </div>
              ) : (
                <div className="px-4 py-3 whitespace-pre-line sm:text-lg text-sm text-[#ddd] w-full">
                  {msg.content}
                </div>
              )}
            </div>
          ))}
          {/* Invisible anchor for scrolling */}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="px-4 pb-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#303030] border border-[#ffffff0d] rounded-[28px] px-2 py-2 shadow-lg flex flex-col">
            <textarea
              ref={textareaRef}
              placeholder="Ask anything"
              value={textValue}
              onInput={handleInput}
              className="custom-scrollbar w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 sm:text-lg text-sm placeholder:text-[#A0A0A0] resize-none px-3 py-1 text-white"
              rows={1}
              onKeyDown={handleKeyPress}
            />

            {/* Button row */}
            <div className="flex items-center justify-between gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffffff1a] outline-none">
                    <Plus className="h-6 w-6 text-white" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-[#1e1e1e] text-[#ddd] border border-[#333] rounded-lg"
                  align="start"
                  side="top"
                >
                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#2c2c2c]">
                    <Paperclip size={16} /> Add photos & files
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#333]" />
                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#2c2c2c]">
                    <BookOpen size={16} /> Study and learn
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center gap-2 hover:bg-[#2c2c2c]">
                    <Image size={16} /> Create image
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-2">
                <button className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ffffff1a]">
                  <Mic className="h-5 w-5 text-white" />
                </button>
                <>
                  {textValue ? (
                    <button
                      className="h-10 w-10 rounded-full flex items-center justify-center cursor-pointer bg-white"
                      onClick={() => handleChat()}
                    >
                      <ArrowUp className="h-5 w-5 text-[#000]" />
                    </button>
                  ) : (
                    <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#ffffff1a] cursor-not-allowed">
                      <AudioLines className="h-5 w-5 text-white" />
                    </button>
                  )}
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
