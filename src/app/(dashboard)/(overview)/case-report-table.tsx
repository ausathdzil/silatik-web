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
import { CaseReport } from '@/app/(dashboard)/(overview)/data/definitions';
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

export const columns: ColumnDef<CaseReport>[] = [
  {
    accessorKey: 'rwName',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          RW
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
    accessorKey: 'rtName',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          RT
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
    accessorKey: 'cadreName',
    header: 'Cadre',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => formatDate(row.getValue('date')),
  },
  {
    accessorKey: 'hour',
    header: 'Time',
  },
  {
    accessorKey: 'householdAddress',
    header: 'Address',
  },
  {
    accessorKey: 'larvaeCount',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Larvae Count
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

interface CaseReportTableProps {
  data: CaseReport[] | null;
}

export function CaseReportTable({ data }: CaseReportTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data: data || [],
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
          className="peer ps-9"
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
            {!data ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
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
          {data ? table.getFilteredRowModel().rows.length : 0} rows
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
