"use client";

import { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import UniversityBadge from "@/components/UniversityBadge";

const initialTahapan = [
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
    label: "Draft UI",
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
    label: "Final Handover",
    status: "pending",
    detail: "Tahap Akhir",
    amount: "Rp 1.000.000",
    amountStatus: "Belum Mulai",
    amountColor: "#5d3f3c",
  },
];

export default function OrderProgressPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [tahapanList, setTahapanList] = useState(initialTahapan);
  const [activeStep, setActiveStep] = useState(2);
  const [escrowStatus, setEscrowStatus] = useState<"active" | "completed">("active");
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const totalBudget = 5000000;
  const releasedAmount = tahapanList
    .filter((t) => t.status === "done")
    .reduce((acc, t) => acc + (t.step === 1 ? 1000000 : t.step === 2 ? 2000000 : 1000000), 0);
  const escrowLockedAmount = totalBudget - releasedAmount;

  const progressPercent = Math.round((releasedAmount / totalBudget) * 100);

  const handleApproveStage = () => {
    setTahapanList((prev) =>
      prev.map((t) => {
        if (t.step === activeStep) {
          return {
            ...t,
            status: "done",
            detail: "Disetujui baru saja",
            amountStatus: "Dana Telah Cair",
            amountColor: "#1dbf73",
          };
        }
        if (t.step === activeStep + 1) {
          return {
            ...t,
            status: "active",
            detail: "Menunggu Pengerjaan",
          };
        }
        return t;
      })
    );

    if (activeStep < 4) {
      setActiveStep((prev) => prev + 1);
      setToastMsg(`✅ Tahap ${activeStep} Berhasil Disetujui! Dana sebesar ${tahapanList[activeStep - 1].amount} telah dicairkan.`);
    } else {
      setEscrowStatus("completed");
      setToastMsg("🎉 SELAMAT! Seluruh Tahapan Selesai & Dana Escrow Telah Dicairkan 100%.");
    }

    setTimeout(() => setToastMsg(""), 4000);
  };

  const handleReleaseFullEscrow = () => {
    setTahapanList((prev) =>
      prev.map((t) => ({
        ...t,
        status: "done",
        detail: "Selesai & Dicairkan",
        amountStatus: "Dana Telah Cair",
        amountColor: "#1dbf73",
      }))
    );
    setEscrowStatus("completed");
    setToastMsg("🎉 PERSETUJUAN FINAL! Dana Escrow 100% Telah Berhasil Dicairkan ke Dompet Freelancer.");
    setTimeout(() => setToastMsg(""), 5000);
  };

  const handleSendRevision = () => {
    if (!revisionNote.trim()) return;
    setIsRevisionModalOpen(false);
    setToastMsg(`📩 Catatan revisi berhasil dikirim ke Freelancer: "${revisionNote}"`);
    setRevisionNote("");
    setTimeout(() => setToastMsg(""), 4000);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-12">
        {/* Toast Notifikasi */}
        {toastMsg && (
          <div className="fixed top-20 right-6 z-50 p-4 rounded-2xl text-white font-bold shadow-2xl animate-bounce max-w-md" style={{ background: "#1a1c1e", borderLeft: "6px solid #1dbf73" }}>
            {toastMsg}
          </div>
        )}

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
              Redesign Website UMKM &amp; E-Commerce Modern
            </h1>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Freelancer chip */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm" style={{ background: "#ffffff", borderColor: "#e7bdb8" }}>
                <div className="w-6 h-6 rounded-full overflow-hidden" style={{ background: "#ffdad6" }}>
                  <span className="material-symbols-outlined text-[20px]" style={{ color: "#b90014" }}>person</span>
                </div>
                <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Aditya Pratama</span>
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
            Buka Chat Proyek
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left: Progress ── */}
          <div className="lg:col-span-8 space-y-8">
            {/* Pelacak Visual Tahapan */}
            <section className="p-8 rounded-2xl border shadow-sm overflow-hidden" style={{ background: "#ffffff", borderColor: "#e3e2e4" }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[24px] font-semibold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Progress Tahapan Pekerjaan
                </h2>
                <span
                  className="px-3 py-1.5 rounded-full text-[12px] font-bold"
                  style={escrowStatus === "completed"
                    ? { background: "#d1e7dd", color: "#0f5132" }
                    : { background: "#fd8b00", color: "#603100" }
                  }
                >
                  {escrowStatus === "completed" ? "✅ Status: Proyek Selesai & Dana Cair" : `Sedang Berjalan: Tahap ${activeStep}`}
                </span>
              </div>

              {/* Horizontal Progress Track */}
              <div className="relative flex justify-between items-start mb-12">
                {/* Track background */}
                <div className="absolute top-5 left-0 w-full h-[3px] z-0" style={{ background: "#e9e8ea" }} />
                {/* Active fill */}
                <div className="absolute top-5 left-0 z-0 h-[3px] transition-all duration-500" style={{ width: `${progressPercent}%`, background: "#1dbf73" }} />

                {tahapanList.map((m, i) => {
                  const isDone = m.status === "done";
                  const isActive = m.status === "active";
                  return (
                    <div key={m.step} className="relative z-10 flex flex-col items-center text-center max-w-[120px]">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-md border-2 transition-all"
                        style={{
                          background: isDone ? "#1dbf73" : isActive ? "#fd8b00" : "#e9e8ea",
                          color: isDone || isActive ? "#ffffff" : "#5d3f3c",
                          borderColor: "#ffffff",
                          boxShadow: isActive ? "0 0 0 4px rgba(253,139,0,0.2)" : undefined,
                        }}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isDone ? "check" : isActive ? "pending" : i === tahapanList.length - 1 ? "flag" : "schedule"}
                        </span>
                      </div>
                      <span className="text-[14px] font-semibold block mb-1" style={{ color: isActive || isDone ? "#1a1c1e" : "#5d3f3c" }}>
                        {m.label}
                      </span>
                      <span className="text-[12px] font-medium" style={{ color: isDone ? "#1dbf73" : isActive ? "#904d00" : "#5d3f3c" }}>
                        {isDone ? "Selesai" : isActive ? "Review Klien" : "Belum Mulai"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Detail Tahapan Aktif */}
              {escrowStatus === "completed" ? (
                <div className="rounded-2xl p-6 border-l-4" style={{ background: "#e8f5e9", borderLeftColor: "#1dbf73" }}>
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-[36px]" style={{ color: "#1dbf73" }}>verified</span>
                    <div>
                      <h3 className="text-[18px] font-bold" style={{ color: "#1a1c1e" }}>Proyek Selesai &amp; Seluruh Dana Telah Dicairkan</h3>
                      <p className="text-[14px]" style={{ color: "#5d3f3c" }}>Terima kasih telah bertransaksi secara aman melalui SkillRent Escrow Protection!</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl p-6 border-l-4" style={{ background: "#f4f3f5", borderLeftColor: "#fd8b00" }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-[18px] font-semibold mb-2" style={{ color: "#1a1c1e" }}>
                        Review Tahap {activeStep}: {tahapanList[activeStep - 1]?.label}
                      </h3>
                      <p className="text-[14px] leading-6 mb-4 max-w-xl" style={{ color: "#5d3f3c" }}>
                        Freelancer (Aditya Pratama) telah mengirimkan hasil pengerjaan untuk Tahap {activeStep}. Silakan periksa berkas di bawah dan setujui untuk melepaskan dana.
                      </p>
                      {/* Files */}
                      <div className="flex flex-wrap gap-3">
                        {["UI_Wireframe_BatikStore.fig", "Mockup_Homepage_V2.pdf"].map((file) => (
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
                        onClick={handleApproveStage}
                        className="w-full text-white py-3 px-6 rounded-xl text-[14px] font-semibold shadow-lg transition-all active:scale-95 hover:opacity-90 flex items-center justify-center gap-2"
                        style={{ background: "#b90014", boxShadow: "0 8px 20px rgba(185,0,20,0.2)" }}
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Setujui Tahap {activeStep}
                      </button>
                      <button
                        onClick={() => setIsRevisionModalOpen(true)}
                        className="w-full py-3 px-6 rounded-xl text-[14px] font-semibold border-2 transition-all active:scale-95 hover:bg-[#fff5f5] flex items-center justify-center gap-2"
                        style={{ borderColor: "#b90014", color: "#b90014" }}
                      >
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                        Minta Revisi
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Riwayat Tahapan */}
            <section className="space-y-4">
              <h3 className="text-[24px] font-semibold px-2" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Rincian &amp; Riwayat Tahapan Pekerjaan
              </h3>
              <div className="space-y-3">
                {tahapanList.map((m) => {
                  const isDone = m.status === "done";
                  const isActive = m.status === "active";
                  return (
                    <div
                      key={m.step}
                      className="p-5 rounded-2xl border flex items-center justify-between transition-all"
                      style={{
                        background: "#ffffff",
                        borderColor: isActive ? "#fd8b00" : isDone ? "#1dbf73" : "#e3e2e4",
                        borderWidth: isActive || isDone ? "2px" : "1px",
                        opacity: m.status === "pending" ? 0.6 : 1,
                        boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.06)" : undefined,
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <span
                          className="material-symbols-outlined text-[28px]"
                          style={{
                            color: isDone ? "#1dbf73" : isActive ? "#fd8b00" : "#5d3f3c",
                          }}
                        >
                          {isDone ? "check_circle" : isActive ? "pending" : "circle"}
                        </span>
                        <div>
                          <p className="font-bold text-[16px]" style={{ color: "#1a1c1e" }}>
                            Tahap {m.step}: {m.label}
                          </p>
                          <p className="text-[13px]" style={{ color: isActive ? "#904d00" : "#5d3f3c" }}>
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
            <div className="rounded-2xl overflow-hidden shadow-xl border" style={{ background: "#40161c", color: "#ffffff", borderColor: "#e7bdb8" }}>
              <div className="p-6" style={{ background: "linear-gradient(135deg, #40161c 0%, #63222b 100%)" }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Perlindungan Escrow SkillRent
                  </h3>
                  <span className="material-symbols-outlined" style={{ color: "#ffb4ac" }}>verified_user</span>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Total Budget Proyek</span>
                    <span className="text-[18px] font-bold">Rp {totalBudget.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]" style={{ color: "#ffb77d" }}>lock</span>
                      <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Dana Escrow (Tertahan)</span>
                    </div>
                    <span className="font-semibold" style={{ color: "#ffb77d" }}>Rp {escrowLockedAmount.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]" style={{ color: "#1dbf73" }}>account_balance_wallet</span>
                      <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Dana Sudah Cair</span>
                    </div>
                    <span className="font-semibold" style={{ color: "#1dbf73" }}>Rp {releasedAmount.toLocaleString("id-ID")}</span>
                  </div>
                </div>

                {escrowStatus !== "completed" && (
                  <button
                    onClick={handleReleaseFullEscrow}
                    className="w-full mt-6 text-white py-3 rounded-xl text-[14px] font-semibold shadow-md transition-all active:scale-95 hover:opacity-90 flex items-center justify-center gap-2"
                    style={{ background: "#1dbf73" }}
                  >
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                    Cairkan Seluruh Dana Escrow
                  </button>
                )}
              </div>
              <div className="p-4 flex items-start gap-3" style={{ background: "rgba(255,255,255,0.07)" }}>
                <span className="material-symbols-outlined shrink-0" style={{ color: "#ffb4ac" }}>shield_with_heart</span>
                <p className="text-[12px] leading-relaxed" style={{ color: "#e3e2e4" }}>
                  Dana Anda 100% aman. Pembayaran hanya akan dicairkan ke dompet freelancer setelah Anda menyetujui setiap tahapan.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6 rounded-2xl border bg-white" style={{ borderColor: "#e3e2e4" }}>
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
                Butuh Bantuan Sengketa / Pusat Bantuan
              </a>
            </div>
          </aside>
        </div>
      </main>

      {/* ── Modal Minta Revisi ── */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border shadow-2xl" style={{ borderColor: "#e7bdb8" }}>
            <h3 className="text-[18px] font-bold" style={{ color: "#1a1c1e" }}>Minta Revisi Pekerjaan</h3>
            <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Tuliskan catatan detail mengenai bagian mana yang perlu diperbaiki oleh Freelancer.</p>
            <textarea
              value={revisionNote}
              onChange={(e) => setRevisionNote(e.target.value)}
              placeholder="Contoh: Tolong ganti warna font pada tombol header menjadi lebih terang..."
              rows={4}
              className="w-full p-3 text-[14px] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#b90014]"
              style={{ borderColor: "#e7bdb8" }}
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setIsRevisionModalOpen(false)}
                className="px-4 py-2 text-[14px] font-semibold rounded-xl border"
                style={{ borderColor: "#e7bdb8", color: "#5d3f3c" }}
              >
                Batal
              </button>
              <button
                onClick={handleSendRevision}
                className="px-5 py-2 text-[14px] font-semibold text-white rounded-xl"
                style={{ background: "#b90014" }}
              >
                Kirim Catatan Revisi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
