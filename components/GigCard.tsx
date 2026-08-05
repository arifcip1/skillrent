import Link from "next/link";
import UniversityBadge from "./UniversityBadge";

interface GigCardProps {
  id: string | number;
  title: string;
  sellerName: string;
  sellerUniversity: string;
  price: string;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  category?: string;
}

export default function GigCard({
  id,
  title,
  sellerName,
  sellerUniversity,
  price,
  rating = 4.9,
  reviewCount = 42,
  imageUrl,
  category,
}: GigCardProps) {
  return (
    <Link href={`/gig/${id}`} className="group block">
      <div
        className="rounded-[1rem] border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        style={{ background: "#ffffff", borderColor: "#e7bdb8" }}
      >
        {/* Thumbnail */}
        <div
          className="aspect-video overflow-hidden"
          style={{ background: "#efedf0" }}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ color: "#5d3f3c" }}
            >
              <span className="material-symbols-outlined text-[48px] opacity-30">
                {category === "design" ? "palette" : category === "web" ? "code" : "work"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Seller info */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: "#b90014" }}
            >
              {sellerName.charAt(0)}
            </div>
            <div>
              <p className="text-[12px] font-semibold" style={{ color: "#1a1c1e" }}>
                {sellerName}
              </p>
              <UniversityBadge name={sellerUniversity} size="sm" />
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-[14px] font-semibold leading-5 line-clamp-2 group-hover:text-[#b90014] transition-colors"
            style={{ color: "#1a1c1e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]" style={{ color: "#fd8b00", fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="text-[13px] font-bold" style={{ color: "#1a1c1e" }}>
              {rating}
            </span>
            <span className="text-[12px]" style={{ color: "#5d3f3c" }}>
              ({reviewCount})
            </span>
          </div>

          {/* Price */}
          <div
            className="pt-2 border-t flex items-center justify-between"
            style={{ borderTopColor: "#e7bdb8" }}
          >
            <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: "#5d3f3c" }}>
              Mulai dari
            </span>
            <span
              className="text-[16px] font-bold"
              style={{ color: "#b90014", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
