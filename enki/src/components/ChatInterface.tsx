"use client";

import Link from "next/link";
import { useState } from "react";
import { TopicButton } from "@/components/TopicButton";
import { MessageBubble } from "@/components/MessageBubble";
import { SendMessage } from "@/components/SendMessage";

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
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: "Enki", 
      content: `Welcome to ${selectedTopic}! How can I help you?` 
    }
  ]);

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    setMessages([
      { sender: "Enki", content: `Welcome to ${topic}! How can I help you?` }
    ]);
  };

  return (
    <div className="min-h-screen p-8 pt-20 flex flex-col"> 
      <header className="mb-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        {showBackButton && (
          <Link href={backLink} className="text-blue-500 hover:underline">
            Back
          </Link>
        )}
      </header>

      <div className="flex-1 flex gap-4">
        <div className="w-64 overflow-y-auto p-4 border border-gray-700 rounded-lg bg-gray-800 max-h-[80vh]">
          <h2 className="font-bold text-lg mb-2">Topics</h2>
          
          <ul className="space-y-1">
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

        <main className="flex-1 flex flex-col">
          <h2 className="text-xl font-semibold mb-2">{selectedTopic}</h2>
          
          <div className="flex-none overflow-y-auto mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800 h-[69vh]">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
          </div>

          <SendMessage 
            messages={messages}
            setMessages={setMessages}
          />
        </main>
      </div>
    </div>
  );
}