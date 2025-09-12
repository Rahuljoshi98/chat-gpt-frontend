"use client";
import {
  SidebarGroup,
  SidebarMenu,
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
import { Lightbulb } from "lucide-react";
import axios from "axios";
import apiKeys from "@/src/helpers/api/apiKeys";

export function NavProjects() {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  const [projectName, setProjectName] = useState("");

  const handleOpenModal = () => {
    setIsCreateProjectModalOpen(true);
  };

  const handleCreateProjectModal = (open) => {
    setIsCreateProjectModalOpen(open);
    if (!open) {
    }
  };

  const handleCreateProject = async () => {
    try {
      debugger;
      const payload = {
        name: projectName,
      };
      const res = await axios.post(apiKeys.projects, payload, {
        withCredentials: true,
      });
    } catch (error) {}
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
              className="rounded-3xl bg-[#f9f9f9] hover:bg-[#ececec] cursor-pointer text-[#0d0d0d] font-medium px-4 py-1.5 disabled:opacity-[0.6] disabled:cursor-not-allowed"
              disabled={!projectName}
              onClick={() => handleCreateProject()}
            >
              Create project
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
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
}
