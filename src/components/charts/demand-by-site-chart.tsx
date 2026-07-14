"use client";

import type { EChartsOption } from "echarts";

import { BaseChart } from "@/components/charts/base-chart";
import { getChartTheme } from "@/components/charts/chart-theme";
import { brandColors, chartColors } from "@/lib/tokens";
import { useAppSelector } from "@/store/hooks";
import type { DemandSiteBreakdown } from "@/types/demand";

interface DemandBySiteChartProps {
  data: DemandSiteBreakdown[];
  totalLabel: string;
}

const sitePalette: string[] = [
  chartColors.primary,
  chartColors.info,
  chartColors.accent,
  chartColors.neutral,
  brandColors.border,
];

export function DemandBySiteChart({
  data,
  totalLabel,
}: DemandBySiteChartProps) {
  const appTheme = useAppSelector((state) => state.ui.theme);
  const chartTheme = getChartTheme(appTheme);

  const option: EChartsOption = {
    color: sitePalette,
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
      text: totalLabel,
      subtext: "MWh\nTotal",
      left: "center",
      top: "39%",
      textStyle: {
        color: chartTheme.text,
        fontFamily: "Montserrat",
        fontSize: 28,
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
        name: "Demand by Site",
        type: "pie",
        radius: ["64%", "88%"],
        center: ["50%", "52%"],
        avoidLabelOverlap: true,
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
        data: data.map((site, index) => ({
          name: site.name,
          value: site.demandMwh,
          itemStyle: {
            color:
              sitePalette[index % sitePalette.length] ?? chartColors.neutral,
          },
        })),
      },
    ],
  };

  return <BaseChart option={option} height={290} />;
}
