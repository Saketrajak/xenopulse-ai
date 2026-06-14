interface Props {
    role: "user" | "assistant";
    text: string;
}

export default function MessageBubble({
    role,
    text,
}: Props) {
    const isUser = role === "user";

    return (
        <div
            className={`flex ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            <div
                className={`max-w-2xl rounded-3xl px-6 py-4 shadow-sm ${isUser
                        ? "bg-blue-100 text-slate-900"
                        : "bg-white border border-slate-200"
                    }`}
            >
                {!isUser && (
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Xeno AI
                    </div>
                )}

                <p className="leading-relaxed text-slate-700">
                    {text}
                </p>
            </div>
        </div>
    );
}