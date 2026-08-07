"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversityBadge from "@/components/UniversityBadge";
import { useAuth } from "@/lib/AuthContext";

// Sample Data for Freelancer
const FREELANCER_GIGS = [
  {
    id: "g1",
    title: "Logo Minimalis Modern untuk Startup Teknologi & Bisnis",
    category: "Graphics & Design",
    price: "Rp 250.000",
    salesCount: 124,
    rating: 4.9,
    status: "Aktif",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g2",
    title: "Pengembangan Website Next.js & Tailwind Responsif Modern",
    category: "Programming & Tech",
    price: "Rp 1.500.000",
    salesCount: 78,
    rating: 5.0,
    status: "Aktif",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "g3",
    title: "Editing Video Commercial TikTok, Reels & Shorts Engaging",
    category: "Video & Animation",
    price: "Rp 350.000",
    salesCount: 110,
    rating: 4.9,
    status: "Aktif",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
  },
];

const FREELANCER_ORDERS = [
  {
    id: "1",
    title: "Desain Logo & Identitas Brand Startup EduTech",
    clientName: "Budi Santoso (Founder EduTech)",
    milestone: "Draft Logo & Palet Warna (Tahap 1)",
    deadline: "2 Hari Lagi",
    deadlineColor: "#ba1a1a",
    amount: "Rp 1.500.000",
    status: "in_progress",
  },
  {
    id: "2",
    title: "UI Design Dashboard E-Commerce UMKM",
    clientName: "Siti Rahma (CV Batik Nusantara)",
    milestone: "User Flow & Wireframe (Tahap 2)",
    deadline: "5 Hari Lagi",
    deadlineColor: "#1a1c1e",
    amount: "Rp 3.000.000",
    status: "in_review",
  },
];

const PAYOUT_HISTORY = [
  { id: "po-1", date: "01 Agu 2026", amount: "Rp 4.500.000", bank: "BCA (**** 8821)", status: "Berhasil" },
  { id: "po-2", date: "15 Jul 2026", amount: "Rp 3.200.000", bank: "BCA (**** 8821)", status: "Berhasil" },
  { id: "po-3", date: "28 Jun 2026", amount: "Rp 4.750.000", bank: "BCA (**** 8821)", status: "Berhasil" },
];

// Sample Data for Client
const CLIENT_ORDERS = [
  {
    id: "1",
    title: "Redesign Website UMKM Batik Nusantara",
    freelancerName: "Aditya Pratama",
    university: "Universitas Indonesia",
    status: "Tahap 2: Pengujian Desain UI",
    budget: "Rp 15.000.000",
    escrowAmount: "Rp 9.000.000",
  },
  {
    id: "2",
    title: "Desain Logo & Identitas Brand Startup EduTech",
    freelancerName: "Siti Aminah",
    university: "ITB",
    status: "Tahap 1: Konsep & Wireframe",
    budget: "Rp 4.500.000",
    escrowAmount: "Rp 4.500.000",
  },
];

export default function UserAccountDashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutSuccess, setPayoutSuccess] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const isClient = profile?.role === "client";
  const displayName = profile?.full_name || (user?.email ? user.email.split("@")[0] : "Pengguna SkillRent");
  const displayUniv = profile?.university || "Universitas Indonesia";
  const displayEmail = profile?.email || user?.email;
  const initialLetter = displayName.charAt(0).toUpperCase();

  const handlePayoutSubmit = () => {
    setPayoutSuccess(true);
    setTimeout(() => {
      setPayoutSuccess(false);
      setShowPayoutModal(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-10 min-h-screen" style={{ background: "#faf9fb" }}>
        {/* ── Page Title Header ── */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#b90014]">
              AKUN AKUN PENGGUNA
            </span>
            <h1 className="text-[26px] md:text-[32px] font-bold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {isClient ? "Dashboard Akun Klien" : "Dashboard Akun Mahasiswa Freelancer"}
            </h1>
          </div>
          <Link
            href="/browse"
            className="px-4 py-2 rounded-xl border text-[13px] font-semibold flex items-center gap-1.5 transition-colors hover:bg-gray-100"
            style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Kembali ke Telusuri Jasa
          </Link>
        </div>

        {/* ── Profile Info Banner ── */}
        <header className="p-6 md:p-8 rounded-3xl border bg-white shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ borderColor: "#e7bdb8" }}>
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-4 shadow-md flex items-center justify-center text-[36px] md:text-[44px] font-bold text-white shrink-0"
                style={{ borderColor: "#ffffff", background: isClient ? "#0057b9" : "#b90014" }}
              >
                {initialLetter}
              </div>
              <div
                className="absolute -bottom-1 -right-1 p-1 rounded-full border-2 flex items-center justify-center"
                style={{ background: "#1dbf73", borderColor: "#ffffff", color: "#ffffff" }}
              >
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-[24px] md:text-[30px] font-bold leading-tight" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {displayName}
                </h2>
                <span
                  className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                  style={
                    isClient
                      ? { background: "#ebf5ff", color: "#0057b9" }
                      : { background: "#ffdad6", color: "#b90014" }
                  }
                >
                  {isClient ? "🏢 Klien / Pemberi Kerja" : "🎓 Mahasiswa Freelancer"}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap text-[13px]">
                <UniversityBadge name={displayUniv} />
                {displayEmail && <span className="text-gray-600">📧 {displayEmail}</span>}
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  Verifikasi SSO Kampus Aktif
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/browse"
              className="px-5 py-2.5 rounded-xl font-bold text-[13px] text-white flex items-center gap-2 shadow-sm transition-transform active:scale-95"
              style={{ background: isClient ? "#0057b9" : "#b90014" }}
            >
              <span className="material-symbols-outlined text-[18px]">search</span>
              Telusuri Katalog Jasa
            </Link>
          </div>
        </header>

        {/* ── Role-Based Bento Stats ── */}
        {!isClient ? (
          /* ========================================================
             FREELANCER STATS BENTO
             ======================================================== */
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            {/* Saldo Siap Ditarik */}
            <div
              className="md:col-span-4 p-6 rounded-3xl bg-white border shadow-xs flex flex-col justify-between"
              style={{ borderColor: "#e7bdb8" }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl" style={{ background: "#ffdad6", color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[24px]">payments</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "#e6f4ea", color: "#137333" }}>
                    Saldo Siap Ditarik
                  </span>
                </div>
                <p className="text-[13px] font-medium" style={{ color: "#5d3f3c" }}>Total Pendapatan Anda</p>
                <h3 className="text-[28px] font-bold mt-1" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Rp 8.450.000
                </h3>
                <p className="text-[12px] mt-1" style={{ color: "#5d3f3c" }}>
                  Escrow Tertahan: <strong>Rp 4.000.000</strong> (2 Proyek Berjalan)
                </p>
              </div>

              <button
                onClick={() => setShowPayoutModal(true)}
                className="mt-4 w-full py-2.5 rounded-xl font-bold text-[13px] text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                style={{ background: "#b90014" }}
              >
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                Tarik Saldo ke Rekening
              </button>
            </div>

            {/* Jasa Aktif */}
            <div
              className="md:col-span-4 p-6 rounded-3xl bg-white border shadow-xs flex flex-col justify-between"
              style={{ borderColor: "#e7bdb8" }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                    <span className="material-symbols-outlined text-[24px]">storefront</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                    3 Jasa Ditawarkan
                  </span>
                </div>
                <p className="text-[13px] font-medium" style={{ color: "#5d3f3c" }}>Jasa Aktif di Katalog</p>
                <h3 className="text-[28px] font-bold mt-1" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  3 Gigs Aktif
                </h3>
                <p className="text-[12px] mt-1" style={{ color: "#5d3f3c" }}>
                  Total Terjual: <strong>312 Pesanan Selesai</strong>
                </p>
              </div>

              <Link
                href="/brief"
                className="mt-4 w-full py-2.5 rounded-xl font-bold text-[13px] border flex items-center justify-center gap-2 transition-all hover:bg-[#faf9fb]"
                style={{ borderColor: "#0057b9", color: "#0057b9" }}
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Tambah Jasa (Gig) Baru
              </Link>
            </div>

            {/* Reputasi Kampus */}
            <div
              className="md:col-span-4 p-6 rounded-3xl bg-white border shadow-xs flex flex-col justify-between"
              style={{ borderColor: "#e7bdb8" }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl" style={{ background: "#fef3c7", color: "#d97706" }}>
                    <span className="material-symbols-outlined text-[24px]">star</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "#fef3c7", color: "#d97706" }}>
                    Top Rated Mahasiswa
                  </span>
                </div>
                <p className="text-[13px] font-medium" style={{ color: "#5d3f3c" }}>Rating &amp; Verifikasi KTM</p>
                <h3 className="text-[28px] font-bold mt-1" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  4.95 / 5.0
                </h3>
                <p className="text-[12px] mt-1" style={{ color: "#5d3f3c" }}>
                  Berdasarkan <strong>48 Ulasan Klien</strong> (SSO Terverifikasi)
                </p>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-[12px] font-semibold text-emerald-800">
                <span className="material-symbols-outlined text-[18px]">badge</span>
                KTM Active: {displayUniv}
              </div>
            </div>
          </section>
        ) : (
          /* ========================================================
             CLIENT STATS BENTO
             ======================================================== */
          <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            {/* Total Budget Spent */}
            <div
              className="md:col-span-4 p-6 rounded-3xl bg-white border shadow-xs flex flex-col justify-between"
              style={{ borderColor: "#e7bdb8" }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                    <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                    Anggaran Klien
                  </span>
                </div>
                <p className="text-[13px] font-medium" style={{ color: "#5d3f3c" }}>Total Anggaran Proyek</p>
                <h3 className="text-[28px] font-bold mt-1" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Rp 20.000.000
                </h3>
                <p className="text-[12px] mt-1" style={{ color: "#5d3f3c" }}>
                  Dana di Escrow: <strong className="text-[#0057b9]">Rp 9.000.000</strong> (Aman)
                </p>
              </div>

              <Link
                href="/brief"
                className="mt-4 w-full py-2.5 rounded-xl font-bold text-[13px] text-white flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                style={{ background: "#0057b9" }}
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                Buat AI Brief Baru
              </Link>
            </div>

            {/* Active Projects Posted */}
            <div
              className="md:col-span-4 p-6 rounded-3xl bg-white border shadow-xs flex flex-col justify-between"
              style={{ borderColor: "#e7bdb8" }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl" style={{ background: "#ffdad6", color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[24px]">folder_open</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "#ffdad6", color: "#b90014" }}>
                    2 Proyek Berjalan
                  </span>
                </div>
                <p className="text-[13px] font-medium" style={{ color: "#5d3f3c" }}>Pesanan Jasa Aktif</p>
                <h3 className="text-[28px] font-bold mt-1" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  2 Proyek
                </h3>
                <p className="text-[12px] mt-1" style={{ color: "#5d3f3c" }}>
                  Menunggu Review Persetujuan: <strong>1 Milestone</strong>
                </p>
              </div>

              <Link
                href="/workspace"
                className="mt-4 w-full py-2.5 rounded-xl font-bold text-[13px] border flex items-center justify-center gap-2 transition-all hover:bg-[#faf9fb]"
                style={{ borderColor: "#b90014", color: "#b90014" }}
              >
                <span className="material-symbols-outlined text-[18px]">work</span>
                Buka Workspace Proyek
              </Link>
            </div>

            {/* Freelancers Hired */}
            <div
              className="md:col-span-4 p-6 rounded-3xl bg-white border shadow-xs flex flex-col justify-between"
              style={{ borderColor: "#e7bdb8" }}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 rounded-2xl" style={{ background: "#e6f4ea", color: "#137333" }}>
                    <span className="material-symbols-outlined text-[24px]">groups</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold" style={{ background: "#e6f4ea", color: "#137333" }}>
                    Terverifikasi SSO
                  </span>
                </div>
                <p className="text-[13px] font-medium" style={{ color: "#5d3f3c" }}>Mahasiswa Disewa</p>
                <h3 className="text-[28px] font-bold mt-1" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  2 Talenta
                </h3>
                <p className="text-[12px] mt-1" style={{ color: "#5d3f3c" }}>
                  Asal Kampus: <strong>Universitas Indonesia &amp; ITB</strong>
                </p>
              </div>

              <Link
                href="/recommendations"
                className="mt-4 w-full py-2.5 rounded-xl font-bold text-[13px] border flex items-center justify-center gap-2 transition-all hover:bg-[#faf9fb]"
                style={{ borderColor: "#137333", color: "#137333" }}
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Cari Rekomendasi AI
              </Link>
            </div>
          </section>
        )}

        {/* ── Role-Specific Tabbed Navigation & Content ── */}
        <section className="bg-white rounded-3xl border shadow-xs overflow-hidden mb-12" style={{ borderColor: "#e7bdb8" }}>
          {/* Tab Navigation Header */}
          <div className="flex items-center border-b overflow-x-auto" style={{ borderColor: "#efedf0" }}>
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "overview" ? "border-[#b90014] text-[#b90014]" : "border-transparent text-[#5d3f3c] hover:text-[#1a1c1e]"
              }`}
            >
              {!isClient ? "📦 Jasa & Gig Saya" : "📋 Proyek & Pesanan Aktif"}
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-4 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "orders" ? "border-[#b90014] text-[#b90014]" : "border-transparent text-[#5d3f3c] hover:text-[#1a1c1e]"
              }`}
            >
              {!isClient ? "⏱️ Milestone Pekerjaan" : "🤖 Brief AI Proyek"}
            </button>

            <button
              onClick={() => setActiveTab("finance")}
              className={`px-6 py-4 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "finance" ? "border-[#b90014] text-[#b90014]" : "border-transparent text-[#5d3f3c] hover:text-[#1a1c1e]"
              }`}
            >
              {!isClient ? "💰 Saldo & Pencairan" : "💳 Transaksi Escrow & Invoice"}
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-4 text-[14px] font-bold border-b-2 transition-all whitespace-nowrap ${
                activeTab === "profile" ? "border-[#b90014] text-[#b90014]" : "border-transparent text-[#5d3f3c] hover:text-[#1a1c1e]"
              }`}
            >
              {!isClient ? "🎓 Status KTM & Kampus" : "⚙️ Pengaturan Akun Klien"}
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 md:p-8">
            {!isClient ? (
              /* ========================================================
                 FREELANCER TAB CONTENTS
                 ======================================================== */
              <>
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Daftar Layanan Jasa (Gigs) Anda</h3>
                        <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Kelola jasa yang ditampilkan di katalog SkillRent untuk calon klien.</p>
                      </div>
                      <Link
                        href="/brief"
                        className="px-4 py-2 rounded-xl text-white font-bold text-[13px] flex items-center gap-1.5 shadow-sm"
                        style={{ background: "#b90014" }}
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        Tambah Gig Baru
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {FREELANCER_GIGS.map((gig) => (
                        <div key={gig.id} className="rounded-2xl border overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between" style={{ borderColor: "#e7bdb8" }}>
                          <div>
                            <div className="h-40 relative">
                              <img src={gig.imageUrl} alt={gig.title} className="w-full h-full object-cover" />
                              <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white text-[#b90014] shadow-xs">
                                {gig.category}
                              </span>
                            </div>
                            <div className="p-4 space-y-2">
                              <h4 className="text-[15px] font-bold line-clamp-2" style={{ color: "#1a1c1e" }}>{gig.title}</h4>
                              <div className="flex items-center justify-between text-[13px]">
                                <span className="font-bold text-[#b90014]">{gig.price}</span>
                                <span className="text-gray-500 font-medium">⭐ {gig.rating} ({gig.salesCount} Terjual)</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 pt-0 flex gap-2">
                            <button className="flex-1 py-2 text-[12px] font-bold border rounded-xl hover:bg-gray-50" style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}>
                              Edit Gig
                            </button>
                            <Link href={`/gig/${gig.id}`} className="flex-1 py-2 text-[12px] font-bold rounded-xl text-white text-center" style={{ background: "#0057b9" }}>
                              Lihat Detail
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Milestone Pekerjaan Berjalan</h3>
                      <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Selesaikan milestone pekerjaan dari klien sebelum batas waktu untuk pencairan dana escrow.</p>
                    </div>

                    <div className="space-y-4">
                      {FREELANCER_ORDERS.map((ord) => (
                        <div key={ord.id} className="p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white" style={{ borderColor: "#e7bdb8" }}>
                          <div className="space-y-1">
                            <h4 className="text-[16px] font-bold" style={{ color: "#1a1c1e" }}>{ord.title}</h4>
                            <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Klien: <strong>{ord.clientName}</strong></p>
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                                {ord.milestone}
                              </span>
                              <span className="text-[12px] font-bold" style={{ color: ord.deadlineColor }}>
                                ⏱️ {ord.deadline}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                            <span className="text-[16px] font-bold" style={{ color: "#1a1c1e" }}>{ord.amount}</span>
                            <Link
                              href={`/order/${ord.id}`}
                              className="px-4 py-2 rounded-xl text-white font-bold text-[13px]"
                              style={{ background: "#b90014" }}
                            >
                              Buka Order &amp; Kirim
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "finance" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Saldo &amp; Riwayat Penarikan Dana</h3>
                        <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Pencairan dana langsung ke rekening bank atau e-wallet tanpa biaya admin tambahan.</p>
                      </div>
                      <button
                        onClick={() => setShowPayoutModal(true)}
                        className="px-5 py-2.5 rounded-xl text-white font-bold text-[13px] shadow-sm"
                        style={{ background: "#b90014" }}
                      >
                        + Tarik Saldo Baru
                      </button>
                    </div>

                    <div className="p-6 rounded-2xl bg-gray-50 border space-y-3" style={{ borderColor: "#e7bdb8" }}>
                      <h4 className="text-[15px] font-bold" style={{ color: "#1a1c1e" }}>Riwayat Penarikan Terakhir</h4>
                      <div className="space-y-2">
                        {PAYOUT_HISTORY.map((po) => (
                          <div key={po.id} className="p-3.5 rounded-xl bg-white border flex items-center justify-between text-[13px]" style={{ borderColor: "#e7bdb8" }}>
                            <div>
                              <p className="font-bold text-[#1a1c1e]">{po.amount}</p>
                              <p className="text-[11px] text-gray-500">{po.date} • {po.bank}</p>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                              {po.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Status Kartu Mahasiswa (KTM) &amp; SSO Kampus</h3>
                      <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Verifikasi resmi bahwa Anda adalah mahasiswa aktif perguruan tinggi terdaftar.</p>
                    </div>

                    <div className="p-6 rounded-2xl border bg-emerald-50 border-emerald-200 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[32px] text-emerald-700">verified</span>
                        <div>
                          <h4 className="text-[16px] font-bold text-emerald-900">Mahasiswa Aktif Terverifikasi</h4>
                          <p className="text-[13px] text-emerald-700">Universitas: <strong>{displayUniv}</strong></p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-emerald-200 flex items-center justify-between text-[12px] text-emerald-800">
                        <span>Email Kampus SSO: <strong>{profile?.campus_email || `${displayName.toLowerCase().replace(/\s+/g, "")}@ui.ac.id`}</strong></span>
                        <span className="font-bold uppercase tracking-wider">Status: AKTIF</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* ========================================================
                 CLIENT TAB CONTENTS
                 ======================================================== */
              <>
                {activeTab === "overview" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                      <div>
                        <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Pesanan &amp; Proyek Aktif Anda</h3>
                        <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Pantau progress pekerjaan mahasiswa dan amankan dana escrow per milestone.</p>
                      </div>
                      <Link
                        href="/brief"
                        className="px-4 py-2 rounded-xl text-white font-bold text-[13px] flex items-center gap-1.5 shadow-sm"
                        style={{ background: "#0057b9" }}
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                        Post Brief Proyek Baru
                      </Link>
                    </div>

                    <div className="space-y-4">
                      {CLIENT_ORDERS.map((ord) => (
                        <div key={ord.id} className="p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white" style={{ borderColor: "#e7bdb8" }}>
                          <div className="space-y-1">
                            <h4 className="text-[16px] font-bold" style={{ color: "#1a1c1e" }}>{ord.title}</h4>
                            <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Mahasiswa Freelancer: <strong>{ord.freelancerName} ({ord.university})</strong></p>
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">
                              {ord.status}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end">
                            <div>
                              <p className="text-[15px] font-bold text-right" style={{ color: "#1a1c1e" }}>{ord.budget}</p>
                              <p className="text-[11px] text-blue-700 font-semibold">Escrow: {ord.escrowAmount}</p>
                            </div>
                            <Link
                              href={`/order/${ord.id}`}
                              className="px-4 py-2 rounded-xl text-white font-bold text-[13px]"
                              style={{ background: "#b90014" }}
                            >
                              Pantau &amp; Chat
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Brief AI Proyek Diposting</h3>
                      <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Brief proyek yang sudah dirumuskan via AI untuk mencari kandidat mahasiswa terbaik.</p>
                    </div>

                    <div className="p-6 rounded-2xl border bg-blue-50 border-blue-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-800">
                          <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                          <h4 className="text-[16px] font-bold">Brief AI Aktif: Redesign Website &amp; Mobile App</h4>
                        </div>
                        <p className="text-[13px] text-blue-700">Kategori: <strong>Programming &amp; Tech</strong> • Budget: <strong>Rp 15.000.000</strong> • Deadline: <strong>2 Minggu</strong></p>
                      </div>

                      <div className="flex gap-2">
                        <Link href="/recommendations" className="px-4 py-2 rounded-xl text-white font-bold text-[12px]" style={{ background: "#0057b9" }}>
                          Cari Rekomendasi AI
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "finance" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Transaksi Escrow &amp; Pembayaran</h3>
                      <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Jaminan perlindungan pembayaran bertahap (Escrow) per kesepakatan milestone.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border space-y-3" style={{ borderColor: "#e7bdb8" }}>
                      <div className="p-4 rounded-xl bg-gray-50 border flex items-center justify-between text-[13px]" style={{ borderColor: "#e7bdb8" }}>
                        <div>
                          <p className="font-bold text-[#1a1c1e]">Escrow Proyek #1 - Redesign Website</p>
                          <p className="text-[11px] text-gray-500">Tahap 1 Dicairkan: Rp 6.000.000 | Tahap 2 Dipertahankan: Rp 9.000.000</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-0057b9">
                          Aman di Escrow
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "profile" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Pengaturan Profil Klien</h3>
                      <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Ubah rincian profil pemberi kerja &amp; preferensi tagihan.</p>
                    </div>

                    <div className="p-6 rounded-2xl border space-y-4 max-w-xl bg-white" style={{ borderColor: "#e7bdb8" }}>
                      <div>
                        <label className="block text-[13px] font-semibold mb-1" style={{ color: "#1a1c1e" }}>Nama Lengkap / Perusahaan</label>
                        <input type="text" defaultValue={displayName} className="w-full px-3 py-2 rounded-xl border text-[14px]" style={{ borderColor: "#e7bdb8" }} />
                      </div>
                      <div>
                        <label className="block text-[13px] font-semibold mb-1" style={{ color: "#1a1c1e" }}>Email Utama</label>
                        <input type="email" defaultValue={displayEmail} className="w-full px-3 py-2 rounded-xl border text-[14px]" style={{ borderColor: "#e7bdb8" }} />
                      </div>
                      <button className="px-5 py-2.5 rounded-xl text-white font-bold text-[13px]" style={{ background: "#b90014" }}>
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      {/* Payout Modal for Freelancers */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-[18px] font-bold" style={{ color: "#1a1c1e" }}>Pencairan Saldo Pendapatan</h3>
              <button onClick={() => setShowPayoutModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            {payoutSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span className="material-symbols-outlined text-[48px] text-emerald-600">check_circle</span>
                <h4 className="text-[18px] font-bold text-emerald-900">Permintaan Penarikan Berhasil!</h4>
                <p className="text-[13px] text-emerald-700">Dana sebesar Rp 8.450.000 diproses ke Rekening Bank BCA Anda.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-gray-50 border space-y-1" style={{ borderColor: "#e7bdb8" }}>
                  <p className="text-[12px] text-gray-500">Saldo Siap Ditarik</p>
                  <p className="text-[24px] font-bold text-[#b90014]">Rp 8.450.000</p>
                </div>

                <div>
                  <label className="block text-[13px] font-semibold mb-1" style={{ color: "#1a1c1e" }}>Pilih Rekening Bank Tujuan</label>
                  <select className="w-full px-3 py-2.5 rounded-xl border text-[13px]" style={{ borderColor: "#e7bdb8" }}>
                    <option>Bank BCA - 882103912 (a.n. {displayName})</option>
                    <option>Bank Mandiri - 137009812 (a.n. {displayName})</option>
                    <option>GoPay / OVO - 08129876543</option>
                  </select>
                </div>

                <button
                  onClick={handlePayoutSubmit}
                  className="w-full py-3 rounded-xl text-white font-bold text-[14px] shadow-sm transition-all active:scale-95"
                  style={{ background: "#b90014" }}
                >
                  Konfirmasi Penarikan Saldo
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
