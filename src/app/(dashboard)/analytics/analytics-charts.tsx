'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { RiskIndicator } from './data/definitions';

export function RiskIndicatorChart({
  riskData,
}: {
  riskData: RiskIndicator[];
}) {
  const sortedData = [...riskData].sort((a, b) => b.riskLevel - a.riskLevel);

  const chartConfig = {
    ...Object.fromEntries(
      sortedData.map((item, index) => [
        item.indicator,
        { label: item.indicator, color: `hsl(var(--chart-${index + 1}))` },
      ])
    ),
  } satisfies ChartConfig;

  const chartData = sortedData.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          left: 28,
          right: 28,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="indicator"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis dataKey="riskLevel" type="number" domain={[0, 5]} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="indicator" hideLabel />}
          formatter={(value: number) => `Level ${value}`}
        />
        <Bar dataKey="riskLevel" layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}
