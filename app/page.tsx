'use client';
import { Content, GoogleGenerativeAI } from '@google/generative-ai';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import { RetroGridDemo } from "@/components/retro-grid-demo";
import MyLottieAnimation from "@/components/MyLottieAnimation";
import { useTheme } from "next-themes";
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";

interface HistoryItem {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface AIResponse {
  htmlCode: string;
  plainText: string;
}

const parseAIResponse = (text: string): AIResponse | null => {
  try {
    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    if (parsed.htmlCode && parsed.plainText) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to parse AI response');
  }
  return null;
};

const sanitizeHtml = (html: string): string => {
  // Basic XSS protection - remove script tags and event handlers
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

export default function Home() {
  const theme = useTheme();
  const [requesting, setRequesting] = useState("not requesting");
  const [inputValue, setInputValue] = useState<string>('');
  const [lllmResponse, setLLLMResponse] = useState<AIResponse | null>(null);
  const [htmlToRender, setHtmlToRender] = useState<string>('');
  const [textContent, setTextContent] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(`${apiKey}`);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
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
      const jsonResponse = parseAIResponse(result.response.text());
      
      if (!jsonResponse) {
        throw new Error('Invalid AI response format');
      }
      
      setLLLMResponse(jsonResponse);
      setIsLoading(false);
      setHistory([...history, { role: 'model', parts: [{ text: result.response.text() }] }]);
      setHtmlToRender(sanitizeHtml(jsonResponse.htmlCode));
      setTextContent(jsonResponse.plainText);
      setRequesting("completed");
    } catch (err) {
      console.log("error generating content", err);
    }
    setInputValue('');
  };
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Animated Grid Pattern Background */}
      <AnimatedGridPattern
        className="absolute inset-0 z-0 text-purple-400 bg-white"
        width={30}
        height={30}
        numSquares={200}
        maxOpacity={0.7}
        duration={5}
      />

      {/* Main Content */}
      <div className="relative z-10 flex h-full w-full">
        <div className={`${isLoading == null ? "w-full" : "w-1/2"} bg-black-100/80 backdrop-blur-sm flex flex-col`}>
          <div className="h-[70%] backdrop-blur-sm flex flex-col">
            <div className="h-[5%] flex justify-end p-2">
              {requesting == "completed" ? <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" onChange={handleCheckboxChange} />
                <span className="ms-3 text-sm font-medium text-gray-900 mr-2">Dev Mode</span>
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
                  isChecked ?
                    // <div className="w-[100%] h-[100%] text-sm bg-gray-800 text-white overflow-auto whitespace-pre-line p-5">
                    //     <code className="font-mono">{htmlToRender}</code>
                    //   </div> 
                    <div className="w-[100%] h-[100%] overflow-auto">
                      <CodeMirror
                        height="100%"
                        width="100%"
                        extensions={[html()]}
                        theme={oneDark}
                        value={htmlToRender}
                        onChange={(newValue) => setHtmlToRender(newValue)}

                      />
                    </div>
                    : <div className="text-center text-sm font-mono text-gray-800 p-4">
                      {textContent}
                    </div>
              }
            </div>
          </div>
          
          <div className="h-[30%] flex items-end justify-center">
            <div className="w-[590px] bg-green-300/80 backdrop-blur-sm h-3/6 rounded-t-xl flex flex-col shadow-2xl">
              <div className="p-4">
                <form className="flex items-center" onSubmit={handleSubmit}>
                  <textarea
                    className="h-full w-full resize-none border-none outline-none focus:ring-0 text-gray-700 placeholder-black bg-transparent"
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
                    <MyLottieAnimation />
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
          </div>
        </div>
        {isLoading !== null ? <div className="w-1/2 bg-green-200/80 backdrop-blur-sm flex items-center justify-center">
          {isLoading ? <RetroGridDemo /> : <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(htmlToRender) }}></div>}
        </div> : null}
      </div>
    </div>
  );
}
