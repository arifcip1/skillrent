"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import GigCard from "@/components/GigCard";
import { useAuth } from "@/lib/AuthContext";

const SAMPLE_GIGS = [
  {
    id: "1",
    title: "Logo Minimalis Modern untuk Startup Teknologi & Bisnis",
    sellerName: "Aditya Pratama",
    sellerUniversity: "Universitas Indonesia",
    rating: 4.9,
    reviewCount: 124,
    price: "Rp 250rb",
    category: "Graphics & Design",
    isTrending: true,
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Desain Logo Maskot & Karakter Custom untuk Gaming & Brand",
    sellerName: "Siti Aminah",
    sellerUniversity: "ITB",
    rating: 4.8,
    reviewCount: 89,
    price: "Rp 400rb",
    category: "Graphics & Design",
    isTrending: true,
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Pengembangan Website Next.js & Tailwind Responsif Modern",
    sellerName: "Bagas Wirawan",
    sellerUniversity: "ITS",
    rating: 5.0,
    reviewCount: 78,
    price: "Rp 1,5 Jt",
    category: "Programming & Tech",
    isTrending: true,
    imageUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Jasa Pembuatan Aplikasi Mobile React Native iOS & Android",
    sellerName: "Rizky Hakim",
    sellerUniversity: "Universitas Indonesia",
    rating: 4.9,
    reviewCount: 42,
    price: "Rp 2,8 Jt",
    category: "Programming & Tech",
    isTrending: false,
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Kelola Instagram & TikTok Professional (30 Feed + 10 Reels)",
    sellerName: "Clara Amanda",
    sellerUniversity: "Universitas Airlangga",
    rating: 4.7,
    reviewCount: 95,
    price: "Rp 850rb",
    category: "Digital Marketing",
    isTrending: true,
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    title: "Editing Video Commercial TikTok, Reels & Shorts Engaging",
    sellerName: "Faris Al-Fatih",
    sellerUniversity: "Telkom University",
    rating: 4.9,
    reviewCount: 110,
    price: "Rp 350rb",
    category: "Video & Animation",
    isTrending: true,
    imageUrl:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    title: "Penulisan Artikel SEO, Copywriting Landing Page & Jurnal",
    sellerName: "Nabila Putri",
    sellerUniversity: "UGM",
    rating: 4.8,
    reviewCount: 64,
    price: "Rp 150rb",
    category: "Writing & Translation",
    isTrending: false,
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    title: "Analisis Data Statistik SPSS, R & Visualisasi Dashboard Tableau",
    sellerName: "Dewi Lestari",
    sellerUniversity: "IPB University",
    rating: 4.6,
    reviewCount: 38,
    price: "Rp 500rb",
    category: "Data & AI",
    isTrending: false,
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "9",
    title: "Jingle Musik Brand, Sound Design & Audio Editing Podcast",
    sellerName: "Aris Munandar",
    sellerUniversity: "ISI Yogyakarta",
    rating: 4.9,
    reviewCount: 27,
    price: "Rp 600rb",
    category: "Music & Audio",
    isTrending: false,
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "10",
    title: "Paket Branding Lengkap: Logo, Kartu Nama & Social Media Kit",
    sellerName: "Farah Quinn",
    sellerUniversity: "UGM",
    rating: 5.0,
    reviewCount: 56,
    price: "Rp 750rb",
    category: "Graphics & Design",
    isTrending: true,
    imageUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORIES = [
  "Semua Kategori",
  "Trending 🔥",
  "Graphics & Design",
  "Programming & Tech",
  "Digital Marketing",
  "Video & Animation",
  "Writing & Translation",
  "Music & Audio",
  "Data & AI",
];

function BrowseContent() {
  const { profile } = useAuth();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [selectedUnivs, setSelectedUnivs] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Semua Tipe");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [hasActiveBrief, setHasActiveBrief] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("skillrent_active_brief");
      if (saved) setHasActiveBrief(true);
    }
  }, []);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("Semua Kategori");
    setSelectedUnivs([]);
    setSelectedType("Semua Tipe");
    setMinPrice("");
    setMaxPrice("");
  };

  const toggleUniv = (univ: string) => {
    setSelectedUnivs((prev) =>
      prev.includes(univ) ? prev.filter((u) => u !== univ) : [...prev, univ]
    );
  };

  // Live Filter Calculation
  const filteredGigs = SAMPLE_GIGS.filter((gig) => {
    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = gig.title.toLowerCase().includes(q);
      const matchSeller = gig.sellerName.toLowerCase().includes(q);
      const matchUniv = gig.sellerUniversity.toLowerCase().includes(q);
      const matchCategory = gig.category.toLowerCase().includes(q);
      if (!matchTitle && !matchSeller && !matchUniv && !matchCategory) return false;
    }

    // Category Filter
    if (selectedCategory !== "Semua Kategori") {
      if (selectedCategory === "Trending 🔥") {
        if (!gig.isTrending) return false;
      } else if (gig.category !== selectedCategory) {
        return false;
      }
    }

    // University Filter
    if (selectedUnivs.length > 0) {
      const matchesUniv = selectedUnivs.some(
        (u) => gig.sellerUniversity.toLowerCase().includes(u.toLowerCase()) || u.toLowerCase().includes(gig.sellerUniversity.toLowerCase())
      );
      if (!matchesUniv) return false;
    }

    // Service Type Filter
    if (selectedType !== "Semua Tipe") {
      if (selectedType === "Minimalis" && !gig.title.toLowerCase().includes("minimalis")) return false;
      if (selectedType === "Maskot / Ilustrasi" && !gig.title.toLowerCase().includes("maskot") && !gig.title.toLowerCase().includes("karakter")) return false;
    }

    // Price Filter
    const numericPrice = parseFloat(gig.price.replace(/[^0-9,.]/g, "").replace(",", ".")) * (gig.price.includes("Jt") ? 1000000 : 1000);
    if (minPrice && numericPrice < parseFloat(minPrice)) return false;
    if (maxPrice && numericPrice > parseFloat(maxPrice)) return false;

    return true;
  });

  return (
    <>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 min-h-screen">
        {/* Header Banner: Welcome Back or Personalized Greeting */}
        <div
          className="rounded-2xl p-6 md:p-8 mb-8 border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #faf9fb 100%)",
            borderColor: "#e7bdb8",
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2" style={{ color: "#b90014" }}>
              <span className="material-symbols-outlined text-[24px]">waving_hand</span>
              <span className="text-[12px] font-bold uppercase tracking-wider">
                PLATFORM TALENTA MAHASISWA
              </span>
            </div>
            <h1
              className="text-[28px] md:text-[36px] font-bold"
              style={{
                color: "#1a1c1e",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              {profile?.full_name ? `Welcome back, ${profile.full_name}! 👋` : "Telusuri Layanan Bakat Mahasiswa"}
            </h1>
            <p className="text-[15px] leading-6 max-w-2xl" style={{ color: "#5d3f3c" }}>
              Dapatkan layanan profesional karya mahasiswa terverifikasi dari kampus ternama seluruh Indonesia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            {/* Search Bar in Header */}
            <div className="relative w-full sm:w-64 md:w-72">
              <span
                className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px]"
                style={{ color: "#5d3f3c" }}
              >
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari jasa / mahasiswa..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] outline-none border transition-all shadow-sm"
                style={{
                  background: "#ffffff",
                  borderColor: "#e7bdb8",
                  color: "#1a1c1e",
                }}
              />
            </div>

            {/* AI Brief Button */}
            {hasActiveBrief ? (
              <Link
                href="/recommendations"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-white font-semibold text-[13px] flex items-center justify-center gap-2 shrink-0 shadow-md transition-transform active:scale-95 whitespace-nowrap"
                style={{ background: "#0057b9" }}
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Rekomendasi Brief AI
              </Link>
            ) : (
              <Link
                href="/brief"
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-white font-semibold text-[13px] flex items-center justify-center gap-2 shrink-0 shadow-md transition-transform active:scale-95 whitespace-nowrap"
                style={{ background: "#b90014" }}
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                Buat Brief AI
              </Link>
            )}
          </div>
        </div>

        {/* Filter Reset Status Bar (if any filter is active) */}
        {(searchQuery || selectedCategory !== "Semua Kategori" || selectedUnivs.length > 0 || minPrice || maxPrice || selectedType !== "Semua Tipe") && (
          <div className="mb-6 flex items-center justify-between p-3.5 rounded-xl bg-white border shadow-sm" style={{ borderColor: "#e7bdb8" }}>
            <span className="text-[13px] font-semibold" style={{ color: "#5d3f3c" }}>
              Menampilkan {filteredGigs.length} jasa berdasarkan filter Anda
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[12px] font-bold text-[#b90014] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">restart_alt</span>
              Reset Semua Filter
            </button>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="space-y-8 sticky top-24">
              {/* Filter Section: Category */}
              <div>
                <h3
                  className="text-[14px] font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "#5d3f3c" }}
                >
                  Kategori Layanan
                </h3>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full text-left px-3 py-2 rounded-xl text-[14px] font-medium transition-all flex items-center justify-between hover:bg-[#efedf0]"
                      style={
                        selectedCategory === cat
                          ? { background: "#b90014", color: "#ffffff", fontWeight: 700 }
                          : { color: "#1a1c1e" }
                      }
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Section: University */}
              <div>
                <h3
                  className="text-[14px] font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "#5d3f3c" }}
                >
                  Universitas
                </h3>
                <div className="space-y-3">
                  {["Universitas Indonesia", "ITB", "UGM", "ITS", "Telkom University", "Universitas Airlangga", "IPB University"].map((univ) => (
                    <label key={univ} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedUnivs.includes(univ)}
                        onChange={() => toggleUniv(univ)}
                        className="rounded w-5 h-5 accent-[#b90014] cursor-pointer"
                      />
                      <span
                        className="text-[14px] group-hover:text-[#b90014] transition-colors"
                        style={{ color: "#1a1c1e" }}
                      >
                        {univ}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Section: Service Type */}
              <div>
                <h3
                  className="text-[14px] font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "#5d3f3c" }}
                >
                  Tipe Layanan
                </h3>
                <div className="space-y-3">
                  {["Semua Tipe", "Minimalis", "Maskot / Ilustrasi"].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="serviceType"
                        checked={selectedType === type}
                        onChange={() => setSelectedType(type)}
                        className="w-5 h-5 accent-[#b90014] cursor-pointer"
                      />
                      <span
                        className="text-[16px] group-hover:text-[#b90014] transition-colors"
                        style={{ color: "#1a1c1e" }}
                      >
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filter Section: Price Range */}
              <div>
                <h3
                  className="text-[14px] font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "#5d3f3c" }}
                >
                  Rentang Harga
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px]"
                        style={{ color: "#5d3f3c" }}
                      >
                        Rp
                      </span>
                      <input
                        type="text"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full pl-8 pr-2 py-2 rounded-lg border text-[14px] outline-none"
                        style={{ borderColor: "#e7bdb8", background: "#ffffff" }}
                      />
                    </div>
                    <span style={{ color: "#926e6b" }}>-</span>
                    <div className="relative flex-1">
                      <span
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px]"
                        style={{ color: "#5d3f3c" }}
                      >
                        Rp
                      </span>
                      <input
                        type="text"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full pl-8 pr-2 py-2 rounded-lg border text-[14px] outline-none"
                        style={{ borderColor: "#e7bdb8", background: "#ffffff" }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleResetFilters}
                    className="w-full py-2 text-[14px] font-semibold rounded-lg transition-colors hover:bg-[#e3e2e4]"
                    style={{ background: "#efedf0", color: "#1a1c1e" }}
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <div className="flex-1 w-full">
            {filteredGigs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGigs.map((gig) => (
                  <GigCard key={gig.id} {...gig} />
                ))}
              </div>
            ) : (
              <div className="p-12 rounded-3xl text-center border space-y-4 bg-white" style={{ borderColor: "#e7bdb8" }}>
                <span className="material-symbols-outlined text-[48px]" style={{ color: "#b90014" }}>search_off</span>
                <h3 className="text-[20px] font-bold" style={{ color: "#1a1c1e" }}>Jasa Tidak Ditemukan</h3>
                <p className="text-[14px]" style={{ color: "#5d3f3c" }}>Tidak ada layanan mahasiswa yang sesuai dengan kombinasi kata kunci atau filter Anda.</p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 text-white font-bold text-[14px] rounded-xl"
                  style={{ background: "#b90014" }}
                >
                  Reset Semua Filter
                </button>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors hover:bg-[#efedf0]" style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold" style={{ background: "#b90014" }}>
                1
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors hover:bg-[#efedf0]" style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}>
                2
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors hover:bg-[#efedf0]" style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}>
                3
              </button>
              <button className="w-10 h-10 rounded-lg flex items-center justify-center border transition-colors hover:bg-[#efedf0]" style={{ borderColor: "#e7bdb8", color: "#1a1c1e" }}>
                <span className="material-symbols-outlined">chevron_right</span>
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

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Memuat...</div>}>
      <BrowseContent />
    </Suspense>
  );
}
