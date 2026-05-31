import { brandColors, chartColors, darkBrandColors } from "@/lib/tokens";
import type { AppTheme } from "@/store/slices/uiSlice";

export interface ChartTheme {
  surface: string;
  text: string;
  muted: string;
  grid: string;
  primary: string;
  secondary: string;
  info: string;
  warning: string;
  accent: string;
  neutral: string;
}

export function getChartTheme(theme: AppTheme): ChartTheme {
  const base = theme === "dark" ? darkBrandColors : brandColors;

  return {
    surface: base.surfaceWhite,
    text: base.secondary,
    muted: base.mutedText,
    grid: base.border,
    primary: chartColors.primary,
    secondary: chartColors.secondary,
    info: chartColors.info,
    warning: chartColors.warning,
    accent: chartColors.accent,
    neutral: chartColors.neutral,
  };
}
