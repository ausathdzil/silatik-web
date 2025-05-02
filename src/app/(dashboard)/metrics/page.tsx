import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartLineIcon,
  ClockFadingIcon,
  MessageCircleMoreIcon,
  ThermometerIcon,
  UsersRoundIcon,
  ZapIcon,
} from 'lucide-react';
import { PageHeader } from '../page-header';
import { DateRangePicker } from './date-picker';
import { CaseInspectionRatioChart } from './metrics-charts';

export default function MetricsPage() {
  return (
    <>
      <PageHeader>Action Plan Monitoring</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <DateRangePicker />
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <ReportingTimeCard />
          <CommunityEngagementCard />
        </div>
        <CaseInspectionRatioCard />
        <ImpactSummaryCard />
      </main>
    </>
  );
}

function ReportingTimeCard() {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <ClockFadingIcon className="size-4" />
          <CardDescription>Reporting Time</CardDescription>
        </div>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          12.3 Hours
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex items-center gap-2 font-medium">
          <ZapIcon className="size-4" /> Reporting Speed
        </div>
        <div className="text-muted-foreground text-xs">
          Since the action began, the average reporting time has decreased by 12
          hours. This indicates improved coordination and system usage in the
          field.
        </div>
      </CardFooter>
    </Card>
  );
}

function CommunityEngagementCard() {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <div className="flex items-center gap-2">
          <UsersRoundIcon className="size-4" />
          <CardDescription>Community Engagement</CardDescription>
        </div>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          + 0.73 <span className="text-green-600">(Positive)</span>
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex items-center gap-2 font-medium">
          <MessageCircleMoreIcon className="size-4" /> Public Sentiment
        </div>
        <div className="text-muted-foreground text-xs">
          Residents have begun actively discussing this program on social media,
          with the majority expressing positive sentiment.
        </div>
      </CardFooter>
    </Card>
  );
}

function ImpactSummaryCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <ThermometerIcon className="size-4" />
        <CardDescription>Impact Summary</CardDescription>
      </CardHeader>
      <CardContent className="text-sm space-y-4">
        <p>
          Implementation of the action plan starting on [Start Date - Tanggal
          Mulai Rencana] shows several positive impacts. Reporting efficiency
          has significantly improved, evident from the decrease in average
          reporting time to 12.3 hours. This indicates improved coordination and
          system usage in the field..
        </p>

        <p>
          In terms of public response, social media sentiment analysis (Twitter)
          shows a score of +0.73, dominated by positive tones. This suggests
          that the program or related issues are actively discussed and
          well-received by parts of the online community.
        </p>

        <p>
          The case-to-inspection ratio graph shows a downward trend in new
          Dengue cases starting from Week 2 after the intervention began, while
          the number of inspections [remained stable/fluctuated/increased -
          sesuaikan dengan data grafik]. This decrease in cases, combined with
          improved reporting efficiency and positive sentiment, suggests that
          the action plan is effective in suppressing case rates and is
          well-accepted by the community. Continued monitoring is needed to
          ensure this positive trend is sustained.
        </p>
      </CardContent>
    </Card>
  );
}

function CaseInspectionRatioCard() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-2">
        <ChartLineIcon className="size-4" />
        <CardDescription>Case Inspection Ratio</CardDescription>
      </CardHeader>
      <CardContent>
        <CaseInspectionRatioChart />
      </CardContent>
    </Card>
  );
}
