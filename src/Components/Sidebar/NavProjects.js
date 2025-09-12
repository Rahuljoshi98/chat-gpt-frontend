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
import { useState } from "react";
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
import { useSelector } from "react-redux";
import { HeaderSelector } from "../Common/selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NavProjects() {
  const { isMobile } = useSidebar();
  // data from store
  const selector = HeaderSelector();
  const { projectList } = useSelector(selector);

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  const [projectName, setProjectName] = useState("");
  const [createProjectLoading, setCreateProjectLoading] = useState(false);

  const handleOpenModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  const handleCreateProjectModal = (open) => {
    setIsCreateProjectModalOpen(open);
    if (!open) {
      setProjectName("");
      setCreateProjectLoading(false);
    }
  };

  const handleCreateProject = async () => {
    setCreateProjectLoading(true);
    try {
      const payload = {
        name: projectName,
      };
      const res = await axios.post(apiKeys.projects, payload, {
        withCredentials: true,
      });
      handleCreateProjectModal();
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setCreateProjectLoading(false);
    }
  };

  return (
    <>
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
             placeholder:text 
             !border-[#ffffff1a] 
             focus-visible:border-white 
             focus-visible:ring-[1px] 
             focus-visible:ring-white"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />

            <div className="mt-6 rounded-xl px-2 py-2 flex items-center gap-2 bg-[#414141]">
              <Lightbulb className="h-6 w-6 text-white" />
              <p className="font-normal text-sm">
                Projects keep chats, files, and custom instructions in one
                place. Use them for ongoing work, or just to keep things tidy.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end mt-4 gap-3 sm:text-[16px] text-sm">
            <button
              className="rounded-3xl bg-[#f9f9f9] hover:bg-[#ececec] cursor-pointer text-[#0d0d0d] font-medium px-4 py-1.5 disabled:opacity-[0.6] disabled:cursor-not-allowed flex items-center gap-1"
              disabled={!projectName || createProjectLoading}
              onClick={() => handleCreateProject()}
            >
              Create Project
              {createProjectLoading && (
                <Loader className="w-5 h-5 text-[#0d0d0d] animate-spin" />
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="cursor-pointer"
              onClick={() => handleOpenModal()}
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

          {projectList?.map((proj, index) => {
            return (
              <SidebarMenuItem
                key={proj?.id || index}
                className="flex justify-between"
              >
                <SidebarMenuButton asChild className="flex-1">
                  <div className="w-full">
                    <a
                      className="group-data-[collapsible=icon]:hidden sm:text-[16px] text-sm truncate flex-1 flex items-center gap-1 w-full"
                      href={`/c/${proj?.id}`}
                      onClick={() => handleSideBar()}
                    >
                      <FolderClosed className="h-5 w-5 text-white" />
                      {proj?.name}
                    </a>
                  </div>
                </SidebarMenuButton>

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
                      <Pencil className="w-4 h-4 text-white" />
                      <span>Rename Project</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-400">
                      <Trash2 className="w-4 h-4 text-red-400" />
                      <span>Delete Project</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
