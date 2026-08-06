"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import GigCard from "@/components/GigCard";

const SAMPLE_GIGS = [
  {
    id: "1",
    title: "Logo Minimalis Modern untuk Startup Teknologi & Bisnis",
    sellerName: "Aditya Pratama",
    sellerUniversity: "Universitas Indonesia",
    rating: 4.9,
    reviewCount: 124,
    price: "Rp 250rb",
    imageUrl:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Desain Logo Maskot & Karakter Custom untuk Gaming",
    sellerName: "Siti Aminah",
    sellerUniversity: "ITB",
    rating: 4.8,
    reviewCount: 89,
    price: "Rp 400rb",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Paket Branding Lengkap: Logo, Kartu Nama & Social Media",
    sellerName: "Rizky Hakim",
    sellerUniversity: "Universitas Indonesia",
    rating: 5.0,
    reviewCount: 42,
    price: "Rp 750rb",
    imageUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Logo Futuristik & Cyberpunk untuk Brand Digital",
    sellerName: "Farah Quinn",
    sellerUniversity: "UGM",
    rating: 4.7,
    reviewCount: 56,
    price: "Rp 300rb",
    imageUrl:
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnivs, setSelectedUnivs] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("Semua Tipe");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleResetFilters = () => {
    setSearchQuery("");
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
      if (!matchTitle && !matchSeller && !matchUniv) return false;
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
    const numericPrice = parseInt(gig.price.replace(/[^0-9]/g, "")) * 1000;
    if (minPrice && numericPrice < parseInt(minPrice)) return false;
    if (maxPrice && numericPrice > parseInt(maxPrice)) return false;

    return true;
  });

  return (
    <>
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1
                className="text-[32px] font-bold leading-[40px] mb-2"
                style={{
                  color: "#1a1c1e",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {searchQuery ? `Hasil Pencarian untuk "${searchQuery}"` : "Telusuri Layanan Bakat Mahasiswa"}
              </h1>
              <p className="text-[16px] leading-[24px]" style={{ color: "#5d3f3c" }}>
                Dapatkan layanan profesional karya mahasiswa berbakat dari universitas ternama. ({filteredGigs.length} Jasa Ditemukan)
              </p>
            </div>

            {/* Quick Search Bar & Reset */}
            <div className="w-full md:w-auto flex items-center gap-3">
              <div className="relative w-full md:w-80">
                <span
                  className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px]"
                  style={{ color: "#5d3f3c" }}
                >
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari jasa, kategori, atau nama..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-[14px] outline-none border transition-all"
                  style={{
                    background: "#ffffff",
                    borderColor: "#e7bdb8",
                    color: "#1a1c1e",
                  }}
                />
              </div>

              {(searchQuery || selectedUnivs.length > 0 || minPrice || maxPrice || selectedType !== "Semua Tipe") && (
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2.5 rounded-xl border text-[13px] font-semibold flex items-center gap-1.5 shrink-0 transition-colors hover:bg-gray-100"
                  style={{ borderColor: "#b90014", color: "#b90014" }}
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  Reset Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* AI Matching Alert */}
        <div
          className="rounded-2xl p-4 mb-10 flex items-center gap-4 border"
          style={{
            background: "#d8e2ff",
            borderColor: "rgba(0, 87, 185, 0.2)",
            boxShadow: "0 0 20px rgba(0, 87, 185, 0.15)",
          }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: "#0057b9", color: "#ffffff" }}
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
          </div>
          <div>
            <p className="text-[14px] font-bold" style={{ color: "#001a41" }}>
              AI Rekomendasi
            </p>
            <p className="text-[14px]" style={{ color: "#004493" }}>
              Kami merekomendasikan mahasiswa terverifikasi ini berdasarkan kriteria Anda.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="space-y-8 sticky top-24">
              {/* Filter Section: University */}
              <div>
                <h3
                  className="text-[14px] font-semibold uppercase tracking-wider mb-4"
                  style={{ color: "#5d3f3c" }}
                >
                  Universitas
                </h3>
                <div className="space-y-3">
                  {["Universitas Indonesia", "ITB", "UGM"].map((univ) => (
                    <label key={univ} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedUnivs.includes(univ)}
                        onChange={() => toggleUniv(univ)}
                        className="rounded w-5 h-5 accent-[#b90014] cursor-pointer"
                      />
                      <span
                        className="text-[16px] group-hover:text-[#b90014] transition-colors"
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
