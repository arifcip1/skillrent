"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import UniversityBadge from "@/components/UniversityBadge";

const packages = {
  basic: {
    price: "Rp 250k",
    badge: "Hemat 15%",
    badgeBg: "#e9e8ea",
    badgeColor: "#1a1c1e",
    desc: "1 Opsi Logo Minimalis dengan format JPEG & PNG resolusi tinggi. Cocok untuk awalan.",
    delivery: "3 Hari",
    features: ["1 Konsep Desain", "File HQ JPEG/PNG", "2x Revisi"],
  },
  standard: {
    price: "Rp 500k",
    badge: "Populer",
    badgeBg: "#fd8b00",
    badgeColor: "#603100",
    desc: "2 Opsi Logo Premium dengan File Master (AI/SVG). Ideal untuk Startup.",
    delivery: "5 Hari",
    features: ["2 Konsep Desain", "Source File Master", "Unlimited Revisi"],
  },
  premium: {
    price: "Rp 950k",
    badge: "Lengkap",
    badgeBg: "#0057b9",
    badgeColor: "#ffffff",
    desc: "Full Branding Kit: Logo, Kartu Nama, Kop Surat, & Media Sosial Kit.",
    delivery: "10 Hari",
    features: ["3 Konsep Branding", "Full Identity Guidelines", "Stationery Design"],
  },
};

const portfolioItems = [
  { title: "Branding Startup Fintech", bg: "#ebf5ff" },
  { title: "Coffee Shop Branding", bg: "#ffdcc3" },
  { title: "Logo Aplikasi Mobile", bg: "#d8e2ff" },
];

export default function GigDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<"basic" | "standard" | "premium">("basic");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bca");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const pkg = packages[activeTab];

  const handleConfirmOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderSuccess(true);
      setTimeout(() => {
        window.location.href = "/order/1";
      }, 1200);
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-6" style={{ color: "#5d3f3c" }}>
          <span className="text-[12px] font-medium">Design</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-[12px] font-medium">Logo & Branding</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-[12px] font-medium" style={{ color: "#b90014" }}>Minimalist Logo</span>
        </nav>

        {/* Title */}
        <h1
          className="text-[32px] md:text-[48px] font-bold leading-tight mb-8 max-w-4xl"
          style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Desain Logo Minimalis untuk Startup & UMKM
        </h1>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── Left Column ── */}
          <div className="flex-1 space-y-12">
            {/* Gallery */}
            <section className="relative group">
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-sm" style={{ background: "#efedf0" }}>
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <span className="material-symbols-outlined text-[64px]" style={{ color: "#926e6b" }}>palette</span>
                    <p className="text-[16px] font-semibold" style={{ color: "#5d3f3c" }}>Portfolio Preview</p>
                  </div>
                </div>
              </div>
              {/* Nav arrows */}
              <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(255,255,255,0.9)" }}>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(255,255,255,0.9)" }}>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
              {/* Thumbnails */}
              <div className="flex gap-4 mt-4">
                {["active", "inactive", "inactive"].map((state, i) => (
                  <div
                    key={i}
                    className="w-24 h-16 rounded-lg border-2 overflow-hidden cursor-pointer transition-colors"
                    style={{ borderColor: state === "active" ? "#b90014" : "#e7bdb8", background: "#efedf0" }}
                  />
                ))}
              </div>
            </section>

            {/* Freelancer Profile */}
            <section className="flex flex-col md:flex-row items-start gap-6 border-b pb-8" style={{ borderBottomColor: "#e7bdb8" }}>
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 overflow-hidden flex items-center justify-center" style={{ borderColor: "#ffffff", background: "#ffdad6" }}>
                  <span className="material-symbols-outlined text-[48px]" style={{ color: "#b90014" }}>account_circle</span>
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ background: "#1dbf73", borderColor: "#ffffff" }}>
                  <span className="material-symbols-outlined text-white text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-[24px] font-semibold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Aditya Pratama</h2>
                <UniversityBadge name="Universitas Indonesia" />
                <p className="text-[14px] leading-5" style={{ color: "#5d3f3c" }}>Jurusan: Desain Komunikasi Visual</p>
              </div>
            </section>

            {/* Reputation Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: "98%", label: "Job Success", color: "#b90014" },
                { value: "100%", label: "Ketepatan Waktu", color: "#fd8b00" },
                { value: "42", label: "Proyek Selesai", color: "#0057b9" },
              ].map((stat) => (
                <div key={stat.label} className="p-6 rounded-xl border flex flex-col items-center text-center" style={{ background: "#f4f3f5", borderColor: "#e7bdb8" }}>
                  <span className="text-[32px] font-bold leading-10" style={{ color: stat.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</span>
                  <span className="text-[14px] font-semibold uppercase tracking-[0.05em] mt-2" style={{ color: "#5d3f3c" }}>{stat.label}</span>
                </div>
              ))}
            </section>

            {/* About */}
            <section>
              <h3 className="text-[24px] font-semibold mb-4" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Tentang Layanan Ini</h3>
              <p className="text-[16px] leading-6 mb-4" style={{ color: "#5d3f3c" }}>
                Apakah Anda sedang membangun startup atau mengembangkan UMKM? Logo adalah wajah pertama yang dilihat oleh pelanggan Anda. Saya menawarkan jasa desain logo yang tidak hanya estetik, tetapi juga fungsional dan bermakna.
              </p>
              <ul className="space-y-2">
                {["Konsep original, bukan template.", "Filosofi warna dan bentuk yang sesuai target pasar.", "File master resolusi tinggi (AI, SVG, PDF)."].map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ color: "#5d3f3c" }}>
                    <span className="material-symbols-outlined text-[20px]" style={{ color: "#b90014" }}>check_circle</span>
                    <span className="text-[16px] leading-6">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Portfolio Grid */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[24px] font-semibold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Portofolio Lainnya</h3>
                <Link href="#" className="text-[14px] font-semibold hover:underline" style={{ color: "#b90014" }}>Lihat Semua</Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {portfolioItems.map((item) => (
                  <div key={item.title} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer" style={{ background: item.bg }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[48px] opacity-30" style={{ color: "#1a1c1e" }}>palette</span>
                    </div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center" style={{ background: "rgba(185,0,20,0.8)" }}>
                      <span className="text-white text-[14px] font-semibold">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right Sidebar (Sticky Booking) ── */}
          <aside className="w-full lg:w-[400px]">
            <div className="sticky top-24 border rounded-2xl overflow-hidden shadow-xl" style={{ background: "#ffffff", borderColor: "#e7bdb8" }}>
              {/* Package Tabs */}
              <div className="flex border-b" style={{ background: "#f4f3f5", borderBottomColor: "#e7bdb8" }}>
                {(["basic", "standard", "premium"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 py-4 text-[14px] font-semibold tracking-[0.05em] capitalize transition-all"
                    style={activeTab === tab
                      ? { color: "#b90014", borderBottom: "2px solid #b90014", background: "#ffffff" }
                      : { color: "#5d3f3c" }
                    }
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Package Content */}
              <div className="p-8 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[24px] font-semibold" style={{ color: "#b90014", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{pkg.price}</span>
                  <span className="px-3 py-1 rounded-full text-[12px] font-medium" style={{ background: pkg.badgeBg, color: pkg.badgeColor }}>{pkg.badge}</span>
                </div>
                <p className="text-[14px] leading-5" style={{ color: "#5d3f3c" }}>{pkg.desc}</p>
                <div className="space-y-3">
                  {pkg.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[18px]" style={{ color: "#1dbf73" }}>check</span>
                      <span className="text-[14px] leading-5" style={{ color: "#1a1c1e" }}>{f}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-3" style={{ color: "#5d3f3c" }}>
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="text-[14px] leading-5">Delivery: {pkg.delivery}</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="w-full text-white text-center py-4 rounded-xl text-[18px] font-semibold transition-all hover:shadow-lg active:scale-[0.98]"
                  style={{ background: "#b90014" }}
                >
                  Pesan &amp; Amankan Escrow
                </button>

                <div className="flex items-center justify-center gap-4" style={{ color: "#5d3f3c" }}>
                  <button className="flex items-center gap-1 text-[12px] font-medium hover:text-[#b90014] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">favorite</span> Simpan
                  </button>
                  <span className="w-px h-4" style={{ background: "#e7bdb8" }} />
                  <button className="flex items-center gap-1 text-[12px] font-medium hover:text-[#b90014] transition-colors">
                    <span className="material-symbols-outlined text-[18px]">share</span> Bagikan
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* ── Order & Escrow Checkout Modal ── */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}>
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl space-y-6 relative border" style={{ borderColor: "#e7bdb8" }}>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl" style={{ background: "#ffdad6", color: "#b90014" }}>
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div>
                <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Konfirmasi Pesanan &amp; Escrow</h3>
                <p className="text-[12px]" style={{ color: "#5d3f3c" }}>Dana Anda 100% Aman di Sistem SkillRent Escrow</p>
              </div>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl border space-y-2" style={{ background: "#faf9fb", borderColor: "#e7bdb8" }}>
              <div className="flex justify-between text-[14px]">
                <span style={{ color: "#5d3f3c" }}>Paket Layanan</span>
                <strong className="capitalize" style={{ color: "#1a1c1e" }}>{activeTab} Package</strong>
              </div>
              <div className="flex justify-between text-[14px]">
                <span style={{ color: "#5d3f3c" }}>Freelancer</span>
                <strong style={{ color: "#1a1c1e" }}>Aditya Pratama (UI)</strong>
              </div>
              <div className="flex justify-between text-[16px] font-bold pt-2 border-t" style={{ borderTopColor: "#efedf0" }}>
                <span style={{ color: "#1a1c1e" }}>Total Biaya</span>
                <span style={{ color: "#b90014" }}>{pkg.price}</span>
              </div>
            </div>

            {/* Brief Notes */}
            <div className="space-y-2">
              <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Catatan Tambahan untuk Freelancer (Opsional)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Contoh: Tolong buatkan warna dominan Biru dan Oranye..."
                rows={2}
                className="w-full p-3 text-[14px] rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#b90014]"
                style={{ borderColor: "#e7bdb8" }}
              />
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Metode Pembayaran</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "bca", name: "Bank BCA" },
                  { id: "mandiri", name: "Bank Mandiri" },
                  { id: "qris", name: "QRIS / GoPay" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className="p-3 rounded-xl border text-[13px] font-semibold text-center transition-all"
                    style={paymentMethod === m.id
                      ? { borderColor: "#b90014", background: "#ffdad6", color: "#b90014" }
                      : { borderColor: "#e7bdb8", background: "#ffffff", color: "#5d3f3c" }
                    }
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <div className="p-3 rounded-xl flex items-center gap-2 text-[12px]" style={{ background: "#ebf5ff", color: "#0057b9" }}>
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Pembayaran tidak langsung diberikan ke freelancer sampai Anda menyetujui hasil kerja.</span>
            </div>

            {/* Action */}
            {orderSuccess ? (
              <div className="p-4 rounded-xl text-center text-white font-bold animate-bounce" style={{ background: "#1dbf73" }}>
                ✅ Pembayaran Berhasil! Mengarahkan ke Workspace...
              </div>
            ) : (
              <button
                onClick={handleConfirmOrder}
                disabled={isProcessing}
                className="w-full text-white py-4 rounded-xl text-[16px] font-semibold transition-all hover:opacity-90 active:scale-95 flex items-center justify-center gap-2"
                style={{ background: "#b90014" }}
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin material-symbols-outlined">refresh</span>
                    Memproses Escrow...
                  </>
                ) : (
                  `Konfirmasi & Bayar ke Escrow (${pkg.price})`
                )}
              </button>
            )}
          </div>
        </div>
      )}

      <Footer />
      <MobileBottomNav active="projects" />
      <div className="h-16 md:hidden" />
    </>
  );
}
