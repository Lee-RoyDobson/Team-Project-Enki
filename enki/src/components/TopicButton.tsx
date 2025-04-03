import React from 'react';

interface TopicButtonProps {
  topic: string;
  selectedTopic: string;
  onSelect: (topic: string) => void;
}

export const TopicButton: React.FC<TopicButtonProps> = ({ 
  topic, 
  selectedTopic, 
  onSelect 
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