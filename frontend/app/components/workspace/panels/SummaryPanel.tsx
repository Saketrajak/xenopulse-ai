export default function SummaryPanel() {
    return (
        <aside className="w-[340px] shrink-0 border-l border-slate-200 bg-white p-6">
            <div className="sticky top-6">

                <h2 className="mb-8 text-2xl font-bold">
                    Conversation Summary
                </h2>

                <div className="space-y-5">

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold">
                            🎯 Goal
                        </h3>

                        <p className="text-sm text-slate-500">
                            Bring back inactive customers
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold">
                            📊 Insight
                        </h3>

                        <p className="text-sm text-slate-500">
                            2,431 dormant customers identified
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold">
                            ✨ Strategy
                        </h3>

                        <p className="text-sm text-slate-500">
                            WhatsApp re-engagement campaign
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold">
                            💬 Campaign
                        </h3>

                        <p className="text-sm text-slate-500">
                            Draft ready for review
                        </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="mb-1 font-semibold">
                            🚀 Results
                        </h3>

                        <p className="text-sm text-slate-500">
                            Pending launch
                        </p>
                    </div>

                </div>
            </div>
        </aside>
    );
}