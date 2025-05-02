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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BoxIcon, MapPinnedIcon } from 'lucide-react';

const caseChartData = [
  { rw: 'RW 01', case: 12, fill: 'hsl(var(--chart-1))' },
  { rw: 'RW 02', case: 8, fill: 'hsl(var(--chart-2))' },
  { rw: 'RW 03', case: 6, fill: 'hsl(var(--chart-3))' },
  { rw: 'RW 04', case: 5, fill: 'hsl(var(--chart-4))' },
  { rw: 'RW 05', case: 4, fill: 'hsl(var(--chart-5))' },
];

const caseChartConfig = {
  case: {
    label: 'Case',
  },
  'RW 01': {
    label: 'RW 01',
  },
  'RW 02': {
    label: 'RW 02',
  },
  'RW 03': {
    label: 'RW 03',
  },
  'RW 04': {
    label: 'RW 04',
  },
  'RW 05': {
    label: 'RW 05',
  },
} satisfies ChartConfig;

export function DengueCaseChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-center gap-2">
          <MapPinnedIcon />
          <CardTitle>Case Distribution by RW</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={caseChartConfig}
          className="w-full mx-auto aspect-video pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent nameKey="rw" className="min-w-[150px]" />
              }
            />
            <ChartLegend content={<ChartLegendContent nameKey="rw" />} />
            <Pie
              data={caseChartData}
              dataKey="case"
              label={({ rw, case: caseCount }) => {
                const total = caseChartData.reduce(
                  (sum, item) => sum + item.case,
                  0
                );
                const percentage = ((caseCount / total) * 100).toFixed(1);
                return `${rw}: ${caseCount} (${percentage}%)`;
              }}
              nameKey="rw"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total cases for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}

const typeChartData = [
  { type: 'Bucket', case: 20, fill: 'var(--color-bucket)' },
  { type: 'Water Drain', case: 9, fill: 'var(--color-waterDrain)' },
  { type: 'Pond', case: 6, fill: 'var(--color-pond)' },
  { type: 'Sink', case: 3, fill: 'var(--color-sink)' },
  { type: 'Plant Pot', case: 2, fill: 'var(--color-plantPot)' },
];

const typeChartConfig = {
  case: {
    label: 'Case',
  },
  type: {
    label: 'Type',
  },
  bucket: {
    label: 'Bucket',
    color: 'hsl(var(--chart-1))',
  },
  waterDrain: {
    label: 'Water Drain',
    color: 'hsl(var(--chart-2))',
  },
  pond: {
    label: 'Pond',
    color: 'hsl(var(--chart-3))',
  },
  sink: {
    label: 'Sink',
    color: 'hsl(var(--chart-4))',
  },
  plantPot: {
    label: 'Plant Pot',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function TypeDistributionChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-center gap-2">
          <BoxIcon />
          <CardTitle>Case Distribution by Type</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={typeChartConfig}>
          <BarChart
            accessibilityLayer
            data={typeChartData}
            layout="vertical"
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="type"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis dataKey="case" type="number" />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="case" layout="vertical" radius={5}>
              <LabelList
                dataKey="case"
                position="insideRight"
                offset={8}
                className="fill-primary-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total cases for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
