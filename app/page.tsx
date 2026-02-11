import { ChatInterface } from "./components/chat";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function Home() {
  return (
    <WavyBackground 
      backgroundFill="white"
      waveOpacity={0.5}
      blur={10}
      speed="fast"
    >
      <div className="h-full w-full flex items-center justify-center p-4">
        <ChatInterface />
      </div>
    </WavyBackground>
  );
}
