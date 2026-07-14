"use client";

import type { EChartsOption } from "echarts";

import { BaseChart } from "@/components/charts/base-chart";
import { getChartTheme } from "@/components/charts/chart-theme";
import { chartColors } from "@/lib/tokens";
import { useAppSelector } from "@/store/hooks";
import type { BarComparisonItem } from "@/types/energy";

interface BarComparisonChartProps {
  items: BarComparisonItem[];
  unit: string;
  height?: number;
}

export function BarComparisonChart({
  items,
  unit,
  height = 260,
}: BarComparisonChartProps) {
  const appTheme = useAppSelector((state) => state.ui.theme);
  const chartTheme = getChartTheme(appTheme);

  const option: EChartsOption = {
    color: [chartColors.primary],
    grid: {
      top: 20,
      right: 18,
      bottom: 42,
      left: 46,
    },
    tooltip: {
      trigger: "axis",
      borderWidth: 0,
      backgroundColor: chartTheme.surface,
      textStyle: {
        color: chartTheme.text,
        fontFamily: "Montserrat",
      },
    },
    xAxis: {
      type: "category",
      data: items.map((item) => item.label),
      axisLabel: {
        color: chartTheme.muted,
        fontFamily: "Montserrat",
        interval: 0,
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: chartTheme.grid,
        },
      },
    },
    yAxis: {
      type: "value",
      name: unit,
      nameTextStyle: {
        color: chartTheme.text,
        fontFamily: "Montserrat",
        fontWeight: 600,
      },
      splitLine: {
        lineStyle: {
          color: chartTheme.grid,
          type: "dashed",
        },
      },
      axisLabel: {
        color: chartTheme.muted,
        fontFamily: "Montserrat",
      },
    },
    series: [
      {
        name: unit,
        type: "bar",
        data: items.map((item) => item.value),
        barMaxWidth: 36,
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: chartColors.primary,
        },
      },
    ],
  };

  return <BaseChart option={option} height={height} />;
}
