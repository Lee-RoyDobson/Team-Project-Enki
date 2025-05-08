/**
 * TopicButton Component
 *
 * Renders a selectable button for each topic in the chat interface.
 * Visually indicates the currently selected topic.
 */
import React from "react";

/**
 * Props interface for the TopicButton component.
 */
interface TopicButtonProps {
  topic: string;
  selectedTopic: string;
  onSelect: (topic: string) => void;
}

/**
 * Renders a button for a chat topic that can be selected by the user.
 * Applies special styling to the currently selected topic.
 *
 * @param topic - The topic name to display
 * @param selectedTopic - The currently selected topic
 * @param onSelect - Callback function when the topic is selected
 */
export const TopicButton: React.FC<TopicButtonProps> = ({
  topic,
  selectedTopic,
  onSelect,
}) => (
  <li>
    <button
      onClick={() => onSelect(topic)}
      className={`
        w-full text-left p-2 rounded-lg 
        hover:bg-gray-700 
        transition cursor-pointer
        ${selectedTopic === topic ? "bg-blue-900" : ""}
      `}
    >
      {topic}
    </button>
  </li>
);
