/**
 * Chat Test Page
 *
 * A test implementation of the chat interface that fetches topics from the API
 * and renders the ChatInterface component with those topics.
 */
"use client";

import { ChatInterface } from "@/components/ChatInterface";
import { useEffect, useState } from "react";

/**
 * Topic interface defining the structure of topic data retrieved from the API.
 */
interface Topic {
  _id: string;
  topic: string;
  startMessage: string;
}

/**
 * Chat page component that fetches and displays topics for the 5CM504 module.
 * Renders the ChatInterface component with the retrieved topics.
 */
export default function ChatPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch topics from the API when component mounts
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics?moduleId=5CM504");

        if (!response.ok) {
          throw new Error(`Failed to fetch topics: ${response.status}`);
        }

        const data = await response.json();
        setTopics(data.topics);
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError("Failed to load topics. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  // Display loading or error states if needed
  if (isLoading)
    return <div className="p-8 text-center">Loading topics...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  // Convert topic objects to string array for ChatInterface component
  const topicStrings = topics.map((t) => t.topic);

  return (
    <ChatInterface
      initialTopic={topicStrings.length > 0 ? topicStrings[0] : ""}
      topics={topicStrings}
      title="5CM504 ​​Legal, Ethical and Sustainability Issues"
      backLink="/student/dashboard"
      dataid="5CM504"
    />
  );
}
