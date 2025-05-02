import {
  getAIInsight,
  getCaseDistributionByType,
  getCaseReport,
  getLarvaeByRW,
} from '@/app/(dashboard)/(overview)/data';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BanIcon,
  BoxIcon,
  FileTextIcon,
  LightbulbIcon,
  MapPinnedIcon,
} from 'lucide-react';
import { PageHeader } from '../page-header';
import { CaseReportTable } from './case-report-table';
import { DengueCaseChart, TypeDistributionChart } from './dashboard-charts';
import { DengueMap } from './dengue-map';

export default function Dashboard() {
  return (
    <>
      <PageHeader>Dengue Fever Case Distribution Map</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50">
          <DengueMap />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <DengueCaseCard />
          <TypeDistributionCard />
        </div>
        <InsightCard />
        <CaseReportCard />
      </main>
    </>
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
            <div className="leading-none text-muted-foreground">
              Showing total larvae count by RW for the last 6 months
            </div>
          </CardFooter>
        </>
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
            <TypeDistributionChart
              caseDistributionByType={caseDistributionByType}
            />
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing total cases for the last 6 months
            </div>
          </CardFooter>
        </>
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

async function InsightCard() {
  const aiInsight = await getAIInsight();

  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <LightbulbIcon className="size-4" />
        <CardTitle>AI Insight</CardTitle>
      </CardHeader>
      <CardContent>
        {aiInsight ? <p>{aiInsight.insight}</p> : <p>No data available</p>}
      </CardContent>
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
