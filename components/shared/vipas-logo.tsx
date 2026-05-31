import { cn } from "@/lib/utils";

interface VipasLogoProps {
  className?: string;
  /** Controls whether the wordmark text is shown alongside the icon */
  showWordmark?: boolean;
  iconSize?: number;
}

/**
 * Vipas Energy brand logo — SVG icon + wordmark.
 * All colours are hard-coded to brand tokens so the logo is consistent
 * even when rendered outside a Tailwind-styled surface.
 */
export function VipasLogo({
  className,
  showWordmark = true,
  iconSize = 40,
}: VipasLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      {/* Icon mark — leaf + bolt suggesting green energy */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Circle background */}
        <circle cx="20" cy="20" r="20" fill="#E6F4F1" />
        {/* Leaf shape */}
        <path
          d="M20 8C13 8 9 14 9 20c0 5 3.5 9.5 9 11l2-5c-3-.8-5-3.5-5-6 0-4 3-8 8-8 4.5 0 7.5 3.2 8 7.5-1-.3-2-.5-3-.5-4 0-7 3-7 7 0 2 .8 3.8 2 5.1C25.8 32.3 29 28.6 29 24c0-2.5-.9-4.8-2.4-6.6C28.4 14.8 27 8 20 8Z"
          fill="#00A176"
          opacity="0.85"
        />
        {/* Lightning bolt */}
        <path d="M21.5 14l-4 8h3.5l-1 6 5-8.5H22l1.5-5.5z" fill="#003F5C" />
      </svg>

      {showWordmark && (
        <span className="text-2xl leading-none font-bold tracking-tight select-none">
          <span style={{ color: "#003F5C" }}>Vipas</span>{" "}
          <span style={{ color: "#00A176" }}>Energy</span>
        </span>
      )}
    </div>
  );
}
