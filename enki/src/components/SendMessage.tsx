import React, { useState, useEffect } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type Message = {
  role: string; // Changed from sender to role
  content: string;
};

interface SendMessageProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  disabled?: boolean;
  moduleID: string;
  topicID: string;
  studentId: string;
}

export function SendMessage({
  messages,
  setMessages,
  disabled,
  moduleID,
  topicID,
  studentId,
}: SendMessageProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "system",
      content: `Have a conversation with the user about ${topicID}. Do not deviate from this.`,
    },
  ]);

  // Reset conversation history when topicID changes
  useEffect(() => {
    // Reset conversation history with the new topic
    setConversationHistory([
      {
        role: "system",
        content: `Have a conversation with the user about ${topicID}. Do not deviate from this.`,
      },
    ]);

    // Also reset messages displayed in the UI
    setMessages([]);
  }, [topicID, setMessages]);

  // Save a message to the API
  const saveMessageToAPI = async (message: Message) => {
    try {
      const saveResponse = await fetch("/api/chat/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          topic: topicID,
          message: message,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error(`Failed to save message: ${saveResponse.status}`);
      }

      const saveData = await saveResponse.json();
      console.log("Message saved successfully:", saveData);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Create the user message
    const userMessage = { role: "user", content: inputMessage }; // Changed sender to role

    // Add user message to chat UI
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Save user message to API
    await saveMessageToAPI(userMessage);

    // Update conversation history for OpenAI
    const updatedHistory = [
      ...conversationHistory,
      { role: "user", content: inputMessage },
    ];
    setConversationHistory(updatedHistory);

    // Clear input field
    setInputMessage("");

    // Get AI response
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

    // Create the AI message
    const aiMessage = { role: "assistant", content: response.output_text }; // Changed sender to role

    // Add AI response to chat UI
    setMessages([...newMessages, aiMessage]);

    // Save AI message to API
    await saveMessageToAPI(aiMessage);

    // Update conversation history with AI response
    setConversationHistory([
      ...updatedHistory,
      { role: "assistant", content: response.output_text },
    ]);
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
        disabled={disabled}
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer"
        disabled={disabled}
      >
        Send
      </button>
    </div>
  );
}
