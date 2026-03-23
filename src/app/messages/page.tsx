import TopAppBar from "@/components/TopAppBar";
import BottomNav from "@/components/BottomNav";

const conversations = [
  {
    id: 1,
    name: "Elena, Azure Marine",
    preview: "I've attached the final quote for the engine overhaul...",
    time: "2m ago",
    unread: true,
    active: true,
  },
  {
    id: 2,
    name: "Marcus - Dry Dock Services",
    preview: "The hull inspection is confirmed for Thursday morning.",
    time: "1h ago",
    unread: false,
    active: false,
  },
  {
    id: 3,
    name: "Concierge Team",
    preview: "Your requested transport has arrived at Port Hercules.",
    time: "3h ago",
    unread: false,
    active: false,
  },
];

const messages = [
  {
    id: 1,
    sender: "Elena",
    content:
      "Good morning Captain. I wanted to follow up on the engine overhaul discussion from yesterday.",
    time: "10:14 AM",
    incoming: true,
  },
  {
    id: 2,
    sender: "You",
    content:
      "Thanks Elena. Yes, we noticed the vibration issue has gotten worse since last week. Can you send over the diagnostic report?",
    time: "10:18 AM",
    incoming: false,
  },
  {
    id: 3,
    sender: "Elena",
    content:
      "Absolutely. I've run the full diagnostic and prepared a detailed quote. Let me attach it here.",
    time: "10:22 AM",
    incoming: true,
  },
  {
    id: 4,
    sender: "Elena",
    content: "",
    time: "10:23 AM",
    incoming: true,
    attachment: {
      name: "Engine_Overhaul_Quote_2024.pdf",
      size: "2.4 MB",
      type: "PDF",
    },
  },
];

export default function MessagesPage() {
  return (
    <>
      <TopAppBar />

      <main className="pt-16 pb-24 md:pb-0 flex flex-col md:flex-row h-[calc(100dvh-64px)]">
        {/* Conversation List - Sidebar */}
        <aside className="w-full md:w-80 lg:w-96 border-r border-outline-variant/10 bg-surface-container-low overflow-y-auto hidden md:block">
          <div className="p-6">
            <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold text-primary mb-4">
              Messages
            </h2>
            <div className="relative mb-4">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">
                search
              </span>
              <input
                className="w-full bg-surface-container-lowest pl-10 pr-4 py-3 rounded-xl text-sm border-none outline-none focus:ring-0"
                placeholder="Search conversations..."
              />
            </div>
          </div>
          <div className="space-y-1 px-2">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={`w-full p-4 rounded-xl flex gap-4 text-left transition-all ${
                  conv.active
                    ? "bg-surface-container-lowest shadow-sm"
                    : "hover:bg-surface-container-high"
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary text-sm">
                    person
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4
                      className={`text-sm truncate ${conv.unread ? "font-bold text-on-surface" : "font-medium text-on-surface"}`}
                    >
                      {conv.name}
                    </h4>
                    <span className="text-[10px] text-on-surface-variant uppercase font-bold shrink-0 ml-2">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant truncate">
                    {conv.preview}
                  </p>
                </div>
                {conv.unread && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Chat Thread */}
        <div className="flex-1 flex flex-col bg-surface">
          {/* Thread Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10 bg-surface-container-lowest">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-sm">
                  person
                </span>
              </div>
              <div>
                <h3 className="font-bold text-primary">Elena, Azure Marine</h3>
                <p className="text-xs text-on-surface-variant">
                  Project: Engine Overhaul &mdash; M/Y Serenity
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">
                  call
                </span>
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                <span className="material-symbols-outlined text-on-surface-variant">
                  more_vert
                </span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.incoming ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[75%] ${
                    msg.incoming
                      ? "bg-surface-container-low rounded-2xl rounded-tl-none"
                      : "bg-primary text-white rounded-2xl rounded-tr-none"
                  } px-5 py-4 shadow-sm`}
                >
                  {msg.content && (
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  )}
                  {msg.attachment && (
                    <div
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        msg.incoming
                          ? "bg-surface-container-lowest"
                          : "bg-primary-container"
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          msg.incoming
                            ? "bg-primary-container text-on-primary"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        <span className="material-symbols-outlined">
                          description
                        </span>
                      </div>
                      <div className="flex-1">
                        <p
                          className={`text-xs font-bold ${msg.incoming ? "text-primary" : "text-white"}`}
                        >
                          {msg.attachment.name}
                        </p>
                        <p
                          className={`text-[10px] ${msg.incoming ? "text-on-surface-variant" : "text-white/60"}`}
                        >
                          {msg.attachment.size} &bull; {msg.attachment.type}
                        </p>
                      </div>
                      <button
                        className={`text-xs font-bold px-3 py-1 rounded ${
                          msg.incoming
                            ? "bg-primary text-on-primary"
                            : "bg-white/20 text-white"
                        }`}
                      >
                        View
                      </button>
                    </div>
                  )}
                  <p
                    className={`text-[10px] mt-2 ${msg.incoming ? "text-outline" : "text-white/50"}`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-outline-variant/10 bg-surface-container-lowest">
            <div className="flex items-end gap-3">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">attach_file</span>
              </button>
              <div className="flex-1 bg-surface-container-low rounded-xl px-4 py-3">
                <textarea
                  className="w-full bg-transparent border-none focus:ring-0 text-sm resize-none outline-none"
                  placeholder="Type a message..."
                  rows={1}
                />
              </div>
              <button className="bg-primary text-on-primary w-10 h-10 rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  send
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Vessel Info Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-80 border-l border-outline-variant/10 bg-surface-container-low overflow-y-auto p-6">
          <h4 className="font-[family-name:var(--font-headline)] text-lg font-bold text-primary mb-4">
            Vessel Details
          </h4>
          <div className="space-y-4">
            <div className="aspect-video rounded-xl bg-primary-container/20" />
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                Vessel
              </p>
              <p className="font-bold text-primary">M/Y Serenity</p>
              <p className="text-sm text-on-surface-variant">
                42m Custom Displacement
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                Current Location
              </p>
              <p className="text-sm font-medium">
                Port Hercules, Monaco &mdash; Berth 14
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-2">
                Service History
              </p>
              <div className="space-y-2">
                <div className="bg-surface-container-lowest p-3 rounded-lg">
                  <p className="text-xs font-bold text-primary">
                    Generator Service
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    Jun 2024 &bull; Azure Marine
                  </p>
                </div>
                <div className="bg-surface-container-lowest p-3 rounded-lg">
                  <p className="text-xs font-bold text-primary">
                    Interior Detail
                  </p>
                  <p className="text-[10px] text-on-surface-variant">
                    May 2024 &bull; Riviera Detailing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <BottomNav />
    </>
  );
}
