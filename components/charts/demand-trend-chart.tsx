"use client";

import type { EChartsOption } from "echarts";

import { BaseChart } from "@/components/charts/base-chart";
import { brandColors, chartColors } from "@/lib/tokens";
import type { DemandTrendPoint } from "@/types/demand";

interface DemandTrendChartProps {
  data: DemandTrendPoint[];
}

export function DemandTrendChart({ data }: DemandTrendChartProps) {
  const labels = data.map((point) => point.label);
  const actual = data.map((point) => point.actual);
  const forecast = data.map((point) => point.forecast);
  const previous = data.map((point) => point.previous);

  const option: EChartsOption = {
    color: [chartColors.primary, chartColors.info, chartColors.neutral],
    grid: {
      top: 42,
      right: 18,
      bottom: 34,
      left: 38,
    },
    legend: {
      top: 2,
      right: 12,
      itemHeight: 8,
      itemWidth: 22,
      textStyle: {
        color: chartColors.neutral,
        fontFamily: "Montserrat",
        fontSize: 12,
      },
    },
    tooltip: {
      trigger: "axis",
      borderWidth: 0,
      backgroundColor: brandColors.surfaceWhite,
      textStyle: {
        color: chartColors.secondary,
        fontFamily: "Montserrat",
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: labels,
      axisLine: {
        lineStyle: {
          color: brandColors.border,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: chartColors.neutral,
        fontFamily: "Montserrat",
        interval: 1,
      },
    },
    yAxis: {
      type: "value",
      name: "MWh",
      nameTextStyle: {
        color: chartColors.secondary,
        fontFamily: "Montserrat",
        fontWeight: 600,
        align: "left",
      },
      splitLine: {
        lineStyle: {
          color: brandColors.border,
          type: "dashed",
        },
      },
      axisLabel: {
        color: chartColors.neutral,
        fontFamily: "Montserrat",
      },
    },
    series: [
      {
        name: "Actual Demand",
        type: "line",
        smooth: true,
        data: actual,
        symbolSize: 5,
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: chartColors.primary,
          opacity: 0.08,
        },
      },
      {
        name: "Forecast",
        type: "line",
        smooth: true,
        data: forecast,
        symbolSize: 0,
        lineStyle: {
          width: 2,
          type: "dashed",
        },
      },
      {
        name: "Previous Period",
        type: "line",
        smooth: true,
        data: previous,
        symbolSize: 0,
        lineStyle: {
          width: 1.5,
          color: brandColors.border,
        },
      },
    ],
  };

  return <BaseChart option={option} height={300} />;
}
