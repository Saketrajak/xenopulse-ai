import { StrategyResponse } from "../../../lib/api";

export default function StrategyCard({ data }: { data?: StrategyResponse }) {
    if (!data) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl ml-16 animate-pulse space-y-4">
                <div className="h-6 w-40 bg-slate-200 rounded" />
                <div className="space-y-2">
                    <div className="h-12 bg-slate-100 rounded-xl" />
                    <div className="h-12 bg-slate-100 rounded-xl" />
                </div>
            </div>
        );
    }

    const { decision, action_plan } = data;

    // Get color theme based on channel
    const getChannelBadgeStyles = (channelName: string) => {
        const c = channelName.toUpperCase();
        if (c === "WHATSAPP") {
            return "bg-emerald-100 text-emerald-800 border-emerald-200";
        } else if (c === "SMS") {
            return "bg-blue-100 text-blue-800 border-blue-200";
        } else if (c === "EMAIL") {
            return "bg-amber-100 text-amber-800 border-amber-200";
        } else {
            return "bg-purple-100 text-purple-800 border-purple-200";
        }
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl ml-16 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Recommended Strategy
                    </h3>
                    <p className="text-sm text-slate-500">
                        AI-generated channel decision matrices
                    </p>
                </div>

                <span className={`rounded-full border px-3 py-1 text-sm font-medium ${getChannelBadgeStyles(decision.recommended_channel)}`}>
                    {decision.recommended_channel} Recommended
                </span>
            </div>

            <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <h4 className="font-semibold text-sm text-slate-700 mb-1">
                        Campaign Action Plan
                    </h4>
                    <p className="text-sm text-slate-600">
                        {decision.campaign_type} — {action_plan.objective}
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <h4 className="font-semibold text-sm text-slate-700 mb-1">
                        AI Channel Optimization Reasoning
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed italic">
                        "{action_plan.channel_reasoning}"
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                        <h4 className="font-semibold text-sm text-slate-700 mb-1">
                            Expected Outcome
                        </h4>
                        <p className="text-sm font-semibold text-green-600">
                            {action_plan.expected_impact} Business Impact
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                        <h4 className="font-semibold text-sm text-slate-700 mb-1">
                            Alternative Channels Checked
                        </h4>
                        <p className="text-sm text-slate-600 capitalize">
                            {decision.alternative_channels.join(", ")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}