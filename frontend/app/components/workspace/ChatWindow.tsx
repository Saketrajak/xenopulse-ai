"use client";

import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import MessageBubble from "./MessageBubble";
import PromptInput from "./PromptInput";
import StrategyCard from "./cards/StrategyCard";
import CampaignCard from "./cards/CampaignCard";
import RetentionCard from "./cards/RetentionCard";
import ResultCard from "./cards/ResultCard";
import {
  ChatMessage,
  chatWithAgent,
  useDemoData,
  generateAICampaign,
  saveCustomCampaign,
  approveAndLaunchCampaign,
} from "../../lib/api";
import { AIContext } from "../../page";

interface ChatWindowProps {
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  aiContext: AIContext;
  setAiContext: Dispatch<SetStateAction<AIContext>>;
  isThinking: boolean;
  setIsThinking: Dispatch<SetStateAction<boolean>>;
}

export default function ChatWindow({
  messages,
  setMessages,
  aiContext,
  setAiContext,
  isThinking,
  setIsThinking,
}: ChatWindowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customText, setCustomText] = useState("");

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isThinking]);

  // Handle user inputs via prompt input
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // 1. Add user message
    const userMsgId = `user-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, role: "user", text },
    ]);

    setIsThinking(true);

    try {
      // 2. Call API agent/chat
      const response = await chatWithAgent(text);

      // 3. Add AI message response
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: "assistant",
          text: response.message,
          actions: response.actions,
        },
      ]);

      // Update active goal in context if matched
      let goalDisplay = aiContext.goal;
      if (response.goal === "RETENTION") {
        goalDisplay = "Bring back inactive customers";
      } else if (response.goal === "WINBACK") {
        goalDisplay = "Win-back inactive customers";
      }

      setAiContext((prev) => ({
        ...prev,
        goal: goalDisplay,
      }));
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "Sorry, I encountered an issue reaching the server. Make sure the backend service is running on port 8000.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Handler for goal chips
  const handleGoalChipClick = (goalText: string) => {
    handleSendMessage(goalText);
  };

  // Handler for using demo data
  const handleUseDemo = async () => {
    setIsThinking(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `info-${Date.now()}`,
        role: "assistant",
        text: "Connecting to database, querying dormant cohorts, and evaluating channel engagement strategy...",
      },
    ]);

    try {
      const response = await useDemoData();

      // Update Context
      setAiContext((prev) => ({
        ...prev,
        insight: response.decision.audience,
        strategy: `${response.decision.recommended_channel} campaign`,
        campaign: "Ready to generate",
      }));

      // Add retention card and strategy card
      setMessages((prev) => [
        ...prev,
        {
          id: `retention-${Date.now()}`,
          role: "assistant",
          cardType: "retention",
          cardData: response,
        },
        {
          id: `strategy-${Date.now()}`,
          role: "assistant",
          cardType: "strategy",
          cardData: response,
        },
        {
          id: `ai-strategy-ready-${Date.now()}`,
          role: "assistant",
          text: `I have analyzed the customer database. The top recommendation is a ${response.decision.recommended_channel} ${response.decision.campaign_type}. How should we craft the campaign message?`,
          actions: response.actions,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "Failed to generate strategy. Please verify database integrity.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Handler to generate AI campaign
  const handleGenerateAICampaign = async () => {
    setIsThinking(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `info-${Date.now()}`,
        role: "assistant",
        text: "Invoking Gemini 2.5 Flash copywriter to draft a hyper-targeted re-engagement campaign...",
      },
    ]);

    try {
      const response = await generateAICampaign();

      setAiContext((prev) => ({
        ...prev,
        campaign: "Draft ready for review",
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `campaign-${Date.now()}`,
          role: "assistant",
          cardType: "campaign",
          cardData: response,
          actions: response.actions,
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "Failed to generate campaign copy draft.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Handler to save custom message
  const handleSaveCustomCampaign = async () => {
    if (!customText.trim()) return;

    setIsThinking(true);
    setShowCustomInput(false);

    try {
      const response = await saveCustomCampaign(customText);

      setAiContext((prev) => ({
        ...prev,
        campaign: "Custom campaign saved",
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `custom-campaign-${Date.now()}`,
          role: "assistant",
          cardType: "campaign",
          cardData: {
            campaign_draft: response.message,
            recommended_channel: response.channel,
            campaign_type: "Custom Campaign",
          },
          actions: ["APPROVE_CAMPAIGN"],
        },
      ]);
      setCustomText("");
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "Failed to save custom campaign.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  // Handler to launch campaign
  const handleLaunchCampaign = async () => {
    setIsThinking(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `info-${Date.now()}`,
        role: "assistant",
        text: "Initiating final launch approval. Handshaking with channel-service on port 8001...",
      },
    ]);

    try {
      const response = await approveAndLaunchCampaign();

      setAiContext((prev) => ({
        ...prev,
        campaign: "Campaign launched",
        results: "Pending launch outcomes",
        campaignId: response.campaign.campaign_id,
      }));

      setMessages((prev) => [
        ...prev,
        {
          id: `launched-${Date.now()}`,
          role: "assistant",
          text: `Success! Approved campaign has been handed over to channel gateways. Dispatched ${response.campaign.audience_size} messages via ${response.campaign.campaign_name}.`,
        },
        {
          id: `results-${Date.now()}`,
          role: "assistant",
          cardType: "result",
          cardData: {
            campaignId: response.campaign.campaign_id,
          },
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "assistant",
          text: "Failed to approve and launch campaign.",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col bg-slate-50 min-h-0 relative">
      {/* Scrollable Chat Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-10">
          {/* Hero Header */}
          {messages.length === 1 && (
            <div className="mb-10 animate-fade-in">
              <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Good Morning, Saket 👋
              </h1>
              <p className="mt-3 text-lg text-slate-500">
                What marketing or engagement goal would you like to achieve today?
              </p>
            </div>
          )}

          {/* Goal Chips (Only show at start) */}
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-3 mb-12 animate-fade-in-delayed">
              <button
                onClick={() => handleGoalChipClick("Bring back inactive customers")}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 transition hover:-translate-y-1 hover:shadow-md cursor-pointer text-slate-700 hover:border-blue-400 font-medium"
              >
                Bring Back Inactive Customers
              </button>

              <button
                onClick={() => handleGoalChipClick("Increase Repeat Purchases")}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 transition hover:-translate-y-1 hover:shadow-md cursor-pointer text-slate-700 hover:border-blue-400 font-medium"
              >
                Increase Repeat Purchases
              </button>

              <button
                onClick={() => handleGoalChipClick("Reduce Customer Churn")}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 transition hover:-translate-y-1 hover:shadow-md cursor-pointer text-slate-700 hover:border-blue-400 font-medium"
              >
                Reduce Customer Churn
              </button>

              <button
                onClick={() => handleGoalChipClick("Boost WhatsApp Engagement")}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 transition hover:-translate-y-1 hover:shadow-md cursor-pointer text-slate-700 hover:border-blue-400 font-medium"
              >
                Boost WhatsApp Engagement
              </button>
            </div>
          )}

          {/* Conversation Stream */}
          <div className="space-y-8">
            {messages.map((message) => {
              if (message.cardType === "retention") {
                return <RetentionCard key={message.id} data={message.cardData} />;
              }
              if (message.cardType === "strategy") {
                return <StrategyCard key={message.id} data={message.cardData} />;
              }
              if (message.cardType === "campaign") {
                return (
                  <CampaignCard
                    key={message.id}
                    data={message.cardData}
                    onLaunch={handleLaunchCampaign}
                  />
                );
              }
              if (message.cardType === "result") {
                return (
                  <ResultCard
                    key={message.id}
                    campaignId={message.cardData.campaignId}
                    setAiContext={setAiContext}
                  />
                );
              }

              return (
                <div key={message.id} className="space-y-4">
                  <MessageBubble role={message.role} text={message.text || ""} />

                  {/* Actions associated with this text message bubble */}
                  {message.actions && message.actions.length > 0 && (
                    <div className="flex flex-wrap gap-3 pl-16">
                      {message.actions.includes("USE_DEMO_DATA") && (
                        <button
                          onClick={handleUseDemo}
                          className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 shadow transition hover:-translate-y-0.5 cursor-pointer"
                        >
                          Use Demo Customer Data
                        </button>
                      )}

                      {message.actions.includes("UPLOAD_DATA") && (
                        <button
                          onClick={() =>
                            alert(
                              "Customer CSV upload flow: Not active in this demo version. Please select 'Use Demo Customer Data' to proceed."
                            )
                          }
                          className="rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 bg-white font-medium px-5 py-3 shadow transition cursor-pointer"
                        >
                          Upload Custom CSV
                        </button>
                      )}

                      {message.actions.includes("GENERATE_AI_CAMPAIGN") && (
                        <button
                          onClick={handleGenerateAICampaign}
                          className="rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-3 shadow transition hover:-translate-y-0.5 cursor-pointer"
                        >
                          Generate AI Campaign Draft
                        </button>
                      )}

                      {message.actions.includes("UPLOAD_CUSTOM_MESSAGE") && (
                        <button
                          onClick={() => setShowCustomInput(true)}
                          className="rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 bg-white font-medium px-5 py-3 shadow transition cursor-pointer"
                        >
                          Write Custom Campaign Message
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Custom Input Panel for custom messaging drafts */}
            {showCustomInput && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md max-w-2xl ml-16 space-y-4 animate-fade-in">
                <h3 className="font-semibold text-lg">Custom Campaign Creator</h3>
                <textarea
                  className="w-full h-32 rounded-xl border border-slate-200 p-4 outline-none text-slate-700 focus:border-blue-400 transition"
                  placeholder="Enter campaign message. E.g.: Hey {Name}! We haven't seen you around lately. Here is a 10% coupon for coffee code COFFEE10!"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowCustomInput(false)}
                    className="rounded-xl border border-slate-200 hover:bg-slate-50 px-4 py-2 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCustomCampaign}
                    disabled={!customText.trim()}
                    className="rounded-xl bg-blue-600 text-white px-5 py-2 font-medium hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                  >
                    Save Draft
                  </button>
                </div>
              </div>
            )}

            {/* Thinking / Loader indicator */}
            {isThinking && (
              <div className="flex justify-start items-center gap-3 pl-4">
                <div className="flex space-x-1.5 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce" />
                </div>
                <span className="text-xs text-slate-400 font-medium">Xeno AI is planning...</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input box */}
      <PromptInput onSend={handleSendMessage} disabled={isThinking} />
    </div>
  );
}