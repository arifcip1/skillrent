"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import UniversityBadge from "@/components/UniversityBadge";

const RECOMMENDATIONS = [
  {
    id: 1,
    name: "Aditya Pratama",
    university: "Institut Teknologi Bandung",
    rating: 4.9,
    reviews: 124,
    matchRate: "98%",
    price: "Rp 4.500.000",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    reasons: [
      "Portfolio startup relevan (5+ proyek)",
      "Sesuai dengan budget brief",
      "Respon sangat cepat (< 1 jam)",
      "Pakar Brand Identity",
    ],
  },
  {
    id: 2,
    name: "Siti Nurbaya",
    university: "Universitas Indonesia",
    rating: 4.8,
    reviews: 86,
    matchRate: "92%",
    price: "Rp 3.200.000",
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    reasons: [
      "Spesialis Minimalist Design",
      "Harga sangat kompetitif",
      "Rating kepuasan klien 99%",
    ],
  },
  {
    id: 3,
    name: "Rizky Ramadhan",
    university: "Universitas Gadjah Mada",
    rating: 4.7,
    reviews: 42,
    matchRate: "85%",
    price: "Rp 6.000.000",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    reasons: [
      "Lulusan sertifikasi UI/UX Internasional",
      "Pernah menang lomba desain nasional",
    ],
  },
];

export default function RecommendationsPage() {
  const [selectedUniv, setSelectedUniv] = useState("Semua Universitas");
  const [minRating, setMinRating] = useState("4.5+");
  const [onlyVerified, setOnlyVerified] = useState(true);

  return (
    <>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 min-h-screen">
        {/* Top Header Banner: AI Recommendation Summary */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8 border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
          style={{
            background: "#ffffff",
            borderColor: "#adc7ff",
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2" style={{ color: "#0057b9" }}>
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <h1
                className="text-[24px] font-bold"
                style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Rekomendasi Berdasarkan Brief
              </h1>
            </div>
            <p className="text-[20px] font-semibold" style={{ color: "#40161c" }}>
              &quot;Desain Logo &amp; Identitas Brand Startup EduTech&quot;
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-[12px] font-medium" style={{ background: "#efedf0", color: "#5d3f3c" }}>
                Budget: Rp 5jt - 10jt
              </span>
              <span className="px-3 py-1 rounded-full text-[12px] font-medium" style={{ background: "#efedf0", color: "#5d3f3c" }}>
                Deadline: 2 Minggu
              </span>
              <span className="px-3 py-1 rounded-full text-[12px] font-medium" style={{ background: "#efedf0", color: "#5d3f3c" }}>
                Style: Modern, Energetic
              </span>
            </div>
          </div>

          <Link
            href="/brief"
            className="px-6 py-3 rounded-xl border-2 font-semibold text-[14px] flex items-center justify-center gap-2 shrink-0 transition-colors hover:bg-[#fff5f5]"
            style={{ borderColor: "#b90014", color: "#b90014" }}
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
            Edit Brief
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Filter Card */}
            <div className="p-6 rounded-2xl border bg-white shadow-sm space-y-6" style={{ borderColor: "#e7bdb8" }}>
              <h3 className="text-[14px] font-semibold uppercase tracking-wider" style={{ color: "#5d3f3c" }}>
                Filter Pencarian
              </h3>

              {/* University Select */}
              <div className="space-y-2">
                <label className="text-[13px] font-medium" style={{ color: "#1a1c1e" }}>
                  Universitas
                </label>
                <select
                  value={selectedUniv}
                  onChange={(e) => setSelectedUniv(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none"
                  style={{ borderColor: "#e7bdb8", background: "#ffffff" }}
                >
                  <option>Semua Universitas</option>
                  <option>Institut Teknologi Bandung</option>
                  <option>Universitas Indonesia</option>
                  <option>Universitas Gadjah Mada</option>
                </select>
              </div>

              {/* Min Rating */}
              <div className="space-y-2">
                <label className="text-[13px] font-medium" style={{ color: "#1a1c1e" }}>
                  Min. Rating
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["4.0+", "4.5+"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      className="py-2.5 rounded-xl font-semibold text-[14px] transition-all border"
                      style={
                        minRating === r
                          ? { background: "#b90014", color: "#ffffff", borderColor: "#b90014" }
                          : { background: "#efedf0", color: "#5d3f3c", borderColor: "transparent" }
                      }
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verified Only Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="w-5 h-5 rounded accent-[#b90014]"
                />
                <span className="text-[14px] font-medium" style={{ color: "#1a1c1e" }}>
                  Hanya Terverifikasi
                </span>
              </label>
            </div>

            {/* Premium Match Promo Box */}
            <div
              className="p-6 rounded-2xl text-white space-y-4 shadow-lg relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #40161c 0%, #63222b 100%)" }}
            >
              <h4 className="text-[20px] font-bold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Premium Match
              </h4>
              <p className="text-[14px] opacity-80 leading-relaxed">
                Dapatkan akses ke 1% freelancer mahasiswa terbaik dengan SkillRent Gold.
              </p>
              <button
                className="w-full py-3 rounded-xl font-semibold text-[14px] transition-transform active:scale-95 shadow-md"
                style={{ background: "#fd8b00", color: "#603100" }}
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </aside>

          {/* Freelancer Match Cards List */}
          <div className="lg:col-span-8 space-y-6">
            {RECOMMENDATIONS.map((f) => (
              <div
                key={f.id}
                className="rounded-2xl border overflow-hidden shadow-sm flex flex-col md:flex-row bg-white transition-all hover:shadow-md"
                style={{ borderColor: "#e7bdb8" }}
              >
                {/* Freelancer Image + Match Badge */}
                <div className="relative md:w-64 h-64 md:h-auto shrink-0 overflow-hidden">
                  <img
                    src={f.photo}
                    alt={f.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3.5 py-1.5 rounded-full text-[12px] font-bold text-white shadow-lg flex items-center gap-1"
                      style={{ background: "#1dbf73" }}
                    >
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        stars
                      </span>
                      {f.matchRate} Match
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-2">
                      <div>
                        <h3
                          className="text-[24px] font-bold mb-1"
                          style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {f.name}
                        </h3>
                        <div className="flex items-center gap-3 flex-wrap">
                          <UniversityBadge name={f.university} />
                          <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[18px]" style={{ color: "#fd8b00", fontVariationSettings: "'FILL' 1" }}>
                              star
                            </span>
                            <span className="text-[14px] font-bold" style={{ color: "#1a1c1e" }}>
                              {f.rating}
                            </span>
                            <span className="text-[12px]" style={{ color: "#5d3f3c" }}>
                              ({f.reviews})
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-left md:text-right mt-2 md:mt-0">
                        <span className="text-[12px] block" style={{ color: "#5d3f3c" }}>
                          Mulai dari
                        </span>
                        <span className="text-[24px] font-bold" style={{ color: "#b90014" }}>
                          {f.price}
                        </span>
                      </div>
                    </div>

                    {/* Mengapa Freelancer Ini? */}
                    <div className="p-4 rounded-xl mt-4" style={{ background: "#f4f3f5" }}>
                      <p className="text-[12px] font-bold uppercase tracking-wider mb-2" style={{ color: "#5d3f3c" }}>
                        Mengapa Freelancer Ini?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {f.reasons.map((r, i) => (
                          <div key={i} className="flex items-center gap-2 text-[13px]" style={{ color: "#1a1c1e" }}>
                            <span className="material-symbols-outlined text-[16px] shrink-0" style={{ color: "#1dbf73" }}>
                              check_circle
                            </span>
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4 pt-2">
                    <Link
                      href="/order/1/chat"
                      className="flex-1 py-3 rounded-xl border-2 font-semibold text-[14px] text-center transition-colors hover:bg-[#fff5f5]"
                      style={{ borderColor: "#b90014", color: "#b90014" }}
                    >
                      Ajak Diskusi
                    </Link>
                    <Link
                      href="/gig/1"
                      className="flex-1 py-3 rounded-xl text-white font-semibold text-[14px] text-center shadow-md transition-all active:scale-95 hover:opacity-90"
                      style={{ background: "#b90014" }}
                    >
                      Pesan
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button className="px-6 py-3 rounded-xl border font-semibold text-[14px] inline-flex items-center gap-2 hover:bg-[#efedf0]" style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}>
                Lihat Lebih Banyak
                <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav active="search" />
    </>
  );
}
