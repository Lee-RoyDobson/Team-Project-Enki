"use client";

import { ChatInterface } from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    <ChatInterface 
      initialTopic="test1"
      topics={["test1", "test2", "test3", "test4"]}
      title="Module 1"
      backLink="/"
    />
  );
}