import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BanIcon,
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
import { PageHeader } from '../page-header';
import { ActionPlan } from './action-plan';
import { RiskIndicatorChart } from './analytics-charts';
import { AnalyticsMap } from './analytics-map';
import { getActionPlan, getWeatherInsights } from './data';

export default async function Analytics() {
  return (
    <>
      <PageHeader>Analytics</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <WeatherCard />
          <TemperatureCard />
          <InspectionsCard />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
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

async function WeatherCard() {
  const weatherInsights = await getWeatherInsights();

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
            <span className="text-2xl font-bold">
              {weatherInsights?.weather.precip_mm} mm
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <DropletIcon className="size-4" />
          <span>Humidity:</span>
          <span>{weatherInsights?.weather.humidity}%</span>
        </div>
      </CardFooter>
    </Card>
  );
}

async function TemperatureCard() {
  const weatherInsights = await getWeatherInsights();

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
            <span className="text-2xl font-bold">
              {weatherInsights?.weather.temp_c}°C
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
    <Card>
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

async function RiskIndicatorCard() {
  const weatherInsights = await getWeatherInsights();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <ChartNetworkIcon className="size-4" />
        <CardTitle>Risk Indicator</CardTitle>
      </CardHeader>
      <CardContent>
        <RiskIndicatorChart riskData={weatherInsights?.riskIndicators!} />
      </CardContent>
    </Card>
  );
}

async function ActionPlanCard() {
  const initialPlan = await getActionPlan();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <LightbulbIcon className="size-4" />
        <CardTitle>Action Plan</CardTitle>
      </CardHeader>
      {initialPlan ? (
        <CardContent>
          <ActionPlan initialPlan={initialPlan} />
        </CardContent>
      ) : (
        <CardContent className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
          <div className="rounded-full bg-muted p-4">
            <BanIcon className="size-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium">No Data Available</p>
            <p className="text-sm text-muted-foreground">
              Please check back later or contact support if the issue persists
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
