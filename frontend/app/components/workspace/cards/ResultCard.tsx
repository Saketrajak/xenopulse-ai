"use client";

import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { CampaignSummaryResponse, getCampaignSummary } from "../../../lib/api";
import { AIContext } from "../../../page";

interface ResultCardProps {
  campaignId: number;
  setAiContext: Dispatch<SetStateAction<AIContext>>;
}

export default function ResultCard({ campaignId, setAiContext }: ResultCardProps) {
  const [summaryData, setSummaryData] = useState<CampaignSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchSummary = async () => {
      try {
        const response = await getCampaignSummary(campaignId);
        setSummaryData(response);
        setLoading(false);

        if (response.metrics) {
          const { conversion_rate, converted, total } = response.metrics;
          // Update parent AI context with the latest results summary
          setAiContext((prev) => ({
            ...prev,
            results: `${conversion_rate}% Conv. (${converted}/${total})`,
          }));
        }
      } catch (err) {
        console.error("Error fetching campaign summary:", err);
      }
    };

    // Initial fetch
    fetchSummary();

    // Poll every 4 seconds (for up to 10 iterations to prevent infinite loops)
    intervalId = setInterval(() => {
      setPollCount((prev) => {
        if (prev >= 12) {
          clearInterval(intervalId);
          return prev;
        }
        fetchSummary();
        return prev + 1;
      });
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [campaignId, setAiContext]);

  if (loading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl ml-16 animate-pulse space-y-4">
        <div className="flex justify-between items-center">
          <div className="h-6 w-36 bg-slate-200 rounded" />
          <div className="h-6 w-20 bg-slate-200 rounded-full" />
        </div>
        <div className="space-y-2">
          <div className="h-20 bg-slate-100 rounded-xl" />
          <div className="h-24 bg-slate-100 rounded-xl" />
        </div>
      </div>
    );
  }

  const metrics = summaryData?.metrics;
  const summary = summaryData?.summary;
  const health = summaryData?.campaign_health || "GOOD";

  const getHealthBadgeStyles = (healthVal: string) => {
    switch (healthVal) {
      case "EXCELLENT":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "GOOD":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "NEEDS_IMPROVEMENT":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-rose-100 text-rose-800 border-rose-200";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl ml-16 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Campaign Analytics
            </h3>
            {pollCount < 12 && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">
            Real-time delivery & response tracking
          </p>
        </div>

        <span className={`rounded-full border px-3 py-1 text-sm font-semibold capitalize ${getHealthBadgeStyles(health)}`}>
          {health.toLowerCase().replace("_", " ")} Health
        </span>
      </div>

      {metrics && metrics.total > 0 ? (
        <div className="space-y-4">
          {/* Progress Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase">Total Sent</p>
              <p className="text-xl font-bold text-slate-800 mt-1">{metrics.total}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase">Delivered</p>
              <p className="text-xl font-bold text-slate-800 mt-1">{metrics.delivered}</p>
              <p className="text-[10px] text-slate-500">({metrics.delivery_rate}%)</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase">Opened</p>
              <p className="text-xl font-bold text-slate-800 mt-1">{metrics.opened}</p>
              <p className="text-[10px] text-slate-500">({metrics.open_rate}%)</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase">Clicked</p>
              <p className="text-xl font-bold text-slate-800 mt-1">{metrics.clicked}</p>
              <p className="text-[10px] text-slate-500">({metrics.click_rate}%)</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
              <p className="text-xs text-slate-400 font-semibold uppercase">Converted</p>
              <p className="text-xl font-bold text-slate-800 mt-1 text-emerald-600">{metrics.converted}</p>
              <p className="text-[10px] text-emerald-600 font-medium">({metrics.conversion_rate}%)</p>
            </div>
          </div>

          {/* Simple funnel progress visualization */}
          <div className="space-y-1.5 bg-slate-50/50 rounded-2xl border border-slate-100 p-4">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Funnel Progress</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-0.5">
                  <span>Delivery Success</span>
                  <span>{metrics.delivery_rate}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${metrics.delivery_rate}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-0.5">
                  <span>Conversion rate (from total target)</span>
                  <span>{metrics.conversion_rate}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${metrics.conversion_rate}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-700">
          No communication logs registered yet. Simulator callback pipeline connecting...
        </div>
      )}

      {/* AI Summary Section */}
      {summary ? (
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/20 p-5 space-y-3">
          <h4 className="font-semibold text-indigo-950 text-sm flex items-center gap-1.5">
            ✨ AI CRM Analyst Summary
          </h4>
          <div className="text-sm text-indigo-900/95 leading-relaxed whitespace-pre-line prose max-w-none">
            {summary}
          </div>
        </div>
      ) : (
        metrics && metrics.total > 0 && (
          <div className="flex justify-center items-center py-4 text-xs text-slate-400 font-medium animate-pulse">
            Waiting for AI strategist conversion analysis summary...
          </div>
        )
      )}
    </div>
  );
}
