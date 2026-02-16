import { ChatInterface } from "./components/chat";

export default function Home() {
  return (
    <div className="h-full w-full flex items-center justify-center px-2 py-3 sm:px-4 sm:py-4">
      <ChatInterface />
    </div>
  );
}
