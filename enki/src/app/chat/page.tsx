import Image from "next/image";
import Link from "next/link";

export default function ChatPage() {
  return (
    <div className="min-h-screen p-8 flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Chat Interface</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4 overflow-y-auto">
          {/* Chat messages would go here */}
          <div className="mb-4 max-w-[80%]">
            <p className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg inline-block">
              Hello! How can I help you today?
            </p>
            <p className="text-xs text-gray-500 mt-1">Assistant, 1:00 PM</p>
          </div>
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Type your message..." 
            className="flex-1 p-3 border border-gray-300 dark:border-gray-700 rounded-lg"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </main>
    </div>
  );
}