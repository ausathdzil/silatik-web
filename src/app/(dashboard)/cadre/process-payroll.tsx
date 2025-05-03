'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { BanknoteArrowUpIcon, CheckIcon, DownloadIcon } from 'lucide-react';
import { useCallback, useState } from 'react';

const data = [
  {
    name: 'Sukiman Sukijan',
    RT: '006',
    RW: '008',
    totalInspections: 12,
    baseSalary: 1200000,
    deductions: 0,
    totalReceived: 1200000,
  },
  {
    name: 'Sukiman Sukijan',
    RT: '006',
    RW: '008',
    totalInspections: 12,
    baseSalary: 1200000,
    deductions: 0,
    totalReceived: 1200000,
  },
  {
    name: 'Sukiman Sukijan',
    RT: '006',
    RW: '008',
    totalInspections: 12,
    baseSalary: 1200000,
    deductions: 0,
    totalReceived: 1200000,
  },
  {
    name: 'Sukiman Sukijan',
    RT: '006',
    RW: '008',
    totalInspections: 12,
    baseSalary: 1200000,
    deductions: 0,
    totalReceived: 1200000,
  },
  {
    name: 'Sukiman Sukijan',
    RT: '006',
    RW: '008',
    totalInspections: 12,
    baseSalary: 1200000,
    deductions: 0,
    totalReceived: 1200000,
  },
];

export function ProcessPayroll() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const resetDialog = useCallback(() => {
    setOpen(false);
    setStep(1);
  }, []);

  const handleNextStep = useCallback(() => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  }, [step]);

  const handlePreviousStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetDialog();
        } else {
          setOpen(true);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <BanknoteArrowUpIcon />
          Process Payroll
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-center">Process Payroll</DialogTitle>
        </DialogHeader>

        <div className="p-4">
          <div className="flex items-center justify-center gap-2">
            <div
              className={cn(
                'size-8 rounded-full flex items-center justify-center border-2 text-xs',
                step === 1 && 'border-primary text-primary',
                step > 1 && 'border-primary bg-primary text-primary-foreground'
              )}
            >
              {step > 1 ? <CheckIcon className="size-4" /> : '1'}
            </div>
            <Separator className="max-w-8" />
            <div
              className={cn(
                'size-8 rounded-full flex items-center justify-center border-2 text-xs',
                step === 2 && 'border-primary text-primary',
                step > 2 && 'border-primary bg-primary text-primary-foreground'
              )}
            >
              {step > 2 ? <CheckIcon className="size-4" /> : '2'}
            </div>
            <Separator className="max-w-8" />
            <div
              className={cn(
                'size-8 rounded-full flex items-center justify-center border-2 text-xs',
                step === 3 && 'border-primary text-primary',
                step > 3 && 'border-primary bg-primary text-primary-foreground'
              )}
            >
              {step > 3 ? <CheckIcon className="size-4" /> : '3'}
            </div>
          </div>
        </div>

        <div className="flex flex-col text-center">
          <span className="text-base font-semibold">
            {step === 1
              ? 'Payroll Process Setup'
              : step === 2
              ? 'Payroll Review'
              : 'Payroll Process Successful'}
          </span>
          <span className="text-sm">
            {step === 1
              ? 'Set period and staff'
              : step === 2
              ? 'Ensure all payroll data is correct'
              : 'Summary of the completed payroll process'}
          </span>
        </div>

        {step === 1 && (
          <form className="w-full space-y-4 max-w-[500px] mx-auto">
            <div className="space-y-1.5">
              <Label htmlFor="period">Payroll Period</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-01">January 2025</SelectItem>
                  <SelectItem value="2025-02">February 2025</SelectItem>
                  <SelectItem value="2025-03">March 2025</SelectItem>
                  <SelectItem value="2025-04">April 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="paymentDate">Payment Date</Label>
              <Input type="date" id="paymentDate" />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="staff">Select Staff</Label>
              <div className="grid grid-cols-2 gap-4">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select staff" />
                  </SelectTrigger>
                  <SelectContent className="tabular-nums">
                    <SelectItem value="RW-001">RW 001</SelectItem>
                    <SelectItem value="RW-002">RW 002</SelectItem>
                    <SelectItem value="RW-003">RW 003</SelectItem>
                    <SelectItem value="RW-004">RW 004</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2 border rounded-md px-3">
                  <Checkbox
                    id="all"
                    checked={false}
                    onCheckedChange={() => {}}
                  />
                  <label
                    htmlFor="all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Select all staff
                  </label>
                </div>
              </div>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="overflow-hidden rounded-md border max-w-[650px] mx-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>RT/RW</TableHead>
                  <TableHead>Inspections</TableHead>
                  <TableHead>Base Salary</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Received</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      {item.RT}/{item.RW}
                    </TableCell>
                    <TableCell>{item.totalInspections}</TableCell>
                    <TableCell>{item.baseSalary}</TableCell>
                    <TableCell>{item.deductions}</TableCell>
                    <TableCell>{item.totalReceived}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {step === 3 && (
          <Card className="w-[500px] mx-auto">
            <CardHeader>
              <CardTitle>ID Batch: PAY2025-03-001</CardTitle>
              <CardDescription>Created on: 2025-03-01 12:00:00</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent>
              <div className="w-full grid grid-cols-2 justify-between gap-4">
                <span className="text-muted-foreground">Payroll Period</span>
                <span className="text-right font-medium">February 2025</span>
                <span className="text-muted-foreground">Payment Date</span>
                <span className="text-right font-medium">2025-03-01</span>
                <span className="text-muted-foreground">Number of Staff</span>
                <span className="text-right font-medium">10</span>
                <span className="text-muted-foreground">Total Payment</span>
                <span className="text-right font-medium">Rp5.000.000</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <DownloadIcon />
                Download Summary
              </Button>
            </CardFooter>
          </Card>
        )}

        <DialogFooter>
          <div className="w-full flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={step > 1 ? handlePreviousStep : resetDialog}
            >
              {step > 1 ? 'Back' : 'Cancel'}
            </Button>
            <Button onClick={step === 3 ? resetDialog : handleNextStep}>
              {step === 1 ? 'Next' : step === 2 ? 'Process' : 'Done'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
