import { PageHeader } from '../page-header';
import { RWTable } from './rw-table';

export default function Cadre() {
  return (
    <>
      <PageHeader>Cadre Management</PageHeader>
      <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <RWTable />
      </main>
    </>
  );
}
