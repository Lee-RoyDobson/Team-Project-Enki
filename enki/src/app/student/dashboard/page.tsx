'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import ParticlesBackground from '@/components/ParticlesBackground'

export default function StudentDashboard() {
  const router = useRouter()

  const handleGoToChat = (subjectId: string) => {
    // Route to different chat pages based on the subject ID
    switch (subjectId) {
      case 'legal-ethics':
        router.push('/chat_test');
        break;
      case 'programming-fundamentals':
        router.push('/chat-404');
        break;
      case 'networks-security':
        router.push('/chat-404');
        break;
      case 'data-systems':
        router.push('/chat-404');
        break;
      case 'games-development':
        router.push('/chat-404');
        break;
      case 'software-engineering':
        router.push('/chat-404');
        break;
    }
  }

  // Subject card data
  const subjects = [
    {
      title: "Legal & Ethical Issues",
      description: "Chat to an agent that can help you with the Legal & Ethical Issues module.",
      id: "legal-ethics"
    },
    {
      title: "Programming Fundamentals",
      description: "Chat to an agent that can help you with the Programming Fundamentals module.",
      id: "programming-fundamentals"
    },
    {
      title: "Networks & Security",
      description: "Chat to an agent that can help you with the Networks & Security module.",
      id: "networks-security"
    },
    {
      title: "Data Systems",
      description: "Chat to an agent that can help you with the Data Systems module.",
      id: "data-systems"
    },
    {
      title: "Games Development",
      description: "Chat to an agent that can help you with the Games Development module.",
      id: "games-development"
    },
    {
      title: "Software Engineering",
      description: "Chat to an agent that can help you with the Software Engineering module.",
      id: "software-engineering"
    }
  ]

  return (
    <div className="min-h-screen p-8 pt-20 relative bg-gradient-to-b from-gray-900 to-gray-800 overflow-hidden">

      <ParticlesBackground />

      <h1 className="mb-8 text-3xl font-bold text-center text-gray-100">My Subjects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {subjects.map((subject) => (
          <div 
            key={subject.id}
            className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{subject.title}</h2>
              <p className="text-gray-300 mb-6">{subject.description}</p>
              <button
                onClick={() => handleGoToChat(subject.id)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Go to Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}