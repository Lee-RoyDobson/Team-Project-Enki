"use client";

import Link from "next/link";
import { useState } from "react";
import { TopicButton } from "@/components/TopicButton";
import { MessageBubble } from "@/components/MessageBubble";

type Message = {
  sender: string;
  content: string;
};

interface ChatInterfaceProps {
  initialTopic?: string;
  topics?: string[];
  showBackButton?: boolean;
  backLink?: string;
  title?: string;
}

export function ChatInterface({
  initialTopic = "TEST TOPIC 1",
  topics = ["TEST TOPIC 1", "TEST TOPIC 2", "TEST TOPIC 3", "TEST TOPIC 4", "TEST TOPIC 5"],
  showBackButton = true,
  backLink = "/",
  title = "Chat Interface"
}: ChatInterfaceProps) {
  // State management
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: "Enki", 
      content: `Welcome to ${selectedTopic}! How can I help you?` 
    }
  ]);

  // Event handlers
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setMessages([
      { sender: "Enki", content: `Welcome to ${topic}! How can I help you?` }
    ]);
  };

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
    
    // Simulate AI response
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { 
          sender: "Enki", 
          content: `Simulated response for ${selectedTopic}.` 
        }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen p-8 flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">{title}</h1>
        {showBackButton && (
          <Link href={backLink} className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        )}
      </header>

      {/* Main content with sidebar and chat */}
      <div className="flex-1 flex gap-4">
        {/* Topics sidebar */}
        <div className="w-64 overflow-y-auto p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="font-bold text-lg mb-4">Topics</h2>
          
          <ul className="space-y-2">
            {topics.map((topic) => (
              <TopicButton 
                key={topic} 
                topic={topic} 
                selectedTopic={selectedTopic}
                onSelect={handleTopicSelect}
              />
            ))}
          </ul>
        </div>

        {/* Chat area */}
        <main className="flex-1 flex flex-col">
          {/* Topic title */}
          <h2 className="text-xl font-semibold mb-4">{selectedTopic}</h2>
          
          {/* Chat messages window */}
          <div className="flex-1 overflow-y-auto mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
          </div>

          {/* Input field */}
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
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
        </main>
      </div>
    </div>
  );
}