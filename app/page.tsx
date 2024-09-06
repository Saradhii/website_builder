'use client';
import Image from "next/image";
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import dotenv from "dotenv";
import { RetroGridDemo } from "@/components/retro-grid-demo";
import MyLottieAnimation from "@/components/MyLottieAnimation";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import Ripple from "@/components/magicui/ripple";
import ShineBorder from "@/components/magicui/shine-border";
import { useTheme } from "next-themes";
import Safari from "@/components/magicui/safari";
// import MyLottieAnimation from "@/components/MyLottieAnimation";
dotenv.config();

export default function Home() {
  const theme = useTheme();
  const [requesting, setRequesting] = useState("not requesting");
  const [inputValue, setInputValue] = useState<string>('');
  const [lllmResponse, setLLLMResponse] = useState<string>('');
  const [htmlToRender, setHtmlToRender] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [history, setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyBoWVLiSCXKk69y6LbmN1UvY0suBI1l2Tg";
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
    setRequesting("requesting");
    try {
      const chatSession = model.startChat({
        generationConfig,
        history: history,
      });
      const Prompt = `
      ${inputValue}, 
      
      Please respond in below json format:
      {
        htmlCode : "html code here, please use inline css",
        plainText : "Plain text about the html code content here"
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
      setRequesting("completed");
      console.log(htmlToRender);
    } catch (err) {
      console.log("error generating content", err);
    }
    setInputValue('');
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="flex h-screen w-screen">
      <div className="w-full bg-blue-100 flex flex-col">
        <div className="h-[70%] bg-blue-200 flex flex-col shadow-2xl">
          <div className="h-[5%] w-full flex justify-end p-2">
            {requesting == "completed" ? <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" onChange={handleCheckboxChange} />
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">Dev Mode</span>
              <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#ff2975]">
              </div>
            </label> : null}
          </div>
          <div className="h-[95%] w-full flex items-center justify-center">
            {
              isLoading == null ?
                <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
                  Your AI powered <br></br>
                  website builder
                </span> :
                isChecked ? <div className="w-[100%] h-[100%] text-sm bg-gray-800 text-white overflow-auto whitespace-pre-line p-5">
                  <code className="font-mono">
                    <textarea
                      className="w-[100%] h-[100%] text-sm bg-gray-800 text-white overflow-auto whitespace-pre-line p-5"
                      value={htmlToRender}
                      onChange={(e) => setHtmlToRender(e.target.value)}
                    ></textarea>

                  </code>
                </div> : <div className="text-center text-sm font-mono text-gray-800 p-4">
                  {textContent}
                </div>
            }
          </div>
        </div>
        <div className="h-[30%] bg-blue-300 flex items-end justify-center">
          <div className="w-[590px] bg-green-300 h-3/6 rounded-t-xl flex flex-col shadow-2xl">
            <div className="p-4">
              <form className="flex items-center" onSubmit={handleSubmit}>
                <textarea
                  className="h-full w-full resize-none border-none outline-none focus:ring-0 text-gray-700 placeholder-black bg-green-300"
                  placeholder="Describe your website..."
                  rows={1}
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  style={{
                    caretColor: 'black',
                  }}
                />
                {isLoading ? <div className="h-10 w-10">
                  <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-[#ff2975] animate-spin fill-[#8c1eff]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                  </div>
                </div> : <button
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
          {/* <NeonGradientCard className="w-5/6 h-3/6 rounded-t-lg flex flex-col shadow-2xl">
          <form className="flex items-center" onSubmit={handleSubmit}>
                <textarea
                  className="h-full w-full resize-none border-none outline-none focus:ring-0 text-gray-700 placeholder-black bg-none"
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
          </NeonGradientCard> */}
        </div>
      </div>
      {isLoading !== null ? <div className="w-[90%] bg-green-200 flex items-center justify-center">
        {isLoading ? <RetroGridDemo /> : <div dangerouslySetInnerHTML={{ __html: htmlToRender }}></div>}
      </div> : null}
    </div>
  );
}

