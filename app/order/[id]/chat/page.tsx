"use client";

import { useState, useRef, useEffect, use } from "react";
import Link from "next/link";

interface Message {
  id: number;
  from: "freelancer" | "client" | "system";
  text?: string;
  file?: { name: string; size: string; type: string };
  time: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: "freelancer",
    text: "Halo! Revisi mockup logo tahap pertama sudah saya selesaikan. Saya menambahkan aksen warna 'Bright Orange' agar sesuai dengan konsep energi mahasiswa yang kita diskusikan kemarin.",
    time: "14:15",
  },
  {
    id: 2,
    from: "freelancer",
    file: { name: "EduTech_Identity_V2.pdf", size: "4.2 MB", type: "pdf" },
    time: "14:16",
  },
  {
    id: 3,
    from: "client",
    text: "Keren sekali hasilnya! Saya sangat suka penggunaan oranye-nya, terasa sangat vibrant. Bisa tolong cek kembali bagian tipografi pada tagline? Apakah bisa dibuat sedikit lebih tebal?",
    time: "14:18",
  },
  {
    id: 4,
    from: "freelancer",
    text: "Tentu, saya mengerti. Saya akan mencoba beberapa variasi weight untuk font Plus Jakarta Sans pada tagline tersebut agar terlihat lebih kokoh.",
    time: "14:20",
  },
  {
    id: 5,
    from: "system",
    text: "Freelancer baru saja menyelesaikan 75% milestone. Anda dapat memberikan feedback akhir sekarang.",
    time: "14:22",
  },
];

const conversations = [
  { id: 1, name: "Farhan Maulana", preview: "Revisi mockup logo sudah saya...", time: "14:20", active: true, online: true },
  { id: 2, name: "Siti Aminah", preview: "Tolong lampirkan invoice ya.", time: "Kemarin", active: false, online: false },
  { id: 3, name: "Budi Santoso", preview: "Ok, saya tunggu kabar baiknya.", time: "Senin", active: false, online: false },
];

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = inputText.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "client", text, time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setInputText("");
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#faf9fb" }}>
      {/* Top Nav */}
      <header className="h-16 flex items-center sticky top-0 z-50 shadow-sm" style={{ background: "#ffffff" }}>
        <div className="flex justify-between items-center w-full px-6 max-w-[1600px] mx-auto h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-[24px] font-bold" style={{ color: "#b90014", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              SkillRent
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/dashboard" className="text-[16px] leading-6 hover:text-[#b90014] transition-colors" style={{ color: "#5d3f3c" }}>Dashboard</Link>
              <Link href={`/order/${id}`} className="text-[16px] font-bold border-b-2 pb-0.5" style={{ color: "#b90014", borderBottomColor: "#b90014" }}>My Orders</Link>
              <Link href="#" className="text-[16px] leading-6 hover:text-[#b90014] transition-colors" style={{ color: "#5d3f3c" }}>Messages</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/notifications" className="material-symbols-outlined p-2 rounded-full hover:bg-[#efedf0] transition-colors" style={{ color: "#5d3f3c" }}>notifications</Link>
            <span className="material-symbols-outlined p-2" style={{ color: "#b90014" }}>chat</span>
            <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center" style={{ background: "#ffdad6" }}>
              <span className="material-symbols-outlined text-[24px]" style={{ color: "#b90014" }}>person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main flex row */}
      <main className="flex-1 flex overflow-hidden max-w-[1600px] mx-auto w-full">
        {/* Sidebar: Conversations List */}
        <aside className="w-80 h-full flex-col border-r hidden md:flex" style={{ background: "#f4f3f5", borderRightColor: "rgba(231,189,184,0.5)" }}>
          <div className="p-6">
            <h2 className="text-[24px] font-semibold mb-1" style={{ color: "#b90014", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Conversations</h2>
            <p className="text-[14px] font-semibold" style={{ color: "#5d3f3c" }}>Manage your chats</p>
            <button
              className="mt-4 w-full text-white py-2.5 rounded-lg text-[14px] font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90 active:translate-x-1"
              style={{ background: "#b90014" }}
            >
              <span className="material-symbols-outlined text-[18px]">add</span> New Message
            </button>
          </div>

          {/* Tabs */}
          <div className="px-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-4">
              <button className="px-3 py-1.5 rounded-lg text-[14px] font-semibold" style={{ background: "#ffdad6", color: "#b90014" }}>All Messages</button>
              <button className="px-3 py-1.5 rounded-lg text-[14px] font-semibold transition-colors hover:bg-[#e9e8ea]" style={{ color: "#5d3f3c" }}>Ongoing</button>
            </div>

            {conversations.map((conv) => (
              <div
                key={conv.id}
                className="p-3 rounded-lg flex gap-3 cursor-pointer transition-all"
                style={conv.active
                  ? { background: "#ffdad6", color: "#b90014" }
                  : { color: "#5d3f3c" }
                }
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center" style={{ background: conv.active ? "#b90014" : "#e9e8ea" }}>
                    <span className="material-symbols-outlined text-[24px]" style={{ color: conv.active ? "#ffffff" : "#5d3f3c" }}>person</span>
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2" style={{ background: "#1dbf73", borderColor: "#ffffff" }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <span className="text-[14px] font-semibold truncate">{conv.name}</span>
                    <span className="text-[10px] opacity-70 ml-1">{conv.time}</span>
                  </div>
                  <p className="text-[12px] font-medium truncate opacity-80">{conv.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Chat Window */}
        <section className="flex-1 flex flex-col" style={{ background: "#ffffff" }}>
          {/* Chat Header */}
          <header className="p-4 md:px-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ borderBottomColor: "rgba(231,189,184,0.3)" }}>
            <div className="flex items-center gap-4">
              <button className="md:hidden material-symbols-outlined">arrow_back</button>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-[14px] md:text-[16px] font-bold" style={{ color: "#1a1c1e" }}>
                    Desain Logo & Identitas Brand Startup EduTech
                  </h1>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1" style={{ background: "#ebf5ff", color: "#0057b9", borderColor: "rgba(0,87,185,0.1)" }}>
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[12px]" style={{ color: "#5d3f3c" }}>
                  <span>ID: <strong style={{ color: "#1a1c1e" }}>#SKL-88291</strong></span>
                  <span className="w-1 h-1 rounded-full" style={{ background: "#e3e2e4" }} />
                  <span>Status: <span className="font-bold" style={{ color: "#904d00" }}>Berjalan</span></span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/order/${id}`}
                className="px-4 py-2 text-[14px] font-semibold rounded-lg border transition-colors hover:bg-[#ffdad6]"
                style={{ color: "#b90014", borderColor: "rgba(185,0,20,0.2)" }}
              >
                Detail Pesanan
              </Link>
              <button className="px-4 py-2 text-[14px] font-semibold rounded-lg shadow-sm transition-colors hover:bg-[#40161c]" style={{ background: "#b90014", color: "#ffffff" }}>
                Selesaikan
              </button>
            </div>
          </header>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 custom-scrollbar" style={{ background: "rgba(250,249,251,0.5)" }}>
            {/* Timestamp */}
            <div className="flex justify-center">
              <span className="px-3 py-1 rounded-full text-[11px] font-medium" style={{ background: "#e9e8ea", color: "#5d3f3c" }}>Hari Ini</span>
            </div>

            {messages.map((msg) => {
              if (msg.from === "system") {
                return (
                  <div key={msg.id} className="flex justify-center my-4">
                    <div className="p-4 rounded-xl max-w-md w-full flex items-center gap-4" style={{ background: "rgba(235,245,255,0.6)", border: "1px solid rgba(173,199,255,0.3)" }}>
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(0,87,185,0.1)", color: "#0057b9" }}>
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                      </div>
                      <div>
                        <p className="text-[12px] font-bold" style={{ color: "#0057b9" }}>SkillRent AI Assistant</p>
                        <p className="text-[11px]" style={{ color: "#5d3f3c" }}>{msg.text}</p>
                      </div>
                    </div>
                  </div>
                );
              }

              const isClient = msg.from === "client";
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-3 max-w-[85%] md:max-w-[70%] ${isClient ? "flex-row-reverse ml-auto" : ""}`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center" style={{ background: isClient ? "#ffdad6" : "#e9e8ea" }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color: isClient ? "#b90014" : "#5d3f3c" }}>person</span>
                  </div>
                  <div className={`flex flex-col gap-1 ${isClient ? "items-end" : ""}`}>
                    {msg.text && (
                      <div
                        className="p-4 rounded-2xl shadow-sm"
                        style={{
                          background: isClient ? "#b90014" : "#ffffff",
                          color: isClient ? "#ffffff" : "#1a1c1e",
                          border: isClient ? "none" : "1px solid rgba(231,189,184,0.5)",
                          borderBottomLeftRadius: !isClient ? "2px" : undefined,
                          borderBottomRightRadius: isClient ? "2px" : undefined,
                        }}
                      >
                        <p className="text-[16px] leading-6">{msg.text}</p>
                      </div>
                    )}
                    {msg.file && (
                      <div
                        className="p-3 rounded-2xl shadow-sm flex items-center gap-3 cursor-pointer hover:border-[#b90014] transition-colors group"
                        style={{ background: "#ffffff", border: "1px solid rgba(231,189,184,0.5)", borderBottomLeftRadius: "2px", minWidth: "240px" }}
                      >
                        <div className="w-10 h-10 flex items-center justify-center rounded-lg group-hover:scale-105 transition-transform" style={{ background: "#ffdad6" }}>
                          <span className="material-symbols-outlined" style={{ color: "#b90014" }}>
                            {msg.file.type === "pdf" ? "description" : "image"}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-bold truncate" style={{ color: "#1a1c1e" }}>{msg.file.name}</p>
                          <p className="text-[11px]" style={{ color: "#5d3f3c" }}>{msg.file.size} • {msg.file.type.toUpperCase()} Document</p>
                        </div>
                        <button className="material-symbols-outlined transition-colors hover:text-[#b90014]" style={{ color: "#5d3f3c" }}>download</button>
                      </div>
                    )}
                    <span className={`text-[10px] ${isClient ? "mr-2" : "ml-2"}`} style={{ color: "#5d3f3c" }}>{msg.time}</span>
                  </div>
                </div>
              );
            })}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <footer className="p-4 md:p-6 border-t" style={{ background: "#ffffff", borderTopColor: "rgba(231,189,184,0.3)" }}>
            <div className="max-w-4xl mx-auto flex flex-col gap-3">
              {/* Quick actions */}
              <div className="flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
                {["Kirim Revisi", "Minta Pembayaran", "Perpanjang Deadline"].map((action) => (
                  <button
                    key={action}
                    className="text-[11px] font-bold border px-3 py-1 rounded-full whitespace-nowrap transition-all hover:border-[#b90014] hover:text-[#b90014]"
                    style={{ borderColor: "rgba(231,189,184,0.5)", color: "#5d3f3c" }}
                  >
                    {action}
                  </button>
                ))}
              </div>

              {/* Input cluster */}
              <div
                className="rounded-2xl p-1 shadow-sm focus-within:border-[#b90014] transition-all"
                style={{ background: "#ffffff", border: "2px solid rgba(231,189,184,0.5)" }}
              >
                <textarea
                  className="w-full border-none outline-none bg-transparent p-4 text-[16px] leading-6 resize-none"
                  placeholder="Ketik pesan Anda di sini untuk berkolaborasi..."
                  style={{ color: "#1a1c1e", minHeight: "80px", maxHeight: "160px" }}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                />
                <div className="flex items-center justify-between p-2 md:p-3 border-t" style={{ borderTopColor: "rgba(231,189,184,0.2)" }}>
                  <div className="flex items-center gap-1">
                    {["attach_file", "mood", "format_bold"].map((icon) => (
                      <button key={icon} className="material-symbols-outlined p-2 rounded-lg transition-all hover:text-[#b90014] hover:bg-[#ffdad6]" style={{ color: "#5d3f3c" }}>
                        {icon}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={sendMessage}
                    className="text-white px-6 py-2.5 rounded-xl text-[14px] font-semibold shadow-md transition-all active:scale-95 hover:bg-[#40161c] flex items-center gap-2"
                    style={{ background: "#b90014" }}
                  >
                    Kirim Pesan
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-center italic px-4" style={{ color: "rgba(93,63,60,0.5)" }}>
                Pesan Anda dipantau oleh sistem SkillRent untuk memastikan keamanan transaksi dan kolaborasi yang profesional.
              </p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
