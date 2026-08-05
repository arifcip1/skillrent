import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Auth | SkillRent",
    template: "%s | SkillRent",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen" style={{ background: "#faf9fb" }}>
      {children}
    </div>
  );
}
