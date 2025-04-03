import React, { useState } from "react";
import OpenAI from "openai";
import fs from 'fs';

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
}

export function SendMessage({ messages, setMessages }: SendMessageProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState([
    {
      role: "system",
      content: "Have a conversation with the user about Technoethics and Emergent Technology. Do not deviate from this.",
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
      model: "gpt-4o",
      input: updatedHistory.map((msg) => `${msg.role}: ${msg.content}`).join('\n'),
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
    const aiMessage = { sender: "AI", content: response.output_text };
    setMessages([...newMessages, aiMessage]);

    // Update conversation history with AI response
    setConversationHistory([
      ...updatedHistory,
      { role: "assistant", content: response.output_text },
    ]);
    setInputMessage("");

    // Save conversation history to file
    const jsonHistory = JSON.stringify(updatedHistory, null, 2);
    fs.writeFileSync('conversationHistory.json', jsonHistory, 'utf8');


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
