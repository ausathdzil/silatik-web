import { getAIInsight, getCaseDistributionByType, getCaseReport, getHouseholds, getLarvaeByRW, getIncidence } from '@/app/(dashboard)/(overview)/data';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BanIcon, BoxIcon, FileTextIcon, LightbulbIcon, MapPinnedIcon } from 'lucide-react';
import { Suspense } from 'react';
import { PageHeader } from '../page-header';
import { CaseReportTable } from './case-report-table';
import { DengueCaseChart, HouseIndexChart, TypeDistributionChart } from './dashboard-charts';
import { DengueMap } from './dengue-map';

export default function Dashboard() {
  return (
    <>
      <PageHeader>Dengue Fever Case Distribution Map</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Suspense fallback={<Skeleton />}>
          <DengueMapCard />
          <div className="mt-4 flex flex-col items-center">
            <div className="flex gap-4 items-center">
              <LegendItem color="rgba(0,0,255,0.8)" label="1 (Low)" />
              <LegendItem color="rgba(0,255,255,0.8)" label="2" />
              <LegendItem color="rgba(255,255,0,0.8)" label="3" />
              <LegendItem color="rgba(255,0,0,0.8)" label="4" />
              <LegendItem color="rgba(255,0,0,0.8)" label="5 (High)" />
            </div>
            <span className="text-xs text-muted-foreground mt-1">Severity Level</span>
          </div>
        </Suspense>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <Suspense fallback={<Skeleton />}>
            <DengueCaseCard />
          </Suspense>
          <Suspense fallback={<Skeleton />}>
            <TypeDistributionCard />
          </Suspense>
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <Suspense fallback={<Skeleton />}>
            <HouseIndexCard />
          </Suspense>
          <Suspense fallback={<Skeleton />}>
            <IncidenceCard />
          </Suspense>
        </div>

        <Suspense fallback={<Skeleton />}>
          <InsightCard />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <CaseReportCard />
        </Suspense>
      </main>
    </>
  );
}

async function DengueMapCard() {
  const households = await getHouseholds();
  if (!households) return null;
  return (
    <div className="min-h-[60vh] flex-1 rounded-xl bg-muted/50 flex flex-col">
      <DengueMap households={households} />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="inline-block w-5 h-5 rounded-full border border-gray-300 mb-1" style={{ backgroundColor: color }} />
      <span className="text-xs text-gray-700">{label}</span>
    </div>
  );
}

async function DengueCaseCard() {
  const larvaeByRW = await getLarvaeByRW();

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-center gap-2">
          <MapPinnedIcon />
          <CardTitle>Case Distribution by RW</CardTitle>
        </div>
      </CardHeader>
      {larvaeByRW ? (
        <>
          <CardContent className="flex-1 pb-0">
            <DengueCaseChart larvaeByRW={larvaeByRW} />
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="leading-none text-muted-foreground">Showing total larvae count by RW for the last 6 months</div>
          </CardFooter>
        </>
      ) : (
        <CardContent className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
          <div className="rounded-full bg-muted p-4">
            <BanIcon className="size-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium">No Data Available</p>
            <p className="text-sm text-muted-foreground">Please check back later or contact support if the issue persists</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

async function TypeDistributionCard() {
  const caseDistributionByType = await getCaseDistributionByType();

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-center gap-2">
          <BoxIcon />
          <CardTitle>Case Distribution by Type</CardTitle>
        </div>
      </CardHeader>
      {caseDistributionByType ? (
        <>
          <CardContent className="flex-1 pb-0">
            <TypeDistributionChart caseDistributionByType={caseDistributionByType} />
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="leading-none text-muted-foreground">Showing total cases for the last 6 months</div>
          </CardFooter>
        </>
      ) : (
        <CardContent className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
          <div className="rounded-full bg-muted p-4">
            <BanIcon className="size-8 text-muted-foreground" />
          </div>
          <div className="text-center">
            <p className="font-medium">No Data Available</p>
            <p className="text-sm text-muted-foreground">Please check back later or contact support if the issue persists</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}

async function IncidenceCard() {
  const incidence = await getIncidence();

  return (
    <Card className="flex flex-col items-center justify-center py-8">
      <CardHeader className="flex items-center justify-center gap-2">
        <CardTitle>Incidence</CardTitle>
      </CardHeader>
      <CardContent>
        {incidence !== undefined && incidence !== null ? (
          <span className="text-4xl font-bold">{incidence}</span>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <BanIcon className="size-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">No Data Available</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

async function HouseIndexCard() {
  return (
    <Card className="flex flex-col items-center justify-center py-8">
      <CardHeader className="flex items-center justify-center gap-2">
        <CardTitle>House Index</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <HouseIndexChart />
      </CardContent>
    </Card>
  );
}

async function InsightCard() {
  const aiInsight = await getAIInsight();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <LightbulbIcon className="size-4" />
        <CardTitle>AI Insight</CardTitle>
      </CardHeader>
      <CardContent>{aiInsight ? <p>{aiInsight.insight}</p> : <p>No data available</p>}</CardContent>
    </Card>
  );
}

async function CaseReportCard() {
  const caseReport = await getCaseReport();

  return (
    <Card className="min-h-[50vh]">
      <CardHeader className="flex items-center gap-2">
        <FileTextIcon className="size-4" />
        <CardTitle>Case Report</CardTitle>
      </CardHeader>
      <CardContent>
        <CaseReportTable data={caseReport} />
      </CardContent>
    </Card>
  );
}
