import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileTextIcon, LightbulbIcon } from 'lucide-react';
import { CaseReportTable } from './components/case-report-table';
import {
  DengueCaseChart,
  TypeDistributionChart,
} from './components/dashboard-charts';
import { DengueMap } from './components/dengue-map';
import { PageHeader } from './components/page-header';

export default function Dashboard() {
  return (
    <>
      <PageHeader>Dengue Fever Case Distribution Map</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50">
          <DengueMap />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <DengueCaseChart />
          <TypeDistributionChart />
        </div>
        <InsightCard />
        <CaseReportCard />
      </main>
    </>
  );
}

function InsightCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <LightbulbIcon className="size-4" />
        <CardTitle>AI Insight</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          The sub-district with the highest DBD cases is RW 01 (34.3%), followed
          by RW 02 (22.9%) and RW 03 (17.1%). The majority of mosquito larvae
          were found in buckets/water containers (50%), drainage channels (18%),
          and ponds (12%), indicating the need for improved environmental
          sanitation. Prevention involves draining and covering water
          containers, recycling potential breeding sites (3M), as well as using
          larvicide in hard-to-drain places.
        </p>
      </CardContent>
    </Card>
  );
}

function CaseReportCard() {
  return (
    <Card className="min-h-[50vh]">
      <CardHeader className="flex items-center gap-2">
        <FileTextIcon className="size-4" />
        <CardTitle>Case Report</CardTitle>
      </CardHeader>
      <CardContent>
        <CaseReportTable />
      </CardContent>
    </Card>
  );
}
