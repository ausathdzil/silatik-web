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
  FilterFn,
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
  SearchIcon,
} from 'lucide-react';
import React, { useState } from 'react';
import { AddCadre } from './add-cadre';
import { fetchRWList } from './data';
import { RW } from './data/definitions';
import { RTTable } from './rt-table';

export const riskLevelColors = {
  1: { bg: 'bg-green-100', text: 'text-green-800', number: 1 },
  2: { bg: 'bg-blue-100', text: 'text-blue-800', number: 2 },
  3: { bg: 'bg-yellow-100', text: 'text-yellow-800', number: 3 },
  4: { bg: 'bg-orange-100', text: 'text-orange-800', number: 4 },
  5: { bg: 'bg-red-100', text: 'text-red-800', number: 5 },
} as const;

type RiskLevel = keyof typeof riskLevelColors;

export function RWTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [rwData, setRWData] = useState<RW[]>([]);

  React.useEffect(() => {
    const loadData = async () => {
      const data = await fetchRWList();
      setRWData(data);
    };
    loadData();
  }, []);

  const toggleRow = (rwId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rwId)) {
      newExpandedRows.delete(rwId);
    } else {
      newExpandedRows.add(rwId);
    }
    setExpandedRows(newExpandedRows);
  };

  const rwFilter: FilterFn<RW> = (row, columnId, filterValue) => {
    return row.original.rwName
      .toLowerCase()
      .includes(filterValue.toLowerCase());
  };

  const columns: ColumnDef<RW>[] = [
    {
      id: 'expand',
      header: () => null,
      cell: ({ row }) => {
        const isExpanded = expandedRows.has(row.original.rwId);
        return row.original.rts ? (
          <div className="flex items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </div>
        ) : null;
      },
    },
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
      accessorKey: 'totalInspections',
      header: ({ column }) => {
        return (
          <button
            className="flex items-center gap-1 hover:text-primary [&_svg:not([class*='size-'])]:size-4"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Home Reports
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
      header: 'Risk Level',
      cell: ({ row }) => {
        const level = row.getValue('riskLevel') as number;
        const { bg, text, number } = riskLevelColors[level as RiskLevel];
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
            <span className="capitalize">
              {level === 1
                ? 'Safe'
                : level === 2
                ? 'Standby'
                : level === 3
                ? 'Alert'
                : level === 4
                ? 'Danger'
                : 'Critical'}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: 'needsBansosSum',
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
        const total = row.getValue('needsBansosSum') as number;
        return `${total} House${total !== 1 ? 's' : ''}`;
      },
    },
    {
      accessorKey: 'paidCadresCount',
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
        const paid = row.getValue('paidCadresCount') as number;
        const total = row.original.rts.reduce(
          (acc, rt) => acc + rt.cadres.length,
          0
        );
        return `${paid}/${total}`;
      },
    },
  ];

  const table = useReactTable({
    data: rwData,
    columns: columns,
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
    globalFilterFn: rwFilter,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative w-sm">
          <Input
            className="peer ps-9"
            placeholder="Search RW..."
            type="search"
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <SearchIcon size={16} />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AddCadre />
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
                const isExpanded = expandedRows.has(rw.rwId);
                return (
                  <React.Fragment key={rw.rwId}>
                    <TableRow
                      className="hover:bg-muted/50"
                      onClick={() => rw.rts && toggleRow(rw.rwId)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {isExpanded && rw.rts && (
                      <TableRow>
                        <TableCell
                          className="hover:bg-background"
                          colSpan={table.getAllColumns().length}
                        >
                          <RTTable rtData={rw.rts} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
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
