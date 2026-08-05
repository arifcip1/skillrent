import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import UniversityBadge from "@/components/UniversityBadge";

export const metadata: Metadata = {
  title: "Order Progress",
  description: "Pantau progress proyek dan kelola milestone escrow Anda.",
};

const milestones = [
  {
    step: 1,
    label: "Riset",
    status: "done",
    detail: "Selesai pada 24 Okt 2023",
    amount: "Rp 1.000.000",
    amountStatus: "Dana Telah Cair",
    amountColor: "#1dbf73",
  },
  {
    step: 2,
    label: "Draft",
    status: "active",
    detail: "Menunggu Persetujuan Klien",
    amount: "Rp 2.000.000",
    amountStatus: "Dana Tertahan di Escrow",
    amountColor: "#5d3f3c",
  },
  {
    step: 3,
    label: "Revisi",
    status: "pending",
    detail: "Tahap Berikutnya",
    amount: "Rp 1.000.000",
    amountStatus: "Belum Mulai",
    amountColor: "#5d3f3c",
  },
  {
    step: 4,
    label: "Final",
    status: "pending",
    detail: "Tahap Akhir",
    amount: "Rp 1.000.000",
    amountStatus: "Belum Mulai",
    amountColor: "#5d3f3c",
  },
];

export default async function OrderProgressPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const progressPercent = 45;

  return (
    <>
      <Navbar />
      <main
        className="max-w-[1280px] mx-auto px-6 py-8 md:py-12"
        style={{ opacity: 1 }}
      >
        {/* ── Project Header ── */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.05em]" style={{ color: "#b90014" }}>
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
              <span>Order ID: #SKL-88291-EDU</span>
            </div>
            <h1
              className="text-[32px] font-bold leading-10 max-w-3xl"
              style={{ color: "#40161c", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.01em" }}
            >
              Desain Logo & Identitas Brand Startup EduTech
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Freelancer chip */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm" style={{ background: "#ffffff", borderColor: "#e7bdb8" }}>
                <div className="w-6 h-6 rounded-full overflow-hidden" style={{ background: "#ffdad6" }}>
                  <span className="material-symbols-outlined text-[20px]" style={{ color: "#b90014" }}>person</span>
                </div>
                <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Aris Setiawan</span>
              </div>
              <UniversityBadge name="Universitas Indonesia" />
            </div>
          </div>
          <Link
            href={`/order/${id}/chat`}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border-2 text-[14px] font-semibold transition-colors hover:bg-[#f4f3f5]"
            style={{ borderColor: "#926e6b", color: "#1a1c1e" }}
          >
            <span className="material-symbols-outlined">chat</span>
            Hubungi Freelancer
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left: Progress ── */}
          <div className="lg:col-span-8 space-y-8">
            {/* Milestone Visual Tracker */}
            <section className="p-8 rounded-xl border shadow-sm overflow-hidden" style={{ background: "#ffffff", borderColor: "#e3e2e4" }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[24px] font-semibold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Progress Milestones
                </h2>
                <span className="px-3 py-1 rounded-full text-[12px] font-medium" style={{ background: "#fd8b00", color: "#603100" }}>
                  Active: Milestone 2
                </span>
              </div>

              {/* Horizontal Progress Track */}
              <div className="relative flex justify-between items-start mb-12">
                {/* Track background */}
                <div className="absolute top-5 left-0 w-full h-[3px] z-0" style={{ background: "#e9e8ea" }} />
                {/* Active fill */}
                <div className="absolute top-5 left-0 z-0 h-[3px]" style={{ width: `${progressPercent}%`, background: "#904d00" }} />

                {milestones.map((m, i) => {
                  const isDone = m.status === "done";
                  const isActive = m.status === "active";
                  return (
                    <div key={m.step} className="relative z-10 flex flex-col items-center text-center max-w-[120px]">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-md border-2"
                        style={{
                          background: isDone ? "#1dbf73" : isActive ? "#fd8b00" : "#e9e8ea",
                          color: isDone || isActive ? "#ffffff" : "#5d3f3c",
                          borderColor: "#ffffff",
                          boxShadow: isActive ? "0 0 0 4px rgba(253,139,0,0.2)" : undefined,
                        }}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isDone ? "check" : isActive ? "pending" : i === milestones.length - 1 ? "flag" : "schedule"}
                        </span>
                      </div>
                      <span className="text-[14px] font-semibold block mb-1" style={{ color: isActive || isDone ? "#1a1c1e" : "#5d3f3c" }}>
                        {m.label}
                      </span>
                      <span className="text-[12px] font-medium" style={{ color: isDone ? "#1dbf73" : isActive ? "#904d00" : "#5d3f3c" }}>
                        {isDone ? "Selesai" : isActive ? "Menunggu Approval" : "Belum Mulai"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Milestone Detail */}
              <div className="rounded-xl p-6 border-l-4" style={{ background: "#f4f3f5", borderLeftColor: "#fd8b00" }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-[18px] font-semibold mb-2" style={{ color: "#1a1c1e" }}>
                      Review Milestone 2: Draft Logo Identity
                    </h3>
                    <p className="text-[16px] leading-6 mb-4 max-w-xl" style={{ color: "#5d3f3c" }}>
                      Freelancer telah mengirimkan draft awal berupa 3 opsi konsep logo, palet warna primer, dan tipografi dasar.
                    </p>
                    {/* Files */}
                    <div className="flex flex-wrap gap-3">
                      {["Concept_Draft_v1.pdf", "Logo_Moodboard.jpg"].map((file) => (
                        <div
                          key={file}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-colors hover:border-[#b90014]"
                          style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
                        >
                          <span className="material-symbols-outlined" style={{ color: "#b90014" }}>
                            {file.endsWith(".pdf") ? "description" : "image"}
                          </span>
                          <span className="text-[13px] font-medium" style={{ color: "#1a1c1e" }}>{file}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <button
                      className="w-full text-white py-3 px-6 rounded-xl text-[14px] font-semibold shadow-lg transition-all active:scale-95"
                      style={{ background: "#b90014", boxShadow: "0 8px 20px rgba(185,0,20,0.2)" }}
                    >
                      Setujui Milestone
                    </button>
                    <button
                      className="w-full py-3 px-6 rounded-xl text-[14px] font-semibold border-2 transition-all active:scale-95 hover:bg-[#fff5f5]"
                      style={{ borderColor: "#b90014", color: "#b90014" }}
                    >
                      Minta Revisi
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Milestone History List */}
            <section className="space-y-4">
              <h3 className="text-[24px] font-semibold px-2" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Rincian Milestone
              </h3>
              <div className="space-y-3">
                {milestones.map((m) => {
                  const isDone = m.status === "done";
                  const isActive = m.status === "active";
                  return (
                    <div
                      key={m.step}
                      className="p-5 rounded-xl border flex items-center justify-between"
                      style={{
                        background: "#ffffff",
                        borderColor: isActive ? "#fd8b00" : "#e3e2e4",
                        borderWidth: isActive ? "2px" : "1px",
                        opacity: m.status === "pending" ? 0.5 : 1,
                        boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.06)" : undefined,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="material-symbols-outlined text-[28px]"
                          style={{
                            color: isDone ? "#1dbf73" : isActive ? "#fd8b00" : "#5d3f3c",
                            fontVariationSettings: isDone ? "'FILL' 1" : "'FILL' 0",
                          }}
                        >
                          {isDone ? "check_circle" : isActive ? "pending" : "circle"}
                        </span>
                        <div>
                          <p className="font-bold" style={{ color: "#1a1c1e" }}>Milestone {m.step}: {
                            m.step === 1 ? "Riset Kompetitor & User Persona" :
                            m.step === 2 ? "Draft Logo & Visual Direction" :
                            m.step === 3 ? "Sesi Revisi Utama" :
                            "Final Handover & Asset Delivery"
                          }</p>
                          <p className="text-[13px]" style={{ color: isActive ? "#904d00" : "#5d3f3c", fontWeight: isActive ? "600" : "400" }}>
                            {m.detail}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ color: "#40161c" }}>{m.amount}</p>
                        <p className="text-[12px] font-medium" style={{ color: m.amountColor }}>{m.amountStatus}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ── Right: Escrow Sidebar ── */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Escrow Card */}
            <div className="rounded-xl overflow-hidden shadow-xl" style={{ background: "#40161c", color: "#ffffff" }}>
              <div className="p-6" style={{ background: "linear-gradient(135deg, #40161c 0%, #63222b 100%)" }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Rincian Pembayaran
                  </h3>
                  <span className="material-symbols-outlined" style={{ color: "#ffb4ac" }}>verified_user</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Total Budget Proyek</span>
                    <span className="text-[18px] font-bold">Rp 5.000.000</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]" style={{ color: "#ffb77d" }}>lock</span>
                      <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Dana Escrow (Tertahan)</span>
                    </div>
                    <span className="font-semibold" style={{ color: "#ffb77d" }}>Rp 4.000.000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]" style={{ color: "#1dbf73" }}>account_balance_wallet</span>
                      <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Dana Sudah Cair</span>
                    </div>
                    <span className="font-semibold" style={{ color: "#1dbf73" }}>Rp 1.000.000</span>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-start gap-3" style={{ background: "rgba(255,255,255,0.07)" }}>
                <span className="material-symbols-outlined shrink-0" style={{ color: "#ffb4ac" }}>shield_with_heart</span>
                <p className="text-[12px] leading-relaxed" style={{ color: "#e3e2e4" }}>
                  Dana Anda aman di sistem SkillRent. Pembayaran hanya akan dicairkan ke freelancer setelah Anda menyetujui setiap milestone.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 rounded-xl border" style={{ background: "#ffffff", borderColor: "#e3e2e4" }}>
              <h4 className="text-[14px] font-semibold uppercase tracking-[0.05em] mb-4" style={{ color: "#5d3f3c" }}>
                Informasi Deadline
              </h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#efedf0", color: "#b90014" }}>
                    <span className="material-symbols-outlined">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-[12px]" style={{ color: "#5d3f3c" }}>Deadline Proyek</p>
                    <p className="font-bold" style={{ color: "#1a1c1e" }}>15 November 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "#efedf0", color: "#904d00" }}>
                    <span className="material-symbols-outlined">hourglass_top</span>
                  </div>
                  <div>
                    <p className="text-[12px]" style={{ color: "#5d3f3c" }}>Sisa Waktu</p>
                    <p className="font-bold" style={{ color: "#904d00" }}>12 Hari Lagi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dispute link */}
            <div className="text-center">
              <a href="#" className="text-[14px] font-semibold hover:underline inline-flex items-center gap-1" style={{ color: "#b90014" }}>
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                Butuh Bantuan Sengketa?
              </a>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
