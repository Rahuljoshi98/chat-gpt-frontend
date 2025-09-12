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
import { useState, memo, useRef, useEffect } from "react";

const ProjectItem = memo(function ProjectItem({
  item,
  isEditing,
  editingValue,
  onChange,
  onSave,
  onStartEdit,
  onDelete,
  isMobile,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onSave(true);
    }
  };

  return (
    <SidebarMenuItem key={item.id} className="flex justify-between">
      <SidebarMenuButton asChild className="flex-1">
        <div className="w-full">
          {isEditing ? (
            <input
              ref={inputRef}
              value={editingValue}
              onChange={(e) => onChange(e.target.value)}
              onBlur={() => onSave()}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-1.5 rounded-md bg-[#2a2a2a] text-white text-[16px] outline-none"
            />
          ) : (
            <a
              className="group-data-[collapsible=icon]:hidden sm:text-[16px] text-sm truncate flex-1"
              href={item?.url}
            >
              {item.name}
            </a>
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
            <DropdownMenuItem>
              <Share className="w-4 h-4 text-white" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStartEdit(item)}>
              <Pencil className="w-4 h-4 text-white" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Archive className="w-4 h-4 text-white" />
              <span>Archive</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-400"
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

export function NavChats({ projects: initialProjects }) {
  const { isMobile } = useSidebar();

  const [projects, setProjects] = useState(initialProjects);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

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

  const handleStartEdit = (item) => {
    setEditingId(item.id);
    setEditingValue(item.name);
  };

  const handleSave = (cancel = false) => {
    if (!cancel) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, name: editingValue.trim() || p.name } : p
        )
      );
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
              This will delete {deleteModalData?.name}.
            </p>
            <p className="sm:text-[16px] text-sm text-[#afafaf] mt-1">
              Visit <span className="underline">settings</span> to delete any
              memories saved during this chat.
            </p>
          </div>

          <div className="flex items-center justify-end mt-4 gap-3 sm:text-[16px] text-sm">
            <button
              className="rounded-3xl bg-[#212121] hover:bg-[#2f2f2f] px-5 py-2"
              onClick={() => handleDeleteModal(false)}
            >
              Cancel
            </button>
            <button className="rounded-3xl bg-red-600 hover:bg-[#911e1b] px-5 py-2">
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar Projects */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-[15px] font-medium">
          Chats
        </SidebarGroupLabel>
        <SidebarMenu>
          {projects?.map((item) => (
            <ProjectItem
              key={item.id}
              item={item}
              isEditing={editingId === item.id}
              editingValue={editingValue}
              onChange={setEditingValue}
              onSave={handleSave}
              onStartEdit={handleStartEdit}
              onDelete={handleOpenDeleteModal}
              isMobile={isMobile}
            />
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
