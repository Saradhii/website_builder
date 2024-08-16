// import { Command } from "lucide-react";
// import Link from "next/link";
// import { DarkModeToggle } from "@/components/dark-mode-toggle";
// import { RetroGridDemo } from "@/components/retro-grid-demo";
// import { AnimatedListDemo } from "@/components/animated-list-demo";
// import { DockDemo } from "@/components/dock-demo";

// export default function Index() {
//   return (
//     <section className="w-full min-h-screen flex flex-col">
//       <nav className="flex items-center justify-between p-4 w-full">
//         <Link href="/" className="flex items-center space-x-2">
//           <Command className="h-8 w-8" />
//           <h1 className="text-xl font-semibold">Next + Magic-ui</h1>
//         </Link>
//         <DarkModeToggle />
//       </nav>
//       <div className="container flex justify-center px-4 md:px-6 flex-1 py-8 overflow-x-hidden">
//         <div className="flex flex-col items-center space-y-4 text-center p-4 md:w-1/2">
//           <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
//             A{" "}
//             <span className="font-extrabold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">
//               Simple Starter
//             </span>{" "}
//             For Nextjs, Shadcn-ui and{" "}
//             <Link
//               href="https://magicui.design/"
//               className="hover:text-blue-500"
//             >
//               Magic-ui
//             </Link>
//           </h1>

//           <div className="px-4 w-full">
//             <RetroGridDemo />
//           </div>
//           <div className="px-4 w-full">
//             <AnimatedListDemo />
//           </div>
//           <div className="px-4 w-full">
//             <DockDemo />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';
import Image from "next/image";
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import dotenv from "dotenv";
import { RetroGridDemo } from "@/components/retro-grid-demo";
import MyLottieAnimation from "@/components/MyLottieAnimation";
// import MyLottieAnimation from "@/components/MyLottieAnimation";
dotenv.config();

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [lllmResponse, setLLLMResponse] = useState<string>('');
  const [htmlToRender, setHtmlToRender] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [history,setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(`${apiKey}`);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: history,
      });
      const Prompt = `
      ${inputValue}, 
      
      Please response in json format with the following format:
      {
        htmlCode : "<html code here>",
        plainText : "<plain text here>"
      }`;
      const result = await chatSession.sendMessage(Prompt);
      const jsonResponse = JSON.parse(
        result.response.text()
          .replace("```json", "")
          .replace("```", "")
          .trim()
      );
      setLLLMResponse(jsonResponse);
      setIsLoading(false);
      setHistory([...history, result.response]);
      setHtmlToRender(jsonResponse.htmlCode);
      setTextContent(jsonResponse.plainText);
      console.log("htmlCode",jsonResponse.htmlCode);
    } catch (err) {
      console.log("error generating content", err);
    }
    setInputValue('');
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="flex min-h-screen w-full">
      <div className="w-1/2 bg-blue-100 flex flex-col">
        <div className="h-[70%] bg-blue-200 flex items-center justify-center">
          {textContent}
        </div>
        <div className="h-[30%] bg-blue-300 flex items-end justify-center">
          <div className="w-5/6 bg-green-300 h-3/6 rounded-t-lg flex flex-col shadow-2xl">
            <div className="p-4">
              <form className="flex items-center" onSubmit={handleSubmit}>
                <textarea
                  className="h-full w-full resize-none border-none outline-none focus:ring-0 text-gray-700 placeholder-black bg-green-300"
                  placeholder="Describe your website..."
                  rows={1}
                  value={inputValue}
                  onChange={handleInputChange}
                  style={{
                    caretColor: 'black',
                  }}
                />
                { isLoading ? <div className="h-10 w-10"><MyLottieAnimation/></div> : <button
                  type="submit"
                  className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label="Submit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>}
              </form>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-green-200 flex items-center justify-center">
      {/* <RetroGridDemo /> */}
      <MyLottieAnimation/>
        <div dangerouslySetInnerHTML={{ __html: htmlToRender }}></div>
      </div>
    </div>
  );
}

