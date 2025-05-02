'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  CheckCircleIcon,
  ChevronDown,
  ChevronsUpDown,
  ChevronUp,
  CircleIcon,
  XCircleIcon,
} from 'lucide-react';
import { useState } from 'react';
import {
  Cadre,
  calculateRTHomeReports,
  calculateRTSocialAssistance,
  RT,
} from './cadre';
import { riskLevelColors } from './rw-table';

type RiskLevel = keyof typeof riskLevelColors;

interface RTTableProps {
  rtData: RT[];
}

export function RTTable({ rtData }: RTTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<RT>[] = [
    {
      accessorKey: 'rt',
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
      cell: ({ row }) => {
        const rt = row.original;
        const total = calculateRTHomeReports(rt);
        return total;
      },
    },
    {
      accessorKey: 'riskLevel',
      header: 'Risk Level (< 30 days)',
      cell: ({ row }) => {
        const level = row.getValue('riskLevel') as RiskLevel;
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
        const rt = row.original;
        const total = calculateRTSocialAssistance(rt);
        return `${total} House${total !== 1 ? 's' : ''}`;
      },
    },
  ];

  const table = useReactTable({
    data: rtData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="border tabular-nums">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => {
            const rt = row.original;
            return (
              <Drawer key={rt.rt}>
                <DrawerTrigger asChild>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </DrawerTrigger>
                <CadreDrawer cadres={rt.cadres} />
              </Drawer>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function CadreDrawer({ cadres }: { cadres: Cadre[] }) {
  return (
    <DrawerContent className="h-full">
      <div className="mx-auto w-full">
        <DrawerHeader>
          <DrawerTitle className="text-center">Cadres Details</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 flex items-center justify-center gap-4">
          {cadres.map((cadre) => (
            <CadreCard key={cadre.name} cadre={cadre} />
          ))}
        </div>

        <h2 className="text-sm font-medium text-center mt-4">Inspections</h2>

        <div className="p-4 w-full max-w-3/4 mx-auto">
          <Tabs defaultValue={cadres[0].name}>
            <TabsList className="w-full justify-center">
              {cadres.map((cadre) => (
                <TabsTrigger key={cadre.name} value={cadre.name}>
                  {cadre.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={cadres[0].name}>
              <CadreInspectionTable cadre={cadres[0]} />
            </TabsContent>
            <TabsContent value={cadres[1].name}>
              <CadreInspectionTable cadre={cadres[1]} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DrawerContent>
  );
}

function CadreCard({ cadre }: { cadre: Cadre }) {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback>{cadre.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle>
                {cadre.name}, {cadre.age}
              </CardTitle>
              {cadre.status === 'active' ? (
                <div className="bg-blue-100 text-blue-700 rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  <CircleIcon className="size-4 fill-blue-700" />
                  Active
                </div>
              ) : (
                <div className="bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  <XCircleIcon className="size-4" />
                  Inactive
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 h-5">
              <CardDescription>{cadre.phone}</CardDescription>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm">{cadre.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm">Payroll:</span>
              {cadre.wageStatus === 'paid' ? (
                <div className="bg-green-100 text-green-700 rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  <CheckCircleIcon className="size-4" />
                  Paid
                </div>
              ) : (
                <div className="bg-red-100 text-red-700 rounded-full px-2 py-1 text-xs flex items-center gap-1">
                  <XCircleIcon className="size-4" />
                  Unpaid
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

function CadreInspectionTable({ cadre }: { cadre: Cadre }) {
  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Resident</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Larvae Spots</TableHead>
            <TableHead>DF Case</TableHead>
            <TableHead>Social Assistance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cadre.inspection?.map((inspection) => (
            <TableRow key={inspection.date}>
              <TableCell>{inspection.date}</TableCell>
              <TableCell>{inspection.resident}</TableCell>
              <TableCell>{inspection.address}</TableCell>
              <TableCell>{inspection.larvaeSpots}</TableCell>
              <TableCell>{inspection.dfCase ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                {inspection.socialAssistance ? 'Yes' : 'No'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
