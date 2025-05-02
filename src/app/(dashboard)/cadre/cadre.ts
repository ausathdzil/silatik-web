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
  cadres: Cadre[];
  payrollPayment?: {
    paid: number;
    total: number;
  };
  homeReports?: {
    total: number;
  };
  socialAssistance?: {
    total: number;
  };
}

export interface RW {
  rw: string;
  riskLevel: string;
  rtData?: RT[];
  payrollPayment?: {
    paid: number;
    total: number;
  };
  homeReports?: {
    total: number;
  };
  socialAssistance?: {
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

export function calculateRTHomeReports(rt: RT): number {
  return rt.cadres.reduce((total, cadre) => {
    return total + (cadre.inspection?.length || 0);
  }, 0);
}

export function calculateRTSocialAssistance(rt: RT): number {
  return rt.cadres.reduce((total, cadre) => {
    return (
      total +
      (cadre.inspection?.filter((inspection) => inspection.socialAssistance)
        .length || 0)
    );
  }, 0);
}

export function calculateRWHomeReports(rw: RW): number {
  if (!rw.rtData) return 0;
  return rw.rtData.reduce((total, rt) => {
    return total + calculateRTHomeReports(rt);
  }, 0);
}

export function calculateRWSocialAssistance(rw: RW): number {
  if (!rw.rtData) return 0;
  return rw.rtData.reduce((total, rt) => {
    return total + calculateRTSocialAssistance(rt);
  }, 0);
}

// Helper function to update home reports and social assistance for an RT
export function updateRTStats(rt: RT): RT {
  return {
    ...rt,
    homeReports: {
      total: calculateRTHomeReports(rt),
    },
    socialAssistance: {
      total: calculateRTSocialAssistance(rt),
    },
  };
}

// Helper function to update home reports and social assistance for an RW
export function updateRWStats(rw: RW): RW {
  return {
    ...rw,
    homeReports: {
      total: calculateRWHomeReports(rw),
    },
    socialAssistance: {
      total: calculateRWSocialAssistance(rw),
    },
  };
}
