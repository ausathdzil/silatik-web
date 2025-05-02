export interface Inspection {
  date: string;
  resident: string;
  address: string;
  larvaeSpots: number;
  dfCase: boolean;
  socialAssistance: boolean;
}

export interface Cadre {
  name: string;
  age: number;
  phone: string;
  address: string;
  status: string;
  wageStatus: string;
  inspection?: Inspection[];
}

export interface RT {
  rt: string;
  riskLevel: string;
  homeReports: number;
  socialAssistance: string;
  cadres: Cadre[];
  payrollPayment?: {
    paid: number;
    total: number;
  };
}

export interface RW {
  rw: string;
  pic: string;
  riskLevel: string;
  homeReports: number;
  socialAssistance: string;
  rtData?: RT[];
  payrollPayment?: {
    paid: number;
    total: number;
  };
}

export function calculateRTPayrollPayment(rt: RT): {
  paid: number;
  total: number;
} {
  const paidCount = rt.cadres.filter(
    (cadre) => cadre.wageStatus === 'paid'
  ).length;
  return {
    paid: paidCount,
    total: rt.cadres.length, // This will always be 2
  };
}

export function calculateRWPayrollPayment(rw: RW): {
  paid: number;
  total: number;
} {
  if (!rw.rtData) return { paid: 0, total: 0 };
  return rw.rtData.reduce(
    (acc, rt) => {
      const rtPayment = calculateRTPayrollPayment(rt);
      acc.paid += rtPayment.paid;
      acc.total += rtPayment.total;
      return acc;
    },
    { paid: 0, total: 0 }
  );
}

// Helper function to update payroll payment for an RT
export function updateRTPayrollPayment(rt: RT): RT {
  return {
    ...rt,
    payrollPayment: calculateRTPayrollPayment(rt),
  };
}

// Helper function to update payroll payment for an RW
export function updateRWPayrollPayment(rw: RW): RW {
  return {
    ...rw,
    payrollPayment: calculateRWPayrollPayment(rw),
  };
}
