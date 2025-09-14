"use client";
import {
  Archive,
  MoreHorizontal,
  Pencil,
  Share,
  Trash2,
  Loader,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, memo, useRef, useEffect } from "react";
import { HeaderSelector } from "../Common/selector";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import axios from "axios";
import apiKeys from "@/src/helpers/api/apiKeys";
import { handleErrorMessage } from "@/src/helpers/CommonFunctions";
import { updateChat, removeChat } from "@/src/store/slices/chats";
import { useAuth } from "@clerk/nextjs";

const ChatItems = memo(function ChatItems({
  item,
  isEditing,
  editingValue,
  onChange,
  onSave,
  onStartEdit,
  onDelete,
  isMobile,
  handleSideBar,
}) {
  const [hasSaved, setHasSaved] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    if (isEditing) {
      setHasSaved(false);
    }
  }, [isEditing]);

  const handleSave = (cancel = false, fromBlur = false) => {
    if (hasSaved && !fromBlur) return;
    setHasSaved(true);

    if (!cancel) {
      onSave();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
      handleSideBar();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleSave(true);
      handleSideBar();
    }
  };

  return (
    <SidebarMenuItem key={item._id} className="flex justify-between">
      <SidebarMenuButton asChild className="flex-1">
        <div className="w-full">
          {isEditing ? (
            <input
              ref={inputRef}
              value={editingValue}
              onChange={(e) => onChange(e.target.value)}
              onBlur={() => handleSave(false, true)}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1.5 rounded-md text-white text-[16px] outline-none"
            />
          ) : (
            <Link
              className="group-data-[collapsible=icon]:hidden sm:text-[16px] text-sm truncate flex-1"
              href={`/c/${item._id}`}
              onClick={() => handleSideBar()}
            >
              {item?.title}
            </Link>
          )}
        </div>
      </SidebarMenuButton>

      {!isEditing && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction showOnHover>
              <MoreHorizontal />
              <span className="sr-only">More</span>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-fit rounded-md bg-[#353535]"
            side={isMobile ? "bottom" : "right"}
            align={isMobile ? "end" : "start"}
            sideOffset={-20}
            alignOffset={18}
          >
            <DropdownMenuItem
              className={`sm:text-[16px] text-sm text-white opacity-50 cursor-not-allowed`}
            >
              <Share className="w-4 h-4 text-white" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onStartEdit(item)}
              className={`cursor-pointer`}
            >
              <Pencil className="w-4 h-4 text-white" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={`sm:text-[16px] text-sm text-white opacity-50 cursor-not-allowed`}
            >
              <Archive className="w-4 h-4 text-white" />
              <span>Archive</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400 cursor-pointer"
              onClick={() => onDelete(item)}
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </SidebarMenuItem>
  );
});

export function NavChats({ closeSideBar }) {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const selector = HeaderSelector();
  const { allChats } = useSelector(selector);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [modalActionLoading, setModalActionLoading] = useState(false);

  const handleSideBar = () => {
    if (isMobile && closeSideBar) {
      closeSideBar();
    }
  };

  const handleDeleteModal = (open) => {
    setOpenDeleteModal(open);
    if (!open) setDeleteModalData({});
  };

  const handleOpenDeleteModal = (item) => {
    setDeleteModalData(item);
    setOpenDeleteModal(true);
  };

  const handleDeleteChat = async (_id) => {
    let token = sessionStorage.getItem("token");
    setModalActionLoading(true);
    try {
      await axios.delete(`${apiKeys.chats}/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeChat(_id));
      handleDeleteModal(false);
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setModalActionLoading(false);
    }
  };

  const handleStartEdit = (item) => {
    setEditingId(item._id);
    setEditingValue(item?.title);
  };

  const handleSave = async (cancel = false) => {
    let token = sessionStorage.getItem("token");
    setModalActionLoading(true);
    if (!cancel && editingId) {
      try {
        const payload = { title: editingValue.trim() };
        const res = await axios.patch(
          `${apiKeys.chats}/${editingId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch(updateChat(res?.data?.data || []));
      } catch (error) {
        handleErrorMessage(error);
      }
    }
    setEditingId(null);
    setEditingValue("");
  };

  return (
    <>
      {/* Delete Modal */}
      <Dialog open={openDeleteModal} onOpenChange={handleDeleteModal}>
        <DialogContent
          showCloseButton={false}
          className="sm:w-2xl w-90vw bg-[#353535] p-4 rounded-xl"
        >
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-[20px] font-normal">Delete Chat?</h1>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-2">
            <p className="text-lg font-normal">
              This will delete {deleteModalData?.title}.
            </p>
          </div>

          <div className="flex items-center justify-end mt-4 gap-3 sm:text-[16px] text-sm">
            <button
              className="rounded-3xl bg-[#212121] hover:bg-[#2f2f2f] px-5 py-2"
              onClick={() => handleDeleteModal(false)}
              disabled={modalActionLoading}
            >
              Cancel
            </button>
            <button
              className="rounded-3xl bg-red-600 hover:bg-[#911e1b] px-5 py-2 flex items-center gap-1 cursor-pointer disabled:cursor-not-allowed"
              onClick={() => handleDeleteChat(deleteModalData?._id)}
              disabled={modalActionLoading}
            >
              Delete
              {modalActionLoading && (
                <Loader className="w-5 h-5 text-white animate-spin" />
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar Chats */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-[15px] font-medium">
          Chats
        </SidebarGroupLabel>
        <SidebarMenu>
          {allChats?.map((item) => (
            <ChatItems
              key={item._id}
              item={item}
              isEditing={editingId === item._id}
              editingValue={editingValue}
              onChange={setEditingValue}
              onSave={handleSave}
              onStartEdit={handleStartEdit}
              onDelete={handleOpenDeleteModal}
              isMobile={isMobile}
              handleSideBar={handleSideBar}
            />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
