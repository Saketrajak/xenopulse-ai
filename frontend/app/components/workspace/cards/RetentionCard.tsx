export default function RetentionCard() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
                Retention Opportunity
            </h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Dormant Customers
                    </p>

                    <p className="text-2xl font-bold">
                        2,431
                    </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">
                        Revenue Potential
                    </p>

                    <p className="text-2xl font-bold">
                        ₹18.7L
                    </p>
                </div>
            </div>
        </div>
    );
}