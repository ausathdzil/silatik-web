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
import { calculateRWPayrollPayment, RW } from '../data/mock-cadre-data';
import { RTTable } from './rt-table';

export const riskLevelColors = {
  safe: { bg: 'bg-green-100', text: 'text-green-800', number: 1 },
  standby: { bg: 'bg-blue-100', text: 'text-blue-800', number: 2 },
  alert: { bg: 'bg-yellow-100', text: 'text-yellow-800', number: 3 },
  danger: { bg: 'bg-orange-100', text: 'text-orange-800', number: 4 },
  critical: { bg: 'bg-red-100', text: 'text-red-800', number: 5 },
} as const;

const rwData: RW[] = [
  {
    rw: '001',
    pic: 'Budi Santoso',
    homeReports: 14,
    riskLevel: 'safe',
    socialAssistance: '4',
    rtData: [
      {
        rt: '001',
        riskLevel: 'safe',
        homeReports: 8,
        socialAssistance: '2',
        cadre: [
          {
            name: 'Ahmad Hidayat',
            age: 35,
            phone: '081234567890',
            address: 'Jl. Merdeka No. 1',
            status: 'active',
            wageStatus: 'paid',
          },
          {
            name: 'Siti Rahayu',
            age: 28,
            phone: '081234567891',
            address: 'Jl. Merdeka No. 2',
            status: 'active',
            wageStatus: 'unpaid',
          },
        ],
      },
      {
        rt: '002',
        riskLevel: 'alert',
        homeReports: 6,
        socialAssistance: '2',
        cadre: [
          {
            name: 'Budi Santoso',
            age: 40,
            phone: '081234567892',
            address: 'Jl. Veteran No. 1',
            status: 'active',
            wageStatus: 'paid',
          },
          {
            name: 'Dewi Kusuma',
            age: 32,
            phone: '081234567893',
            address: 'Jl. Veteran No. 2',
            status: 'active',
            wageStatus: 'paid',
          },
        ],
      },
    ],
  },
  {
    rw: '002',
    pic: 'Siti Rahayu',
    homeReports: 8,
    riskLevel: 'alert',
    socialAssistance: '2',
    payrollPayment: { paid: 5, total: 8 },
  },
  {
    rw: '003',
    pic: 'Ahmad Hidayat',
    homeReports: 20,
    riskLevel: 'danger',
    socialAssistance: '6',
    payrollPayment: { paid: 9, total: 12 },
  },
  {
    rw: '004',
    pic: 'Dewi Kusuma',
    homeReports: 5,
    riskLevel: 'standby',
    socialAssistance: '1',
    payrollPayment: { paid: 4, total: 6 },
  },
  {
    rw: '005',
    pic: 'Agus Setiawan',
    homeReports: 25,
    riskLevel: 'critical',
    socialAssistance: '8',
    payrollPayment: { paid: 10, total: 15 },
  },
  {
    rw: '006',
    pic: 'Rina Wulandari',
    homeReports: 12,
    riskLevel: 'safe',
    socialAssistance: '3',
    payrollPayment: { paid: 8, total: 10 },
  },
  {
    rw: '007',
    pic: 'Joko Susilo',
    homeReports: 18,
    riskLevel: 'alert',
    socialAssistance: '5',
    payrollPayment: { paid: 6, total: 9 },
  },
  {
    rw: '008',
    pic: 'Maya Fitriani',
    homeReports: 7,
    riskLevel: 'standby',
    socialAssistance: '2',
    payrollPayment: { paid: 5, total: 7 },
  },
  {
    rw: '009',
    pic: 'Rudi Hartono',
    homeReports: 22,
    riskLevel: 'danger',
    socialAssistance: '7',
    payrollPayment: { paid: 11, total: 14 },
  },
  {
    rw: '010',
    pic: 'Lina Wijaya',
    homeReports: 3,
    riskLevel: 'safe',
    socialAssistance: '1',
    payrollPayment: { paid: 3, total: 5 },
  },
  {
    rw: '011',
    pic: 'Dedi Kurniawan',
    homeReports: 16,
    riskLevel: 'alert',
    socialAssistance: '4',
    payrollPayment: { paid: 7, total: 10 },
  },
  {
    rw: '012',
    pic: 'Yuni Astuti',
    homeReports: 9,
    riskLevel: 'standby',
    socialAssistance: '2',
    payrollPayment: { paid: 6, total: 8 },
  },
  {
    rw: '013',
    pic: 'Hendra Pratama',
    homeReports: 24,
    riskLevel: 'critical',
    socialAssistance: '9',
    payrollPayment: { paid: 12, total: 16 },
  },
  {
    rw: '014',
    pic: 'Siti Aminah',
    homeReports: 6,
    riskLevel: 'safe',
    socialAssistance: '2',
    payrollPayment: { paid: 4, total: 6 },
  },
  {
    rw: '015',
    pic: 'Bambang Sutrisno',
    homeReports: 19,
    riskLevel: 'danger',
    socialAssistance: '6',
    payrollPayment: { paid: 9, total: 12 },
  },
];

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
