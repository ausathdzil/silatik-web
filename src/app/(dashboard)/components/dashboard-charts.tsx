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

const caseChartData = [
  { neighborhood: 'pondokLabu', case: 12, fill: 'var(--color-pondokLabu)' },
  { neighborhood: 'cilandak', case: 8, fill: 'var(--color-cilandak)' },
  { neighborhood: 'cipete', case: 6, fill: 'var(--color-cipete)' },
  { neighborhood: 'fatmawati', case: 5, fill: 'var(--color-fatmawati)' },
  { neighborhood: 'lebakBulus', case: 4, fill: 'var(--color-lebakBulus)' },
];

const caseChartConfig = {
  case: {
    label: 'Case',
  },
  pondokLabu: {
    label: 'Pondok Labu',
    color: 'hsl(var(--chart-1))',
  },
  cilandak: {
    label: 'Cilandak',
    color: 'hsl(var(--chart-2))',
  },
  cipete: {
    label: 'Cipete',
    color: 'hsl(var(--chart-3))',
  },
  fatmawati: {
    label: 'Fatmawati',
    color: 'hsl(var(--chart-4))',
  },
  lebakBulus: {
    label: 'Lebak Bulus',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function DengueCaseChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-center">
          Dengue Fever Case Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={caseChartConfig}
          className="w-full mx-auto aspect-video pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  nameKey="neighborhood"
                  className="min-w-[150px]"
                />
              }
            />
            <ChartLegend
              content={<ChartLegendContent nameKey="neighborhood" />}
            />
            <Pie
              data={caseChartData}
              dataKey="case"
              label
              nameKey="neighborhood"
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
        <CardTitle className="text-center">Case Distribution by Type</CardTitle>
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
