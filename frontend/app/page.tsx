"use client";

import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import ChatWindow from "./components/workspace/ChatWindow";
import SummaryPanel from "./components/workspace/panels/SummaryPanel";
import { ChatMessage } from "./lib/api";

export interface AIContext {
  goal: string;
  insight: string;
  strategy: string;
  campaign: string;
  results: string;
  campaignId?: number;
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Hello, Saket! What goal would you like to achieve today?",
    },
  ]);

  const [aiContext, setAiContext] = useState<AIContext>({
    goal: "Not started",
    insight: "No data loaded",
    strategy: "None",
    campaign: "None",
    results: "None",
  });

  const [isThinking, setIsThinking] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans antialiased text-slate-800">
      {/* Left Sidebar */}
      <Sidebar aiContext={aiContext} />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Chat Area & Summary Panel */}
        <div className="flex flex-1 overflow-hidden">
          <ChatWindow
            messages={messages}
            setMessages={setMessages}
            aiContext={aiContext}
            setAiContext={setAiContext}
            isThinking={isThinking}
            setIsThinking={setIsThinking}
            isClosed={isClosed}
            setIsClosed={setIsClosed}
          />
          <SummaryPanel aiContext={aiContext} />
        </div>
      </div>
    </div>
  );
}