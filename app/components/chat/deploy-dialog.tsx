"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Copy, ExternalLink } from "lucide-react";

interface DeployDialogProps {
  open: boolean;
  onClose: () => void;
  websiteId: string;
  deployUrl: string;
  deployError: string | null;
  isDeployLinkCopied: boolean;
  onCopyLink: () => void;
  onOpenSite: () => void;
}

export function DeployDialog({
  open,
  onClose,
  websiteId,
  deployUrl,
  deployError,
  isDeployLinkCopied,
  onCopyLink,
  onOpenSite,
}: DeployDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-sm">
            {deployError ? "Deploy failed" : "Website deployed"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            {deployError ? "Unable to publish this version." : `Website ID: ${websiteId}`}
          </DialogDescription>
        </DialogHeader>

        {deployError ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {deployError}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Share this URL with anyone to open your deployed website. It may take a few seconds to become globally available.
            </p>
            <div className="rounded-lg border border-input bg-muted/30 px-3 py-2 font-mono text-xs break-all">
              {deployUrl}
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onCopyLink}
                className="h-8 rounded-md text-xs"
              >
                {isDeployLinkCopied ? (
                  <Check className="size-3.5" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {isDeployLinkCopied ? "Copied" : "Copy URL"}
              </Button>
              <Button
                size="sm"
                onClick={onOpenSite}
                className="h-8 rounded-md text-xs"
              >
                <ExternalLink className="size-3.5" />
                Open Site
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
