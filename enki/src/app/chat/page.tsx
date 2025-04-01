"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ChatPage() {
  // State to track the selected topic
  const [selectedTopic, setSelectedTopic] = useState("TEST TOPIC 1");

  // Handler for topic selection
  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    // Here you could also load messages for this topic
    // or perform other actions when a topic is selected
  };

  return (
    <div className="min-h-screen p-8 flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Chat Interface TEST</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </header>

      {/* Main content with sidebar and chat */}
      <div className="flex-1 flex gap-4">
        {/* Topics sidebar */}
        <div className="w-64 overflow-y-auto p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h2 className="font-bold text-lg mb-4">Topics</h2>
          
          <ul className="space-y-2">
            {["TEST TOPIC 1", "TEST TOPIC 2", "TEST TOPIC 3", "TEST TOPIC 4", "TEST TOPIC 5"].map((topic) => (
              <li key={topic}>
                <button 
                  onClick={() => handleTopicSelect(topic)}
                  className={`w-full text-left p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer ${
                    selectedTopic === topic ? "bg-blue-100 dark:bg-blue-900" : ""
                  }`}
                >
                  {topic}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat area */}
        <main className="flex-1 flex flex-col">
          {/* Topic title */}
          <h2 className="text-xl font-semibold mb-4">{selectedTopic}</h2>
          
          {/* Chat messages window */}
          <div className="flex-1 overflow-y-auto mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
            {/* Example messages - replace with your actual messages from */}
            <div className="mb-4">
              <div className="font-semibold mb-1">Enki</div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  MESSAGE PLACEHOLDER {selectedTopic}
              </div>
            </div>
            
            <div className="mb-4">
              <div className="font-semibold mb-1">You</div>
              <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-lg">
                  REPLY PLACEHOLDER {selectedTopic}
              </div>
            </div>
          </div>

          {/* Input field */}
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg"
            />
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">
              Send
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}