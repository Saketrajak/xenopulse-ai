"use client";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function CampaignsPage() {
  const [aiContext] = useState({
    goal: "Not started",
    insight: "No data loaded",
    strategy: "None",
    campaign: "None",
    results: "None",
  });

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar aiContext={aiContext} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-10 max-w-5xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Campaign Manager
            </h1>
            <p className="text-slate-500 mt-2">
              Review and manage your omnichannel re-engagement campaigns
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col items-center justify-center text-center space-y-4 min-h-[350px]">
            <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-semibold text-slate-800">Your Campaigns</h2>
            <p className="text-slate-500 max-w-md">
              Start a discussion with Xeno AI in the Workspace to plan, approve, and execute new customer engagement activities.
            </p>
            <a
              href="/"
              className="rounded-2xl bg-blue-600 text-white font-medium px-5 py-2.5 transition shadow hover:bg-blue-700 inline-flex items-center gap-1.5 cursor-pointer"
            >
              Go to Workspace <ArrowUpRight size={16} />
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
