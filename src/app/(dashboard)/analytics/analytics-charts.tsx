'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

const riskData = [
  { name: 'High Rainfall', value: 75, fill: 'hsl(var(--chart-1))' },
  { name: 'Flood', value: 45, fill: 'hsl(var(--chart-2))' },
];

const riskConfig = {
  value: {
    label: 'Risk Percentage',
  },
} satisfies ChartConfig;

export default function AnalyticsChart() {
  return (
    <ChartContainer config={riskConfig} className="size-[300px]">
      <BarChart data={riskData} margin={{ left: 0 }}>
        <XAxis type="category" dataKey="name" interval={0} />
        <YAxis type="number" domain={[0, 100]} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
          formatter={(value: number) => `${value}%`}
        />
        <Bar dataKey="value" fill="fill" />
      </BarChart>
    </ChartContainer>
  );
}
