import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotificationPanel from "@/components/NotificationPanel";

export const metadata: Metadata = {
  title: "Notifikasi",
  description: "Semua notifikasi proyek, pembayaran, dan pesan Anda.",
};

export default function NotificationsPage() {
  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-12" style={{ minHeight: "calc(100vh - 72px)" }}>
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-[32px] font-bold leading-10 mb-2"
            style={{
              color: "#1a1c1e",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            Notifikasi
          </h1>
          <p className="text-[16px] leading-6" style={{ color: "#5d3f3c" }}>
            Semua aktivitas penting proyek, pembayaran, dan pesan Anda.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {["Semua", "Belum Dibaca", "Proyek", "Pembayaran", "Pesan"].map((tab, i) => (
            <button
              key={tab}
              className="px-4 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all"
              style={
                i === 0
                  ? { background: "#b90014", color: "#ffffff" }
                  : { background: "#efedf0", color: "#5d3f3c" }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div
          className="rounded-2xl border overflow-hidden shadow-sm"
          style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
        >
          <NotificationPanel isDropdown={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}
