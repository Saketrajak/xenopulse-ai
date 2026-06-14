import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import ChatWindow from "./components/workspace/ChatWindow";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Fixed Header */}
        <Header />

        {/* Chat Area */}
        <div className="flex flex-1 overflow-hidden">
          <ChatWindow />
        </div>

      </div>

    </div>
  );
}