"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NewProjectIcon } from "../Common/Icons";
import { useState, useRef, useEffect, memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  FolderClosed,
  Lightbulb,
  Loader,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import axios from "axios";
import apiKeys from "@/src/helpers/api/apiKeys";
import { handleErrorMessage } from "@/src/helpers/CommonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { HeaderSelector } from "../Common/selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  addProject,
  removeProject,
  updateProject,
} from "@/src/store/slices/project";

const ProjectItem = memo(function ProjectItem({
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

  // reset flag when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setHasSaved(false);
    }
  }, [isEditing]);

  const handleSave = (cancel = false, fromBlur = false) => {
    // If already saved via keyboard, block duplicates
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
              onBlur={() => handleSave(false, true)} // 🔑 blur saves
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1.5 rounded-md text-white text-[16px] outline-none"
            />
          ) : (
            <a
              className="group-data-[collapsible=icon]:hidden sm:text-[16px] text-sm truncate flex-1 flex items-center gap-2 w-full"
              href={`/c/${item._id}`}
              onClick={() => handleSideBar()}
            >
              <FolderClosed className="h-5 w-5 text-white flex-shrink-0" />
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
            <DropdownMenuItem onClick={() => onStartEdit(item)}>
              <Pencil className="w-4 h-4 text-white" />
              <span>Rename Project</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-400"
              onClick={() => onDelete(item)}
            >
              <Trash2 className="w-4 h-4 text-red-400" />
              <span>Delete Project</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </SidebarMenuItem>
  );
});

export function NavProjects({ closeSideBar }) {
  const { isMobile } = useSidebar();
  const selector = HeaderSelector();
  const dispatch = useDispatch();
  const { projectList } = useSelector(selector);

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [projectName, setProjectName] = useState("");
  const [modalActionLoading, setModalActionLoading] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteModalData, setDeleteModalData] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

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

  const handleDeleteProject = async (_id) => {
    setModalActionLoading(true);
    try {
      await axios.delete(`${apiKeys.projects}/${_id}`, {
        withCredentials: true,
      });
      dispatch(removeProject(_id));
      handleDeleteModal(false);
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setModalActionLoading(false);
    }
  };

  const handleCreateProjectModal = (open) => {
    setIsCreateProjectModalOpen(open);
    if (!open) {
      setProjectName("");
      setModalActionLoading(false);
    }
  };

  const handleCreateProject = async () => {
    setModalActionLoading(true);
    try {
      const payload = { name: projectName };
      const res = await axios.post(apiKeys.projects, payload, {
        withCredentials: true,
      });
      dispatch(addProject(res?.data?.data || []));
      handleCreateProjectModal(false);
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setModalActionLoading(false);
    }
  };

  const handleStartEdit = (item) => {
    setEditingId(item._id);
    setEditingValue(item.name);
  };

  const handleSave = async (cancel = false) => {
    if (!cancel && editingId) {
      try {
        const payload = { name: editingValue.trim() };

        await axios.patch(`${apiKeys.projects}/${editingId}`, payload, {
          withCredentials: true,
        });

        dispatch(updateProject({ _id: editingId, name: editingValue.trim() }));
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
              <h1 className="text-[20px] font-normal">Delete Project?</h1>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <p className="text-lg font-normal">
              This will permanently delete all project files and chats.
            </p>
          </div>
          <div className="flex items-center justify-end mt-4 gap-3 sm:text-[16px] text-sm">
            <button
              className="rounded-3xl bg-[#212121] hover:bg-[#2f2f2f] px-5 py-2"
              onClick={() => handleDeleteModal(false)}
            >
              Cancel
            </button>
            <button
              className="rounded-3xl bg-red-600 hover:bg-[#911e1b] px-5 py-2 flex items-center gap-1"
              onClick={() => handleDeleteProject(deleteModalData?._id)}
              disabled={modalActionLoading}
            >
              Delete Project
              {modalActionLoading && (
                <Loader className="w-5 h-5 text-white animate-spin" />
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Project Modal */}
      <Dialog
        open={isCreateProjectModalOpen}
        onOpenChange={handleCreateProjectModal}
      >
        <DialogContent className="sm:w-2xl w-90vw bg-[#353535] p-4 rounded-xl">
          <DialogHeader>
            <DialogTitle>
              <h1 className="text-[20px] font-normal text-start">
                Project name
              </h1>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <Input
              className="!bg-[#212121] !text-lg py-5 px-3 font-normal 
              !border-[#ffffff1a] focus-visible:border-white 
              focus-visible:ring-[1px] focus-visible:ring-white"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <div className="mt-6 rounded-xl px-2 py-2 flex items-center gap-2 bg-[#414141]">
              <Lightbulb className="h-6 w-6 text-white" />
              <p className="font-normal text-sm">
                Projects keep chats, files, and custom instructions in one
                place.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end mt-4 gap-3 sm:text-[16px] text-sm">
            <button
              className="rounded-3xl bg-[#f9f9f9] hover:bg-[#ececec] text-[#0d0d0d] font-medium px-4 py-1.5 flex items-center gap-1"
              disabled={!projectName || modalActionLoading}
              onClick={handleCreateProject}
            >
              Create Project
              {modalActionLoading && (
                <Loader className="w-5 h-5 text-[#0d0d0d] animate-spin" />
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sidebar Projects */}
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="cursor-pointer"
              onClick={() => setIsCreateProjectModalOpen(true)}
            >
              <span className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <NewProjectIcon />
                  <span className="group-data-[collapsible=icon]:hidden sm:text-[16px] text-sm">
                    New project
                  </span>
                </div>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {projectList?.map((proj) => (
            <ProjectItem
              key={proj._id}
              item={proj}
              isEditing={editingId === proj._id}
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
