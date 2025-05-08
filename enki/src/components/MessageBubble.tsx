/**
 * MessageBubble Component
 *
 * Displays an individual message in the chat interface with appropriate styling based on sender.
 */
import React from "react";

/**
 * Message type definition for chat messages.
 */
type Message = {
  sender: string;
  content: string;
};

/**
 * Props interface for the MessageBubble component.
 */
interface MessageBubbleProps {
  message: Message;
}

/**
 * Renders a chat message with appropriate styling based on the sender.
 * Different background colors distinguish between Enki (assistant) and user messages.
 *
 * @param message - The message object containing sender and content
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isEnki = message.sender === "Enki";

  return (
    <div className="mb-4">
      {/* Sender label */}
      <div className="font-semibold mb-1">{message.sender}</div>

      {/* Message content with conditional styling */}
      <div
        className={`
        p-3 rounded-lg 
        ${isEnki ? "bg-blue-900" : "bg-gray-700"}
      `}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {message.content}
      </div>
    </div>
  );
};
