import { Suspense } from "react";
import { ChatInterface } from "./components/chat";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center px-2 py-3 sm:px-4 sm:py-4">
      <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
        <div className="relative h-full w-full">
          <ChatInterface />
        </div>
      </Suspense>
    </div>
  );
}
