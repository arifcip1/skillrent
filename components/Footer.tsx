import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="w-full py-12 px-4 md:px-12 border-t"
      style={{
        background: "#40161c",
        borderTopColor: "rgba(146,110,107,0.2)",
      }}
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <span
            className="text-[24px] font-semibold leading-8"
            style={{ color: "#ffffff", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            SkillRent
          </span>
          <p className="text-[14px] leading-5" style={{ color: "#e3e2e4" }}>
            Platform terdepan untuk kolaborasi bisnis dengan talenta mahasiswa
            terverifikasi.
          </p>
        </div>

        {/* Platform */}
        <div className="space-y-4">
          <h4
            className="text-[14px] font-semibold tracking-[0.05em]"
            style={{ color: "#ffffff" }}
          >
            Platform
          </h4>
          <ul className="space-y-2">
            {["About", "University Partners", "Safety"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="text-[14px] leading-5 transition-colors hover:text-[#fd8b00]"
                  style={{ color: "#e3e2e4" }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div className="space-y-4">
          <h4
            className="text-[14px] font-semibold tracking-[0.05em]"
            style={{ color: "#ffffff" }}
          >
            Support
          </h4>
          <ul className="space-y-2">
            {["Help Center", "Terms of Service", "Privacy Policy"].map(
              (item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-[14px] leading-5 transition-colors hover:text-[#fd8b00]"
                    style={{ color: "#e3e2e4" }}
                  >
                    {item}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Connect */}
        <div className="space-y-4">
          <h4
            className="text-[14px] font-semibold tracking-[0.05em]"
            style={{ color: "#ffffff" }}
          >
            Connect
          </h4>
          <div className="flex gap-3">
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#b90014]"
              style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff" }}
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#b90014]"
              style={{ background: "rgba(255,255,255,0.05)", color: "#ffffff" }}
            >
              <span className="material-symbols-outlined text-[20px]">
                alternate_email
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="max-w-[1280px] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="text-[14px] leading-5" style={{ color: "#e3e2e4" }}>
          © 2026 SkillRent Ecosystem. All rights reserved.
        </p>
        <div className="flex gap-6">
          <span className="text-[12px] font-medium" style={{ color: "#e3e2e4" }}>
            🇮🇩 Indonesia
          </span>
        </div>
      </div>
    </footer>
  );
}
