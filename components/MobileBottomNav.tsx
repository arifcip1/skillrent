import Link from "next/link";

interface MobileBottomNavProps {
  active?: "home" | "search" | "brief" | "projects";
}

export default function MobileBottomNav({
  active = "home",
}: MobileBottomNavProps) {
  const items = [
    { key: "home", icon: "home", label: "Home", href: "/" },
    { key: "search", icon: "search", label: "Search", href: "/browse" },
    { key: "brief", icon: "auto_awesome", label: "Briefs", href: "/brief" },
    {
      key: "projects",
      icon: "work_history",
      label: "Projects",
      href: "/dashboard",
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 md:hidden border-t"
      style={{
        background: "#efedf0",
        borderTopColor: "#e7bdb8",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <Link
            key={item.key}
            href={item.href}
            className="flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all"
            style={
              isActive
                ? {
                    background: "#ffdad6",
                    color: "#b90014",
                    transform: "scale(0.9)",
                  }
                : { color: "#5d3f3c" }
            }
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[12px] font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
