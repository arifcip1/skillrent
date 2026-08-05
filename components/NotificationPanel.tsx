import Link from "next/link";

interface Notification {
  id: number;
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: 1,
    icon: "check_circle",
    iconColor: "#1dbf73",
    iconBg: "rgba(29,191,115,0.1)",
    title: "Milestone Disetujui",
    message: "Klien Siti Aminah menyetujui Milestone 1 proyek Desain Logo.",
    time: "5 menit lalu",
    unread: true,
  },
  {
    id: 2,
    icon: "payments",
    iconColor: "#fd8b00",
    iconBg: "rgba(253,139,0,0.1)",
    title: "Pembayaran Masuk",
    message: "Rp 1.000.000 dari escrow milestone telah dicairkan ke dompetmu.",
    time: "1 jam lalu",
    unread: true,
  },
  {
    id: 3,
    icon: "chat",
    iconColor: "#0057b9",
    iconBg: "#ebf5ff",
    title: "Pesan Baru",
    message: "Farhan Maulana mengirimkan pesan di proyek UI Dashboard.",
    time: "2 jam lalu",
  },
  {
    id: 4,
    icon: "schedule",
    iconColor: "#b90014",
    iconBg: "#ffdad6",
    title: "Deadline Mendekat",
    message: "Proyek 'Edit Video Reels' berakhir dalam 2 hari.",
    time: "Kemarin",
  },
];

interface NotificationPanelProps {
  isDropdown?: boolean;
}

export default function NotificationPanel({
  isDropdown = false,
}: NotificationPanelProps) {
  const notifications = sampleNotifications;

  return (
    <div
      className={isDropdown ? "w-[360px]" : "w-full"}
      style={{ background: "#ffffff" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderBottomColor: "#e7bdb8" }}
      >
        <div>
          <h3
            className="text-[16px] font-semibold"
            style={{
              color: "#1a1c1e",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Notifikasi
          </h3>
          <p className="text-[12px]" style={{ color: "#5d3f3c" }}>
            {notifications.filter((n) => n.unread).length} belum dibaca
          </p>
        </div>
        <button
          className="text-[12px] font-semibold transition-colors hover:underline"
          style={{ color: "#b90014" }}
        >
          Tandai Semua Dibaca
        </button>
      </div>

      {/* List */}
      <div className={isDropdown ? "max-h-[400px] overflow-y-auto custom-scrollbar" : ""}>
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-3 px-5 py-4 border-b transition-colors hover:bg-[#f4f3f5] cursor-pointer relative"
            style={{ borderBottomColor: "#f4f3f5" }}
          >
            {n.unread && (
              <div
                className="absolute right-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                style={{ background: "#b90014" }}
              />
            )}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: n.iconBg }}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ color: n.iconColor }}
              >
                {n.icon}
              </span>
            </div>
            <div className="flex-1 min-w-0 pr-4">
              <p
                className="text-[13px] font-semibold mb-0.5"
                style={{ color: "#1a1c1e" }}
              >
                {n.title}
              </p>
              <p
                className="text-[12px] leading-4"
                style={{ color: "#5d3f3c" }}
              >
                {n.message}
              </p>
              <p
                className="text-[11px] mt-1.5"
                style={{ color: "#926e6b" }}
              >
                {n.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      {isDropdown && (
        <div
          className="px-5 py-3 text-center border-t"
          style={{ borderTopColor: "#e7bdb8" }}
        >
          <Link
            href="/notifications"
            className="text-[13px] font-semibold transition-colors hover:underline"
            style={{ color: "#b90014" }}
          >
            Lihat Semua Notifikasi
          </Link>
        </div>
      )}
    </div>
  );
}
