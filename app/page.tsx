import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SkillRent | Sewa Bakat Mahasiswa Terbaik",
  description:
    "Platform freelance khusus mahasiswa terverifikasi. Kualitas profesional, harga mahasiswa, didukung kecerdasan buatan.",
};

const categories = [
  { icon: "palette", name: "Desain Grafis", desc: "Logo, branding, dan ilustrasi kreatif." },
  { icon: "code", name: "Web Development", desc: "Landing page dan aplikasi web modern." },
  { icon: "edit_note", name: "Penulisan Konten", desc: "Artikel SEO dan copywriting kreatif." },
  { icon: "movie", name: "Edit Video", desc: "Editing video untuk sosial media dan iklan." },
  { icon: "school", name: "Tutoring", desc: "Bimbingan belajar mata kuliah dan skill." },
  { icon: "analytics", name: "Data Analytics", desc: "Olah data dan visualisasi profesional." },
];

const features = [
  {
    icon: "verified_user",
    title: "Freelancer Terverifikasi Kampus",
    desc: "Otentikasi melalui SSO/ID universitas untuk menjamin status mahasiswa aktif.",
  },
  {
    icon: "payments",
    title: "Pembayaran Aman via Escrow Milestone",
    desc: "Dana hanya dicairkan setelah Anda menyetujui setiap tahapan pekerjaan.",
  },
  {
    icon: "smart_toy",
    title: "Rekomendasi AI",
    desc: "Pencocokan cerdas untuk menemukan talenta terbaik sesuai brief proyek Anda.",
  },
];

const testimonials = [
  {
    quote: "SkillRent membantu startup kami menemukan desainer UI/UX berbakat dengan harga yang sangat kompetitif.",
    name: "Andi Wijaya",
    role: "Founder, TechFlow",
  },
  {
    quote: "Proses verifikasi kampusnya membuat kami merasa aman bekerja dengan mahasiswa. Hasilnya luar biasa!",
    name: "Siti Aminah",
    role: "Owner, Batik Modern",
  },
  {
    quote: "Sangat terbantu dengan fitur Escrow. Pembayaran jadi lebih transparan dan aman bagi kedua belah pihak.",
    name: "Budi Santoso",
    role: "Marketing Manager, UMKM Maju",
  },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero Section ── */}
        <section
          className="relative overflow-hidden pt-12 pb-24 md:pt-24 md:pb-32 px-4 md:px-12"
          style={{ background: "#faf9fb" }}
        >
          {/* Background blobs */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <div
              className="absolute top-20 right-20 w-64 h-64 rounded-full"
              style={{ background: "#b90014", filter: "blur(120px)" }}
            />
            <div
              className="absolute bottom-20 right-40 w-96 h-96 rounded-full"
              style={{ background: "#0057b9", filter: "blur(120px)" }}
            />
          </div>

          <div className="max-w-[1280px] mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div className="space-y-8">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border"
                style={{
                  background: "rgba(227,27,35,0.06)",
                  borderColor: "rgba(227,27,35,0.15)",
                }}
              >
                <span className="material-symbols-outlined text-[18px]" style={{ color: "#b90014" }}>
                  auto_awesome
                </span>
                <span
                  className="text-[12px] font-medium uppercase tracking-wider"
                  style={{ color: "#b90014" }}
                >
                  AI-Powered Marketplace
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-[40px] md:text-[56px] font-bold leading-[1.1]"
                style={{
                  color: "#1a1c1e",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Temukan talenta mahasiswa terverifikasi untuk{" "}
                <span style={{ color: "#b90014" }}>kebutuhan digitalmu</span>
              </h1>

              {/* Subheadline */}
              <p className="text-[18px] leading-7 max-w-lg" style={{ color: "#5d3f3c" }}>
                Platform freelance khusus mahasiswa terverifikasi. Kualitas
                profesional, harga mahasiswa, didukung kecerdasan buatan.
              </p>

              {/* AI Search Bar */}
              <div className="relative max-w-xl group">
                <div
                  className="absolute -inset-1 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-1000"
                  style={{
                    background: "linear-gradient(to right, #b90014, #0057b9)",
                    filter: "blur(8px)",
                  }}
                />
                <div
                  className="relative flex items-center rounded-xl shadow-xl border p-2"
                  style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
                >
                  <span
                    className="material-symbols-outlined ml-3"
                    style={{
                      color: "#0057b9",
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    auto_awesome
                  </span>
                  <input
                    className="w-full bg-transparent border-none outline-none px-4 text-[16px] leading-6 placeholder:opacity-50"
                    placeholder="Buatkan landing page untuk startup..."
                    style={{ color: "#1a1c1e" }}
                    type="text"
                    id="hero-search"
                  />
                  <Link
                    href="/brief"
                    className="text-white text-[14px] font-semibold px-8 py-3 rounded-lg transition-all hover:shadow-lg active:scale-95"
                    style={{ background: "#b90014" }}
                  >
                    Cari Jasa
                  </Link>
                </div>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-3">
                  {["F", "S", "A"].map((letter, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-white text-sm font-bold"
                      style={{
                        background: ["#b90014", "#904d00", "#0057b9"][i],
                        borderColor: "#ffffff",
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold border-2"
                    style={{
                      background: "#ffdad6",
                      color: "#b90014",
                      borderColor: "#ffffff",
                    }}
                  >
                    5k+
                  </div>
                </div>
                <p className="text-[14px] leading-5" style={{ color: "#5d3f3c" }}>
                  Bergabung dengan{" "}
                  <span className="font-bold" style={{ color: "#1a1c1e" }}>
                    5,000+
                  </span>{" "}
                  mahasiswa bertalenta
                </p>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="hidden md:block relative">
              <div
                className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 aspect-[4/5]"
                style={{ borderColor: "#ffffff" }}
              >
                <img
                  src="/hero-image.png"
                  alt="Mahasiswa freelancer berkolaborasi di SkillRent"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -left-12 glass-card p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 animate-bounce hover:animate-none"
              >
                <div
                  className="p-3 rounded-xl"
                  style={{ background: "rgba(29,191,115,0.15)", color: "#1dbf73" }}
                >
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p
                    className="text-[24px] font-semibold leading-8"
                    style={{
                      color: "#1a1c1e",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    100%
                  </p>
                  <p className="text-[12px] font-medium" style={{ color: "#5d3f3c" }}>
                    Terverifikasi Kampus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="py-24 px-4 md:px-12 max-w-[1280px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <h2
                className="text-[32px] font-bold leading-10"
                style={{
                  color: "#1a1c1e",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Kategori Populer
              </h2>
              <p className="text-[16px] leading-6" style={{ color: "#5d3f3c" }}>
                Temukan spesialis untuk setiap tahap proyek Anda.
              </p>
            </div>
            <Link
              href="#"
              className="text-[14px] font-semibold flex items-center gap-2 hover:underline"
              style={{ color: "#b90014" }}
            >
              Lihat Semua Kategori
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="group p-8 rounded-[2rem] border cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{
                    background: "rgba(227,27,35,0.08)",
                    color: "#b90014",
                  }}
                >
                  <span className="material-symbols-outlined text-[32px]">
                    {cat.icon}
                  </span>
                </div>
                <h3
                  className="text-[24px] font-semibold leading-8 mb-3"
                  style={{
                    color: "#1a1c1e",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {cat.name}
                </h3>
                <p className="text-[16px] leading-6" style={{ color: "#5d3f3c" }}>
                  {cat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why SkillRent ── */}
        <section
          className="py-24 px-4 md:px-12"
          style={{ background: "#f4f3f5" }}
        >
          <div className="max-w-[1280px] mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2
                className="text-[32px] font-bold leading-10"
                style={{
                  color: "#1a1c1e",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                Mengapa SkillRent?
              </h2>
              <p
                className="text-[16px] leading-6 max-w-2xl mx-auto"
                style={{ color: "#5d3f3c" }}
              >
                Keamanan dan kemudahan adalah prioritas kami. Kami menggunakan
                teknologi terbaru untuk memastikan proyek Anda sukses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="p-10 rounded-[2.5rem] border space-y-6"
                  style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "#b90014", color: "#ffffff" }}
                  >
                    <span className="material-symbols-outlined">{f.icon}</span>
                  </div>
                  <h3
                    className="text-[24px] font-semibold leading-8"
                    style={{
                      color: "#1a1c1e",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-[16px] leading-6" style={{ color: "#5d3f3c" }}>
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-24 px-4 md:px-12" style={{ background: "#faf9fb" }}>
          <div className="max-w-[1280px] mx-auto">
            <h2
              className="text-[32px] font-bold leading-10 text-center mb-16"
              style={{
                color: "#1a1c1e",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              Apa Kata Klien Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="p-8 rounded-3xl border shadow-sm"
                  style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
                >
                  <p
                    className="text-[16px] leading-6 italic mb-6"
                    style={{ color: "#1a1c1e" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: "#b90014" }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p
                        className="text-[14px] font-semibold"
                        style={{ color: "#1a1c1e" }}
                      >
                        {t.name}
                      </p>
                      <p className="text-[12px]" style={{ color: "#5d3f3c" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 px-4 md:px-12">
          <div className="max-w-[1280px] mx-auto">
            <div
              className="rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #b90014 0%, #40161c 100%)",
              }}
            >
              {/* Decorative SVG */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="white" strokeWidth="0.5" />
                </svg>
              </div>
              <div className="relative z-10 space-y-8">
                <h2
                  className="text-[48px] font-bold leading-[56px] max-w-3xl mx-auto"
                  style={{
                    letterSpacing: "-0.02em",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  Siap Mewujudkan Ide Anda Bersama Mahasiswa Terbaik?
                </h2>
                <p
                  className="text-[18px] leading-7 max-w-xl mx-auto"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Mulai cari bakat hari ini dan dapatkan hasil kerja profesional
                  dengan budget yang efisien.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Link
                    href="/brief"
                    className="text-[24px] font-semibold px-10 py-4 rounded-full transition-all active:scale-95 hover:shadow-2xl"
                    style={{ background: "#ffffff", color: "#b90014" }}
                  >
                    Cari Jasa
                  </Link>
                  <Link
                    href="/register"
                    className="text-[24px] font-semibold px-10 py-4 rounded-full transition-all active:scale-95 border hover:bg-white/20"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(8px)",
                      borderColor: "rgba(255,255,255,0.2)",
                      color: "#ffffff",
                    }}
                  >
                    Gabung Jadi Freelancer
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav active="home" />
      {/* Spacer for mobile bottom nav */}
      <div className="h-16 md:hidden" />
    </>
  );
}
