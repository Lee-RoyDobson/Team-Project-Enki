"use client";

import { ChatInterface } from "@/components/ChatInterface";

export default function ChatPage() {
  return (
    // Read module/topic JSON here?
    <ChatInterface
      initialTopic="test1"
      topics={[
        "test1",
        "test2",
        "test3",
        "Technoethics and Emergent Technology",
      ]}
      title="5CM504 ​​Legal, Ethical and Sustainability Issues"
      backLink="/" // Where the back button will redirect to
      dataid="5CM504" // Data ID for the module
    />
  );
}
