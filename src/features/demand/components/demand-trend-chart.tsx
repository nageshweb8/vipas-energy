"use client";

import type { EChartsOption } from "echarts";

import { BaseChart } from "@/components/charts/base-chart";
import { getChartTheme } from "@/components/charts/chart-theme";
import { useAppSelector } from "@/store/hooks";
import type { DemandTrendPoint } from "../models";

interface DemandTrendChartProps {
  data: DemandTrendPoint[];
}

export function DemandTrendChart({ data }: DemandTrendChartProps) {
  const appTheme = useAppSelector((state) => state.ui.theme);
  const chartTheme = getChartTheme(appTheme);
  const labels = data.map((point) => point.label);
  const actual = data.map((point) => point.actual);
  const forecast = data.map((point) => point.forecast);
  const previous = data.map((point) => point.previous);

  const option: EChartsOption = {
    color: [chartTheme.primary, chartTheme.info, chartTheme.neutral],
    grid: {
      top: 36,
      right: 18,
      bottom: 30,
      left: 38,
    },
    legend: {
      top: 2,
      right: 12,
      itemHeight: 8,
      itemWidth: 22,
      textStyle: {
        color: chartTheme.muted,
        fontFamily: "Montserrat",
        fontSize: 12,
      },
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
      boundaryGap: false,
      data: labels,
      axisLine: {
        lineStyle: {
          color: chartTheme.grid,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: chartTheme.muted,
        fontFamily: "Montserrat",
        interval: 1,
      },
    },
    yAxis: {
      type: "value",
      name: "MWh",
      nameTextStyle: {
        color: chartTheme.text,
        fontFamily: "Montserrat",
        fontWeight: 600,
        align: "left",
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
        name: "Actual Demand",
        type: "line",
        smooth: true,
        data: actual,
        symbolSize: 5,
        lineStyle: {
          width: 3,
        },
        areaStyle: {
          color: chartTheme.primary,
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
          color: chartTheme.grid,
        },
      },
    ],
  };

  return <BaseChart option={option} height={270} />;
}
