"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import UniversityBadge from "@/components/UniversityBadge";

interface FreelancerCandidate {
  id: string;
  name: string;
  university: string;
  major: string;
  rating: number;
  reviews: number;
  isVerified: boolean;
  price: string;
  photo: string;
  categories: string[];
  skills: string[];
  portfolioHighlights: string[];
}

const ALL_STUDENT_FREELANCERS: FreelancerCandidate[] = [
  // Programming & Web/Mobile Dev
  {
    id: "f1",
    name: "Bagas Wirawan",
    university: "ITS Surabaya",
    major: "Teknik Informatika (Semester 6)",
    rating: 5.0,
    reviews: 78,
    isVerified: true,
    price: "Rp 3.500.000",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    categories: ["Web Development", "Programming & Tech", "Umum"],
    skills: ["Flutter", "React Native", "Next.js", "GPS & Maps API", "REST API"],
    portfolioHighlights: ["Aplikasi Absensi GPS Retail", "E-Commerce Mobile App", "Web Dashboard Admin"],
  },
  {
    id: "f2",
    name: "Rizky Ramadhan",
    university: "Universitas Indonesia",
    major: "Ilmu Komputer (Semester 8)",
    rating: 4.9,
    reviews: 94,
    isVerified: true,
    price: "Rp 4.000.000",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    categories: ["Web Development", "Programming & Tech", "Umum"],
    skills: ["Fullstack Web", "Node.js", "Python Backend", "Database SQL"],
    portfolioHighlights: ["Sistem Informasi Akademik Kampus", "Web SaaS Startup"],
  },

  // Graphic Design & Branding
  {
    id: "f3",
    name: "Aditya Pratama",
    university: "ITB Bandung",
    major: "Desain Komunikasi Visual (Semester 6)",
    rating: 4.9,
    reviews: 124,
    isVerified: true,
    price: "Rp 1.500.000",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    categories: ["Graphic Design", "Graphics & Design", "Umum"],
    skills: ["Logo Minimalis", "Brand Identity", "Packaging Box", "Adobe Illustrator"],
    portfolioHighlights: ["Branding Kopi Senja", "Desain Kemasan Modern", "Katalog Produk UMKM"],
  },
  {
    id: "f4",
    name: "Siti Aminah",
    university: "UGM Yogyakarta",
    major: "Desain Grafis (Semester 6)",
    rating: 4.8,
    reviews: 86,
    isVerified: true,
    price: "Rp 1.200.000",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    categories: ["Graphic Design", "Graphics & Design", "Umum"],
    skills: ["Vector Mascot", "Icon Set Custom", "Branding Kit", "Illustrator & Photoshop"],
    portfolioHighlights: ["Maskot Gaming Mascot", "Visual Kit Campaign"],
  },

  // Data Analytics & AI
  {
    id: "f5",
    name: "Dewi Lestari",
    university: "IPB University",
    major: "Statistika & Data Science (Semester 8)",
    rating: 4.95,
    reviews: 52,
    isVerified: true,
    price: "Rp 2.000.000",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
    categories: ["Data Analytics", "Data Analytics & AI", "Umum"],
    skills: ["Tableau Dashboard", "Google Looker Studio", "SPSS", "Python Data Science", "Excel Advanced"],
    portfolioHighlights: ["Dashboard Visualisasi 50k Data Sales", "Analisis Regresi Bisnis"],
  },
  {
    id: "f6",
    name: "Kevin Sanjaya",
    university: "ITS Surabaya",
    major: "Sains Data (Semester 6)",
    rating: 4.85,
    reviews: 38,
    isVerified: true,
    price: "Rp 1.800.000",
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    categories: ["Data Analytics", "Data Analytics & AI", "Umum"],
    skills: ["Power BI", "SQL Queries", "R Statistics", "Machine Learning Model"],
    portfolioHighlights: ["Prediction Model Churn Customer", "Automated Excel Report"],
  },

  // Video Editing & Animation
  {
    id: "f7",
    name: "Faris Al-Fatih",
    university: "Telkom University",
    major: "Broadcasting & Digital Media (Semester 6)",
    rating: 4.9,
    reviews: 110,
    isVerified: true,
    price: "Rp 1.500.000",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
    categories: ["Video Editing", "Video Editing & Animation", "Video & Animation", "Umum"],
    skills: ["Editing TikTok & Reels", "Commercial Video", "Motion Graphic", "After Effects", "Premiere Pro"],
    portfolioHighlights: ["Iklan Skincare Commercial Viral 1M+ Views", "Video Promosi Produk"],
  },

  // Digital Marketing & Content Writing
  {
    id: "f8",
    name: "Clara Amanda",
    university: "Universitas Airlangga",
    major: "Ilmu Komunikasi (Semester 6)",
    rating: 4.7,
    reviews: 64,
    isVerified: true,
    price: "Rp 1.800.000",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    categories: ["Digital Marketing", "Writing & Translation", "Umum"],
    skills: ["Copywriting SEO", "Instagram Content Strategy", "TikTok Campaign", "Artikel 1000 Kata"],
    portfolioHighlights: ["10 Artikel Blog SEO Teknologi", "Campaign Instagram Launching Produk"],
  },
];

export default function DynamicRecommendationsPage() {
  const [selectedUniv, setSelectedUniv] = useState("Semua Universitas");
  const [minRating, setMinRating] = useState("Semua");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [activeBrief, setActiveBrief] = useState<{
    inputText?: string;
    category?: string;
    budget?: string;
    deadline?: string;
  } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("skillrent_active_brief");
      if (saved) {
        try {
          setActiveBrief(JSON.parse(saved));
        } catch {}
      }
    }
  }, []);

  const handleResetFilters = () => {
    setSelectedUniv("Semua Universitas");
    setMinRating("Semua");
    setOnlyVerified(false);
  };

  // Dynamic Matching Algorithm based on Active Brief
  const briefCategory = activeBrief?.category || "Graphic Design";
  const briefText = (activeBrief?.inputText || "").toLowerCase();

  const rankedCandidates = ALL_STUDENT_FREELANCERS.map((candidate) => {
    let score = 75; // base score

    // Category match score
    const categoryMatch = candidate.categories.some(
      (cat) =>
        cat.toLowerCase().includes(briefCategory.toLowerCase()) ||
        briefCategory.toLowerCase().includes(cat.toLowerCase())
    );

    if (categoryMatch) {
      score += 20;
    }

    // Keyword match score from input text
    let keywordHits = 0;
    candidate.skills.concat(candidate.portfolioHighlights).forEach((kw) => {
      if (briefText.includes(kw.toLowerCase())) {
        keywordHits += 1;
      }
    });

    score += Math.min(keywordHits * 3, 9);

    // Rating bonus
    if (candidate.rating >= 4.9) score += 2;

    const matchPercentage = Math.min(score, 99);

    // Dynamic AI Reasons customized for this specific candidate & brief
    const dynamicReasons: string[] = [];

    if (categoryMatch) {
      dynamicReasons.push(`Spesialis ${candidate.categories[0]} terverifikasi kampus`);
    } else {
      dynamicReasons.push(`Talenta berprestasi dengan rating ${candidate.rating}/5.0`);
    }

    if (keywordHits > 0) {
      const matchedSkill = candidate.skills.find((s) => briefText.includes(s.toLowerCase())) || candidate.skills[0];
      dynamicReasons.push(`Keahlian ${matchedSkill} sangat sesuai dengan brief Anda`);
    } else {
      dynamicReasons.push(`Keahlian ${candidate.skills.slice(0, 2).join(" & ")} teruji`);
    }

    if (activeBrief?.budget && activeBrief.budget !== "Belum disebutkan") {
      dynamicReasons.push(`Harga ${candidate.price} masuk dalam estimasi budget (${activeBrief.budget})`);
    } else {
      dynamicReasons.push(`Penawaran harga transparan & siap pengerjaan`);
    }

    if (activeBrief?.deadline && activeBrief.deadline !== "Tentukan di deskripsi") {
      dynamicReasons.push(`Siap penyelesaian tepat waktu dalam ${activeBrief.deadline}`);
    }

    return {
      ...candidate,
      matchPercentage,
      dynamicReasons,
    };
  });

  // Sort by highest match rate first!
  rankedCandidates.sort((a, b) => b.matchPercentage - a.matchPercentage);

  // Active Filter Calculation
  const filteredCandidates = rankedCandidates.filter((f) => {
    if (selectedUniv !== "Semua Universitas" && !f.university.toLowerCase().includes(selectedUniv.toLowerCase())) {
      return false;
    }
    if (minRating === "4.5+" && f.rating < 4.5) return false;
    if (minRating === "4.0+" && f.rating < 4.0) return false;
    if (onlyVerified && !f.isVerified) return false;

    return true;
  });

  return (
    <>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 min-h-screen">
        {/* Top Header Banner: AI Recommendation Summary */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8 border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #faf9fb 100%)",
            borderColor: "#adc7ff",
          }}
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2" style={{ color: "#0057b9" }}>
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              <h1
                className="text-[22px] md:text-[26px] font-bold"
                style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Rekomendasi Mahasiswa Berdasarkan Brief AI Anda
              </h1>
            </div>

            <p className="text-[16px] md:text-[18px] font-semibold max-w-2xl line-clamp-2" style={{ color: "#40161c" }}>
              {activeBrief?.inputText ? `"${activeBrief.inputText}"` : '"Desain Logo & Identitas Brand Startup EduTech"'}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-[#ebf5ff] text-[#0057b9]">
                Kategori Brief: {briefCategory}
              </span>
              <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-gray-100 text-gray-700">
                Budget: {activeBrief?.budget || "Rp 4.500.000"}
              </span>
              <span className="px-3 py-1 rounded-full text-[12px] font-semibold bg-gray-100 text-gray-700">
                Deadline: {activeBrief?.deadline || "2 Minggu"}
              </span>
              <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                {filteredCandidates.length} Mahasiswa Cocok Ditemukan
              </span>
            </div>
          </div>

          <Link
            href="/brief"
            className="px-5 py-2.5 rounded-xl border-2 font-semibold text-[13px] flex items-center justify-center gap-2 shrink-0 transition-colors hover:bg-white bg-white/80"
            style={{ borderColor: "#0057b9", color: "#0057b9" }}
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            Ubah / Buat Brief Baru
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="space-y-8 sticky top-24">
              {/* Filter: Universitas */}
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-wider mb-3" style={{ color: "#5d3f3c" }}>
                  Universitas
                </h3>
                <select
                  value={selectedUniv}
                  onChange={(e) => setSelectedUniv(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-[14px] outline-none bg-white cursor-pointer"
                  style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}
                >
                  <option>Semua Universitas</option>
                  <option>ITS Surabaya</option>
                  <option>Universitas Indonesia</option>
                  <option>ITB Bandung</option>
                  <option>UGM Yogyakarta</option>
                  <option>IPB University</option>
                  <option>Telkom University</option>
                  <option>Universitas Airlangga</option>
                </select>
              </div>

              {/* Filter: Rating Minimum */}
              <div>
                <h3 className="text-[13px] font-semibold uppercase tracking-wider mb-3" style={{ color: "#5d3f3c" }}>
                  Rating Minimum
                </h3>
                <div className="space-y-2">
                  {["Semua", "4.5+", "4.0+"].map((r) => (
                    <label key={r} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="ratingFilter"
                        checked={minRating === r}
                        onChange={() => setMinRating(r)}
                        className="w-4 h-4 accent-[#b90014] cursor-pointer"
                      />
                      <span className="text-[14px] group-hover:text-[#b90014] transition-colors" style={{ color: "#1a1c1e" }}>
                        {r === "Semua" ? "Semua Rating" : `Bintang ${r}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter: Verifikasi KTM */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={onlyVerified}
                    onChange={(e) => setOnlyVerified(e.target.checked)}
                    className="rounded w-4 h-4 accent-[#b90014] cursor-pointer"
                  />
                  <span className="text-[14px] font-semibold group-hover:text-[#b90014] transition-colors" style={{ color: "#1a1c1e" }}>
                    Hanya Verifikasi SSO Kampus
                  </span>
                </label>
              </div>

              {(selectedUniv !== "Semua Universitas" || minRating !== "Semua" || onlyVerified) && (
                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 text-[13px] font-semibold rounded-xl transition-colors hover:bg-gray-200"
                  style={{ background: "#efedf0", color: "#1a1c1e" }}
                >
                  Reset Filter
                </button>
              )}
            </div>
          </aside>

          {/* Candidates Grid */}
          <div className="flex-1 w-full space-y-6">
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="p-6 md:p-8 rounded-3xl border bg-white shadow-xs transition-all hover:shadow-md flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
                  style={{ borderColor: candidate.matchPercentage >= 95 ? "#adc7ff" : "#e7bdb8" }}
                >
                  <div className="flex items-start md:items-center gap-5">
                    <div className="relative shrink-0">
                      <img
                        src={candidate.photo}
                        alt={candidate.name}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover shadow-sm"
                      />
                      {candidate.isVerified && (
                        <div
                          className="absolute -bottom-1 -right-1 p-1 rounded-full border-2 bg-[#1dbf73] text-white flex items-center justify-center"
                          style={{ borderColor: "#ffffff" }}
                          title="SSO Kampus Terverifikasi"
                        >
                          <span className="material-symbols-outlined text-[14px]">verified</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>
                          {candidate.name}
                        </h3>
                        <span className="px-3 py-1 rounded-full text-[12px] font-extrabold bg-[#ebf5ff] text-[#0057b9]">
                          {candidate.matchPercentage}% Match AI
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <UniversityBadge name={candidate.university} />
                        <span className="text-[13px] text-gray-500 font-medium">{candidate.major}</span>
                      </div>

                      <div className="flex items-center gap-3 text-[13px]">
                        <span className="font-bold text-amber-600 flex items-center gap-1">
                          ⭐ {candidate.rating} ({candidate.reviews} Ulasan)
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="font-bold text-[#b90014]">{candidate.price}</span>
                      </div>

                      {/* AI Matching Reasons */}
                      <div className="pt-2 space-y-1">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                          Alasan Rekomendasi AI:
                        </p>
                        <ul className="space-y-1">
                          {candidate.dynamicReasons.slice(0, 3).map((reason, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-[13px] text-gray-700">
                              <span className="material-symbols-outlined text-[16px] text-emerald-600">check_circle</span>
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                    <Link
                      href={`/order/1/chat`}
                      className="px-6 py-3 rounded-xl text-white font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95 text-center"
                      style={{ background: "#b90014" }}
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      Sewa &amp; Diskusi Proyek
                    </Link>
                    <Link
                      href={`/dashboard`}
                      className="px-6 py-2.5 rounded-xl border text-[13px] font-semibold text-center hover:bg-gray-50"
                      style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}
                    >
                      Lihat Profil &amp; Portofolio
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 rounded-3xl text-center border space-y-4 bg-white" style={{ borderColor: "#e7bdb8" }}>
                <span className="material-symbols-outlined text-[48px]" style={{ color: "#b90014" }}>search_off</span>
                <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Mahasiswa Tidak Ditemukan</h3>
                <p className="text-[14px]" style={{ color: "#5d3f3c" }}>Coba sesuaikan filter universitas atau kriteria rating Anda.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 text-white font-bold text-[14px] rounded-xl"
                  style={{ background: "#b90014" }}
                >
                  Reset Semua Filter
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav active="brief" />
    </>
  );
}
