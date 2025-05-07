import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // exposes key to frontend, needs changing in future
});

type Message = {
  sender: string; // student, Enki
  content: string;
};

interface SendMessageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  disabled?: boolean;
  moduleID: string;
  topicID: string;
}

export function SendMessage({
  messages,
  setMessages,
  disabled,
  moduleID,
  topicID,
}: SendMessageProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "system",
      content: `Have a conversation with the user about ${topicID}. Do not deviate from this.`,
    },
  ]);

  useEffect(() => { // updates topicID when topic changes
    setConversationHistory([
      {
        role: "system",
        content: `Have a conversation with the user about ${topicID}. Do not deviate from this.`,
      },
    ]);

    setMessages([]); // Also reset messages displayed in the UI
  }, [topicID, setMessages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { sender: "You", content: inputMessage }]; // Add user message to chat

    setMessages(newMessages);

    const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: inputMessage },
    ];
    setConversationHistory(updatedHistory);

    const response = await openai.responses.create({
      model: "gpt-3.5-turbo", // 3.5 for development, change for production
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

    const aiMessage = { sender: "Enki", content: response.output_text }; // adds AI response to chat
    setMessages([...newMessages, aiMessage]);

    // updates chat history with AI response
    const completeHistory = [
      ...updatedHistory,
      { role: "assistant", content: response.output_text },
    ];
    setConversationHistory(completeHistory);

    setInputMessage("");

    try {
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
