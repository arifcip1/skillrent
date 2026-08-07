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
  if (t.includes("app") || t.includes("flutter") || t.includes("mobile") || t.includes("web") || t.includes("landing") || t.includes("program") || t.includes("code") || t.includes("sistem")) return "Web & Mobile Development";
  if (t.includes("tableau") || t.includes("spss") || t.includes("data") || t.includes("excel") || t.includes("looker") || t.includes("python") || t.includes("analisis")) return "Data Analytics & AI";
  if (t.includes("video") || t.includes("reels") || t.includes("tiktok") || t.includes("motion") || t.includes("edit") || t.includes("youtube")) return "Video Editing & Animation";
  if (t.includes("konten") || t.includes("sosmed") || t.includes("instagram") || t.includes("artikel") || t.includes("seo") || t.includes("naskah") || t.includes("copywriter")) return "Digital Marketing & Content";
  if (t.includes("logo") || t.includes("desain") || t.includes("kemasan") || t.includes("packaging") || t.includes("gambar") || t.includes("brand")) return "Graphic Design & Branding";
  return "Jasa Spesialis Mahasiswa";
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

function generateProjectSummary(text: string, category: string): string {
  if (!text || text.length < 5) return "Detail proyek belum diisi.";
  const cleanText = text.trim();
  const firstSentence = cleanText.split(/[.!?\n]/)[0].trim();

  if (firstSentence.length >= 15) {
    return `Proyek ${category}: "${firstSentence}". Dirumuskan secara spesifik untuk dikerjakan oleh mahasiswa ahli terverifikasi dengan standar akademik.`;
  }
  return `Pembuatan kebutuhan ${category} profesional berdasarkan instruksi Anda: "${cleanText.slice(0, 100)}..."`;
}

function generateScopeOfWork(text: string, category: string): string[] {
  const t = text.toLowerCase();

  if (t.includes("app") || t.includes("flutter") || t.includes("web") || t.includes("landing") || category.includes("Development")) {
    return [
      "Analisis arsitektur sistem, alur pengguna (User Flow), & wireframe antarmuka.",
      "Pengembangan UI/UX responsif & integrasi fitur utama (API / GPS / Database).",
      "Pengujian fungsionalitas aplikasi (QA testing) & optimasi performa.",
      "Penyerahan source code lengkap (GitHub/Zip) & petunjuk instalasi.",
    ];
  }

  if (t.includes("tableau") || t.includes("spss") || t.includes("excel") || t.includes("data") || category.includes("Data")) {
    return [
      "Pembersihan (data cleaning) & validasi struktur dataset dari sumber data.",
      "Pengolahan statistik & pemodelan analisis sesuai kriteria proyek.",
      "Pembuatan dashboard visualisasi interaktif (Tableau / Looker Studio / BI).",
      "Penyusunan laporan ringkasan eksekutif (Executive Summary / PDF).",
    ];
  }

  if (t.includes("video") || t.includes("reels") || t.includes("tiktok") || category.includes("Video")) {
    return [
      "Pemotongan ritme video (rough cut) & penyusunan alur cerita (storyboard).",
      "Penambahan motion graphics, teks subtitle, transisi, & efek visual.",
      "Color grading profesional & penataan audio / sound design bebas cipta.",
      "Export video HQ format MP4 (Rasio 9:16 / 16:9 siap tayang).",
    ];
  }

  if (t.includes("konten") || t.includes("sosmed") || t.includes("artikel") || t.includes("seo") || category.includes("Marketing")) {
    return [
      "Riset kata kunci (SEO / Hashtag) & formulasi pilar konten target pasar.",
      "Penyusunan naskah copywriting / artikel SEO berkualitas tinggi.",
      "Desain template visual feed / pengerjaan draft konten promosi.",
      "Revisi penyelarasan tone of voice & penyerahan jadwal rilis.",
    ];
  }

  // Graphic Design / Logo default
  return [
    "Riset konsep visual, moodboard, & sketsa ide awal.",
    "Pembuatan 2-3 alternatif konsep desain utama (Vektor/HD).",
    "Penyelarasan palet warna, tipografi brand, & revisi masukan.",
    "Finalisasi & ekspor aset lengkap (AI, EPS, SVG, PNG transparan).",
  ];
}

function generateDeliverables(text: string, category: string): string[] {
  const t = text.toLowerCase();

  if (t.includes("app") || t.includes("flutter") || t.includes("web") || t.includes("landing") || category.includes("Development")) {
    return ["Source Code Repository", "Live Demo Link", "Dokumentasi API & Install", "Aset Figma UI/UX"];
  }

  if (t.includes("tableau") || t.includes("spss") || t.includes("excel") || t.includes("data") || category.includes("Data")) {
    return ["File Dashboard Tableau/BI", "Laporan Analisis (PDF)", "Dataset Terstruktur (Excel/CSV)", "Ringkasan Eksekutif"];
  }

  if (t.includes("video") || t.includes("reels") || t.includes("tiktok") || category.includes("Video")) {
    return ["Master Video Full HD (MP4)", "Project File (Premiere/AE)", "Aset Subtitle & Grafis", "Format Vertical (9:16)"];
  }

  if (t.includes("konten") || t.includes("sosmed") || t.includes("artikel") || t.includes("seo") || category.includes("Marketing")) {
    return ["Dokumen Artikel (.docx/PDF)", "Visual Feed & Story Kit", "Riset Keyword SEO", "Jadwal Posting Konten"];
  }

  return ["File Master Vektor (AI/EPS)", "Export HQ (PNG Transparan & JPG)", "Buku Panduan Brand (PDF)", "Palet Warna Kode Hex"];
}

export default function BriefPage() {
  const [step, setStep] = useState<Step>("input");
  const [inputText, setInputText] = useState("");
  const [preview, setPreview] = useState({
    budget: "Rp 0",
    deadline: "Tentukan di deskripsi",
    category: "Menunggu Input...",
    summary: "",
    scope: [] as string[],
    deliverables: [] as string[],
  });
  const syncTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (syncTimeout.current) clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(() => {
      const cat = detectCategory(inputText);
      setPreview({
        budget: detectBudget(inputText),
        deadline: detectDeadline(inputText),
        category: cat,
        summary: generateProjectSummary(inputText, cat),
        scope: generateScopeOfWork(inputText, cat),
        deliverables: generateDeliverables(inputText, cat),
      });
    }, 300);
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
                  <h3 className="text-[18px] font-semibold">Siap mengubah ide jadi brief terstruktur?</h3>
                  <p className="text-[14px] opacity-80">AI akan menganalisis scope &amp; rekomendasi mahasiswa yang cocok.</p>
                </div>
              </div>
              <button
                disabled={inputText.length < 10}
                onClick={() => setStep("result")}
                className="w-full md:w-auto px-6 py-3 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#b90014" }}
              >
                Generate AI Brief
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right Live Preview Panel (Step 1) */}
          <aside className="lg:col-span-4 flex flex-col gap-4">
            <div className="p-6 rounded-xl border shadow-sm space-y-6" style={{ background: "#ffffff", borderColor: "#e7bdb8" }}>
              <div className="flex items-center gap-2 border-b pb-4" style={{ borderBottomColor: "#e7bdb8" }}>
                <span className="material-symbols-outlined text-[20px]" style={{ color: "#0057b9" }}>auto_awesome</span>
                <h3 className="text-[16px] font-bold" style={{ color: "#1a1c1e" }}>Analisis AI Real-time</h3>
              </div>

              <div className="space-y-4">
                {/* Budget */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Estimasi Budget</span>
                  <div className="text-[20px] font-bold text-[#b90014]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {preview.budget}
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Estimasi Deadline</span>
                  <div className="text-[15px] font-semibold" style={{ color: "#1a1c1e" }}>{preview.deadline}</div>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Kategori Terdeteksi</span>
                  <span className="px-3 py-1 rounded-lg text-[13px] font-semibold border w-fit" style={{ background: "#ebf5ff", color: "#0057b9", borderColor: "#adc7ff" }}>
                    {preview.category}
                  </span>
                </div>

                <hr style={{ borderColor: "rgba(231,189,184,0.3)" }} />

                {/* Tasks */}
                <div className="flex flex-col gap-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Daftar Scope Pekerjaan (AI)</span>
                  {inputText.length > 10 ? (
                    <ul className="flex flex-col gap-2">
                      {preview.scope.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[13px]" style={{ color: "#1a1c1e" }}>
                          <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">check_circle</span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[12px] text-gray-400 italic">Ketik ide proyek Anda untuk melihat scope pekerjaan otomatis...</p>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
      <MobileBottomNav active="brief" />
    </>
  );
}

// ─── Step 2: Brief Result ─────────────────────────────────
function BriefResultStep({ inputText, onBack }: { inputText: string; onBack: () => void }) {
  const router = useRouter();
  const category = detectCategory(inputText);
  const budget = detectBudget(inputText);
  const deadline = detectDeadline(inputText);
  const summary = generateProjectSummary(inputText, category);
  const scopeOfWork = generateScopeOfWork(inputText, category);
  const deliverables = generateDeliverables(inputText, category);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleUseBriefAndSearch = () => {
    setIsNavigating(true);

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "skillrent_active_brief",
        JSON.stringify({
          inputText,
          category,
          budget,
          deadline,
          summary,
          scopeOfWork,
          deliverables,
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
                Brief Anda telah dirumuskan secara khusus oleh AI! Periksa ringkasan dan ruang lingkup di panel sebelah kanan.
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
                  Edit Input Prompt
                </button>
              </div>
            </div>
          </section>

          {/* Right: Generated brief */}
          <section className="lg:col-span-5 h-full">
            <div
              className="border rounded-3xl overflow-hidden flex flex-col shadow-sm"
              style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.4)", minHeight: "650px" }}
            >
              {/* Header */}
              <div className="p-6 border-b flex items-center justify-between" style={{ borderBottomColor: "rgba(231,189,184,0.2)" }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined" style={{ color: "#b90014" }}>description</span>
                  <h2 className="text-[20px] font-bold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Brief AI Terstruktur</h2>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  <span className="text-[12px] font-bold">AI Formulated</span>
                </div>
              </div>

              {/* Scrollable content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar" style={{ background: "rgba(250,249,251,0.3)" }}>
                {/* Ringkasan */}
                <div className="p-5 rounded-2xl border shadow-sm space-y-2 transition-all hover:border-[#b90014]/20" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                  <h4 className="text-[14px] font-semibold flex items-center gap-2" style={{ color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[18px]">info</span> Ringkasan Proyek (AI)
                  </h4>
                  <p className="text-[14px] leading-6 font-medium" style={{ color: "#1a1c1e" }}>
                    {summary}
                  </p>
                </div>

                {/* Ruang Lingkup */}
                <div className="p-5 rounded-2xl border shadow-sm space-y-3 transition-all hover:border-[#b90014]/20" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                  <h4 className="text-[14px] font-semibold flex items-center gap-2" style={{ color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span> Ruang Lingkup Pekerjaan (Scope)
                  </h4>
                  <ul className="space-y-2">
                    {scopeOfWork.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[13px] leading-5" style={{ color: "#1a1c1e" }}>
                        <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">check_circle</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deadline + Budget grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl border shadow-sm space-y-1 transition-all" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                    <h4 className="text-[12px] font-semibold flex items-center gap-1.5" style={{ color: "#b90014" }}>
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span> Estimasi Tenggat
                    </h4>
                    <p className="text-[18px] font-bold" style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {deadline}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl border shadow-sm space-y-1 transition-all" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                    <h4 className="text-[12px] font-semibold flex items-center gap-1.5" style={{ color: "#b90014" }}>
                      <span className="material-symbols-outlined text-[18px]">payments</span> Estimasi Budget
                    </h4>
                    <p className="text-[18px] font-bold" style={{ color: "#904d00", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      {budget}
                    </p>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="p-5 rounded-2xl border shadow-sm space-y-3 transition-all hover:border-[#b90014]/20" style={{ background: "#ffffff", borderColor: "rgba(231,189,184,0.2)" }}>
                  <h4 className="text-[14px] font-semibold flex items-center gap-2" style={{ color: "#b90014" }}>
                    <span className="material-symbols-outlined text-[18px]">package_2</span> Deliverables yang Diharapkan
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {deliverables.map((d) => (
                      <span key={d} className="px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="p-6 border-t" style={{ background: "#ffffff", borderTopColor: "rgba(231,189,184,0.2)" }}>
                <button
                  onClick={handleUseBriefAndSearch}
                  disabled={isNavigating}
                  className="w-full text-white py-3.5 rounded-2xl text-[14px] font-bold flex items-center justify-center gap-2 hover:shadow-xl active:scale-[0.98] transition-all disabled:opacity-75"
                  style={{ background: "#b90014" }}
                >
                  {isNavigating ? (
                    <>
                      <span className="animate-spin material-symbols-outlined text-[18px]">refresh</span>
                      Mencari Mahasiswa Terverifikasi...
                    </>
                  ) : (
                    <>
                      Gunakan Brief Ini &amp; Cari Mahasiswa
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
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
    </>
  );
}
