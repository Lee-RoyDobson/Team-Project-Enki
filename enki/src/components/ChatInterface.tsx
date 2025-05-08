"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TopicButton } from "@/components/TopicButton";
import { MessageBubble } from "@/components/MessageBubble";
import { SendMessage } from "@/components/SendMessage";

// Unified message type that works with both display and API
type Message = {
  role: string;
  content: string;
  sender?: string; // For backward compatibility with UI components
};

interface ChatInterfaceProps {
  initialTopic?: string;
  topics?: string[];
  showBackButton?: boolean;
  backLink?: string;
  title?: string;
  dataid?: string;
}

export function ChatInterface({
  initialTopic = "TEST TOPIC 1",
  topics = [
    "TEST TOPIC 1",
    "TEST TOPIC 2",
    "TEST TOPIC 3",
    "TEST TOPIC 4",
    "TEST TOPIC 5",
  ],
  showBackButton = true,
  backLink = "/",
  title = "Chat Interface",
  dataid,
}: ChatInterfaceProps) {
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // Add student ID state - in a real app, you'd get this from authentication
  const [studentId, setStudentId] = useState("123456789"); // Default student ID for testing

  const moduleID = "technoethics";

  // Load messages for a topic
  const loadMessagesForTopic = async (topic: string) => {
    setIsLoading(true);
    try {
      // Fetch messages from the database using our new API endpoint
      const response = await fetch(
        `/api/chat/messages?studentId=${studentId}&topic=${encodeURIComponent(
          topic
        )}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      // Transform messages to include both role and sender fields for compatibility
      const transformedMessages = (data.messages || [])
        .filter((msg: any) => msg.role !== "system") // Filter out system messages
        .map((msg: any) => ({
          role: msg.role,
          content: msg.content,
          sender: msg.role === "assistant" ? "Enki" : "You",
        }));

      setMessages(transformedMessages);
    } catch (error) {
      console.error("Error loading messages:", error);
      // Fallback to default message
      setMessages([
        {
          role: "assistant",
          content: `Welcome to ${topic}! How can I help you?`,
          sender: "Enki",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Load initial messages when component mounts
  useEffect(() => {
    loadMessagesForTopic(selectedTopic);
  }, [selectedTopic, studentId]); // Add dependencies to reload when they change

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    loadMessagesForTopic(topic);
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
        {/* Topics sidebar */}
        <div className="w-64 overflow-y-auto p-4 border border-gray-700 rounded-lg bg-gray-800">
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

        <main className="flex-1 flex flex-col">
          {/* Topic title */}
          <h2 className="text-xl font-semibold mb-4">{selectedTopic}</h2>

          {/* Chat messages window */}
          <div className="flex-none overflow-y-auto mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800 h-[70vh]">
            {isLoading ? (
              <div className="text-center py-4">Loading messages...</div>
            ) : (
              messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))
            )}
          </div>

          {/* Input field */}
          <SendMessage
            messages={messages}
            setMessages={setMessages}
            disabled={isLoading}
            moduleID={moduleID}
            topicID={selectedTopic}
            studentId={studentId}
          />
        </main>
      </div>
    </div>
  );
}
