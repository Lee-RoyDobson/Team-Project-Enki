"use client";

import { ChatInterface } from "@/components/ChatInterface";
import { useEffect, useState } from "react";

// Topic interface to define the structure of the topic data
interface Topic {
  _id: string;
  topic: string;
  startMessage: string;
}

export default function ChatPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading)
    return <div className="p-8 text-center">Loading topics...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  // Map topics to strings for the ChatInterface component if it expects string[] for topics
  const topicStrings = topics.map((t) => t.topic);

  return (
    <ChatInterface
      initialTopic={topicStrings.length > 0 ? topicStrings[0] : ""}
      topics={topicStrings}
      title="5CM504 ​​Legal, Ethical and Sustainability Issues"
      backLink="/"
      dataid="5CM504"
    />
  );
}
