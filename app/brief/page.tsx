"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

const EXAMPLE_PROMPTS = {
  logo: "Saya butuh logo untuk toko kopi baru saya bernama 'Kopi Senja'. Temanya minimalis tapi energetik, warnanya merah dan putih. Saya butuh selesai dalam 2 minggu dengan budget sekitar 1,5 juta rupiah.",
  web: "Butuh landing page satu halaman untuk pendaftaran kursus online. Desain modern, responsif, dan clean. Ada integrasi form. Budget 5 juta, deadline akhir bulan ini.",
  social: "Mencari konten kreator untuk manage Instagram selama 1 bulan. Butuh 12 feed dan 20 stories. Budget 2 jutaan, mulai secepatnya.",
  video: "Saya perlu editor video untuk konten YouTube saya. Durasi 10-15 menit per video, 4 video per bulan. Gaya editing yang engaging dan modern. Budget 3 jutaan.",
};

type Step = "input" | "result";

function detectCategory(text: string) {
  const t = text.toLowerCase();
  if (t.includes("logo") || t.includes("desain") || t.includes("gambar")) return "Graphic Design";
  if (t.includes("web") || t.includes("landing") || t.includes("program")) return "Web Development";
  if (t.includes("konten") || t.includes("sosmed") || t.includes("instagram")) return "Digital Marketing";
  if (t.includes("video") || t.includes("edit")) return "Video Editing";
  return "Umum";
}

function detectBudget(text: string) {
  const match = text.match(/(\d+(?:[,.]\d+)?)\s*(juta|jt|ribu|rb)/i);
  if (match) {
    const amount = parseFloat(match[1].replace(",", "."));
    const mult = match[2].toLowerCase().includes("juta") || match[2].toLowerCase().includes("jt") ? 1_000_000 : 1_000;
    return `Rp ${(amount * mult).toLocaleString("id-ID")}`;
  }
  return "Belum disebutkan";
}

function detectDeadline(text: string) {
  const match = text.match(/(2\s*minggu|\d+\s*hari|\d+\s*minggu|akhir bulan|secepatnya|1 bulan)/i);
  return match ? match[0] : "Tentukan di deskripsi";
}

export default function BriefPage() {
  const [step, setStep] = useState<Step>("input");
  const [inputText, setInputText] = useState("");
  const [preview, setPreview] = useState({ budget: "Rp 0", deadline: "Tentukan di deskripsi", category: "Menunggu Input..." });
  const syncTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (syncTimeout.current) clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(() => {
      setPreview({
        budget: detectBudget(inputText),
        deadline: detectDeadline(inputText),
        category: detectCategory(inputText),
      });
    }, 400);
  }, [inputText]);

  if (step === "result") {
    return <BriefResultStep inputText={inputText} onBack={() => setStep("input")} />;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-12 relative" style={{ background: "#faf9fb", minHeight: "calc(100vh - 72px)" }}>
        {/* Floating orbs */}
        <div className="floating-orb" style={{ top: "10%", right: "5%" }} />
        <div className="floating-orb" style={{ bottom: "10%", left: "5%", animationDelay: "-5s" }} />

        {/* Header */}
        <div className="flex flex-col gap-2 mb-10">
          <div className="flex items-center gap-2" style={{ color: "#0057b9" }}>
            <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
            <span className="text-[14px] font-semibold tracking-wider">POWERED BY SKILLRENT AI</span>
          </div>
          <h1 className="text-[32px] md:text-[48px] font-bold max-w-2xl" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.01em" }}>
            Tuliskan Ide Anda, Biar AI yang Menyusun Briefnya.
          </h1>
          <p className="text-[18px] leading-7 max-w-xl" style={{ color: "#5d3f3c" }}>
            Jelaskan proyek Anda secara santai. Algoritma kami akan mengubahnya menjadi scope profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Input */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="p-6 rounded-xl shadow-sm border ai-border-glow transition-all duration-300" style={{ background: "#ffffff", borderColor: "#e7bdb8" }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined" style={{ color: "#b90014", fontVariationSettings: "'FILL' 1" }}>edit_note</span>
                <h2 className="text-[24px] font-semibold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Detail Proyek</h2>
              </div>
              <textarea
                className="w-full h-64 p-4 rounded-lg border-none outline-none resize-none text-[16px] leading-6 placeholder:opacity-50"
                style={{ background: "#f4f3f5", color: "#1a1c1e" }}
                id="ai-input"
                placeholder="Contoh: Saya butuh logo untuk toko kopi baru saya. Temanya minimalis tapi energetik, warnanya merah dan putih. Saya butuh selesai dalam 2 minggu dengan budget sekitar 1 jutaan..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                <span className="text-[12px] font-medium" style={{ color: "#5d3f3c" }}>Saran:</span>
                {(["logo", "web", "social", "video"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setInputText(EXAMPLE_PROMPTS[key])}
                    className="px-3 py-1 rounded-full text-[12px] font-medium transition-colors hover:bg-[#e9e8ea]"
                    style={{ background: "#efedf0", color: "#1a1c1e" }}
                  >
                    {key === "logo" ? "Desain Logo" : key === "web" ? "Landing Page" : key === "social" ? "Konten Sosmed" : "Edit Video"}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Banner */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-6 rounded-xl text-white" style={{ background: "#40161c" }}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full" style={{ background: "rgba(185,0,20,0.2)" }}>
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-wider opacity-80">LANGKAH BERIKUTNYA</p>
                  <p className="text-[24px] font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Siap Menemukan Bakat?</p>
                </div>
              </div>
              <button
                onClick={() => inputText.length > 20 ? setStep("result") : alert("Tuliskan detail proyek Anda terlebih dahulu!")}
                className="w-full md:w-auto text-white px-8 py-4 rounded-xl text-[24px] font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                style={{ background: "#b90014" }}
              >
                Generate & Cari Mahasiswa
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Preview Sidebar */}
          <aside className="lg:col-span-4 sticky top-24">
            <div className="rounded-xl shadow-sm border overflow-hidden" style={{ background: "#ffffff", borderColor: "#e7bdb8" }}>
              {/* Header */}
              <div className="p-4 flex items-center justify-between text-white" style={{ background: "#0057b9" }}>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                  <span className="text-[14px] font-semibold tracking-wide">PREVIEW BRIEF TERSTRUKTUR</span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-6 ai-shimmer">
                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2" style={{ color: "#5d3f3c" }}>
                    <span className="material-symbols-outlined text-[18px]">payments</span>
                    <span className="text-[12px] font-medium uppercase tracking-wide">Estimasi Budget</span>
                  </div>
                  <div className="text-[24px] font-semibold" style={{ color: "#904d00", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {preview.budget}
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2" style={{ color: "#5d3f3c" }}>
                    <span className="material-symbols-outlined text-[18px]">event</span>
                    <span className="text-[12px] font-medium uppercase tracking-wide">Deadline</span>
                  </div>
                  <div className="text-[16px] font-semibold" style={{ color: "#1a1c1e" }}>{preview.deadline}</div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2" style={{ color: "#5d3f3c" }}>
                    <span className="material-symbols-outlined text-[18px]">category</span>
                    <span className="text-[12px] font-medium uppercase tracking-wide">Kategori & Scope</span>
                  </div>
                  <span className="px-3 py-1 rounded-lg text-[14px] font-semibold border w-fit" style={{ background: "#ebf5ff", color: "#0057b9", borderColor: "#adc7ff" }}>
                    {preview.category}
                  </span>
                </div>

                <hr style={{ borderColor: "rgba(231,189,184,0.3)" }} />

                {/* Tasks */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2" style={{ color: "#5d3f3c" }}>
                    <span className="material-symbols-outlined text-[18px]">list_alt</span>
                    <span className="text-[12px] font-medium uppercase tracking-wide">Analisis AI</span>
                  </div>
                  {inputText.length > 20 ? (
                    <ul className="flex flex-col gap-3">
                      {["Drafting & Konsep Awal", "Revisi Berdasarkan Feedback", "Final Handover & Aset"].map((task) => (
                        <li key={task} className="flex items-start gap-3">
                          <span className="material-symbols-outlined text-[18px]" style={{ color: "#1dbf73" }}>check_circle</span>
                          <span className="text-[14px] leading-5" style={{ color: "#1a1c1e" }}>{task}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <li className="flex items-start gap-3 opacity-40 list-none">
                      <span className="material-symbols-outlined text-[18px]" style={{ color: "#1dbf73" }}>check_circle</span>
                      <span className="text-[14px] leading-5">Poin-poin pekerjaan akan muncul di sini...</span>
                    </li>
                  )}
                </div>
              </div>

              <div className="p-4 border-t flex items-center gap-2" style={{ borderTopColor: "#e7bdb8", color: "#5d3f3c" }}>
                <span className="material-symbols-outlined text-[16px]">info</span>
                <span className="text-[11px] leading-tight">Brief ini akan divalidasi oleh sistem SkillRent untuk memastikan standar kualitas akademik terpenuhi.</span>
              </div>
            </div>

            {/* Tips */}
            <div className="mt-4 rounded-xl p-4 border flex gap-3" style={{ background: "#ebf5ff", borderColor: "#adc7ff" }}>
              <span className="material-symbols-outlined" style={{ color: "#0057b9" }}>lightbulb</span>
              <div>
                <p className="text-[14px] font-semibold" style={{ color: "#0057b9" }}>Tip AI</p>
                <p className="text-[13px] mt-1" style={{ color: "#004493" }}>Sebutkan nama universitas jika Anda mencari spesialisasi tertentu (misal: &quot;Mahasiswa DKV ITB&quot;).</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <MobileBottomNav active="brief" />
      <div className="h-16 md:hidden" />
    </>
  );
}

// ─── Step 2: Brief Result ─────────────────────────────────
function BriefResultStep({ inputText, onBack }: { inputText: string; onBack: () => void }) {
  const router = useRouter();
  const category = detectCategory(inputText);
  const budget = detectBudget(inputText);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleUseBriefAndSearch = () => {
    setIsNavigating(true);

    // Store generated brief in localStorage for AI recommendations matching
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "skillrent_active_brief",
        JSON.stringify({
          inputText,
          category,
          budget,
          deadline: detectDeadline(inputText),
          createdAt: new Date().toISOString(),
        })
      );
    }

    setTimeout(() => {
      router.push("/recommendations");
    }, 600);
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-12 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input summary */}
          <section className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl flex items-center justify-center" style={{ background: "#e31b23", color: "#fff9f8" }}>
                  <span className="material-symbols-outlined text-[28px] sparkle-animation">auto_awesome</span>
                </div>
                <h1 className="text-[28px] md:text-[32px] font-bold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Brief Terstruktur Berhasil Dibuat
                </h1>
              </div>
              <p className="text-[16px] leading-6 max-w-2xl" style={{ color: "#5d3f3c" }}>
                Brief Anda sudah diproses oleh AI! Gunakan tombol di kanan bawah untuk langsung mencocokkan dengan mahasiswa terbaik.
              </p>
            </div>

            {/* Text area (read-only summary) */}
            <div
              className="relative rounded-3xl p-1 shadow-sm ai-glow group"
              style={{ background: "#ffffff" }}
            >
              <textarea
                className="w-full h-64 md:h-80 p-6 md:p-8 bg-transparent border-none outline-none resize-none text-[16px] leading-6"
                style={{ color: "#1a1c1e" }}
                value={inputText}
                readOnly
              />
              <div className="absolute bottom-4 right-4 flex items-center gap-3">
                <button
                  onClick={onBack}
                  className="text-white px-4 py-2.5 rounded-2xl shadow-lg hover:translate-y-[-2px] active:scale-95 transition-all flex items-center justify-center gap-2 text-[14px] font-bold"
                  style={{ background: "#b90014" }}
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                  Edit Input
                </button>
              </div>
            </div>

            {/* Suggested prompts */}
            <div className="space-y-4">
              <h3 className="text-[14px] font-semibold uppercase tracking-wider flex items-center gap-2" style={{ color: "#5d3f3c" }}>
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                Saran Kategori Terkait
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Desain Logo", "Landing Page", "Konten Sosmed", "Edit Video Reels"].map((p) => (
                  <button
                    key={p}
                    onClick={() => router.push(`/browse?q=${encodeURIComponent(p)}`)}
                    className="px-5 py-2.5 rounded-full border text-[14px] transition-all active:scale-95 hover:text-[#b90014] hover:border-[#b90014]"
                    style={{ background: "#efedf0", borderColor: "rgba(231,189,184,0.3)", color: "#5d3f3c" }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Right: Generated brief */}
          <section className="lg:col-span-5 h-full">
            <div
              className="border rounded-3xl overflow-hidden flex flex-col shadow-sm"
              style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.4)", height: "700px" }}
            >
              {/* Header */}
              <div className="p-6 border-b flex items-center justify-between" style={{ borderBottomColor: "rgba(231,189,184,0.2)" }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ color: "#b90014" }}>description</span>
                  <h2 className="text-[24px] font-semibold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Preview Brief Terstruktur</h2>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: "rgba(29,191,115,0.1)", color: "#1dbf73" }}>
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span className="text-[12px] font-medium">AI Active</span>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar" style={{ background: "rgba(250,249,251,0.3)" }}>
                {/* Ringkasan */}
                <div className="p-5 rounded-2xl border shadow-sm space-y-3 transition-all hover:border-[#b90014]/20" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                  <h4 className="text-[14px] font-semibold flex items-center gap-2" style={{ color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[18px]">info</span> Ringkasan Proyek
                  </h4>
                  <p className="text-[16px] leading-6" style={{ color: "#5d3f3c" }}>
                    Pembuatan kebutuhan {category.toLowerCase()} yang disesuaikan dengan brief Anda untuk eksekusi oleh mahasiswa spesialis.
                  </p>
                </div>

                {/* Ruang Lingkup */}
                <div className="p-5 rounded-2xl border shadow-sm space-y-3 transition-all hover:border-[#b90014]/20" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                  <h4 className="text-[14px] font-semibold flex items-center gap-2" style={{ color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span> Ruang Lingkup Pekerjaan
                  </h4>
                  <ul className="space-y-2">
                    {["Drafting & konsep awal sesuai brief.", "Panduan warna, tipografi, dan aset visual.", "Revisi bertahap & final handover."].map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] leading-5" style={{ color: "#5d3f3c" }}>
                        <span className="material-symbols-outlined text-[18px]" style={{ color: "#b90014" }}>check_circle</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deadline + Budget grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border shadow-sm space-y-2 transition-all hover:border-[#b90014]/20" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                    <h4 className="text-[14px] font-semibold flex items-center gap-2" style={{ color: "#b90014" }}>
                      <span className="material-symbols-outlined text-[18px]">calendar_today</span> Estimasi Tenggat
                    </h4>
                    <p className="text-[20px] font-semibold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {detectDeadline(inputText)}
                    </p>
                    <p className="text-[12px] font-medium" style={{ color: "#926e6b" }}>Berdasarkan input Anda</p>
                  </div>
                  <div className="p-5 rounded-2xl border shadow-sm space-y-2 transition-all hover:border-[#b90014]/20" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                    <h4 className="text-[14px] font-semibold flex items-center gap-2" style={{ color: "#b90014" }}>
                      <span className="material-symbols-outlined text-[18px]">payments</span> Estimasi Budget
                    </h4>
                    <p className="text-[20px] font-semibold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {budget}
                    </p>
                    <p className="text-[12px] font-medium" style={{ color: "#926e6b" }}>Fixed Price</p>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="p-5 rounded-2xl border shadow-sm space-y-3 transition-all hover:border-[#b90014]/20" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                  <h4 className="text-[14px] font-semibold flex items-center gap-2" style={{ color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[18px]">package_2</span> Deliverables yang Diharapkan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["File Master Vektor", "Export HQ (PNG, JPG)", "Dokumentasi Final"].map((d) => (
                      <span key={d} className="px-3 py-1 rounded-lg text-[12px] font-medium" style={{ background: "#efedf0", color: "#5d3f3c" }}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="p-6 border-t" style={{ background: "#ffffff", borderTopColor: "rgba(231,189,184,0.2)" }}>
                <button
                  onClick={handleUseBriefAndSearch}
                  disabled={isNavigating}
                  className="w-full text-white py-4 rounded-2xl text-[14px] font-semibold flex items-center justify-center gap-3 hover:shadow-xl hover:-translate-y-[2px] active:scale-[0.98] transition-all disabled:opacity-75"
                  style={{ background: "#b90014" }}
                >
                  {isNavigating ? (
                    <>
                      <span className="animate-spin material-symbols-outlined text-[18px]">refresh</span>
                      Mencari Mahasiswa Terverifikasi AI...
                    </>
                  ) : (
                    <>
                      Gunakan Brief Ini &amp; Cari Mahasiswa
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <MobileBottomNav active="brief" />
      <div className="h-16 md:hidden" />
    </>
  );
}
