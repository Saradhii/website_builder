"use client";

import * as React from "react";

export type WorkspaceView = "chat" | "preview" | "dev";

type DeployAction = (() => void) | null;

interface BuilderWorkspaceContextValue {
  workspaceView: WorkspaceView;
  setWorkspaceView: (view: WorkspaceView) => void;
  hasWorkspace: boolean;
  setHasWorkspace: (value: boolean) => void;
  hasPreview: boolean;
  setHasPreview: (value: boolean) => void;
  deployAction: DeployAction;
  setDeployAction: (action: DeployAction) => void;
}

const BuilderWorkspaceContext =
  React.createContext<BuilderWorkspaceContextValue | null>(null);

function BuilderWorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [workspaceView, setWorkspaceView] = React.useState<WorkspaceView>("chat");
  const [hasWorkspace, setHasWorkspace] = React.useState(false);
  const [hasPreview, setHasPreview] = React.useState(false);
  const [deployAction, setDeployActionState] = React.useState<DeployAction>(null);

  const setDeployAction = React.useCallback((action: DeployAction) => {
    setDeployActionState(() => action);
  }, []);

  const value = React.useMemo(
    () => ({
      workspaceView,
      setWorkspaceView,
      hasWorkspace,
      setHasWorkspace,
      hasPreview,
      setHasPreview,
      deployAction,
      setDeployAction,
    }),
    [workspaceView, hasWorkspace, hasPreview, deployAction, setDeployAction]
  );

  return (
    <BuilderWorkspaceContext.Provider value={value}>
      {children}
    </BuilderWorkspaceContext.Provider>
  );
}

function useBuilderWorkspace() {
  const context = React.useContext(BuilderWorkspaceContext);
  if (!context) {
    throw new Error("useBuilderWorkspace must be used within BuilderWorkspaceProvider");
  }
  return context;
}

export { BuilderWorkspaceProvider, useBuilderWorkspace };
