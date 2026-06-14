export default function PromptInput() {
    return (
        <div className="sticky bottom-0 border-t border-slate-200 bg-white/90 backdrop-blur-md p-5">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                    <input
                        placeholder="Ask XenoPulse anything..."
                        className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                    />

                    <button
                        className="rounded-2xl bg-blue-600 px-5 py-2 text-white font-medium transition hover:bg-blue-700"
                    >
                        Send
                    </button>

                </div>
            </div>
        </div>
    );
}