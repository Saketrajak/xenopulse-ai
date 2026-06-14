"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Megaphone, BarChart3 } from "lucide-react";

export default function Sidebar() {
    return (
        <aside className="w-80 border-r border-slate-200 bg-white/80 backdrop-blur-xl flex flex-col">
            {/* Logo */}
            <div className="p-6">
                <Image
                    src="/xeno-logo.png"
                    alt="XenoPulse"
                    width={180}
                    height={50}
                    priority
                    style={{
                        width: "auto",
                        height: "auto",
                    }}
                />

                <p className="mt-2 text-sm text-slate-500">
                    AI Marketing Copilot
                </p>
            </div>

            {/* Navigation */}
            <nav className="px-4 mt-6 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-slate-100 hover:translate-x-1"
                >
                    <Sparkles size={18} />
                    Workspace
                </Link>

                <Link
                    href="/campaigns"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-slate-100 hover:translate-x-1"
                >
                    <Megaphone size={18} />
                    Campaigns
                </Link>

                <Link
                    href="/analytics"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:bg-slate-100 hover:translate-x-1"
                >
                    <BarChart3 size={18} />
                    Analytics
                </Link>
            </nav>

            {/* AI Context */}
            <div className="px-4 mt-8">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="font-semibold text-lg mb-5">
                        AI Context
                    </h3>

                    <div className="space-y-5">
                        <div>
                            <p className="font-medium">
                                🎯 Goal
                            </p>

                            <p className="text-sm text-slate-500">
                                Bring back inactive customers
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">
                                📊 Insight
                            </p>

                            <p className="text-sm text-slate-500">
                                2,431 dormant customers identified
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">
                                ✨ Strategy
                            </p>

                            <p className="text-sm text-slate-500">
                                WhatsApp re-engagement campaign
                            </p>
                        </div>

                        <div>
                            <p className="font-medium">
                                💬 Campaign
                            </p>

                            <p className="text-sm text-slate-500">
                                Draft ready for review
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Status */}
            <div className="mt-auto p-6">
                <div className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

                        <span className="text-sm font-medium">
                            AI Connected
                        </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-500">
                        GPT Strategy Engine Active
                    </p>
                </div>
            </div>
        </aside>
    );
}