import { useEffect, useState } from "react";

interface AudienceInsights {
    audience_size: number;
    avg_spend: number;
    total_revenue: number;
    high_value_customers: number;
    preferred_channel: string;
    top_city: string;
    top_category: string;
    avg_order_value: number;
}

export default function RetentionCard({ data }: { data?: any }) {
    const [insights, setInsights] = useState<AudienceInsights | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const response = await fetch("/api/audience/preview");
                if (response.ok) {
                    const json = await response.json();
                    setInsights(json);
                }
            } catch (err) {
                console.error("Error fetching audience insights:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    // Format revenue (e.g. 6250110 -> ₹62.5L)
    const formatRevenue = (value: number) => {
        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        }
        return `₹${value.toLocaleString("en-IN")}`;
    };

    if (loading) {
        return (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse space-y-4">
                <div className="h-6 w-48 bg-slate-200 rounded" />
                <div className="grid grid-cols-2 gap-4">
                    <div className="h-20 bg-slate-100 rounded-xl" />
                    <div className="h-20 bg-slate-100 rounded-xl" />
                </div>
            </div>
        );
    }

    // Fallbacks if backend doesn't have data
    const size = insights?.audience_size || 500;
    const revPotential = insights?.total_revenue || 625000;
    const preferredChannel = insights?.preferred_channel || "WhatsApp";
    const topCity = insights?.top_city || "New Delhi";
    const topCategory = insights?.top_category || "Coffee";
    const highValueCount = insights?.high_value_customers || 12;

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm max-w-2xl ml-16 space-y-5 animate-fade-in">
            <div>
                <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Target Segment Discovery
                </h3>
                <p className="text-sm text-slate-500">
                    High-value customers identified for retention opportunity
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-blue-50/50 border border-blue-100 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
                        Dormant Customers
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                        {size.toLocaleString()}
                    </p>
                </div>

                <div className="rounded-2xl bg-indigo-50/50 border border-indigo-100 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                        Revenue At Risk
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                        {formatRevenue(revPotential)}
                    </p>
                </div>

                <div className="rounded-2xl bg-violet-50/50 border border-violet-100 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-1">
                        High-Value Cohort
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                        {highValueCount} users
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Preferred Channel
                    </p>
                    <p className="text-lg font-bold text-slate-900 capitalize">
                        {preferredChannel}
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Top Market Hub
                    </p>
                    <p className="text-lg font-bold text-slate-900 truncate">
                        {topCity}
                    </p>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                        Top Category
                    </p>
                    <p className="text-lg font-bold text-slate-900 capitalize">
                        {topCategory}
                    </p>
                </div>
            </div>
        </div>
    );
}