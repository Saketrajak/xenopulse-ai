import { useState } from "react";

interface CampaignCardProps {
    data?: {
        campaign_draft: string;
        recommended_channel: string;
        campaign_type: string;
    };
    onLaunch: () => Promise<void>;
}

export default function CampaignCard({ data, onLaunch }: CampaignCardProps) {
    const [launched, setLaunched] = useState(false);
    const [loading, setLoading] = useState(false);

    if (!data) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl ml-16 animate-pulse space-y-4">
                <div className="h-6 w-32 bg-slate-200 rounded" />
                <div className="h-24 bg-slate-100 rounded-xl" />
            </div>
        );
    }

    const handleApprove = async () => {
        setLoading(true);
        try {
            await onLaunch();
            setLaunched(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl ml-16 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Campaign Copy Draft
                    </h3>
                    <p className="text-sm text-slate-500">
                        {data.campaign_type} ready for review
                    </p>
                </div>

                <span className={`rounded-full px-3 py-1 text-sm font-semibold ${launched ? "bg-green-100 text-green-700" : "bg-purple-100 text-purple-700"}`}>
                    {launched ? "Launched" : "Ready"}
                </span>
            </div>

            {/* Render the draft body text box */}
            <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 font-mono text-sm text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                {data.campaign_draft}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                        Channel Gateway
                    </p>
                    <p className="font-bold text-slate-800 capitalize">
                        {data.recommended_channel.toLowerCase()}
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                        Audience Target Reach
                    </p>
                    <p className="font-bold text-slate-800">
                        All Dormant Segment
                    </p>
                </div>
            </div>

            {!launched && (
                <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 transition shadow disabled:opacity-50 w-full cursor-pointer text-center"
                >
                    {loading ? "Launching Gateway..." : "Approve & Launch Campaign"}
                </button>
            )}
        </div>
    );
}