import MessageBubble from "./MessageBubble";
import PromptInput from "./PromptInput";

import StrategyCard from "./cards/StrategyCard";
import CampaignCard from "./cards/CampaignCard";
import RetentionCard from "./cards/RetentionCard";

export default function ChatWindow() {
    return (
        <div className="flex flex-1 flex-col bg-slate-50 min-h-0">

            {/* Scrollable Chat Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-10">

                    {/* Hero Section */}
                    <div className="mb-10">
                        <h1 className="text-5xl font-bold tracking-tight">
                            Good Morning, Saket 👋
                        </h1>

                        <p className="mt-3 text-lg text-slate-500">
                            What would you like to achieve today?
                        </p>
                    </div>

                    {/* Goal Chips */}
                    <div className="flex flex-wrap gap-3 mb-12">
                        <button className="rounded-2xl border bg-white px-5 py-3 transition-all hover:-translate-y-1 hover:shadow-md">
                            Bring Back Inactive Customers
                        </button>

                        <button className="rounded-2xl border bg-white px-5 py-3 transition-all hover:-translate-y-1 hover:shadow-md">
                            Increase Repeat Purchases
                        </button>

                        <button className="rounded-2xl border bg-white px-5 py-3 transition-all hover:-translate-y-1 hover:shadow-md">
                            Reduce Customer Churn
                        </button>

                        <button className="rounded-2xl border bg-white px-5 py-3 transition-all hover:-translate-y-1 hover:shadow-md">
                            Boost WhatsApp Engagement
                        </button>
                    </div>

                    {/* Conversation */}
                    <div className="space-y-8">

                        <MessageBubble
                            role="user"
                            text="Bring back inactive customers"
                        />

                        <MessageBubble
                            role="assistant"
                            text="I've analyzed your customer data and found a high-value dormant customer segment."
                        />

                        <RetentionCard />

                        <MessageBubble
                            role="assistant"
                            text="Based on this insight, here's the best re-engagement strategy."
                        />

                        <StrategyCard />

                        <MessageBubble
                            role="assistant"
                            text="I've prepared a campaign draft ready for launch."
                        />

                        <CampaignCard />

                    </div>

                </div>
            </div>

            {/* Fixed Input Area */}
            <div className="border-t border-slate-200 bg-white">
                <PromptInput />
            </div>

        </div>
    );
}