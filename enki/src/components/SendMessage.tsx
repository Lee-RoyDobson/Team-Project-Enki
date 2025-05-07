import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type Message = {
  sender: string;
  content: string;
};

interface SendMessageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  disabled?: boolean;
  moduleID: string;
  topicID: string;
}

export function SendMessage({ messages, setMessages, disabled, moduleID, topicID }: SendMessageProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "system",
      content:
      `Have a conversation with the user about ${topicID}. Do not deviate from this.`,
    },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { sender: "You", content: inputMessage }];

    setMessages(newMessages);

    const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: inputMessage },
    ];
    setConversationHistory(updatedHistory);

    const response = await openai.responses.create({
      model: "gpt-3.5-turbo",
      input: updatedHistory
        .map((msg) => `${msg.role}: ${msg.content}`)
        .join("\n"),
      text: {
        format: {
          type: "text",
        },
      },
      reasoning: {},
      tools: [],
      temperature: 1,
      max_output_tokens: 2048,
      top_p: 1,
      store: true,
    });

    // Add AI response to chat
    const aiMessage = { sender: "Enki", content: response.output_text };
    setMessages([...newMessages, aiMessage]);

    // Update conversation history with AI response
    const completeHistory = [
      ...updatedHistory,
      { role: "assistant", content: response.output_text },
    ];
    setConversationHistory(completeHistory);

    setInputMessage("");

    try {
      const moduleID = "technoethics";
      const topicID = "emergent-technology";
      await fetch(`/api/modules/${moduleID}/chat/${topicID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationHistory: completeHistory }),
      });
      console.log(completeHistory);
    } catch (error) {
      console.error("Error saving conversation history:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={inputMessage}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
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
  );
}
