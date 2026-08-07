"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

function NavbarContent() {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navSearch, setNavSearch] = useState("");

  useEffect(() => {
    const q = searchParams.get("q");
    setNavSearch(q || "");
  }, [searchParams]);

  const handleInputChange = (val: string) => {
    setNavSearch(val);
    if (pathname === "/browse") {
      if (val.trim()) {
        router.replace(`/browse?q=${encodeURIComponent(val.trim())}`);
      } else {
        router.replace("/browse");
      }
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pathname !== "/browse") {
      router.push(navSearch.trim() ? `/browse?q=${encodeURIComponent(navSearch.trim())}` : "/browse");
    }
  };

  const isFreelancer = profile?.role === "freelancer";

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: "#fff", borderColor: "rgba(231,189,184,0.3)", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <nav className="flex justify-between items-center w-full px-4 md:px-12 py-3 max-w-[1280px] mx-auto gap-4">
        {/* Brand + Nav Links */}
        <div className="flex items-center gap-6 md:gap-8">
          <Link
            href={user ? "/browse" : "/"}
            className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90"
          >
            <img
              src="/logo.png"
              alt="SkillRent Logo"
              className="h-8 md:h-9 w-auto object-contain"
            />
            <span
              className="text-[22px] md:text-[24px] font-bold leading-none"
              style={{ color: "#b90014", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              SkillRent
            </span>
          </Link>

          {/* Role-Based Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/browse"
              className="text-[14px] font-semibold tracking-[0.03em] transition-colors duration-200 hover:text-[#b90014]"
              style={{ color: pathname === "/browse" ? "#b90014" : "#5d3f3c" }}
            >
              {isFreelancer ? "Pasar Jasa" : "Telusuri Jasa"}
            </Link>
            
            <Link
              href="/workspace"
              className="text-[14px] font-semibold tracking-[0.03em] transition-colors duration-200 hover:text-[#b90014]"
              style={{ color: pathname === "/workspace" ? "#b90014" : "#5d3f3c" }}
            >
              Workspace
            </Link>

            {!isFreelancer ? (
              <Link
                href="/brief"
                className="text-[14px] font-semibold tracking-[0.03em] transition-colors duration-200 hover:text-[#b90014]"
                style={{ color: pathname === "/brief" ? "#b90014" : "#5d3f3c" }}
              >
                AI Brief
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="text-[14px] font-semibold tracking-[0.03em] transition-colors duration-200 hover:text-[#b90014] flex items-center gap-1 text-purple-700"
              >
                <span className="material-symbols-outlined text-[16px]">storefront</span>
                Kelola Gig Saya
              </Link>
            )}
          </div>
        </div>

        {/* Center Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-xs md:max-w-sm mx-2 relative">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]"
            style={{ color: "#5d3f3c" }}
          >
            search
          </span>
          <input
            type="text"
            value={navSearch}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={isFreelancer ? "Cari ide gig / talenta..." : "Cari jasa / mahasiswa..."}
            className="w-full pl-9 pr-4 py-2 rounded-full text-[13px] outline-none border transition-all"
            style={{
              background: "#f4f3f5",
              borderColor: "#e7bdb8",
              color: "#1a1c1e",
            }}
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2.5 mr-1">
            <Link
              href="/notifications"
              className="material-symbols-outlined transition-colors hover:text-[#b90014]"
              style={{ color: "#5d3f3c" }}
              title="Notifikasi"
            >
              notifications
            </Link>
            <Link
              href="/order/1/chat"
              className="material-symbols-outlined transition-colors hover:text-[#b90014]"
              style={{ color: "#5d3f3c" }}
              title="Pesan Proyek"
            >
              chat
            </Link>
          </div>

          {user && profile ? (
            /* Logged in state with clear Role Distinction */
            <div className="flex items-center gap-2.5">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-xs transition-all hover:border-[#b90014]"
                style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                  style={{ background: isFreelancer ? "#6b21a8" : "#0057b9" }}
                >
                  {profile.full_name.charAt(0).toUpperCase()}
                </div>
                <div className="hidden lg:flex flex-col items-start leading-tight">
                  <span className="text-[13px] font-bold" style={{ color: "#1a1c1e" }}>
                    {profile.full_name}
                  </span>
                  <span
                    className="text-[10px] font-extrabold uppercase tracking-wide"
                    style={{ color: isFreelancer ? "#6b21a8" : "#0057b9" }}
                  >
                    {isFreelancer ? "Mahasiswa Freelancer" : "Klien / Pemberi Kerja"}
                  </span>
                </div>
              </Link>

              <button
                onClick={() => signOut()}
                className="text-[12px] font-semibold px-3 py-1.5 rounded-full border transition-all hover:bg-[#ffdad6]"
                style={{ color: "#ba1a1a", borderColor: "#ffdad6" }}
              >
                Keluar
              </button>
            </div>
          ) : (
            /* Logged out state */
            <>
              <Link
                href="/login"
                className="text-[13px] font-semibold px-4 py-2 rounded-full transition-all border hover:bg-[#ffdad6] active:scale-95"
                style={{ color: "#b90014", borderColor: "#b90014" }}
              >
                Masuk
              </Link>
              <Link
                href="/brief"
                className="text-white text-[13px] font-semibold px-5 py-2 rounded-full shadow-md active:scale-95 transition-all duration-150"
                style={{ background: "#b90014" }}
              >
                Post Project
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 bg-white border-b" />}>
      <NavbarContent />
    </Suspense>
  );
}
