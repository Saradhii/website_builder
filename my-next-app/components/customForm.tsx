'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';

const CustomForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with input:', inputValue);
    // You can add more logic here, like sending the data to a server
    setInputValue(''); // Clear the input after submission
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
