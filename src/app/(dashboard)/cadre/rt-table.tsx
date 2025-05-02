import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { RT, calculateRTPayrollPayment } from '../data/mock-cadre-data';
import { riskLevelColors } from './rw-table';
import { cn } from '@/lib/utils';

type RiskLevel = keyof typeof riskLevelColors;

interface RTTableProps {
  rtData: RT[];
}

export function RTTable({ rtData }: RTTableProps) {
  return (
    <div className="border tabular-nums">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>RT</TableHead>
            <TableHead>Home Reports</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Social Assistance</TableHead>
            <TableHead>Payroll Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rtData.map((rt) => {
            const payrollPayment = calculateRTPayrollPayment(rt);
            return (
              <TableRow key={rt.rt}>
                <TableCell>{rt.rt}</TableCell>
                <TableCell>{rt.homeReports}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'flex size-6 items-center justify-center rounded-full font-medium',
                        riskLevelColors[rt.riskLevel as RiskLevel].bg,
                        riskLevelColors[rt.riskLevel as RiskLevel].text
                      )}
                    >
                      {riskLevelColors[rt.riskLevel as RiskLevel].number}
                    </div>
                    <span className="capitalize">{rt.riskLevel}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {rt.socialAssistance} House
                  {rt.socialAssistance !== '1' ? 's' : ''}
                </TableCell>
                <TableCell>
                  {payrollPayment.paid}/{payrollPayment.total}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
