'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import React from 'react';

export default function StudentDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check for notification message in session storage
    const notification = sessionStorage.getItem('topicNotification');
    if (notification) {
      toast.success(notification, {
        position: "top-center", // Changed from "top-right" to "top-center"
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // Remove notification from session storage after displaying
      sessionStorage.removeItem('topicNotification');
    }
  }, []);

  const handleGoToChatTest = () => {
    router.push('/chat_test');
  };

  const handleGoToTopicForm = () => {
    router.push('/instructor/topic_form');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-2xl font-bold">Instructor Dashboard</h1>
      
      {/* Chat Test navigation button */}
      <button
        onClick={handleGoToChatTest}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 cursor-pointer mb-4"
      >
        Go to Chat Test
      </button>

      {/* Topic Form navigation button */}
      <button
        onClick={handleGoToTopicForm}
        className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 cursor-pointer"
      >
        Create New Topic
      </button>
    </div>
  );
}