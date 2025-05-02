import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartColumnBigIcon,
  ChartNetworkIcon,
  CloudRainWindIcon,
  CloudSunIcon,
  DropletIcon,
  HouseIcon,
  LightbulbIcon,
  MapIcon,
  ThermometerSunIcon,
} from 'lucide-react';
import { PageHeader } from '../components/page-header';
import AnalyticsChart from './analytics-charts';
import { AnalyticsMap } from './analytics-map';
import { ActionPlan } from './action-plan';

export default function Analytics() {
  return (
    <>
      <PageHeader>Analytics</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <WeatherCard />
          <TemperatureCard />
          <InspectionsCard />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <SummaryMapCard />
          <RiskIndicatorCard />
        </div>
        <div className="min-h-[50vh]">
          <ActionPlanCard />
        </div>
      </main>
    </>
  );
}

function WeatherCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <CloudSunIcon className="size-4" />
        <CardTitle>Weather Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <CloudRainWindIcon className="size-24 stroke-blue-300 " />
          <div className="flex flex-col font-medium">
            <span>Rainfall</span>
            <span className="text-2xl font-bold">120 mm</span>
            <span className="text-muted-foreground text-sm">
              +10 mm from last week
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <DropletIcon className="size-4" />
          <span>Humidity:</span>
          <span>70% (Last week: 60%, up 10%)</span>
        </div>
      </CardFooter>
    </Card>
  );
}

function TemperatureCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <CloudSunIcon className="size-4" />
        <CardTitle>Temperature Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <ThermometerSunIcon className="size-24 stroke-orange-300 " />
          <div className="flex flex-col font-medium">
            <span>Average Temperature</span>
            <span className="text-2xl font-bold">30°C</span>
            <span className="text-muted-foreground text-sm">
              +2°C from last week
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <LightbulbIcon className="size-4" />
          <span>Warm temperature accelerates mosquito breeding</span>
        </div>
      </CardFooter>
    </Card>
  );
}

function InspectionsCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <HouseIcon className="size-4" />
        <CardTitle>Home Inspections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <ChartColumnBigIcon className="size-24 stroke-green-300 " />
          <div className="flex flex-col font-medium">
            <span className="text-sm">Total Inspections:</span>
            <span className="text-xl font-bold">1,200 homes</span>
            <span className="text-sm">Larvae Detected:</span>
            <span className="text-muted-foreground">456 homes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <LightbulbIcon className="size-4" />
          <span>Last week:</span>
          <span>1,000 inspections, 200 positive (20%)</span>
        </div>
      </CardFooter>
    </Card>
  );
}

function SummaryMapCard() {
  return (
    <Card className="col-span-2">
      <CardHeader className="flex items-center gap-2">
        <MapIcon className="size-4" />
        <CardTitle>Risk Summary Map</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1">
        <AnalyticsMap />
      </CardContent>
    </Card>
  );
}

function RiskIndicatorCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <ChartNetworkIcon className="size-4" />
        <CardTitle>Risk Indicator</CardTitle>
      </CardHeader>
      <CardContent>
        <AnalyticsChart />
      </CardContent>
    </Card>
  );
}

async function getActionPlan() {
  return {
    objective:
      'Reduce the positive rate of mosquito breeding sites by 20% within 1 month.',
    targetedInterventions: [
      'Intensify home visits by Jumantik cadres',
      'Conduct fogging in hotspot areas',
      'Launch community education campaigns',
    ],
    timeline: 'Next 3 Months',
    resources: ['Larvicide', 'Fogging equipment', 'Personnel'],
    monitoring: [
      'Monitor the positive rate of mosquito breeding sites weekly',
      'Conduct post-fogging larval surveys',
    ],
  };
}

async function ActionPlanCard() {
  const initialPlan = await getActionPlan();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <LightbulbIcon className="size-4" />
        <CardTitle>Action Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <ActionPlan initialPlan={initialPlan} />
      </CardContent>
    </Card>
  );
}
