"use client";

import { usePathname } from "next/navigation";

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { useBuilderWorkspace, type WorkspaceView } from "@/app/components/builder-workspace/context";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";

export const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const {
    workspaceView,
    setWorkspaceView,
    hasWorkspace,
    hasPreview,
    deployAction,
  } = useBuilderWorkspace();

  const handleTabChange = (value: string) => {
    if (value === "chat" || value === "preview" || value === "dev") {
      setWorkspaceView(value as WorkspaceView);
    }
  };

  return (
    <nav className="h-16 border-b bg-background relative z-50">
      <div className="mx-auto flex h-full w-[95vw] max-w-[1800px] items-center justify-between px-1 sm:px-2">
        <Logo />

        {isHomePage && hasWorkspace ? (
          <div className="flex items-center gap-2">
            <Tabs
              value={workspaceView}
              onValueChange={handleTabChange}
            >
              <TabsList>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="preview" disabled={!hasPreview}>
                  Preview
                </TabsTrigger>
                <TabsTrigger value="dev" disabled={!hasPreview}>
                  Dev
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              type="button"
              size="xs"
              disabled={!hasPreview || !deployAction}
              onClick={() => deployAction?.()}
            >
              Deploy
            </Button>
          </div>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
};
