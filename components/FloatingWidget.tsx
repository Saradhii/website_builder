'use client';

import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, MinimizeIcon, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ApiResponse {
  success: boolean;
  response: string;
  updatedHistory: Message[];
}

const TypingIndicator: React.FC = () => (
  <div className="flex gap-1 p-2 bg-gray-100 rounded-lg w-16">
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

const HelpDeskWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage: Message = { text: inputMessage, sender: 'user' };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputMessage('');
      setIsTyping(true);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/sample`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: inputMessage, history: updatedMessages }),
        });

        interface ApiResponse {
          success: boolean;
          response?: { text: string };
          error?: string;
        }
        
        const data: ApiResponse = await response.json();
        if (data.success && data.response) {
          const botMessage: Message = { text: data.response.text, sender: 'bot' };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          console.error('Error in API response:', data.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsTyping(false);
      }
    }
  };


  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 h-96 shadow-xl">
          <CardHeader className="bg-primary p-3 flex flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold">Help Desk</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-white/80"
              onClick={() => setIsOpen(false)}
            >
              <MinimizeIcon className="w-5 h-5" />
            </Button>
          </CardHeader>
          <ScrollArea ref={scrollAreaRef} className="h-64 p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-4">
                <TypingIndicator />
              </div>
            )}
          </ScrollArea>
          <CardFooter className="p-3 pt-0">
            <form onSubmit={sendMessage} className="flex w-full gap-2">
              <Input
                value={inputMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="animate-bounce hover:animate-none">
                <Image
                  src="/favicon.svg"
                  alt="Help Desk"
                  width={40}
                  height={40}
                  className="cursor-pointer hover:scale-110 transition-transform duration-200"
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-primary text-white">
              <p>How can I help you?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default HelpDeskWidget;
