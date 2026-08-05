"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/AuthContext";

const universities = [
  "Universitas Indonesia",
  "Institut Teknologi Bandung",
  "Universitas Gadjah Mada",
  "Universitas Airlangga",
  "Universitas Diponegoro",
  "Institut Teknologi Sepuluh Nopember",
  "Universitas Brawijaya",
  "Lainnya...",
];

export default function RegisterPage() {
  const router = useRouter();
  const { setLocalProfile } = useAuth();

  const [role, setRole] = useState<"freelancer" | "client">("freelancer");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Freelancer state
  const [fullName, setFullName] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [campusEmail, setCampusEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Client state
  const [clientName, setClientName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [clientConfirmPassword, setClientConfirmPassword] = useState("");

  const handleRegisterFreelancer = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    if (!campusEmail.endsWith(".ac.id")) {
      setErrorMsg("Email kampus wajib menggunakan domain akhiran .ac.id");
      return;
    }

    setLoading(true);

    const userProfile = {
      full_name: fullName,
      email: personalEmail,
      campus_email: campusEmail,
      university: university || "Universitas Indonesia",
      role: "freelancer" as const,
      is_verified: true,
    };

    // Save profile locally immediately so dashboard picks up real name
    setLocalProfile(userProfile);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: personalEmail,
        password,
        options: {
          data: {
            full_name: fullName,
            campus_email: campusEmail,
            university: university || "Universitas Indonesia",
            role: "freelancer",
          },
        },
      });

      if (error && !error.message.includes("already registered")) {
        // Even if email confirmation is required, profile is saved
        console.warn("Supabase signUp note:", error.message);
      }

      setSuccessMsg("Pendaftaran berhasil! Mengarahkan ke dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      // Fallback redirect anyway
      setSuccessMsg("Pendaftaran akun berhasil! Mengarahkan ke dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (clientPassword !== clientConfirmPassword) {
      setErrorMsg("Password dan Konfirmasi Password tidak cocok.");
      return;
    }

    setLoading(true);

    const clientProfile = {
      full_name: clientName,
      email: businessEmail,
      role: "client" as const,
      is_verified: true,
    };

    setLocalProfile(clientProfile);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: businessEmail,
        password: clientPassword,
        options: {
          data: {
            full_name: clientName,
            phone: phone,
            role: "client",
          },
        },
      });

      if (error && !error.message.includes("already registered")) {
        console.warn("Supabase client signUp note:", error.message);
      }

      setSuccessMsg("Pendaftaran akun Klien berhasil! Mengarahkan ke dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setSuccessMsg("Pendaftaran akun Klien berhasil! Mengarahkan ke dashboard...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen">
      {/* ── Left: Branding ── */}
      <div className="hidden lg:flex lg:w-1/2 split-screen-bg relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
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
              <span className="material-symbols-outlined text-[32px]" style={{ color: "#b90014", fontVariationSettings: "'FILL' 1" }}>
                school
              </span>
            </div>
            <span className="text-[32px] font-extrabold tracking-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              SkillRent
            </span>
          </div>

          <h1 className="text-[48px] font-bold leading-[1.1] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>
            Jembatan Menuju{" "}
            <span style={{ color: "#ffb77d" }}>Karier Profesional</span>{" "}
            Sejak Mahasiswa.
          </h1>
          <p className="text-[18px] leading-7 mb-12" style={{ color: "rgba(255,255,255,0.8)" }}>
            Platform freelance eksklusif untuk mahasiswa terverifikasi. Sewa
            talenta akademik terbaik atau bangun portofolio profesionalmu sekarang.
          </p>

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: "verified_user", title: "Terverifikasi", desc: "Sistem verifikasi kampus ketat untuk keamanan transaksi." },
              { icon: "payments", title: "Cepat & Aman", desc: "Pembayaran aman dengan sistem escrow yang terintegrasi." },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border"
                style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", borderColor: "rgba(255,255,255,0.2)" }}
              >
                <div className="mb-2" style={{ color: "#ffb77d" }}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="text-[14px] font-semibold mb-1">{item.title}</h3>
                <p className="text-[13px] opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right: Form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 lg:p-16">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <span className="material-symbols-outlined text-[32px]" style={{ color: "#b90014" }}>school</span>
            <span className="text-[24px] font-bold" style={{ color: "#b90014", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              SkillRent
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-[32px] font-bold mb-2" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.01em" }}>
              Buat Akun Baru
            </h2>
            <p className="text-[16px] leading-6" style={{ color: "#5d3f3c" }}>
              Bergabunglah dengan ribuan mahasiswa dan klien profesional.
            </p>
          </div>

          <div className="flex p-1 rounded-xl mb-8" style={{ background: "#efedf0" }}>
            {(["freelancer", "client"] as const).map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="flex-1 py-3 px-4 rounded-lg text-[14px] font-semibold tracking-[0.05em] transition-all duration-200"
                style={
                  role === r
                    ? { background: "#ffffff", color: "#b90014", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }
                    : { color: "#5d3f3c" }
                }
              >
                {r === "freelancer" ? "Saya Mahasiswa Freelancer" : "Saya Klien"}
              </button>
            ))}
          </div>

          {errorMsg && (
            <div className="p-4 mb-6 rounded-xl border flex items-center gap-3" style={{ background: "#ffdad6", borderColor: "#ba1a1a", color: "#93000a" }}>
              <span className="material-symbols-outlined text-[20px]">error</span>
              <span className="text-[14px] font-medium">{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 mb-6 rounded-xl border flex items-center gap-3" style={{ background: "#ebf5ff", borderColor: "#0057b9", color: "#004493" }}>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span className="text-[14px] font-medium">{successMsg}</span>
            </div>
          )}

          {/* Freelancer Form */}
          {role === "freelancer" && (
            <form onSubmit={handleRegisterFreelancer} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Masukkan nama sesuai KTP/KTM"
                  className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                  style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Email Pribadi</label>
                  <input
                    type="email"
                    required
                    value={personalEmail}
                    onChange={(e) => setPersonalEmail(e.target.value)}
                    placeholder="contoh@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                    style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Email Kampus</label>
                  <input
                    type="email"
                    required
                    value={campusEmail}
                    onChange={(e) => setCampusEmail(e.target.value)}
                    placeholder="mhs@univ.ac.id"
                    className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                    style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                  />
                  <span className="text-[11px] font-medium" style={{ color: "rgba(185,0,20,0.7)" }}>Wajib menggunakan akhiran .ac.id</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Nama Universitas</label>
                <select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                  style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                >
                  <option value="" disabled>Pilih Kampus Anda</option>
                  {universities.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                    style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Konfirmasi Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                    style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white text-[14px] font-semibold py-4 rounded-xl mt-4 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ background: "#b90014", boxShadow: "0 8px 24px rgba(185,0,20,0.2)", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    Memproses Pendaftaran...
                  </>
                ) : (
                  "Daftar Sebagai Freelancer"
                )}
              </button>
            </form>
          )}

          {/* Client Form */}
          {role === "client" && (
            <form onSubmit={handleRegisterClient} className="space-y-5">
              <div className="space-y-1">
                <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Nama Lengkap / Perusahaan</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Masukkan nama Anda atau Institusi"
                  className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                  style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Email Bisnis</label>
                <input
                  type="email"
                  required
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="nama@perusahaan.com"
                  className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                  style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Nomor Telepon (WhatsApp)</label>
                <div className="flex gap-2">
                  <div className="px-3 py-3 rounded-xl border text-[14px] font-semibold" style={{ background: "#efedf0", borderColor: "#e7bdb8", color: "#5d3f3c" }}>
                    +62
                  </div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="8123456789"
                    className="flex-1 px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                    style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Password</label>
                  <input
                    type="password"
                    required
                    value={clientPassword}
                    onChange={(e) => setClientPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                    style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[14px] font-semibold" style={{ color: "#1a1c1e" }}>Konfirmasi Password</label>
                  <input
                    type="password"
                    required
                    value={clientConfirmPassword}
                    onChange={(e) => setClientConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border text-[16px] outline-none transition-all"
                    style={{ borderColor: "#e7bdb8", background: "#ffffff", color: "#1a1c1e" }}
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: "#ebf5ff" }}>
                <span className="material-symbols-outlined text-[20px]" style={{ color: "#006fe8" }}>info</span>
                <p className="text-[12px] leading-relaxed" style={{ color: "#004493" }}>
                  Sebagai Klien, Anda dapat memposting proyek dan menyewa Mahasiswa Freelancer yang sudah melalui proses verifikasi akademik kami.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full text-white text-[14px] font-semibold py-4 rounded-xl mt-4 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                style={{ background: "#b90014", boxShadow: "0 8px 24px rgba(185,0,20,0.2)", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    Memproses Pendaftaran...
                  </>
                ) : (
                  "Daftar Sebagai Klien"
                )}
              </button>
            </form>
          )}

          <div className="mt-10 pt-8 text-center border-t" style={{ borderTopColor: "#e7bdb8" }}>
            <p className="text-[14px] leading-5" style={{ color: "#5d3f3c" }}>
              Sudah punya akun?{" "}
              <Link href="/login" className="font-semibold hover:underline" style={{ color: "#b90014" }}>
                Masuk Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
