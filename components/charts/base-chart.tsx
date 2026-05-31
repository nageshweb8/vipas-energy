"use client";

import type { EChartsOption } from "echarts";
import ReactECharts from "echarts-for-react";

import { cn } from "@/lib/utils";

interface BaseChartProps {
  option: EChartsOption;
  height: number;
  className?: string;
}

export function BaseChart({ option, height, className }: BaseChartProps) {
  return (
    <div className={cn("w-full", className)} style={{ height }}>
      <ReactECharts
        className="h-full w-full"
        option={option}
        notMerge
        lazyUpdate
        opts={{ renderer: "canvas" }}
      />
    </div>
  );
}
