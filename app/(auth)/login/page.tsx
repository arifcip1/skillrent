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
          setErrorMsg("Email atau password salah. Silakan periksa kembali atau gunakan tombol Login Instan.");
        } else {
          setErrorMsg(msg);
        }
      } else {
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
              university: meta.university || "Universitas Trunojoyo Madura",
              role: userRole as "freelancer" | "client",
            });
          }

          if (typeof window !== "undefined") {
            localStorage.removeItem("skillrent_search_history");
          }

          setSuccessMsg("Login berhasil! Mengarahkan ke Telusuri Jasa...");
          setTimeout(() => {
            router.push("/browse");
          }, 600);
        }
      }
    } catch (err: any) {
      setErrorMsg("Terjadi kesalahan saat masuk. " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoFreelancerLogin = () => {
    setLocalProfile({
      id: "demo-freelancer-1",
      full_name: "Aditya Pratama",
      email: "aditya.freelancer@trunojoyo.ac.id",
      campus_email: "aditya.freelancer@trunojoyo.ac.id",
      university: "Universitas Trunojoyo Madura",
      role: "freelancer",
      is_verified: true,
    });
    setSuccessMsg("Masuk sebagai Mahasiswa Freelancer (Aditya Pratama)...");
    setTimeout(() => {
      router.push("/browse");
    }, 500);
  };

  const handleDemoClientLogin = () => {
    setLocalProfile({
      id: "demo-client-1",
      full_name: "PT Nusantara Digital",
      email: "client@nusantara.id",
      university: "Klien Institusi / Mitra",
      role: "client",
      is_verified: true,
    });
    setSuccessMsg("Masuk sebagai Klien (PT Nusantara Digital)...");
    setTimeout(() => {
      router.push("/browse");
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
              <img src="/logo.png" alt="SkillRent Logo" className="h-10 w-auto object-contain bg-white p-1 rounded-xl" />
              <span
                className="text-[32px] font-extrabold tracking-tight"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                SkillRent
              </span>
            </div>

            <h1
              className="text-[44px] font-bold leading-[1.15] mb-6"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Jembatan Menuju{" "}
              <span style={{ color: "#ffb77d" }}>Karier Profesional</span>{" "}
              Sejak Mahasiswa.
            </h1>

            <p className="text-[17px] leading-7 mb-12" style={{ color: "rgba(255,255,255,0.8)" }}>
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
                  Sistem verifikasi SSO kampus ketat untuk keamanan transaksi.
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
                  Harga Terjangkau
                </h3>
                <p className="text-[13px] opacity-70 leading-relaxed">
                  Jasa berkualitas tinggi dengan garansi pembayaran Escrow 100%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Side: Login Form ── */}
        <div
          className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12"
          style={{ background: "#ffffff" }}
        >
          <div className="w-full max-w-md space-y-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-6 text-[#b90014] font-bold text-[14px]">
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                Kembali ke Beranda
              </Link>
              <h2
                className="text-[32px] font-bold"
                style={{
                  color: "#1a1c1e",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Selamat Datang Kembali
              </h2>
              <p className="text-[15px] mt-2" style={{ color: "#5d3f3c" }}>
                Masuk ke akun SkillRent Anda untuk melanjutkan.
              </p>
            </div>

            {/* Quick 1-Click Demo Login Buttons */}
            <div className="p-4 rounded-2xl border space-y-3 bg-[#faf9fb]" style={{ borderColor: "#adc7ff" }}>
              <div className="flex items-center gap-2 text-[#0057b9]">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
                <span className="text-[12px] font-extrabold uppercase tracking-wider">Akses Masuk Instan (Demo Mode)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDemoFreelancerLogin}
                  className="py-2.5 px-3 rounded-xl border font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  Mahasiswa Freelancer
                </button>
                <button
                  type="button"
                  onClick={handleDemoClientLogin}
                  className="py-2.5 px-3 rounded-xl border font-bold text-[12px] flex items-center justify-center gap-1.5 transition-all bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[16px]">work</span>
                  Akun Klien
                </button>
              </div>
            </div>

            {/* Notifications */}
            {errorMsg && (
              <div className="p-4 rounded-xl text-[14px] font-medium border bg-[#ffdad6] text-[#ba1a1a] border-[#ffdad6]">
                <p className="flex items-center gap-2 font-bold mb-1">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  Gagal Masuk
                </p>
                <p>{errorMsg}</p>
                {isEmailUnconfirmed && (
                  <button
                    type="button"
                    onClick={() => {
                      setLocalProfile({
                        full_name: email.split("@")[0],
                        email,
                        role: "freelancer",
                        university: "Universitas Trunojoyo Madura",
                      });
                      router.push("/browse");
                    }}
                    className="mt-3 text-[13px] font-bold text-white px-4 py-2 rounded-lg bg-[#b90014]"
                  >
                    Bypass Konfirmasi &amp; Masuk Sekarang
                  </button>
                )}
              </div>
            )}

            {successMsg && (
              <div className="p-4 rounded-xl text-[14px] font-semibold border bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                {successMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label
                  className="block text-[13px] font-bold tracking-wider uppercase"
                  style={{ color: "#1a1c1e" }}
                >
                  Email Kampus / Email Pengguna
                </label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="nama@trunojoyo.ac.id atau nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl border text-[15px] outline-none transition-all"
                  style={{
                    borderColor: "#e7bdb8",
                    background: "#ffffff",
                    color: "#1a1c1e",
                  }}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label
                    className="block text-[13px] font-bold tracking-wider uppercase"
                    style={{ color: "#1a1c1e" }}
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDemoFreelancerLogin();
                    }}
                    className="text-[13px] font-bold hover:underline text-[#b90014]"
                  >
                    Lupa Password? (Gunakan Login Instan)
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 pr-12 rounded-xl border text-[15px] outline-none transition-all"
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
                className="w-full text-white text-[14px] font-bold tracking-wider uppercase py-4 rounded-xl transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 shadow-md"
                style={{
                  background: "#b90014",
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
              className="mt-8 pt-6 border-t text-center"
              style={{ borderTopColor: "#e7bdb8" }}
            >
              <p className="text-[14px] leading-5" style={{ color: "#5d3f3c" }}>
                Belum punya akun?{" "}
                <Link
                  href="/register"
                  className="font-bold hover:underline"
                  style={{ color: "#b90014" }}
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
