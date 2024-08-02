'use client';

import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import React, { useState, FormEvent, ChangeEvent } from 'react';

const CustomForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const [lllmResponse, setLLLMResponse] = useState<string>('');

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

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with input:', inputValue);
    try{
      const chatSession = model.startChat({
        generationConfig,
        history: [
        ],
      });
      const result = await chatSession.sendMessage(inputValue);
      console.log(result.response.text());
    }catch(err){
      console.log("error generating content",err);
    }
    setInputValue(''); 
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
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
  );
};

export default CustomForm;
