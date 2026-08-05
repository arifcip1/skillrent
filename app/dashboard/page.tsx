"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UniversityBadge from "@/components/UniversityBadge";
import { useAuth } from "@/lib/AuthContext";

const milestonesFreelancer = [
  {
    id: 1,
    icon: "draw",
    iconBg: "#ebf5ff",
    iconColor: "#0057b9",
    title: "Desain Logo EduTech",
    milestone: "Draft Logo",
    deadline: "2 Hari Lagi",
    deadlineColor: "#ba1a1a",
    orderId: "1",
  },
  {
    id: 2,
    icon: "dashboard",
    iconBg: "#ffdad6",
    iconColor: "#b90014",
    title: "UI Design Dashboard",
    milestone: "User Flow",
    deadline: "5 Hari Lagi",
    deadlineColor: "#1a1c1e",
    orderId: "1",
  },
  {
    id: 3,
    icon: "description",
    iconBg: "#d8e2ff",
    iconColor: "#0057b9",
    title: "Copywriting Landing Page",
    milestone: "Headline Copy",
    deadline: "1 Minggu",
    deadlineColor: "#1a1c1e",
    orderId: "1",
  },
];

const clientProjects = [
  {
    id: "1",
    title: "Redesign Website UMKM Batik Nusantara",
    freelancerName: "Aditya Pratama (Universitas Indonesia)",
    status: "Milestone 2: UI Design Development (Paid in Escrow)",
    budget: "Rp 15.000.000",
    orderId: "1",
  },
  {
    id: "2",
    title: "Desain Logo & Identitas Brand Startup EduTech",
    freelancerName: "Siti Aminah (ITB)",
    status: "Milestone 1: Konsep & Wireframes",
    budget: "Rp 4.500.000",
    orderId: "1",
  },
];

export default function DashboardPage() {
  const { user, profile } = useAuth();

  // Determine user role and details
  const isClient = profile?.role === "client";
  const displayName = profile?.full_name || (user?.email ? user.email.split("@")[0] : "Pengguna SkillRent");
  const displayUniv = profile?.university;
  const displayEmail = profile?.email || user?.email;
  const initialLetter = displayName.charAt(0).toUpperCase();

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-12 min-h-screen" style={{ background: "#faf9fb" }}>
        {/* ── Profile Header ── */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div
                className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 shadow-lg overflow-hidden flex items-center justify-center text-[40px] md:text-[56px] font-bold text-white shrink-0"
                style={{ borderColor: "#ffffff", background: isClient ? "#0057b9" : "#b90014" }}
              >
                {initialLetter}
              </div>
              <div
                className="absolute -bottom-2 -right-2 p-1.5 rounded-full border-4 flex items-center justify-center"
                style={{ background: "#1dbf73", borderColor: "#ffffff", color: "#ffffff" }}
              >
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1
                  className="text-[32px] md:text-[44px] font-bold leading-tight"
                  style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}
                >
                  {displayName}
                </h1>
                <span
                  className="px-3.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider"
                  style={
                    isClient
                      ? { background: "#ebf5ff", color: "#0057b9" }
                      : { background: "#ffdad6", color: "#b90014" }
                  }
                >
                  {isClient ? "Klien Terverifikasi" : "Mahasiswa Freelancer"}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap text-[14px]">
                {displayUniv && <UniversityBadge name={displayUniv} />}
                {displayEmail && (
                  <span className="text-gray-600 font-medium">
                    📧 {displayEmail}
                  </span>
                )}
                {profile?.campus_email && (
                  <span className="text-gray-500 font-medium">
                    🎓 {profile.campus_email}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-6 py-3 border-2 rounded-xl text-[14px] font-semibold transition-colors hover:bg-[#f4f3f5]"
            style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}
          >
            <span className="material-symbols-outlined">edit</span>
            Edit Profil
          </button>
        </header>

        {/* ── Client vs Freelancer Dashboard View ── */}
        {isClient ? (
          /* ========================================================
             CLIENT DASHBOARD VIEW
             ======================================================== */
          <>
            {/* Stats Bento Grid for Client */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
              {/* Total Budget Spent */}
              <div
                className="md:col-span-6 lg:col-span-4 p-8 rounded-[2rem] transition-all hover:-translate-y-1"
                style={{ background: "#ffffff", boxShadow: "0px 10px 30px rgba(0,0,0,0.04)" }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                    <span className="material-symbols-outlined text-[24px]">account_balance_wallet</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                    Budget Proyek
                  </span>
                </div>
                <p className="text-[14px] font-semibold mb-2" style={{ color: "#5d3f3c" }}>
                  Total Anggaran Diposkan
                </p>
                <h2
                  className="text-[32px] font-bold leading-10"
                  style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Rp 20.000.000
                </h2>
                <div className="mt-4 pt-4 border-t flex justify-between text-[12px]" style={{ borderTopColor: "#efedf0", color: "#5d3f3c" }}>
                  <span>Aman di Escrow: <strong style={{ color: "#0057b9" }}>Rp 9.000.000</strong></span>
                </div>
              </div>

              {/* Active Projects Posted */}
              <div
                className="md:col-span-6 lg:col-span-4 p-8 rounded-[2rem] transition-all hover:-translate-y-1"
                style={{ background: "#ffffff", boxShadow: "0px 10px 30px rgba(0,0,0,0.04)" }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl" style={{ background: "#ffdad6", color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[24px]">folder_open</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: "#ffdad6", color: "#b90014" }}>
                    2 Berjalan
                  </span>
                </div>
                <p className="text-[14px] font-semibold mb-2" style={{ color: "#5d3f3c" }}>
                  Proyek Anda Berjalan
                </p>
                <h2
                  className="text-[32px] font-bold leading-10"
                  style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  2 Proyek
                </h2>
                <div className="mt-4 pt-4 border-t flex justify-between text-[12px]" style={{ borderTopColor: "#efedf0", color: "#5d3f3c" }}>
                  <span>Menunggu Review: <strong>1 Milestone</strong></span>
                </div>
              </div>

              {/* Freelancers Hired */}
              <div
                className="md:col-span-12 lg:col-span-4 p-8 rounded-[2rem] transition-all hover:-translate-y-1 flex flex-col justify-between"
                style={{ background: "#ffffff", boxShadow: "0px 10px 30px rgba(0,0,0,0.04)" }}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl" style={{ background: "#d8e2ff", color: "#0057b9" }}>
                      <span className="material-symbols-outlined text-[24px]">groups</span>
                    </div>
                    <span className="text-[14px] font-bold" style={{ color: "#1dbf73" }}>
                      100% Kampus Terverifikasi
                    </span>
                  </div>
                  <p className="text-[14px] font-semibold mb-1" style={{ color: "#5d3f3c" }}>
                    Mahasiswa Freelancer Disewa
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[36px] font-bold"
                      style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      2 Talenta
                    </span>
                    <span className="text-[14px]" style={{ color: "#5d3f3c" }}>(UI &amp; ITB)</span>
                  </div>
                </div>
                <div className="w-full bg-[#f4f3f5] h-2 rounded-full overflow-hidden mt-4">
                  <div className="h-full rounded-full" style={{ width: "100%", background: "#1dbf73" }} />
                </div>
              </div>
            </section>

            {/* Client Projects List & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Active Projects List */}
              <section className="lg:col-span-8 space-y-4">
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-[24px] font-bold"
                    style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Proyek Aktif Anda
                  </h3>
                  <Link href="/workspace" className="text-[14px] font-semibold hover:underline" style={{ color: "#b90014" }}>
                    Lihat di Workspace
                  </Link>
                </div>

                <div className="space-y-4">
                  {clientProjects.map((p) => (
                    <div
                      key={p.id}
                      className="p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md bg-white"
                      style={{ borderColor: "#e7bdb8" }}
                    >
                      <div>
                        <h4 className="text-[18px] font-bold mb-1" style={{ color: "#1a1c1e" }}>
                          {p.title}
                        </h4>
                        <p className="text-[13px] mb-2" style={{ color: "#5d3f3c" }}>
                          Freelancer: <strong>{p.freelancerName}</strong>
                        </p>
                        <span className="inline-block px-3 py-1 rounded-full text-[12px] font-semibold" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                          {p.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 justify-between sm:justify-end shrink-0">
                        <span className="text-[16px] font-bold" style={{ color: "#40161c" }}>
                          {p.budget}
                        </span>
                        <Link
                          href={`/order/${p.orderId}`}
                          className="px-5 py-2.5 text-[14px] font-semibold rounded-xl text-white shadow-sm transition-all active:scale-95 hover:opacity-90"
                          style={{ background: "#b90014" }}
                        >
                          Pantau Progress
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sidebar Actions for Client */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl border bg-white space-y-4 shadow-sm" style={{ borderColor: "#e7bdb8" }}>
                  <h4 className="text-[16px] font-bold" style={{ color: "#1a1c1e" }}>Aksi Klien</h4>
                  <div className="space-y-3">
                    <Link
                      href="/brief"
                      className="w-full flex items-center justify-between p-4 rounded-xl border transition-all hover:border-[#b90014]"
                      style={{ background: "#faf9fb", borderColor: "#e7bdb8" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined" style={{ color: "#b90014" }}>add_circle</span>
                        <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Buat Brief Proyek (AI)</span>
                      </div>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </Link>

                    <Link
                      href="/recommendations"
                      className="w-full flex items-center justify-between p-4 rounded-xl border transition-all hover:border-[#b90014]"
                      style={{ background: "#faf9fb", borderColor: "#e7bdb8" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined" style={{ color: "#0057b9" }}>auto_awesome</span>
                        <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Cari Rekomendasi AI</span>
                      </div>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </Link>

                    <Link
                      href="/browse"
                      className="w-full flex items-center justify-between p-4 rounded-xl border transition-all hover:border-[#b90014]"
                      style={{ background: "#faf9fb", borderColor: "#e7bdb8" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined" style={{ color: "#1dbf73" }}>search</span>
                        <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Telusuri Katalog Jasa</span>
                      </div>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </>
        ) : (
          /* ========================================================
             FREELANCER DASHBOARD VIEW
             ======================================================== */
          <>
            {/* Stats Bento Grid for Freelancer */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
              {/* Pendapatan */}
              <div
                className="md:col-span-6 lg:col-span-4 p-8 rounded-[2rem] transition-all hover:-translate-y-1"
                style={{ background: "#ffffff", boxShadow: "0px 10px 30px rgba(0,0,0,0.04)" }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl" style={{ background: "#ffdad6", color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[24px]">payments</span>
                  </div>
                  <div className="flex items-center gap-1 text-[14px] font-semibold" style={{ color: "#1dbf73" }}>
                    <span className="material-symbols-outlined text-[16px]">trending_up</span>
                    +12% bulan ini
                  </div>
                </div>
                <p className="text-[14px] font-semibold mb-2" style={{ color: "#5d3f3c" }}>
                  Total Pendapatan (Bulan Ini)
                </p>
                <h2
                  className="text-[32px] font-bold leading-10"
                  style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Rp 12.450.000
                </h2>
                <div className="mt-4 pt-4 border-t flex justify-between text-[12px]" style={{ borderTopColor: "#efedf0", color: "#5d3f3c" }}>
                  <span>Escrow Tertahan: <strong>Rp 4.000.000</strong></span>
                </div>
              </div>

              {/* Proyek Aktif */}
              <div
                className="md:col-span-6 lg:col-span-4 p-8 rounded-[2rem] transition-all hover:-translate-y-1"
                style={{ background: "#ffffff", boxShadow: "0px 10px 30px rgba(0,0,0,0.04)" }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                    <span className="material-symbols-outlined text-[24px]">work</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[12px] font-semibold" style={{ background: "#ebf5ff", color: "#0057b9" }}>
                    3 Berjalan
                  </span>
                </div>
                <p className="text-[14px] font-semibold mb-2" style={{ color: "#5d3f3c" }}>
                  Proyek Sedang Berjalan
                </p>
                <h2
                  className="text-[32px] font-bold leading-10"
                  style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  3 Proyek
                </h2>
                <div className="mt-4 pt-4 border-t flex justify-between text-[12px]" style={{ borderTopColor: "#efedf0", color: "#5d3f3c" }}>
                  <span>Total Selesai: <strong>28 Proyek</strong></span>
                </div>
              </div>

              {/* Reputasi */}
              <div
                className="md:col-span-12 lg:col-span-4 p-8 rounded-[2rem] transition-all hover:-translate-y-1 flex flex-col justify-between"
                style={{ background: "#ffffff", boxShadow: "0px 10px 30px rgba(0,0,0,0.04)" }}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl" style={{ background: "#ffdcc3", color: "#904d00" }}>
                      <span className="material-symbols-outlined text-[24px]">star</span>
                    </div>
                    <span className="text-[14px] font-bold" style={{ color: "#904d00" }}>
                      Top Rated Freelancer
                    </span>
                  </div>
                  <p className="text-[14px] font-semibold mb-1" style={{ color: "#5d3f3c" }}>
                    Rating &amp; Reputasi
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-[36px] font-bold"
                      style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      4.95
                    </span>
                    <span className="text-[14px]" style={{ color: "#5d3f3c" }}>/ 5.0 (48 Ulasan)</span>
                  </div>
                </div>
                <div className="w-full bg-[#f4f3f5] h-2 rounded-full overflow-hidden mt-4">
                  <div className="h-full rounded-full" style={{ width: "98%", background: "#904d00" }} />
                </div>
              </div>
            </section>

            {/* Active Milestones & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Milestones List */}
              <section className="lg:col-span-8 space-y-4">
                <div className="flex justify-between items-center px-2">
                  <h3
                    className="text-[24px] font-bold"
                    style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Milestone Mendatang
                  </h3>
                  <Link href="/order/1" className="text-[14px] font-semibold hover:underline" style={{ color: "#b90014" }}>
                    Lihat Semua Proyek
                  </Link>
                </div>

                <div className="space-y-4">
                  {milestonesFreelancer.map((m) => (
                    <div
                      key={m.id}
                      className="p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md bg-white"
                      style={{ borderColor: "#e7bdb8" }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                          style={{ background: m.iconBg, color: m.iconColor }}
                        >
                          <span className="material-symbols-outlined text-[24px]">{m.icon}</span>
                        </div>
                        <div>
                          <p className="text-[16px] font-bold" style={{ color: "#1a1c1e" }}>{m.title}</p>
                          <p className="text-[13px]" style={{ color: "#5d3f3c" }}>Milestone: <strong>{m.milestone}</strong></p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <span className="text-[13px] font-semibold" style={{ color: m.deadlineColor }}>
                          ⏱️ {m.deadline}
                        </span>
                        <Link
                          href={`/order/${m.orderId}`}
                          className="px-4 py-2 text-[14px] font-semibold rounded-xl text-white shadow-sm transition-all active:scale-95 hover:opacity-90"
                          style={{ background: "#b90014" }}
                        >
                          Buka Order
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Sidebar Quick Actions */}
              <aside className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-2xl border bg-white space-y-4 shadow-sm" style={{ borderColor: "#e7bdb8" }}>
                  <h4 className="text-[16px] font-bold" style={{ color: "#1a1c1e" }}>Aksi Cepat</h4>
                  <div className="space-y-3">
                    <Link
                      href="/brief"
                      className="w-full flex items-center justify-between p-4 rounded-xl border transition-all hover:border-[#b90014]"
                      style={{ background: "#faf9fb", borderColor: "#e7bdb8" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined" style={{ color: "#b90014" }}>add_circle</span>
                        <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Buat AI Brief Proyek</span>
                      </div>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </Link>

                    <Link
                      href="/browse"
                      className="w-full flex items-center justify-between p-4 rounded-xl border transition-all hover:border-[#b90014]"
                      style={{ background: "#faf9fb", borderColor: "#e7bdb8" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined" style={{ color: "#0057b9" }}>search</span>
                        <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Telusuri Jasa &amp; Talenta</span>
                      </div>
                      <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}
      </main>

      {/* FAB */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/brief"
          className="flex items-center gap-2 text-white px-6 py-4 rounded-full shadow-2xl font-bold text-[14px] transition-all hover:scale-105 active:scale-95"
          style={{ background: "#b90014", boxShadow: "0 10px 25px rgba(185,0,20,0.4)" }}
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          {isClient ? "POST PROYEK BARU" : "TAMBAH GIG BARU"}
        </Link>
      </div>

      <Footer />
    </>
  );
}
