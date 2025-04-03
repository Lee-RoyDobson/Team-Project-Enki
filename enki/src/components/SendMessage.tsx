import React, { useState } from 'react';

type Message = {
  sender: string;
  content: string;
};

interface SendMessageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export function SendMessage({ messages, setMessages }: SendMessageProps) {
  const [inputMessage, setInputMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message to chat
    const newMessages = [
      ...messages, 
      { sender: "You", content: inputMessage }
    ];
    
    setMessages(newMessages);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex gap-2">
      <input 
        type="text" 
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..." 
        className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg"
        autoFocus
      />
      <button 
        onClick={handleSendMessage}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        Send
      </button>
    </div>
  );
}