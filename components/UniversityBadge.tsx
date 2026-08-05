interface UniversityBadgeProps {
  name: string;
  size?: "sm" | "md";
}

export default function UniversityBadge({
  name,
  size = "md",
}: UniversityBadgeProps) {
  const textSize = size === "sm" ? "text-[11px]" : "text-[12px]";
  const iconSize = size === "sm" ? "text-[14px]" : "text-[16px]";
  const px = size === "sm" ? "px-2 py-0.5" : "px-3 py-1.5";

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${px} rounded-full border ${textSize} font-semibold tracking-wide w-fit`}
      style={{
        background: "#ebf5ff",
        color: "#0057b9",
        borderColor: "#adc7ff",
      }}
    >
      <span
        className={`material-symbols-outlined fill ${iconSize}`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        verified
      </span>
      {name}
    </span>
  );
}
