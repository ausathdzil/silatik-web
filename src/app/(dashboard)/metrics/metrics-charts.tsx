'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { week: 'Week 1', df: 25, inspeksi: 10 },
  { week: 'Week 2', df: 32, inspeksi: 26 },
  { week: 'Week 3', df: 10, inspeksi: 20 },
  { week: 'Week 4', df: 5, inspeksi: 30 },
];

const chartConfig = {
  df: {
    label: 'Dengue Fever Cases',
    color: 'var(--color-blue-600)',
  },
  inspeksi: {
    label: 'Inspections',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function CaseInspectionRatioChart() {
  return (
    <ChartContainer className="aspect-auto h-[250px]" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          right: 36,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="week"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          interval={0}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="df"
          type="linear"
          stroke="var(--color-df)"
          strokeWidth={2}
        />
        <Line
          dataKey="inspeksi"
          type="linear"
          stroke="hsl(var(--chart-1))"
          strokeWidth={2}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
    </ChartContainer>
  );
}
