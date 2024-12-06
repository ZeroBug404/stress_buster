import { useState } from "react";
import Markdown from "react-markdown";
import { LuCopy } from "react-icons/lu";

type TChatProps = {
  text: string;
  own: boolean;
  isLoading?: boolean;
};

const Chat = ({ text, own, isLoading = false }: TChatProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className={`max-w-[90%] my-4 p-4 rounded-lg shadow-md ${
        own
          ? "bg-green-100 text-left ml-auto rounded-tr-none"
          : "bg-white text-left mr-auto rounded-tl-none"
      }`}
    >
      <Markdown className="text-base leading-7">{text}</Markdown>
      {!own && !isLoading && (
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mt-2"
        >
          <LuCopy />
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
      {isLoading && (
        <div className="mt-2 flex items-center justify-center">
          <div className="w-5 h-5 bg-black rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default Chat;
