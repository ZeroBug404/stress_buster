import { useNavigate } from "react-router-dom";

import { Chat } from "@/components/ui/Message";

function LoaderRipple() {
  return (
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-white border-opacity-75 rounded-full animate-pulse"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-white opacity-100 rounded-full animate-pulse animate-delay-1000ms"></div>
    </div>
  );
}

const ChatMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-tr bg-gray-200 ">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-grow overflow-auto p-6 space-y-4">
        {/* Example of chat messages */}
        <Chat
          text="Hello! How can I help you today?"
          own={false}
          isLoading={false}
        />
        <Chat text="I'm feeling stressed." own={true} isLoading={false} />
        <Chat
          text="Take a deep breath. What happened?"
          own={false}
          isLoading={false}
        />
      </main>

      {/* Footer with input field */}
      <footer className="p-6 bg-white shadow-md">
        <form
          className="flex items-center space-x-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            placeholder="Type your message here..."
            className="flex-grow p-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="p-3 text-xl text-blue-600 hover:bg-blue-100 rounded-full"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatMessage;
