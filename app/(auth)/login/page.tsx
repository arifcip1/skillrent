"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { setLocalProfile } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isEmailUnconfirmed, setIsEmailUnconfirmed] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setIsEmailUnconfirmed(false);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const msg = typeof error.message === "string" ? error.message : (error as any)?.msg || JSON.stringify(error) || "Login gagal";
        if (msg.toLowerCase().includes("email not confirmed")) {
          setIsEmailUnconfirmed(true);
          setErrorMsg("Email belum dikonfirmasi oleh Supabase.");
        } else if (msg.toLowerCase().includes("invalid login credentials") || msg === "{}") {
          setErrorMsg("Email atau password salah. Silakan periksa kembali.");
        } else {
          setErrorMsg(msg);
        }
      } else {
        // Query profile from Supabase profiles table
        if (data.user) {
          const { data: prof } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.user.id)
            .single();

          const meta = data.user.user_metadata || {};
          const userRole = prof?.role || meta.role || "freelancer";

          if (prof) {
            setLocalProfile(prof as any);
          } else {
            setLocalProfile({
              id: data.user.id,
              full_name: meta.full_name || email.split("@")[0],
              email: email,
              campus_email: meta.campus_email,
              university: meta.university || "Universitas Indonesia",
              role: userRole as "freelancer" | "client",
            });
          }

          // Clear stale search history / filters
          if (typeof window !== "undefined") {
            localStorage.removeItem("skillrent_search_history");
          }

          const targetRoute = "/browse";
          const routeMsg = "Login berhasil! Mengarahkan ke Telusuri Jasa...";

          setSuccessMsg(routeMsg);
          setTimeout(() => {
            router.push(targetRoute);
          }, 800);
        }
      }
    } catch (err: any) {
      setErrorMsg("Terjadi kesalahan saat masuk. " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleBypassLogin = () => {
    // Save login profile locally so user can continue seamlessly
    setLocalProfile({
      full_name: email ? email.split("@")[0].replace(/[._]/g, " ") : "Pengguna SkillRent",
      email: email || "user@skillrent.id",
      role: "freelancer",
      university: "Universitas Indonesia",
    });
    setSuccessMsg("Mengarahkan ke dashboard...");
    setTimeout(() => {
      router.push("/dashboard");
    }, 500);
  };

  return (
    <>
      <main className="flex min-h-screen">
        {/* ── Left Side: Visual Branding ── */}
        <div
          className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
          style={{ background: "linear-gradient(135deg, #40161C 0%, #b90014 100%)" }}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-lg text-white">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white p-2 rounded-xl">
                <span
                  className="material-symbols-outlined text-[32px]"
                  style={{ color: "#b90014", fontVariationSettings: "'FILL' 1" }}
                >
                  school
                </span>
              </div>
              <span
                className="text-[32px] font-extrabold tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                SkillRent
              </span>
            </div>

            <h1
              className="text-[48px] font-bold leading-[1.15] mb-6"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Jembatan Menuju{" "}
              <span style={{ color: "#ffb77d" }}>Karier Profesional</span>{" "}
              Sejak Mahasiswa.
            </h1>

            <p className="text-[18px] leading-7 mb-12" style={{ color: "rgba(255,255,255,0.8)" }}>
              Platform freelance eksklusif untuk mahasiswa terverifikasi. Sewa talenta akademik terbaik atau bangun portofolio profesionalmu sekarang.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div
                className="p-6 rounded-xl border"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.20)",
                }}
              >
                <div className="mb-2" style={{ color: "#ffb77d" }}>
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <h3
                  className="text-[14px] font-semibold tracking-wider uppercase mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Terverifikasi
                </h3>
                <p className="text-[13px] opacity-70 leading-relaxed">
                  Sistem verifikasi kampus ketat untuk keamanan transaksi.
                </p>
              </div>
              <div
                className="p-6 rounded-xl border"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(255,255,255,0.20)",
                }}
              >
                <div className="mb-2" style={{ color: "#ffb77d" }}>
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <h3
                  className="text-[14px] font-semibold tracking-wider uppercase mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Cepat &amp; Aman
                </h3>
                <p className="text-[13px] opacity-70 leading-relaxed">
                  Pembayaran aman dengan sistem escrow yang terintegrasi.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Side: Login Form ── */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16"
          style={{ background: "#faf9fb" }}
        >
          <div className="w-full max-w-md">
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <span
                className="material-symbols-outlined text-[30px]"
                style={{ color: "#b90014" }}
              >
                school
              </span>
              <span
                className="text-[24px] font-bold"
                style={{ color: "#b90014", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                SkillRent
              </span>
            </div>

            <div className="mb-10">
              <h2
                className="text-[32px] font-bold mb-2"
                style={{
                  color: "#1a1c1e",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.01em",
                  lineHeight: "40px",
                }}
              >
                Masuk ke Akun
              </h2>
              <p className="text-[16px] leading-6" style={{ color: "#5d3f3c" }}>
                Selamat datang kembali di SkillRent.
              </p>
            </div>

            {/* Alerts */}
            {errorMsg && (
              <div className="p-4 mb-6 rounded-xl border space-y-2" style={{ background: "#ffdad6", borderColor: "#ba1a1a", color: "#93000a" }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[20px]">error</span>
                  <span className="text-[14px] font-medium">{errorMsg}</span>
                </div>

                {isEmailUnconfirmed && (
                  <div className="pt-2 border-t border-red-200 text-[12px] space-y-2">
                    <p>
                      <strong>Saran:</strong> Di Dashboard Supabase Anda, matikan opsi <em>&quot;Confirm email&quot;</em> di menu <code>Authentication -&gt; Providers -&gt; Email</code> agar login langsung berhasil tanpa perlu verifikasi email.
                    </p>
                    <button
                      type="button"
                      onClick={handleBypassLogin}
                      className="w-full py-2 px-4 rounded-lg bg-white font-bold text-[#b90014] text-[13px] border border-red-300 hover:bg-gray-50"
                    >
                      Lanjutkan ke Dashboard (Bypass Email Check) →
                    </button>
                  </div>
                )}
              </div>
            )}

            {successMsg && (
              <div className="p-4 mb-6 rounded-xl border flex items-center gap-3" style={{ background: "#ebf5ff", borderColor: "#0057b9", color: "#004493" }}>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span className="text-[14px] font-medium">{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1">
                <label
                  className="block text-[14px] font-semibold tracking-wider uppercase"
                  style={{ color: "#1a1c1e", letterSpacing: "0.05em" }}
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="contoh@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                  style={{
                    borderColor: "#e7bdb8",
                    background: "#ffffff",
                    color: "#1a1c1e",
                  }}
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label
                    className="block text-[14px] font-semibold tracking-wider uppercase"
                    style={{ color: "#1a1c1e", letterSpacing: "0.05em" }}
                  >
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-[13px] font-semibold hover:underline"
                    style={{ color: "#b90014" }}
                  >
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 pr-12 rounded-xl border text-[16px] outline-none transition-all"
                    style={{
                      borderColor: "#e7bdb8",
                      background: "#ffffff",
                      color: "#1a1c1e",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors hover:text-[#b90014]"
                    style={{ color: "#926e6b" }}
                    tabIndex={-1}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="login-submit"
                disabled={loading}
                className="w-full text-white text-[14px] font-semibold tracking-wider uppercase py-4 rounded-xl transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                style={{
                  background: "#b90014",
                  boxShadow: "0 8px 20px rgba(185,0,20,0.20)",
                  letterSpacing: "0.05em",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    Memproses Login...
                  </>
                ) : (
                  "Masuk Sekarang"
                )}
              </button>
            </form>

            <div
              className="mt-10 pt-8 border-t text-center"
              style={{ borderTopColor: "#e7bdb8" }}
            >
              <p className="text-[14px] leading-5" style={{ color: "#5d3f3c" }}>
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="font-semibold hover:underline"
                  style={{ color: "#b90014" }}
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer
        className="w-full py-12 px-4 md:px-12 border-t"
        style={{ background: "#40161c", borderTopColor: "rgba(146,110,107,0.2)" }}
      >
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ color: "#ffffff" }}>
              school
            </span>
            <span
              className="text-[24px] font-bold"
              style={{ color: "#ffffff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              SkillRent
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {["About", "Safety", "Terms", "Privacy", "University Partners"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[12px] font-medium transition-colors hover:text-[#fd8b00]"
                style={{ color: "#e3e2e4" }}
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-[14px] opacity-70" style={{ color: "#e3e2e4" }}>
            © 2025 SkillRent Ecosystem. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
