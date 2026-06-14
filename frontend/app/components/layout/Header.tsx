export default function Header() {
    return (
        <header className="border-b bg-white px-8 py-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-xl">
                        Workspace
                    </h2>

                    <p className="text-sm text-slate-500">
                        AI-powered customer engagement
                    </p>
                </div>

                <div className="h-10 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    S
                </div>
            </div>
        </header>
    );
}