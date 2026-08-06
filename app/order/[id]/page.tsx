"use client";

import { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import UniversityBadge from "@/components/UniversityBadge";

type OrderStatus =
  | "pending_requirement"
  | "in_progress"
  | "in_review"
  | "in_revision"
  | "completed"
  | "disputed"
  | "cancelled";

interface EscrowTx {
  id: string;
  milestone_step: number;
  gross_amount: number;
  platform_fee_percent: number;
  platform_fee_amount: number;
  net_freelancer_amount: number;
  status: "locked" | "released" | "disputed_held" | "refunded";
  auto_approved: boolean;
  released_at?: string;
}

const initialTahapan = [
  {
    step: 1,
    label: "Riset Kompetitor & Briefing",
    grossAmount: 1250000,
    status: "done",
    detail: "Selesai pada 24 Okt 2023",
  },
  {
    step: 2,
    label: "Draft UI & Layout Design",
    grossAmount: 1250000,
    status: "active",
    detail: "Menunggu Persetujuan Klien",
  },
  {
    step: 3,
    label: "Pengembangan Frontend Next.js",
    grossAmount: 1250000,
    status: "pending",
    detail: "Tahap Berikutnya",
  },
  {
    step: 4,
    label: "Final Handover & Deploy",
    grossAmount: 1250000,
    status: "pending",
    detail: "Tahap Akhir",
  },
];

const initialTransactions: EscrowTx[] = [
  {
    id: "tx-1",
    milestone_step: 1,
    gross_amount: 1250000,
    platform_fee_percent: 15.0,
    platform_fee_amount: 187500,
    net_freelancer_amount: 1062500,
    status: "released",
    auto_approved: false,
    released_at: "24 Oct 2023, 14:30",
  },
];

export default function OrderProgressPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Core Order State
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("in_review");
  const [currentStep, setCurrentStep] = useState(2);
  const [isFirstOrderBetweenPair] = useState(true); // 15% for 1st order, 10% for repeat

  // Requirement State
  const [reqNotes, setReqNotes] = useState("Tolong buatkan tema batik modern dengan aksen warna Marun & Emas.");
  const [reqAssets, setReqAssets] = useState(["Logo_BatikNusantara.svg", "Panduan_Warna_Brand.pdf"]);
  const [newAssetInput, setNewAssetInput] = useState("");

  // Revisions & Disputes State
  const [tahapanList, setTahapanList] = useState(initialTahapan);
  const [transactions, setTransactions] = useState<EscrowTx[]>(initialTransactions);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionNote, setRevisionNote] = useState("");

  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");

  const [toastMsg, setToastMsg] = useState("");

  const totalBudget = 5000000;

  // On-the-Fly Freelancer Balance Calculation: SUM(net_freelancer_amount) WHERE status = 'released'
  const freelancerBalanceOnTheFly = transactions
    .filter((tx) => tx.status === "released")
    .reduce((sum, tx) => sum + tx.net_freelancer_amount, 0);

  const totalGrossReleased = transactions
    .filter((tx) => tx.status === "released")
    .reduce((sum, tx) => sum + tx.gross_amount, 0);

  const escrowLockedAmount = totalBudget - totalGrossReleased;
  const progressPercent = Math.round((totalGrossReleased / totalBudget) * 100);

  // Fee percentage for current step
  const activeFeePercent = isFirstOrderBetweenPair ? 15.0 : 10.0;

  // Submit Requirement Form (Move from pending_requirement -> in_progress)
  const handleSubmitRequirement = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus("in_progress");
    setToastMsg("✅ Form Detail Kebutuhan berhasil dikirim! Freelancer kini mulai mengerjakan Tahap 1.");
    setTimeout(() => setToastMsg(""), 4000);
  };

  // Approve Milestone & Release Partial Funds
  const handleApproveCurrentStage = () => {
    if (orderStatus === "disputed") return;

    const stepInfo = tahapanList[currentStep - 1];
    const grossAmt = stepInfo.grossAmount;
    const feeAmt = Math.round((grossAmt * activeFeePercent) / 100);
    const netAmt = grossAmt - feeAmt;

    const newTx: EscrowTx = {
      id: `tx-${Date.now()}`,
      milestone_step: currentStep,
      gross_amount: grossAmt,
      platform_fee_percent: activeFeePercent,
      platform_fee_amount: feeAmt,
      net_freelancer_amount: netAmt,
      status: "released",
      auto_approved: false,
      released_at: "Baru saja",
    };

    setTransactions((prev) => [...prev, newTx]);

    setTahapanList((prev) =>
      prev.map((t) => {
        if (t.step === currentStep) {
          return { ...t, status: "done", detail: "Disetujui Baru Saja" };
        }
        if (t.step === currentStep + 1) {
          return { ...t, status: "active", detail: "Sedang Dikerjakan" };
        }
        return t;
      })
    );

    if (currentStep < 4) {
      const nextS = currentStep + 1;
      setCurrentStep(nextS);
      setOrderStatus("in_progress");
      setToastMsg(`✅ Tahap ${currentStep} Disetujui! Dana parsial Rp ${netAmt.toLocaleString("id-ID")} (setelah dipotong komisi ${activeFeePercent}%) telah cair ke dompet Freelancer.`);
    } else {
      setOrderStatus("completed");
      setToastMsg("🎉 SELAMAT! Seluruh Tahapan Selesai & Dana Escrow 100% Telah Dicairkan.");
    }

    setTimeout(() => setToastMsg(""), 5000);
  };

  // Request Revision (Move from in_review -> in_revision)
  const handleSendRevision = () => {
    if (!revisionNote.trim()) return;
    setIsRevisionModalOpen(false);
    setOrderStatus("in_revision");
    setTahapanList((prev) =>
      prev.map((t) => (t.step === currentStep ? { ...t, status: "active", detail: `Revisi Diminta: "${revisionNote}"` } : t))
    );
    setToastMsg(`📩 Catatan revisi dikirim! Status berubah menjadi 'in_revision'.`);
    setRevisionNote("");
    setTimeout(() => setToastMsg(""), 4000);
  };

  // Freelancer Re-submits Work (Move from in_revision -> in_review)
  const handleFreelancerResubmit = () => {
    setOrderStatus("in_review");
    setTahapanList((prev) =>
      prev.map((t) => (t.step === currentStep ? { ...t, status: "active", detail: "Hasil Revisi Di-upload - Menunggu Review Klien" } : t))
    );
    setToastMsg("📤 Perbaikan revisi berhasil di-submit! Status kembali ke 'in_review'.");
    setTimeout(() => setToastMsg(""), 4000);
  };

  // Submit Dispute (Move status -> disputed & Lock Escrow)
  const handleOpenDispute = () => {
    if (!disputeReason.trim()) return;
    setIsDisputeModalOpen(false);
    setOrderStatus("disputed");
    setToastMsg("⚠️ Sengketa diajukan! Seluruh pencairan dana Escrow dikunci sampai ditangani Admin.");
    setDisputeReason("");
    setTimeout(() => setToastMsg(""), 5000);
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
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider text-white" style={{ background: "#b90014" }}>
                Order ID: #SKL-88291-EDU
              </span>
              {/* Dynamic Order Status Badge */}
              <span
                className="text-[12px] font-bold px-3 py-1 rounded-full capitalize"
                style={
                  orderStatus === "completed"
                    ? { background: "#d1e7dd", color: "#0f5132" }
                    : orderStatus === "disputed"
                    ? { background: "#f8d7da", color: "#842029" }
                    : orderStatus === "in_revision"
                    ? { background: "#fff3cd", color: "#664d03" }
                    : orderStatus === "pending_requirement"
                    ? { background: "#cff4fc", color: "#055160" }
                    : { background: "#ebf5ff", color: "#0057b9" }
                }
              >
                Status: {orderStatus.replace("_", " ")}
              </span>
            </div>

            <h1
              className="text-[32px] font-bold leading-tight max-w-3xl"
              style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Redesign Website UMKM &amp; E-Commerce Modern
            </h1>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm bg-white" style={{ borderColor: "#e7bdb8" }}>
                <span className="material-symbols-outlined text-[18px]" style={{ color: "#b90014" }}>person</span>
                <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Aditya Pratama</span>
              </div>
              <UniversityBadge name="Universitas Indonesia" />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`/order/${id}/chat`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-[14px] font-semibold transition-all hover:bg-gray-50"
              style={{ borderColor: "#926e6b", color: "#1a1c1e" }}
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Chat Proyek
            </Link>

            {orderStatus !== "disputed" && orderStatus !== "completed" && (
              <button
                onClick={() => setIsDisputeModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 text-[13px] font-semibold transition-all hover:bg-red-50"
                style={{ borderColor: "#b90014", color: "#b90014" }}
              >
                <span className="material-symbols-outlined text-[18px]">report_problem</span>
                Ajukan Sengketa
              </button>
            )}
          </div>
        </div>

        {/* Alert Banner Sengketa / Disputed */}
        {orderStatus === "disputed" && (
          <div className="mb-8 p-6 rounded-2xl border-2 flex items-start gap-4" style={{ background: "#fdf2f2", borderColor: "#b90014" }}>
            <span className="material-symbols-outlined text-[36px]" style={{ color: "#b90014" }}>gavel</span>
            <div>
              <h3 className="text-[18px] font-bold" style={{ color: "#b90014" }}>Status Proyek: Sengketa (Disputed)</h3>
              <p className="text-[14px] mt-1" style={{ color: "#5d3f3c" }}>
                Seluruh tombol pencairan dana Escrow dan perubahan status <strong>dikunci sementara</strong>. Tim Admin SkillRent sedang meninjau keluhan dan akan menghubungi Klien &amp; Freelancer.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Order Flow & Milestones ── */}
          <div className="lg:col-span-8 space-y-8">
            {/* ── PHASE 1: FORM REQUIREMENT (If pending_requirement) ── */}
            {orderStatus === "pending_requirement" && (
              <section className="p-8 rounded-2xl border bg-white shadow-sm space-y-6" style={{ borderColor: "#e7bdb8" }}>
                <div className="flex items-center gap-3 pb-4 border-b" style={{ borderBottomColor: "#efedf0" }}>
                  <div className="p-3 rounded-2xl" style={{ background: "#cff4fc", color: "#055160" }}>
                    <span className="material-symbols-outlined text-[24px]">assignment</span>
                  </div>
                  <div>
                    <h2 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Form Detail Kebutuhan Proyek (Requirement)</h2>
                    <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Isi detail kebutuhan Anda agar Freelancer dapat memulai Tahap 1.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmitRequirement} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Instruksi &amp; Kebutuhan Khusus</label>
                    <textarea
                      rows={3}
                      value={reqNotes}
                      onChange={(e) => setReqNotes(e.target.value)}
                      placeholder="Jelaskan kebutuhan warna, gaya desain, atau target pengguna..."
                      className="w-full p-3 text-[14px] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#b90014]"
                      style={{ borderColor: "#e7bdb8" }}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Aset Pendukung (Logo, Dokumen, Gambar)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newAssetInput}
                        onChange={(e) => setNewAssetInput(e.target.value)}
                        placeholder="Nama file / Link Google Drive..."
                        className="flex-1 p-3 text-[14px] rounded-xl border focus:outline-none"
                        style={{ borderColor: "#e7bdb8" }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newAssetInput.trim()) {
                            setReqAssets([...reqAssets, newAssetInput.trim()]);
                            setNewAssetInput("");
                          }
                        }}
                        className="px-4 py-3 text-[14px] font-semibold rounded-xl text-white"
                        style={{ background: "#1a1c1e" }}
                      >
                        + Tambah
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {reqAssets.map((asset, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg border text-[13px] flex items-center gap-2 bg-gray-50" style={{ borderColor: "#e7bdb8" }}>
                          <span className="material-symbols-outlined text-[16px]" style={{ color: "#b90014" }}>attach_file</span>
                          {asset}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 text-white font-bold text-[16px] rounded-xl transition-all hover:opacity-90 active:scale-95 shadow-lg"
                    style={{ background: "#b90014" }}
                  >
                    Kirim Kebutuhan &amp; Mulai Pengerjaan (Tahap 1)
                  </button>
                </form>
              </section>
            )}

            {/* ── PHASE 2: MILESTONE TRACKER & ACTIONS ── */}
            <section className="p-8 rounded-2xl border shadow-sm bg-white overflow-hidden space-y-8" style={{ borderColor: "#e3e2e4" }}>
              <div className="flex items-center justify-between border-b pb-4" style={{ borderBottomColor: "#efedf0" }}>
                <h2 className="text-[22px] font-bold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Pelacak Tahapan Pekerjaan
                </h2>
                <span className="text-[13px] font-bold px-3 py-1 rounded-full" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                  {progressPercent}% Selesai
                </span>
              </div>

              {/* Progress Track Bar */}
              <div className="relative flex justify-between items-start mb-4">
                <div className="absolute top-5 left-0 w-full h-[3px] z-0" style={{ background: "#e9e8ea" }} />
                <div className="absolute top-5 left-0 z-0 h-[3px] transition-all duration-500" style={{ width: `${progressPercent}%`, background: "#1dbf73" }} />

                {tahapanList.map((m, i) => {
                  const isDone = m.status === "done";
                  const isActive = m.step === currentStep;
                  return (
                    <div key={m.step} className="relative z-10 flex flex-col items-center text-center max-w-[120px]">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-md border-2 transition-all"
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
                      <span className="text-[13px] font-bold block mb-0.5" style={{ color: isActive || isDone ? "#1a1c1e" : "#5d3f3c" }}>
                        Tahap {m.step}
                      </span>
                      <span className="text-[11px] font-medium" style={{ color: isDone ? "#1dbf73" : isActive ? "#904d00" : "#5d3f3c" }}>
                        {isDone ? "Cair" : isActive ? orderStatus.replace("_", " ") : "Belum"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Active Milestone Card Actions */}
              {orderStatus === "in_review" && (
                <div className="p-6 rounded-2xl border-l-4 space-y-4" style={{ background: "#f4f3f5", borderLeftColor: "#fd8b00" }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[18px] font-bold" style={{ color: "#1a1c1e" }}>
                        Review Tahap {currentStep}: {tahapanList[currentStep - 1]?.label}
                      </h3>
                      <p className="text-[14px] mt-1" style={{ color: "#5d3f3c" }}>
                        Freelancer telah mengirimkan draft pengerjaan Tahap {currentStep}. Nilai tahap ini adalah <strong>Rp {tahapanList[currentStep - 1]?.grossAmount.toLocaleString("id-ID")}</strong>.
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[12px] font-medium text-blue-700 bg-blue-50 p-2.5 rounded-xl border border-blue-200">
                        <span className="material-symbols-outlined text-[18px]">info</span>
                        <span>
                          Jika disetujui, dipotong komisi platform <strong>{activeFeePercent}%</strong> (Rp {Math.round((tahapanList[currentStep - 1]?.grossAmount * activeFeePercent) / 100).toLocaleString("id-ID")}), dan Rp {Math.round((tahapanList[currentStep - 1]?.grossAmount * (100 - activeFeePercent)) / 100).toLocaleString("id-ID")} langsung cair parsial ke Freelancer.
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px] shrink-0">
                      <button
                        onClick={handleApproveCurrentStage}
                        className="w-full py-3.5 px-6 rounded-xl text-white font-bold text-[14px] shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                        style={{ background: "#b90014" }}
                      >
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Setujui &amp; Cairkan Tahap {currentStep}
                      </button>

                      <button
                        onClick={() => setIsRevisionModalOpen(true)}
                        className="w-full py-3 px-6 rounded-xl font-bold text-[14px] border-2 transition-all active:scale-95 hover:bg-red-50 flex items-center justify-center gap-2"
                        style={{ borderColor: "#b90014", color: "#b90014" }}
                      >
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                        Minta Revisi
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Status in_revision Action */}
              {orderStatus === "in_revision" && (
                <div className="p-6 rounded-2xl border-l-4 space-y-4" style={{ background: "#fff9e6", borderLeftColor: "#ffc107" }}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[18px] font-bold text-yellow-900">Dalam Tahap Revisi (in_revision)</h3>
                      <p className="text-[14px] mt-1 text-yellow-800">
                        Freelancer sedang memperbarui hasil pengerjaan Tahap {currentStep} sesuai catatan revisi Klien.
                      </p>
                    </div>
                    <button
                      onClick={handleFreelancerResubmit}
                      className="py-3 px-6 rounded-xl bg-yellow-600 text-white font-bold text-[14px] transition-all hover:bg-yellow-700 shrink-0"
                    >
                      Simulasi Freelancer Submit Revisi
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* ── HISTORI TRANSAKSI ESCROW PARSIAL (public.escrow_transactions) ── */}
            <section className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Histori Transaksi Escrow Parsial (`escrow_transactions`)
                </h3>
                <span className="text-[12px] font-semibold text-gray-500">RLS Policy Active</span>
              </div>

              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-5 rounded-2xl border bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm" style={{ borderColor: "#e7bdb8" }}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[16px]" style={{ color: "#1a1c1e" }}>Tahap {tx.milestone_step} - Escrow Released</span>
                        {tx.auto_approved && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-700">Auto 3 Hari</span>
                        )}
                      </div>
                      <p className="text-[13px]" style={{ color: "#5d3f3c" }}>
                        Gross: <strong>Rp {tx.gross_amount.toLocaleString("id-ID")}</strong> • Fee ({tx.platform_fee_percent}%): <span className="text-red-600">-Rp {tx.platform_fee_amount.toLocaleString("id-ID")}</span>
                      </p>
                      <p className="text-[12px] text-gray-400">Dicairkan: {tx.released_at}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[16px] font-bold" style={{ color: "#1dbf73" }}>
                        +Rp {tx.net_freelancer_amount.toLocaleString("id-ID")}
                      </span>
                      <p className="text-[12px] font-semibold text-emerald-700">Masuk Dompet Freelancer</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right Column: Escrow & Balance Sidebar ── */}
          <aside className="lg:col-span-4 space-y-6">
            {/* On-The-Fly Freelancer Balance Card */}
            <div className="p-6 rounded-2xl border bg-white shadow-md space-y-4" style={{ borderColor: "#e7bdb8" }}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-500">Saldo Freelancer (On-The-Fly)</p>
                  <h3 className="text-[28px] font-bold mt-1" style={{ color: "#1a1c1e" }}>
                    Rp {freelancerBalanceOnTheFly.toLocaleString("id-ID")}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl" style={{ background: "#d1e7dd", color: "#0f5132" }}>
                  <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                </div>
              </div>
              <p className="text-[12px] text-gray-500 border-t pt-3" style={{ borderTopColor: "#efedf0" }}>
                Kalkulasi otomatis: <code className="bg-gray-100 px-1 py-0.5 rounded text-[11px]">SUM(net_freelancer_amount)</code> status = &apos;released&apos;
              </p>
            </div>

            {/* Escrow Protection Details */}
            <div className="rounded-2xl overflow-hidden shadow-xl border" style={{ background: "#40161c", color: "#ffffff", borderColor: "#e7bdb8" }}>
              <div className="p-6" style={{ background: "linear-gradient(135deg, #40161c 0%, #63222b 100%)" }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[18px] font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Perlindungan Escrow
                  </h3>
                  <span className="material-symbols-outlined" style={{ color: "#ffb4ac" }}>verified_user</span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Total Budget</span>
                    <span className="text-[16px] font-bold">Rp {totalBudget.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Dana Tertahan</span>
                    <span className="font-semibold text-amber-300">Rp {escrowLockedAmount.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[14px]" style={{ color: "#e3e2e4" }}>Komisi Platform</span>
                    <span className="font-semibold text-blue-300">{activeFeePercent}% ({isFirstOrderBetweenPair ? "Order Pertama" : "Repeat Order"})</span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-start gap-3 bg-white/5">
                <span className="material-symbols-outlined shrink-0" style={{ color: "#ffb4ac" }}>timer</span>
                <p className="text-[12px] leading-relaxed" style={{ color: "#e3e2e4" }}>
                  <strong>Auto-Approve 3 Hari:</strong> Jika Klien tidak merespons dalam 72 jam, Vercel Cron Job otomatis menyetujui &amp; mencairkan dana tahapan.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ── Modal Minta Revisi ── */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(3px)" }}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border shadow-2xl" style={{ borderColor: "#e7bdb8" }}>
            <h3 className="text-[18px] font-bold" style={{ color: "#1a1c1e" }}>Minta Revisi Tahap {currentStep}</h3>
            <textarea
              value={revisionNote}
              onChange={(e) => setRevisionNote(e.target.value)}
              placeholder="Tuliskan catatan revisi detail untuk Freelancer..."
              rows={4}
              className="w-full p-3 text-[14px] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#b90014]"
              style={{ borderColor: "#e7bdb8" }}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setIsRevisionModalOpen(false)} className="px-4 py-2 text-[14px] font-semibold border rounded-xl">Batal</button>
              <button onClick={handleSendRevision} className="px-5 py-2 text-[14px] font-bold text-white rounded-xl" style={{ background: "#b90014" }}>
                Kirim Revisi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Ajukan Sengketa (Dispute) ── */}
      {isDisputeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }}>
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border shadow-2xl" style={{ borderColor: "#e7bdb8" }}>
            <div className="flex items-center gap-3 text-red-600">
              <span className="material-symbols-outlined text-[28px]">report_problem</span>
              <h3 className="text-[18px] font-bold">Ajukan Sengketa Proyek</h3>
            </div>
            <p className="text-[13px] text-gray-600">
              Mengajukan sengketa akan <strong>mengunci seluruh pencairan dana Escrow</strong> sampai diselesaikan oleh Admin SkillRent.
            </p>
            <textarea
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="Jelaskan alasan pengajuan sengketa..."
              rows={4}
              className="w-full p-3 text-[14px] rounded-xl border focus:outline-none focus:ring-2 focus:ring-red-600"
              style={{ borderColor: "#e7bdb8" }}
            />
            <div className="flex gap-3 justify-end">
              <button onClick={() => setIsDisputeModalOpen(false)} className="px-4 py-2 text-[14px] font-semibold border rounded-xl">Batal</button>
              <button onClick={handleOpenDispute} className="px-5 py-2 text-[14px] font-bold text-white bg-red-600 rounded-xl">
                Kunci &amp; Kirim Sengketa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
