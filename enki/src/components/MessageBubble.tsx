import React from 'react';

type Message = {
  sender: string;
  content: string;
};

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isEnki = message.sender === "Enki";
  
  return (
    <div className="mb-4">
      <div className="font-semibold mb-1">{message.sender}</div>
      <div className={`
        p-3 rounded-lg 
        ${isEnki ? "bg-blue-900" : "bg-gray-700"}
      `}
      style={{ whiteSpace: "pre-wrap" }}
      >
        {message.content}
      </div>
    </div>
  );
};