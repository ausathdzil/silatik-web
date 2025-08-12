import { PageHeader } from '../page-header';

export default function SilantikMobile() {
  return (
    <>
      <PageHeader>Silantik Mobile</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <iframe
          src="https://www.youtube.com/embed/eKTMgFwFLlE"
          className="w-full h-[500px] rounded-lg border-0"
          title="Silantik Mobile Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </main>
    </>
  );
}
