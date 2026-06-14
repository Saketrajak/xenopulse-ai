export default function CampaignCard() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold">
                        Campaign Draft
                    </h3>

                    <p className="text-sm text-slate-500">
                        Ready for approval and launch
                    </p>
                </div>

                <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                    Ready
                </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Campaign
                    </p>

                    <p className="font-semibold">
                        We Miss You 💜
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Audience
                    </p>

                    <p className="font-semibold">
                        Dormant Customers
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Channel
                    </p>

                    <p className="font-semibold">
                        WhatsApp
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Reach
                    </p>

                    <p className="font-semibold">
                        2,431 Customers
                    </p>
                </div>

            </div>

            <button className="rounded-2xl bg-blue-600 px-6 py-3 text-white font-medium transition hover:bg-blue-700">
                Approve & Launch
            </button>
        </div>
    );
}