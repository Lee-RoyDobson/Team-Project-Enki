/**
 * ChatInterface Component
 *
 * A comprehensive chat interface that displays messages between a student and Enki AI.
 * Provides topic selection functionality and message sending capabilities.
 */
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TopicButton } from "@/components/TopicButton";
import { MessageBubble } from "@/components/MessageBubble";
import { SendMessage } from "@/components/SendMessage";

/**
 * Unified message type that works with both display and API.
 * Includes role for API compatibility and sender for UI display.
 */
type Message = {
  role: string;
  content: string;
  sender?: string; // For backward compatibility with UI components
};

/**
 * Props interface for the ChatInterface component.
 */
interface ChatInterfaceProps {
  initialTopic?: string;
  topics?: string[];
  showBackButton?: boolean;
  backLink?: string;
  title?: string;
  dataid?: string;
}

/**
 * ChatInterface component that provides a complete chat experience with topic selection.
 *
 * @param initialTopic - The default selected topic
 * @param topics - Array of available topics to display
 * @param showBackButton - Whether to show the back navigation button
 * @param backLink - URL for the back button navigation
 * @param title - The title displayed at the top of the interface
 * @param dataid - Data identifier for the chat session
 */
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
  // Student ID state - would be retrieved from authentication in production
  const [studentId, setStudentId] = useState("100597844");

  const moduleID = "technoethics";

  /**
   * Loads messages for the selected topic from the API.
   *
   * @param topic - The topic to load messages for
   */
  const loadMessagesForTopic = async (topic: string) => {
    setIsLoading(true);
    try {
      // Fetch messages from the database using our API endpoint
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
      // Fallback to default welcome message
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

  // Load initial messages when component mounts or when topic/student changes
  useEffect(() => {
    loadMessagesForTopic(selectedTopic);
  }, [selectedTopic, studentId]);

  /**
   * Handles topic selection, updating state and loading relevant messages.
   *
   * @param topic - The newly selected topic
   */
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

          {/* Chat messages container */}
          <div className="flex-none overflow-y-auto mb-4 p-4 border border-gray-700 rounded-lg bg-gray-800 h-[70vh]">
            {isLoading ? (
              <div className="text-center py-4">Loading messages...</div>
            ) : (
              messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))
            )}
          </div>

          {/* Message input component */}
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
