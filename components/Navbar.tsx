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

  return (
    <header
      className="sticky top-0 z-50"
      style={{ background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
    >
      <nav className="flex justify-between items-center w-full px-4 md:px-12 py-3.5 max-w-[1280px] mx-auto gap-4">
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
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/browse"
              className="text-[14px] font-semibold tracking-[0.05em] transition-colors duration-200 hover:text-[#b90014]"
              style={{ color: "#5d3f3c" }}
            >
              Browse
            </Link>
            <Link
              href="/workspace"
              className="text-[14px] font-semibold tracking-[0.05em] transition-colors duration-200 hover:text-[#b90014]"
              style={{ color: "#5d3f3c" }}
            >
              Workspace
            </Link>
            <Link
              href="/brief"
              className="text-[14px] font-semibold tracking-[0.05em] transition-colors duration-200 hover:text-[#b90014]"
              style={{ color: "#5d3f3c" }}
            >
              AI Brief
            </Link>
          </div>
        </div>

        {/* Center Search Input Bar (Between AI Brief and Notifications) */}
        <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-sm mx-2 relative">
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
            placeholder="Cari jasa / mahasiswa..."
            className="w-full pl-9 pr-4 py-2 rounded-full text-[13px] outline-none border transition-all"
            style={{
              background: "#f4f3f5",
              borderColor: "#e7bdb8",
              color: "#1a1c1e",
            }}
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-3 mr-1">
            <Link
              href="/notifications"
              className="material-symbols-outlined transition-colors hover:text-[#b90014]"
              style={{ color: "#5d3f3c" }}
            >
              notifications
            </Link>
            <Link
              href="/order/1/chat"
              className="material-symbols-outlined transition-colors hover:text-[#b90014]"
              style={{ color: "#5d3f3c" }}
            >
              chat
            </Link>
          </div>

          {user && profile ? (
            /* Logged in state */
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-sm transition-all hover:border-[#b90014]"
                style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[12px] font-bold"
                  style={{ background: "#b90014" }}
                >
                  {profile.full_name.charAt(0).toUpperCase()}
                </div>
                <span className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>
                  {profile.full_name}
                </span>
              </Link>

              <button
                onClick={() => signOut()}
                className="text-[13px] font-semibold px-4 py-2 rounded-full border transition-all hover:bg-[#ffdad6]"
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
                className="text-[14px] font-semibold px-5 py-2.5 rounded-full transition-all border hover:bg-[#ffdad6] active:scale-95"
                style={{ color: "#b90014", borderColor: "#b90014" }}
              >
                Masuk
              </Link>
              <Link
                href="/brief"
                className="text-white text-[14px] font-semibold px-6 py-2.5 rounded-full shadow-md active:scale-95 transition-all duration-150"
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
