import React, { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Update the Message type to match what's used in ChatInterface
type Message = {
  role: string;
  content: string;
  sender?: string; // For backward compatibility
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
  const [isProcessing, setIsProcessing] = useState(false);

  // Prepare conversation history from current messages
  const getConversationHistory = (additionalMessage?: Message) => {
    // Start with system message
    const history = [
      {
        role: "system",
        content: `Have a conversation with the user about ${topicID}. Do not deviate from this.`,
      },
    ];

    // Add existing messages with proper role format
    messages.forEach((msg) => {
      const role = msg.role || (msg.sender === "Enki" ? "assistant" : "user");
      history.push({
        role: role,
        content: msg.content,
      });
    });

    // Add the new message if provided
    if (additionalMessage) {
      history.push({
        role: additionalMessage.role,
        content: additionalMessage.content,
      });
    }

    console.log("Conversation history for OpenAI:", history);
    return history;
  };

  // Save a message to the API
  const saveMessageToAPI = async (message: Message) => {
    // Create a copy of the message for API storage
    const messageForAPI = {
      role: message.role,
      content: message.content,
    };

    try {
      const saveResponse = await fetch("/api/chat/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          topic: topicID,
          message: messageForAPI,
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
    if (!inputMessage.trim() || isProcessing) return;
    setIsProcessing(true);

    // Create the user message
    const userMessage = {
      role: "user",
      content: inputMessage,
      sender: "You",
    };

    // Add user message to chat UI
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    // Save user message to API
    await saveMessageToAPI(userMessage);

    // Clear input field
    setInputMessage("");

    try {
      // Get conversation history WITH the new message explicitly included
      const conversationHistory = getConversationHistory(userMessage);

      // Format conversation history for responses API
      const formattedInput = conversationHistory.map((msg) => ({
        role: msg.role,
        content: [
          {
            type:
              msg.role === "user" || msg.role === "system"
                ? "input_text"
                : "output_text",
            text: msg.content,
          },
        ],
      }));

      console.log("Sending to OpenAI:", formattedInput);

      // Get AI response using the responses API
      const response = await openai.responses.create({
        model: "gpt-3.5-turbo",
        input: formattedInput,
        text: {
          format: {
            type: "text",
          },
        },
        reasoning: {},
        tools: [],
        temperature: 0.7,
        max_output_tokens: 2048,
        top_p: 1,
        store: true,
      });

      // Get the response content
      const aiResponseContent =
        response.output_text || "I'm sorry, I couldn't generate a response.";

      // Create the AI message
      const aiMessage = {
        role: "assistant",
        content: aiResponseContent,
        sender: "Enki",
      };

      // Add AI response to chat UI
      setMessages([...newMessages, aiMessage]);

      // Save AI message to API
      await saveMessageToAPI(aiMessage);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble responding right now. Please try again.",
          sender: "Enki",
        },
      ]);
    } finally {
      setIsProcessing(false);
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
        disabled={disabled || isProcessing}
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer disabled:bg-gray-500"
        disabled={disabled || isProcessing || !inputMessage.trim()}
      >
        {isProcessing ? "Sending..." : "Send"}
      </button>
    </div>
  );
}
