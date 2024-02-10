import React from "react";
import guideline from "@/data/message-guideline.json";

const MessageGuideline: React.FC = () => {
  const messages = guideline;

  return (
    <>
      <div className="mt-4">
        <h1 className="text-center text-xl font-medium mb-2">
          Be sure your message aligns with these guidelines
        </h1>
        <ul className="list-disc p-4">
          {messages.map((value, idx) => (
            <li key={idx}>{value}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MessageGuideline;
