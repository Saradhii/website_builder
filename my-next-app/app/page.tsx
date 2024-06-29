import Image from "next/image";
import ChatForm from "@/components/chatForm";
import UserInput from "@/components/userInput";
import CustomForm from "@/components/customForm";

export default function Home() {
  return (
    //  <ChatForm/>
<div className="flex min-h-screen w-full">
      <div className="w-1/2 bg-blue-100 flex flex-col">
        <div className="h-[70%] bg-blue-200 flex items-center justify-center">
          
        </div>
        <div className="h-[30%] bg-blue-300 flex items-end justify-center">
        <div className="w-5/6 bg-green-300 h-3/6 rounded-t-lg flex flex-col shadow-2xl">
            <CustomForm/>
           <div>
           </div>
        </div>
        </div>
      </div>
      <div className="w-1/2 bg-green-200 flex items-center justify-center">
        
      </div>
    </div>
  );
}
