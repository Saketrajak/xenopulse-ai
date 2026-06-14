export default function StrategyCard() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">
                        Recommended Strategy
                    </h3>

                    <p className="text-sm text-slate-500">
                        AI-generated action plan
                    </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    Highest Impact
                </span>
            </div>

            <div className="space-y-4">

                <div className="rounded-2xl bg-slate-50 p-4">
                    <h4 className="font-medium mb-1">
                        Campaign Type
                    </h4>

                    <p className="text-slate-600">
                        WhatsApp Re-engagement Flow
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                    <h4 className="font-medium mb-1">
                        Objective
                    </h4>

                    <p className="text-slate-600">
                        Recover dormant users with personalized offers
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                    <h4 className="font-medium mb-1">
                        Expected Outcome
                    </h4>

                    <p className="text-green-600 font-medium">
                        12.4% conversion predicted
                    </p>
                </div>

            </div>
        </div>
    );
}