"use client";
import { Archive, MoreHorizontal, Pencil, Share, Trash2 } from "lucide-react";

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
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NavProjects({ projects }) {
  const { isMobile } = useSidebar();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});

  const handleDeleteModal = (open) => {
    setOpenDeleteModal(open);
    if (!open) {
      setDeleteModalData({});
    }
  };

  const handleOpenDeleteModal = (item) => {
    setDeleteModalData(item);
    setOpenDeleteModal(true);
  };

  return (
    <>
      <Dialog
        open={openDeleteModal}
        onOpenChange={handleDeleteModal}
        className={``}
      >
        <DialogContent
          showCloseButton={false}
          className={`max-w-xl bg-[#353535] p-4 rounded-xl`}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="">
                <h1 className={`text-[20px] font-normal`}>Delete Chat?</h1>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="mt-2">
            <p className="text-lg font-nomal">
              This will delete {deleteModalData?.name}.
            </p>
            <p className="text-[16px] font-nomal text-[#afafaf] mt-1">
              Visit <span className="underline">settings</span> to delete any
              memories saved during this chat.
            </p>
          </div>

          <div className="flex items-center justify-end mt-4 gap-3 text-[16px]">
            <button
              className="rounded-3xl bg-[#212121] hover:bg-[#2f2f2f] cursor-pointer text-medium border-1 border-[#ffffff26] hover:shadow px-5  py-2 focus:outline-none focus:ring-0 focus-visible:ring-0"
              onClick={() => handleDeleteModal()}
            >
              Cancel
            </button>
            <button className="rounded-3xl bg-red-600 hover:bg-[#911e1b] cursor-pointer text-medium border-1 border-[#ffffff26] hover:shadow px-5 py-2 focus:outline-none focus:ring-0 focus-visible:ring-0">
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <SidebarGroup>
        <SidebarGroupLabel className="text-[15px] font-medium">
          Chats
        </SidebarGroupLabel>
        <SidebarMenu>
          {projects?.map((item) => (
            <SidebarMenuItem key={item?.id}>
              <SidebarMenuButton asChild>
                <a href={item?.url} className="flex items-center gap-2">
                  <span className="group-data-[collapsible=icon]:hidden text-[16px]">
                    {item?.name}
                  </span>
                </a>
              </SidebarMenuButton>

              {/* Dropdown actions */}
              <DropdownMenu>
                <DropdownMenuTrigger className="ring-0" asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="focus-visible:ring-0"
                  >
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
                  <DropdownMenuItem>
                    <Share className="w-4 h-4 text-white" />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="w-4 h-4 text-white" />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Archive className="w-4 h-4 text-white" />
                    <span>Archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={`text-red-400 focus:text-red-400`}
                    onClick={() => handleOpenDeleteModal(item)}
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
