'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  CaseDistributionByType,
  LarvaeByRW,
} from '@/app/(dashboard)/(overview)/data/definitions';

export function DengueCaseChart({ larvaeByRW }: { larvaeByRW: LarvaeByRW[] }) {
  const caseChartConfig = {
    larvaeCount: {
      label: 'Larvae Count',
      color: 'hsl(var(--chart-1))',
    },
    ...Object.fromEntries(
      larvaeByRW.map((item, index) => [
        item.rwName,
        {
          label: item.rwName,
          color: `hsl(var(--chart-${index + 1}))`,
        },
      ])
    ),
  } satisfies ChartConfig;

  const chartData = larvaeByRW.map((item, index) => ({
    ...item,
    larvaeCount: parseInt(item.larvaeCount),
    fill: `hsl(var(--chart-${index + 1}))`,
  }));

  const nonZeroData = chartData.filter((item) => item.larvaeCount > 0);

  return (
    <ChartContainer
      config={caseChartConfig}
      className="w-full mx-auto aspect-video pb-0 [&_.recharts-pie-label-text]:fill-foreground"
    >
      <PieChart>
        <ChartTooltip
          content={
            <ChartTooltipContent nameKey="rwName" className="min-w-[150px]" />
          }
        />
        <Pie
          data={nonZeroData}
          dataKey="larvaeCount"
          label={({ rwName, larvaeCount }) => {
            const total = nonZeroData.reduce(
              (sum, item) => sum + item.larvaeCount,
              0
            );
            const percentage = ((larvaeCount / total) * 100).toFixed(1);
            return `${rwName}: ${larvaeCount} (${percentage}%)`;
          }}
          nameKey="rwName"
          labelLine={false}
        />
        <ChartLegend content={<ChartLegendContent nameKey="rwName" />} />
      </PieChart>
    </ChartContainer>
  );
}

export function TypeDistributionChart({
  caseDistributionByType,
}: {
  caseDistributionByType: CaseDistributionByType[];
}) {
  const sortedData = [...caseDistributionByType].sort(
    (a, b) => b.larvaeCount - a.larvaeCount
  );

  const chartConfig = {
    ...Object.fromEntries(
      sortedData.map((item, index) => [
        item.areaType,
        { label: item.areaType, color: `hsl(var(--chart-${index + 1}))` },
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
          left: 24,
          right: 24,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="areaType"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <XAxis dataKey="larvaeCount" type="number" />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="areaType" hideLabel />}
        />
        <Bar dataKey="larvaeCount" layout="vertical" radius={5}>
          <LabelList
            dataKey="larvaeCount"
            position="insideRight"
            offset={8}
            className="fill-primary-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
