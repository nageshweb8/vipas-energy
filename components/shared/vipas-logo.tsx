import Image from "next/image";

import logoMark from "@/public/brand/vipas-energy-logo.png";
import { cn } from "@/lib/utils";

interface VipasLogoProps {
  className?: string;
  /** Controls whether the wordmark text is shown alongside the icon */
  showWordmark?: boolean;
  iconSize?: number;
}

export function VipasLogo({
  className,
  showWordmark = true,
  iconSize = 40,
}: VipasLogoProps) {
  const iconSizeClassName =
    iconSize >= 44 ? "size-11" : iconSize >= 40 ? "size-10" : "size-9";

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={logoMark}
        alt="Vipas Energy logo"
        className={cn(iconSizeClassName, "shrink-0 object-contain")}
        priority
      />

      {showWordmark && (
        <span className="text-2xl leading-none font-bold tracking-tight select-none">
          <span className="text-brand-secondary">Vipas</span>
          <span className="text-brand-primary"> Energy</span>
        </span>
      )}
    </div>
  );
}
