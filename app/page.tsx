import { ChatInterface } from "./components/chat";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
    <WavyBackground
      waveOpacity={0.5}
      blur={10}
      speed="fast"
      containerClassName="h-full w-full justify-start items-center"
      className="h-full w-full"
    >
      <div className="h-full w-full flex items-center justify-center px-2 py-3 sm:px-4 sm:py-4">
        <ChatInterface />
      </div>
    </WavyBackground>
  );
}
