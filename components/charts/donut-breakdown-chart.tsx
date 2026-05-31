"use client";

import type { EChartsOption } from "echarts";

import { BaseChart } from "@/components/charts/base-chart";
import { getChartTheme } from "@/components/charts/chart-theme";
import { brandColors, chartColors } from "@/lib/tokens";
import { useAppSelector } from "@/store/hooks";

export interface DonutSegment {
  name: string;
  value: number;
  label: string;
}

interface DonutBreakdownChartProps {
  segments: DonutSegment[];
  centerLabel: string;
  centerSubtext: string;
  height?: number;
}

const segmentPalette: string[] = [
  chartColors.primary,
  chartColors.info,
  chartColors.accent,
  chartColors.warning,
  brandColors.border,
];

export function DonutBreakdownChart({
  segments,
  centerLabel,
  centerSubtext,
  height = 260,
}: DonutBreakdownChartProps) {
  const appTheme = useAppSelector((state) => state.ui.theme);
  const chartTheme = getChartTheme(appTheme);

  const option: EChartsOption = {
    color: segmentPalette,
    tooltip: {
      trigger: "item",
      borderWidth: 0,
      backgroundColor: chartTheme.surface,
      textStyle: {
        color: chartTheme.text,
        fontFamily: "Montserrat",
      },
    },
    title: {
      text: centerLabel,
      subtext: centerSubtext,
      left: "center",
      top: "39%",
      textStyle: {
        color: chartTheme.text,
        fontFamily: "Montserrat",
        fontSize: 24,
        fontWeight: 700,
      },
      subtextStyle: {
        color: chartTheme.text,
        fontFamily: "Montserrat",
        fontSize: 11,
        lineHeight: 17,
      },
    },
    series: [
      {
        name: "Breakdown",
        type: "pie",
        radius: ["62%", "86%"],
        center: ["50%", "52%"],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: segments.map((segment, index) => ({
          name: segment.name,
          value: segment.value,
          itemStyle: {
            color:
              segmentPalette[index % segmentPalette.length] ??
              chartColors.neutral,
          },
        })),
      },
    ],
  };

  return <BaseChart option={option} height={height} />;
}
