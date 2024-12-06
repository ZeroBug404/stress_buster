/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chat } from "@/components/ui/Message";
import axiosInstance from "@/utils/AxiosInstance";
import { useState } from "react";

const ChatMessage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", own: false, isLoading: false },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!input.trim()) return;

    //  user's message to the messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: input, own: true, isLoading: false },
    ]);

    // Clear the input field
    setInput("");

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/chat", { prompt: input });
      console.log(response);
      // AI response to the messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.data, own: false, isLoading: false },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-tr bg-gray-200 ">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-grow overflow-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <Chat
            key={index}
            text={message.text}
            own={message.own}
            isLoading={message.isLoading}
          />
        ))}
      </main>

      {/* Footer with input field */}
      <footer className="p-6 bg-white shadow-md">
        <form className="flex items-center space-x-3" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
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
