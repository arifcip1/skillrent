"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import UniversityBadge from "@/components/UniversityBadge";

export default function WorkspacePage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "freelancer",
      text: "Hi there! I've just uploaded the updated UI mockups for the homepage. I've focused on the batik pattern integration we discussed.",
      time: "10:14 AM",
    },
    {
      id: 2,
      sender: "client",
      text: "Hasilnya luar biasa, Aditya! Motif batiknya terasa jauh lebih autentik sekarang. Saya akan review bersama tim dan mencairkan dana tahapan ini sore ini.",
      time: "10:45 AM",
    },
    {
      id: 3,
      sender: "file",
      file: { name: "Homepage_V2_Final.fig", size: "4.2 MB • Oct 23" },
      time: "11:02 AM",
    },
  ]);

  const [inputMsg, setInputMsg] = useState("");

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "client", text: inputMsg, time: "Just now" },
    ]);
    setInputMsg("");
  };

  return (
    <>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 min-h-screen">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[14px] mb-4" style={{ color: "#5d3f3c" }}>
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <span>/</span>
          <span className="font-semibold" style={{ color: "#b90014" }}>
            Active Project
          </span>
        </div>

        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1
              className="text-[32px] font-bold leading-[40px] mb-1"
              style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Redesign Website UMKM
            </h1>
            <p className="text-[14px]" style={{ color: "#5d3f3c" }}>
              Client: <strong style={{ color: "#1a1c1e" }}>Batik Nusantara Store</strong> • Project ID: SR-99201
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-5 py-2.5 rounded-xl border-2 font-semibold text-[14px] flex items-center gap-2 transition-colors hover:bg-[#f4f3f5]"
              style={{ borderColor: "#926e6b", color: "#1a1c1e" }}
            >
              <span className="material-symbols-outlined text-[18px]">description</span>
              View Contract
            </button>
            <button
              className="px-6 py-2.5 rounded-xl text-white font-semibold text-[14px] flex items-center gap-2 shadow-md transition-all active:scale-95 hover:opacity-90"
              style={{ background: "#fd8b00", color: "#603100" }}
            >
              <span className="material-symbols-outlined text-[18px]">payments</span>
              Release Funds
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Pelacak Tahapan & Info Freelancer */}
          <div className="lg:col-span-7 space-y-8">
            {/* Pelacak Tahapan */}
            <div className="p-6 md:p-8 rounded-2xl border bg-white shadow-sm" style={{ borderColor: "#e7bdb8" }}>
              <div className="flex items-center justify-between mb-8 pb-4 border-b" style={{ borderBottomColor: "#efedf0" }}>
                <h2
                  className="text-[20px] font-bold"
                  style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Pelacak Tahapan
                </h2>
                <div
                  className="px-3 py-1 rounded-full text-[12px] font-bold border flex items-center gap-1.5"
                  style={{ background: "#ebf5ff", color: "#0057b9", borderColor: "#adc7ff" }}
                >
                  <span className="material-symbols-outlined text-[14px]">shield</span>
                  Secure Escrow Active
                </div>
              </div>

              {/* Vertical Timeline */}
              <div className="space-y-6 relative pl-6 border-l-2" style={{ borderLeftColor: "#e9e8ea" }}>
                {/* Step 1: Released */}
                <div className="relative pl-6">
                  <div
                    className="absolute -left-[31px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center text-white"
                    style={{ background: "#1dbf73" }}
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                  <div className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: "#f4f3f5", borderColor: "#e3e2e4" }}>
                    <div>
                      <h4 className="font-bold text-[16px]" style={{ color: "#1a1c1e" }}>
                        Concept &amp; Wireframes
                      </h4>
                      <p className="text-[12px]" style={{ color: "#5d3f3c" }}>
                        Completed on Oct 12, 2024
                      </p>
                    </div>
                    <div className="text-right flex items-center justify-between sm:flex-col sm:items-end gap-1">
                      <span className="font-bold text-[16px]" style={{ color: "#1a1c1e" }}>
                        Rp 3.750.000
                      </span>
                      <span className="text-[12px] font-bold flex items-center gap-1" style={{ color: "#1dbf73" }}>
                        <span className="material-symbols-outlined text-[14px]">check_circle</span> Released
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Active */}
                <div className="relative pl-6">
                  <div
                    className="absolute -left-[31px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4"
                    style={{ background: "#0057b9", borderColor: "#ffffff" }}
                  />
                  <div
                    className="p-5 rounded-xl border-2 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    style={{ background: "#ffffff", borderColor: "#0057b9" }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-[16px]" style={{ color: "#1a1c1e" }}>
                          UI Design Development
                        </h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase" style={{ background: "#d8e2ff", color: "#0057b9" }}>
                          Active
                        </span>
                      </div>
                      <p className="text-[12px]" style={{ color: "#5d3f3c" }}>
                        Due Oct 25, 2024
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
                      <div className="text-right">
                        <span className="font-bold text-[16px] block" style={{ color: "#1a1c1e" }}>
                          Rp 6.750.000
                        </span>
                        <span className="text-[12px] font-bold flex items-center gap-1" style={{ color: "#0057b9" }}>
                          <span className="material-symbols-outlined text-[14px]">lock</span> Paid in Escrow
                        </span>
                      </div>
                      <button
                        className="px-4 py-2 text-white text-[13px] font-semibold rounded-lg shadow-sm active:scale-95 transition-all"
                        style={{ background: "#b90014" }}
                      >
                        Release Funds
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3: Pending */}
                <div className="relative pl-6 opacity-60">
                  <div
                    className="absolute -left-[31px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2"
                    style={{ background: "#e9e8ea", borderColor: "#ffffff" }}
                  />
                  <div className="p-5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4" style={{ background: "#f4f3f5", borderColor: "#e3e2e4" }}>
                    <div>
                      <h4 className="font-bold text-[16px]" style={{ color: "#1a1c1e" }}>
                        Final Handover &amp; QA
                      </h4>
                      <p className="text-[12px]" style={{ color: "#5d3f3c" }}>
                        Estimated Nov 05, 2024
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[16px] block" style={{ color: "#1a1c1e" }}>
                        Rp 4.500.000
                      </span>
                      <span className="text-[12px] font-medium" style={{ color: "#5d3f3c" }}>
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Freelancer Info Card */}
            <div
              className="p-6 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg"
              style={{ background: "#40161c" }}
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt="Arjun Prasetya"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-white/20"
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[20px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Arjun Prasetya
                    </h3>
                    <UniversityBadge name="Universitas Indonesia" />
                  </div>
                  <p className="text-[13px] opacity-80">
                    Product Design Major • 5.0 Star Freelancer • 14 Successful Projects
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 rounded-xl text-center border shrink-0" style={{ background: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.15)" }}>
                <span className="text-[24px] font-bold block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider opacity-70">Job Success</span>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Project Chat */}
          <aside className="lg:col-span-5">
            <div
              className="border rounded-2xl overflow-hidden shadow-sm flex flex-col bg-white"
              style={{ borderColor: "#e7bdb8", height: "640px" }}
            >
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between" style={{ borderBottomColor: "#efedf0" }}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                        alt="Arjun"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white" style={{ background: "#1dbf73" }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[15px]" style={{ color: "#1a1c1e" }}>
                      Arjun Prasetya
                    </h4>
                    <span className="text-[11px] text-[#1dbf73] font-medium">Online</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="material-symbols-outlined p-2 text-gray-500 hover:text-[#b90014]">
                    videocam
                  </button>
                  <button className="material-symbols-outlined p-2 text-gray-500 hover:text-[#b90014]">
                    more_vert
                  </button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: "rgba(250,249,251,0.5)" }}>
                {messages.map((m) => {
                  if (m.sender === "file" && m.file) {
                    return (
                      <div key={m.id} className="flex justify-start">
                        <div
                          className="p-3 rounded-2xl border shadow-sm flex items-center gap-3 bg-white max-w-[80%]"
                          style={{ borderColor: "#e7bdb8" }}
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "#ffdad6" }}>
                            <span className="material-symbols-outlined" style={{ color: "#b90014" }}>
                              image
                            </span>
                          </div>
                          <div>
                            <p className="text-[13px] font-bold" style={{ color: "#1a1c1e" }}>
                              {m.file.name}
                            </p>
                            <p className="text-[11px]" style={{ color: "#5d3f3c" }}>
                              {m.file.size}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  const isClient = m.sender === "client";
                  return (
                    <div key={m.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
                      <div
                        className="max-w-[80%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm"
                        style={{
                          background: isClient ? "#b90014" : "#f4f3f5",
                          color: isClient ? "#ffffff" : "#1a1c1e",
                          borderBottomRightRadius: isClient ? "2px" : undefined,
                          borderBottomLeftRadius: !isClient ? "2px" : undefined,
                        }}
                      >
                        <p>{m.text}</p>
                        <span className={`text-[10px] block mt-1 ${isClient ? "text-white/70 text-right" : "text-gray-400"}`}>
                          {m.time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t bg-white" style={{ borderTopColor: "#efedf0" }}>
                <div className="flex items-center gap-2">
                  <button className="material-symbols-outlined p-2 text-gray-400 hover:text-[#b90014]">
                    add_circle
                  </button>
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2.5 rounded-xl border text-[14px] outline-none"
                    style={{ borderColor: "#e7bdb8", background: "#faf9fb" }}
                  />
                  <button
                    onClick={handleSend}
                    className="w-10 h-10 rounded-xl text-white flex items-center justify-center active:scale-95 shadow-md"
                    style={{ background: "#b90014" }}
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
      <MobileBottomNav active="projects" />
    </>
  );
}
