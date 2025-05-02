import { Cadre, RT, RW } from './cadre';

const rt001cadre: Cadre[] = [
  {
    name: 'Ahmad Hidayat',
    age: 35,
    phone: '081234567890',
    address: 'Jl. Merdeka No. 1',
    status: 'active',
    wageStatus: 'paid',
    inspection: [
      {
        date: '2024-01-01',
        resident: 'Budi Santoso',
        address: 'Jl. Merdeka No. 1',
        larvaeSpots: 10,
        dfCase: true,
        socialAssistance: true,
      },
      {
        date: '2024-01-02',
        resident: 'Siti Rahayu',
        address: 'Jl. Merdeka No. 2',
        larvaeSpots: 5,
        dfCase: false,
        socialAssistance: false,
      },
      {
        date: '2024-01-03',
        resident: 'Ahmad Hidayat',
        address: 'Jl. Merdeka No. 3',
        larvaeSpots: 2,
        dfCase: true,
        socialAssistance: false,
      },
    ],
  },
  {
    name: 'Siti Rahayu',
    age: 28,
    phone: '081234567891',
    address: 'Jl. Merdeka No. 2',
    status: 'active',
    wageStatus: 'unpaid',
    inspection: [
      {
        date: '2024-01-01',
        resident: 'Rudi Hartono',
        address: 'Jl. Merdeka No. 4',
        larvaeSpots: 15,
        dfCase: true,
        socialAssistance: true,
      },
      {
        date: '2024-01-02',
        resident: 'Lina Wijaya',
        address: 'Jl. Merdeka No. 5',
        larvaeSpots: 0,
        dfCase: false,
        socialAssistance: false,
      },
      {
        date: '2024-01-03',
        resident: 'Dedi Kurniawan',
        address: 'Jl. Merdeka No. 6',
        larvaeSpots: 8,
        dfCase: false,
        socialAssistance: true,
      },
    ],
  },
];

const rt002cadre: Cadre[] = [
  {
    name: 'Budi Santoso',
    age: 40,
    phone: '081234567892',
    address: 'Jl. Veteran No. 1',
    status: 'active',
    wageStatus: 'paid',
    inspection: [
      {
        date: '2024-01-01',
        resident: 'Yuni Astuti',
        address: 'Jl. Veteran No. 4',
        larvaeSpots: 3,
        dfCase: false,
        socialAssistance: false,
      },
      {
        date: '2024-01-02',
        resident: 'Hendra Pratama',
        address: 'Jl. Veteran No. 5',
        larvaeSpots: 12,
        dfCase: true,
        socialAssistance: true,
      },
      {
        date: '2024-01-03',
        resident: 'Siti Aminah',
        address: 'Jl. Veteran No. 6',
        larvaeSpots: 7,
        dfCase: true,
        socialAssistance: true,
      },
    ],
  },
  {
    name: 'Dewi Kusuma',
    age: 32,
    phone: '081234567893',
    address: 'Jl. Veteran No. 2',
    status: 'active',
    wageStatus: 'paid',
    inspection: [
      {
        date: '2024-01-01',
        resident: 'Bambang Sutrisno',
        address: 'Jl. Veteran No. 7',
        larvaeSpots: 20,
        dfCase: true,
        socialAssistance: true,
      },
      {
        date: '2024-01-02',
        resident: 'Rina Wulandari',
        address: 'Jl. Veteran No. 8',
        larvaeSpots: 1,
        dfCase: false,
        socialAssistance: false,
      },
      {
        date: '2024-01-03',
        resident: 'Joko Susilo',
        address: 'Jl. Veteran No. 9',
        larvaeSpots: 6,
        dfCase: false,
        socialAssistance: true,
      },
    ],
  },
];

const rw001rtData: RT[] = [
  {
    rt: '001',
    riskLevel: 'safe',
    cadres: rt001cadre,
  },
  {
    rt: '002',
    riskLevel: 'alert',
    cadres: rt002cadre,
  },
];

export const rwData: RW[] = [
  {
    rw: '001',
    riskLevel: 'safe',
    rtData: rw001rtData,
  },
  {
    rw: '002',
    riskLevel: 'alert',
  },
  {
    rw: '003',
    riskLevel: 'danger',
  },
  {
    rw: '004',
    riskLevel: 'standby',
  },
  {
    rw: '005',
    riskLevel: 'critical',
  },
  {
    rw: '006',
    riskLevel: 'safe',
  },
  {
    rw: '007',
    riskLevel: 'alert',
  },
  {
    rw: '008',
    riskLevel: 'standby',
  },
  {
    rw: '009',
    riskLevel: 'danger',
  },
  {
    rw: '010',
    riskLevel: 'safe',
  },
  {
    rw: '011',
    riskLevel: 'alert',
  },
  {
    rw: '012',
    riskLevel: 'standby',
  },
  {
    rw: '013',
    riskLevel: 'critical',
  },
  {
    rw: '014',
    riskLevel: 'safe',
  },
  {
    rw: '015',
    riskLevel: 'danger',
  },
];
