import { useState } from "react";

interface PromptInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export default function PromptInput({ onSend, disabled }: PromptInputProps) {
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim() || disabled) return;
        onSend(input);
        setInput("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="sticky bottom-0 border-t border-slate-200 bg-white/90 backdrop-blur-md p-5">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-3 shadow-sm">

                    <input
                        placeholder={disabled ? "AI is thinking..." : "Ask XenoPulse anything..."}
                        className="flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 disabled:opacity-50"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={disabled}
                    />

                    <button
                        onClick={handleSend}
                        disabled={disabled || !input.trim()}
                        className="rounded-2xl bg-blue-600 px-5 py-2 text-white font-medium transition hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                    >
                        Send
                    </button>

                </div>
            </div>
        </div>
    );
}