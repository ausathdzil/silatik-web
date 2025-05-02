'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  SearchIcon,
} from 'lucide-react';
import { useState } from 'react';

const caseReportData = [
  {
    id: '01',
    cadre: 'Ahmad Hidayat',
    date: '2025-01-01',
    time: '08:00',
    address: 'Jl. Merdeka',
    rtRw: '001/001',
    larvaeDetected: 1,
  },
  {
    id: '02',
    cadre: 'Siti Rahayu',
    date: '2025-01-02',
    time: '13:15',
    address: 'Jl. Veteran',
    rtRw: '002/002',
    larvaeDetected: 4,
  },
  {
    id: '03',
    cadre: 'Budi Santoso',
    date: '2025-01-03',
    time: '16:30',
    address: 'Jl. Pahlawan',
    rtRw: '003/003',
    larvaeDetected: 2,
  },
  {
    id: '04',
    cadre: 'Dewi Kusuma',
    date: '2025-01-04',
    time: '14:30',
    address: 'Jl. Diponegoro',
    rtRw: '003/004',
    larvaeDetected: 5,
  },
  {
    id: '05',
    cadre: 'Agus Setiawan',
    date: '2025-01-05',
    time: '09:15',
    address: 'Jl. Sudirman',
    rtRw: '005/006',
    larvaeDetected: 1,
  },
  {
    id: '06',
    cadre: 'Rina Wulandari',
    date: '2025-01-06',
    time: '11:45',
    address: 'Jl. Gatot Subroto',
    rtRw: '007/008',
    larvaeDetected: 4,
  },
  {
    id: '07',
    cadre: 'Joko Susilo',
    date: '2025-01-07',
    time: '15:20',
    address: 'Jl. Thamrin',
    rtRw: '009/010',
    larvaeDetected: 3,
  },
  {
    id: '08',
    cadre: 'Maya Fitriani',
    date: '2025-01-08',
    time: '08:30',
    address: 'Jl. Asia Afrika',
    rtRw: '011/012',
    larvaeDetected: 2,
  },
  {
    id: '09',
    cadre: 'Rudi Hartono',
    date: '2025-01-09',
    time: '13:00',
    address: 'Jl. Braga',
    rtRw: '013/014',
    larvaeDetected: 6,
  },
  {
    id: '10',
    cadre: 'Lina Wijaya',
    date: '2025-01-10',
    time: '16:45',
    address: 'Jl. Cihampelas',
    rtRw: '015/016',
    larvaeDetected: 1,
  },
];

export const columns: ColumnDef<(typeof caseReportData)[0]>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          ID
          {column.getIsSorted() === 'desc' ? (
            <ChevronDown />
          ) : column.getIsSorted() === 'asc' ? (
            <ChevronUp />
          ) : (
            <ChevronsUpDown />
          )}
        </button>
      );
    },
  },
  {
    accessorKey: 'cadre',
    header: 'Cadre',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => formatDate(row.getValue('date')),
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'rtRw',
    header: 'RT/RW',
  },
  {
    accessorKey: 'larvaeDetected',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Larvae Spots
          {column.getIsSorted() === 'desc' ? (
            <ChevronDown />
          ) : column.getIsSorted() === 'asc' ? (
            <ChevronUp />
          ) : (
            <ChevronsUpDown />
          )}
        </button>
      );
    },
  },
];

export function CaseReportTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: caseReportData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Input
          className="peer ps-9 pe-9"
          placeholder="Search cadre..."
          type="search"
          value={globalFilter ?? ''}
          onChange={(event) => setGlobalFilter(event.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
      <div className="overflow-hidden rounded-md border tabular-nums">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} rows
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <div className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
