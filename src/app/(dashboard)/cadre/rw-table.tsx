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
import { cn } from '@/lib/utils';
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
  BanknoteArrowUpIcon,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  PlusIcon,
  SearchIcon,
} from 'lucide-react';
import React, { useState } from 'react';
import { calculateRWPayrollPayment, RW } from './cadre';
import { RTTable } from './rt-table';
import { rwData } from './cadre-mock-data';

export const riskLevelColors = {
  safe: { bg: 'bg-green-100', text: 'text-green-800', number: 1 },
  standby: { bg: 'bg-blue-100', text: 'text-blue-800', number: 2 },
  alert: { bg: 'bg-yellow-100', text: 'text-yellow-800', number: 3 },
  danger: { bg: 'bg-orange-100', text: 'text-orange-800', number: 4 },
  critical: { bg: 'bg-red-100', text: 'text-red-800', number: 5 },
} as const;

export const columns: ColumnDef<(typeof rwData)[0]>[] = [
  {
    accessorKey: 'rw',
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
    accessorKey: 'pic',
    header: 'Coordinator (PIC)',
  },
  {
    accessorKey: 'homeReports',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Home Reports (&lt; 30 days)
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
    accessorKey: 'riskLevel',
    header: 'Risk Level (< 30 days)',
    cell: ({ row }) => {
      const level = row.getValue('riskLevel') as keyof typeof riskLevelColors;
      const { bg, text, number } = riskLevelColors[level];
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'flex size-6 items-center justify-center rounded-full font-medium',
              bg,
              text
            )}
          >
            {number}
          </div>
          <span className="capitalize">{level}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'socialAssistance',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Social Assistance Needed
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
    cell: ({ row }) => {
      const value = row.getValue('socialAssistance') as string;
      return `${value} House${value !== '1' ? 's' : ''}`;
    },
  },
  {
    accessorKey: 'payrollPayment',
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Payroll Payment
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
    cell: ({ row }) => {
      const rw = row.original;
      const payrollPayment = calculateRWPayrollPayment(rw);
      return `${payrollPayment.paid}/${payrollPayment.total}`;
    },
  },
];

export function RWTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (rw: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rw)) {
      newExpandedRows.delete(rw);
    } else {
      newExpandedRows.add(rw);
    }
    setExpandedRows(newExpandedRows);
  };

  const table = useReactTable({
    data: rwData,
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
      <div className="flex items-center justify-between">
        <div className="relative w-sm">
          <Input
            className="peer ps-9"
            placeholder="Search coordinator..."
            type="search"
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <PlusIcon />
            Add Cadre
          </Button>
          <Button>
            <BanknoteArrowUpIcon />
            Process Payroll
          </Button>
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
                <TableHead className="w-[50px]" />
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const rw = row.original;
                const isExpanded = expandedRows.has(rw.rw);
                return (
                  <React.Fragment key={rw.rw}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        {rw.rtData && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleRow(rw.rw)}
                          >
                            {isExpanded ? <ChevronUp /> : <ChevronDown />}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                    {isExpanded && rw.rtData && (
                      <TableRow>
                        <TableCell
                          className="hover:bg-background"
                          colSpan={columns.length + 1}
                        >
                          <RTTable rtData={rw.rtData} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
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
            size="icon"
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
            size="icon"
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
