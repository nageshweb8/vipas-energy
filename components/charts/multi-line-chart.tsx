"use client";

import type { EChartsOption, LineSeriesOption } from "echarts";

import { BaseChart } from "@/components/charts/base-chart";
import { getChartTheme } from "@/components/charts/chart-theme";
import { useAppSelector } from "@/store/hooks";

export interface ChartLineSeries {
  name: string;
  values: number[];
  color: string;
  dashed?: boolean | undefined;
  area?: boolean | undefined;
}

interface MultiLineChartProps {
  labels: string[];
  series: ChartLineSeries[];
  yAxisName: string;
  height?: number;
}

export function MultiLineChart({
  labels,
  series,
  yAxisName,
  height = 270,
}: MultiLineChartProps) {
  const appTheme = useAppSelector((state) => state.ui.theme);
  const chartTheme = getChartTheme(appTheme);

  const option: EChartsOption = {
    color: series.map((item) => item.color),
    grid: {
      top: 36,
      right: 18,
      bottom: 30,
      left: 40,
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
      },
    },
    yAxis: {
      type: "value",
      name: yAxisName,
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
    series: series.map((item): LineSeriesOption => {
      const lineSeries: LineSeriesOption = {
        name: item.name,
        type: "line" as const,
        smooth: true,
        data: item.values,
        symbolSize: item.dashed ? 0 : 5,
        lineStyle: {
          width: item.dashed ? 2 : 3,
          type: item.dashed ? "dashed" : "solid",
        },
      };

      if (!item.area) {
        return lineSeries;
      }

      return {
        ...lineSeries,
        areaStyle: {
          color: item.color,
          opacity: 0.08,
        },
      };
    }),
  };

  return <BaseChart option={option} height={height} />;
}
