import { DengueMap } from './dengue-map';
import { PageHeader } from './page-header';

export default function Dashboard() {
  return (
    <>
      <PageHeader>Dengue Fever Case Distribution Map</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50">
          <DengueMap />
        </div>
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[50vh] flex-1 rounded-xl bg-muted/50" />
      </main>
    </>
  );
}
