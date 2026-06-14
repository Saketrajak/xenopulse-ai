import { AIContext } from "../../../page";

interface SummaryPanelProps {
    aiContext: AIContext;
}

export default function SummaryPanel({ aiContext }: SummaryPanelProps) {
    return (
        <aside className="w-[340px] shrink-0 border-l border-slate-200 bg-white p-6 hidden xl:block overflow-y-auto">
            <div className="sticky top-6">

                <h2 className="mb-8 text-2xl font-bold">
                    Conversation Summary
                </h2>

                <div className="space-y-5">

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold text-sm text-slate-700">
                            🎯 Goal
                        </h3>

                        <p className="text-sm text-slate-500 capitalize">
                            {aiContext.goal}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold text-sm text-slate-700">
                            📊 Insight
                        </h3>

                        <p className="text-sm text-slate-500">
                            {aiContext.insight}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold text-sm text-slate-700">
                            ✨ Strategy
                        </h3>

                        <p className="text-sm text-slate-500 capitalize">
                            {aiContext.strategy}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold text-sm text-slate-700">
                            💬 Campaign
                        </h3>

                        <p className="text-sm text-slate-500 capitalize">
                            {aiContext.campaign}
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold text-sm text-slate-700">
                            🚀 Results
                        </h3>

                        <p className="text-sm text-slate-500 capitalize">
                            {aiContext.results}
                        </p>
                    </div>

                </div>
            </div>
        </aside>
    );
}