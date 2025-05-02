import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DengueCaseChart,
  TypeDistributionChart,
} from './components/dashboard-charts';
import { DengueMap } from './components/dengue-map';
import { PageHeader } from './components/page-header';
import { FileTextIcon, LightbulbIcon } from 'lucide-react';
import { CaseReportTable } from './components/case-report-table';

export default function Dashboard() {
  return (
    <>
      <PageHeader>Dengue Fever Case Distribution Map</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50">
          <DengueMap />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="aspect-video rounded-xl">
            <DengueCaseChart />
          </div>
          <div className="aspect-video rounded-xl">
            <TypeDistributionChart />
          </div>
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
          Wilayah dengan kasus DBD tertinggi adalah Pondok Labu (32.4%), diikuti
          oleh Cilandak (21.6%) dan Cipete (16.2%). Mayoritas jentik nyamuk
          ditemukan di ember/tandon air (40%), saluran air got (25%), dan pasar
          tradisional (15%), menunjukkan perlunya peningkatan kebersihan
          lingkungan. Pencegahan dapat dilakukan dengan 3M (Menguras, Menutup,
          Mendaur ulang) serta penggunaan larvasida pada tempat yang sulit
          dikuras.
        </p>
      </CardContent>
    </Card>
  );
}

function CaseReportCard() {
  return (
    <Card>
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
