'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
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
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Cadre, RT, Inspection, Household } from './data/definitions';
import { riskLevelColors } from './rw-table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { fetchInspectionHistory, fetchHouseholds } from './data';

type RiskLevel = keyof typeof riskLevelColors;

interface RTTableProps {
  rtData: RT[];
}

export function RTTable({ rtData }: RTTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<RT>[] = [
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
              <Drawer key={rt.rtId}>
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
            <CadreCard key={cadre.cadreId} cadre={cadre} />
          ))}
        </div>

        <h2 className="text-sm font-medium text-center mt-4">Inspections</h2>

        <div className="p-4 w-full max-w-3/4 mx-auto">
          <Tabs defaultValue={cadres[0].cadreId}>
            <TabsList className="w-full justify-center">
              {cadres.map((cadre) => (
                <TabsTrigger key={cadre.cadreId} value={cadre.cadreId}>
                  {cadre.cadreName}
                </TabsTrigger>
              ))}
            </TabsList>
            {cadres.map((cadre) => (
              <TabsContent key={cadre.cadreId} value={cadre.cadreId}>
                <CadreInspectionTable cadre={cadre} />
              </TabsContent>
            ))}
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
            <AvatarFallback>{cadre.cadreName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle>{cadre.cadreName}</CardTitle>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

function CadreInspectionTable({ cadre }: { cadre: Cadre }) {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [households, setHouseholds] = useState<Record<string, Household>>({});

  useEffect(() => {
    const loadData = async () => {
      const [inspectionData, householdData] = await Promise.all([
        fetchInspectionHistory(),
        fetchHouseholds(),
      ]);
      setInspections(inspectionData);

      // Create a map of householdId to household data
      const householdMap = householdData.reduce(
        (acc: Record<string, Household>, household: Household) => {
          acc[household.householdId] = household;
          return acc;
        },
        {}
      );

      setHouseholds(householdMap);
    };
    loadData();
  }, []);

  const cadreInspections = inspections.filter(
    (inspection) => inspection.lastUpdatedByUserId === cadre.cadreId
  );

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Resident Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>DBD Case</TableHead>
            <TableHead>Social Assistance</TableHead>
            <TableHead>Review Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cadreInspections.map((inspection) => {
            const household = households[inspection.householdId];
            return (
              <TableRow key={inspection.inspectionId}>
                <TableCell>{inspection.inspectionDate}</TableCell>
                <TableCell>{household?.houseOwnerName || '-'}</TableCell>
                <TableCell>{household?.fullAddress || '-'}</TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'px-2 py-1 rounded-full text-xs capitalize',
                      inspection.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : inspection.status === 'scheduled'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    )}
                  >
                    {inspection.status}
                  </span>
                </TableCell>
                <TableCell>{inspection.dbdCaseFound ? 'Yes' : 'No'}</TableCell>
                <TableCell>{inspection.needsBansos ? 'Yes' : 'No'}</TableCell>
                <TableCell>{inspection.reviewNotes || '-'}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
