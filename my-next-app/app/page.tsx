'use client';
import Image from "next/image";
import ChatForm from "@/components/chatForm";
import UserInput from "@/components/userInput";
import CustomForm from "@/components/customForm";
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { marked } from "marked";
import dotenv from "dotenv";
import MyLottieAnimation from "@/components/MyLottieAnimation";
dotenv.config();

export default function Home() {
  const [inputValue, setInputValue] = useState<string>('');
  const [lllmResponse, setLLLMResponse] = useState<string>('');
  const [htmlToRender, setHtmlToRender] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [history,setHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
                <button
                  type="submit"
                  className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  aria-label="Submit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </form>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-green-200 flex items-center justify-center">
      { isLoading && <MyLottieAnimation/>}
        <div dangerouslySetInnerHTML={{ __html: htmlToRender }}></div>
      </div>
    </div>
  );
}
