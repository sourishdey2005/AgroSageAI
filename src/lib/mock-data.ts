

export type MockDiagnosis = {
  id: string;
  imageUrl: string;
  disease: string;
  confidence: number;
  timestamp: string;
  zone?: string;
};

export type MockTreatment = {
    id: string;
    pesticide: string;
    diseaseTarget: string;
    lastDose: string;
    nextDose: string;
};

export type MockTransaction = {
    id: string;
    cropName: string;
    date: string;
    mandi: string;
    yield: number; // in kg
    forecastedPrice: number; // per kg
    actualPrice: number; // per kg
    forecastedProfit: number;
    actualProfit: number;
};
  
const generateZone = () => `Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 4))}${Math.floor(Math.random() * 4) + 1}`;

// Generate 50+ mock data points
export const mockDiagnoses: MockDiagnosis[] = [
  {
    id: 'diag_001',
    imageUrl: 'https://picsum.photos/seed/diag1/400/300',
    disease: 'Bacterial Blight',
    confidence: 0.95,
    timestamp: '2024-07-28T10:30:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_002',
    imageUrl: 'https://picsum.photos/seed/diag2/400/300',
    disease: 'Powdery Mildew',
    confidence: 0.88,
    timestamp: '2024-07-28T10:25:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_003',
    imageUrl: 'https://picsum.photos/seed/diag3/400/300',
    disease: 'Leaf Curl',
    confidence: 0.99,
    timestamp: '2024-07-28T10:20:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_004',
    imageUrl: 'https://picsum.photos/seed/diag4/400/300',
    disease: 'Rust',
    confidence: 0.76,
    timestamp: '2024-07-28T10:15:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_005',
    imageUrl: 'https://picsum.photos/seed/diag5/400/300',
    disease: 'Downy Mildew',
    confidence: 0.91,
    timestamp: '2024-07-28T10:10:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_006',
    imageUrl: 'https://picsum.photos/seed/diag6/400/300',
    disease: 'Black Spot',
    confidence: 0.82,
    timestamp: '2024-07-27T18:45:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_007',
    imageUrl: 'https://picsum.photos/seed/diag7/400/300',
    disease: 'Anthracnose',
    confidence: 0.93,
    timestamp: '2024-07-27T18:30:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_008',
    imageUrl: 'https://picsum.photos/seed/diag8/400/300',
    disease: 'Septoria Leaf Spot',
    confidence: 0.85,
    timestamp: '2024-07-27T17:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_009',
    imageUrl: 'https://picsum.photos/seed/diag9/400/300',
    disease: 'Verticillium Wilt',
    confidence: 0.96,
    timestamp: '2024-07-27T16:50:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_010',
    imageUrl: 'https://picsum.photos/seed/diag10/400/300',
    disease: 'Early Blight',
    confidence: 0.89,
    timestamp: '2024-07-27T15:20:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_011',
    imageUrl: 'https://picsum.photos/seed/diag11/400/300',
    disease: 'Fusarium Wilt',
    confidence: 0.98,
    timestamp: '2024-07-26T14:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_012',
    imageUrl: 'https://picsum.photos/seed/diag12/400/300',
    disease: 'Gray Mold',
    confidence: 0.81,
    timestamp: '2024-07-26T13:45:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_013',
    imageUrl: 'https://picsum.photos/seed/diag13/400/300',
    disease: 'Canker',
    confidence: 0.79,
    timestamp: '2024-07-26T11:10:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_014',
    imageUrl: 'https://picsum.photos/seed/diag14/400/300',
    disease: 'Mosaic Virus',
    confidence: 0.94,
    timestamp: '2024-07-26T11:05:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_015',
    imageUrl: 'https://picsum.photos/seed/diag15/400/300',
    disease: 'Sooty Mold',
    confidence: 0.72,
    timestamp: '2024-07-26T09:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_016',
    imageUrl: 'https://picsum.photos/seed/diag16/400/300',
    disease: 'Bacterial Wilt',
    confidence: 0.97,
    timestamp: '2024-07-25T16:30:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_017',
    imageUrl: 'https://picsum.photos/seed/diag17/400/300',
    disease: 'Clubroot',
    confidence: 0.90,
    timestamp: '2024-07-25T15:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_018',
    imageUrl: 'https://picsum.photos/seed/diag18/400/300',
    disease: 'Fire Blight',
    confidence: 0.92,
    timestamp: '2024-07-25T14:10:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_019',
    imageUrl: 'https://picsum.photos/seed/diag19/400/300',
    disease: 'Scab',
    confidence: 0.83,
    timestamp: '2024-07-25T12:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_020',
    imageUrl: 'https://picsum.photos/seed/diag20/400/300',
    disease: 'Root Rot',
    confidence: 0.88,
    timestamp: '2024-07-25T11:50:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_021',
    imageUrl: 'https://picsum.photos/seed/diag21/400/300',
    disease: 'Gall',
    confidence: 0.75,
    timestamp: '2024-07-24T18:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_022',
    imageUrl: 'https://picsum.photos/seed/diag22/400/300',
    disease: 'Leaf Spot',
    confidence: 0.86,
    timestamp: '2024-07-24T17:30:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_023',
    imageUrl: 'https://picsum.photos/seed/diag23/400/300',
    disease: 'White Mold',
    confidence: 0.91,
    timestamp: '2024-07-24T16:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_024',
    imageUrl: 'https://picsum.photos/seed/diag24/400/300',
    disease: 'Yellows',
    confidence: 0.80,
    timestamp: '2024-07-24T15:45:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_025',
    imageUrl: 'https://picsum.photos/seed/diag25/400/300',
    disease: 'Stem Rot',
    confidence: 0.87,
    timestamp: '2024-07-24T14:20:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_026',
    imageUrl: 'https://picsum.photos/seed/diag26/400/300',
    disease: 'Dieback',
    confidence: 0.78,
    timestamp: '2024-07-23T12:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_027',
    imageUrl: 'https://picsum.photos/seed/diag27/400/300',
    disease: 'Botrytis Blight',
    confidence: 0.89,
    timestamp: '2024-07-23T11:30:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_028',
    imageUrl: 'https://picsum.photos/seed/diag28/400/300',
    disease: 'Shot Hole',
    confidence: 0.74,
    timestamp: '2024-07-23T10:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_029',
    imageUrl: 'https://picsum.photos/seed/diag29/400/300',
    disease: 'Tip Blight',
    confidence: 0.84,
    timestamp: '2024-07-23T09:15:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_030',
    imageUrl: 'https://picsum.photos/seed/diag30/400/300',
    disease: 'Needle Cast',
    confidence: 0.88,
    timestamp: '2024-07-23T09:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_031',
    imageUrl: 'https://picsum.photos/seed/diag31/400/300',
    disease: 'Crown Gall',
    confidence: 0.95,
    timestamp: '2024-07-22T17:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_032',
    imageUrl: 'https://picsum.photos/seed/diag32/400/300',
    disease: 'Damping Off',
    confidence: 0.93,
    timestamp: '2024-07-22T16:30:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_033',
    imageUrl: 'https://picsum.photos/seed/diag33/400/300',
    disease: 'Ergot',
    confidence: 0.82,
    timestamp: '2024-07-22T15:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_034',
    imageUrl: 'https://picsum.photos/seed/diag34/400/300',
    disease: 'Phytophthora Rot',
    confidence: 0.96,
    timestamp: '2024-07-22T14:45:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_035',
    imageUrl: 'https://picsum.photos/seed/diag35/400/300',
    disease: 'Pythium Rot',
    confidence: 0.94,
    timestamp: '2024-07-22T13:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_036',
    imageUrl: 'https://picsum.photos/seed/diag36/400/300',
    disease: 'Rhizoctonia',
    confidence: 0.89,
    timestamp: '2024-07-21T11:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_037',
    imageUrl: 'https://picsum.photos/seed/diag37/400/300',
    disease: 'Sclerotinia',
    confidence: 0.91,
    timestamp: '2024-07-21T10:30:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_038',
    imageUrl: 'https://picsum.photos/seed/diag38/400/300',
    disease: 'Southern Blight',
    confidence: 0.92,
    timestamp: '2024-07-21T10:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_039',
    imageUrl: 'https://picsum.photos/seed/diag39/400/300',
    disease: 'Take-all Patch',
    confidence: 0.85,
    timestamp: '2024-07-21T09:45:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_040',
    imageUrl: 'https://picsum.photos/seed/diag40/400/300',
    disease: 'Thielaviopsis',
    confidence: 0.87,
    timestamp: '2024-07-21T09:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_041',
    imageUrl: 'https://picsum.photos/seed/diag41/400/300',
    disease: 'Aster Yellows',
    confidence: 0.78,
    timestamp: '2024-07-20T18:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_042',
    imageUrl: 'https://picsum.photos/seed/diag42/400/300',
    disease: 'Black Knot',
    confidence: 0.88,
    timestamp: '2024-07-20T17:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_043',
    imageUrl: 'https://picsum.photos/seed/diag43/400/300',
    disease: 'Brown Rot',
    confidence: 0.91,
    timestamp: '2024-07-20T16:30:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_044',
    imageUrl: 'https://picsum.photos/seed/diag44/400/300',
    disease: 'Cedar-Apple Rust',
    confidence: 0.84,
    timestamp: '2024-07-20T15:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_045',
    imageUrl: 'https://picsum.photos/seed/diag45/400/300',
    disease: 'Dutch Elm Disease',
    confidence: 0.99,
    timestamp: '2024-07-20T14:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_046',
    imageUrl: 'https://picsum.photos/seed/diag46/400/300',
    disease: 'Hypoxylon Canker',
    confidence: 0.86,
    timestamp: '2024-07-19T12:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_047',
    imageUrl: 'https://picsum.photos/seed/diag47/400/300',
    disease: 'Lethal Yellowing',
    confidence: 0.98,
    timestamp: '2024-07-19T11:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_048',
    imageUrl: 'https://picsum.photos/seed/diag48/400/300',
    disease: 'Oak Wilt',
    confidence: 0.97,
    timestamp: '2024-07-19T10:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_049',
    imageUrl: 'https://picsum.photos/seed/diag49/400/300',
    disease: 'Peach Leaf Curl',
    confidence: 0.92,
    timestamp: '2024-07-19T09:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_050',
    imageUrl: 'https://picsum.photos/seed/diag50/400/300',
    disease: 'Smut',
    confidence: 0.79,
    timestamp: '2024-07-18T16:00:00Z',
    zone: generateZone(),
  },
  {
    id: 'diag_051',
    imageUrl: 'https://picsum.photos/seed/diag51/400/300',
    disease: 'Sudden Oak Death',
    confidence: 0.99,
    timestamp: '2024-07-18T15:00:00Z',
    zone: generateZone(),
  },
];

const today = new Date();
const addDays = (date: Date, days: number) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate.toISOString();
}

export const mockTreatments: MockTreatment[] = [
    {
        id: 'treat_001',
        pesticide: 'Neem Oil Spray',
        diseaseTarget: 'Powdery Mildew, Aphids',
        lastDose: addDays(today, -10),
        nextDose: addDays(today, 4),
    },
    {
        id: 'treat_002',
        pesticide: 'Copper Fungicide',
        diseaseTarget: 'Bacterial Blight, Downy Mildew',
        lastDose: addDays(today, -5),
        nextDose: addDays(today, 9),
    },
    {
        id: 'treat_003',
        pesticide: 'Spinosad',
        diseaseTarget: 'Caterpillars, Thrips',
        lastDose: addDays(today, -2),
        nextDose: addDays(today, 12),
    },
    {
        id: 'treat_004',
        pesticide: 'Bacillus thuringiensis (Bt)',
        diseaseTarget: 'Tomato Hornworm',
        lastDose: addDays(today, -20),
        nextDose: addDays(today, -6), // Overdue
    }
];

export const mockTransactions: MockTransaction[] = [
    { 
        id: 'txn_001', 
        cropName: 'Tomato', 
        date: '2023-10-25', 
        mandi: 'Pune', 
        yield: 5000, 
        forecastedPrice: 54,
        actualPrice: 58,
        forecastedProfit: 270000,
        actualProfit: 290000,
    },
    { 
        id: 'txn_002', 
        cropName: 'Wheat', 
        date: '2023-10-22', 
        mandi: 'Lucknow',
        yield: 8000,
        forecastedPrice: 22,
        actualPrice: 21,
        forecastedProfit: 176000,
        actualProfit: 168000,
    },
    { 
        id: 'txn_003', 
        cropName: 'Rice', 
        date: '2023-10-20', 
        mandi: 'Nagpur', 
        yield: 7500,
        forecastedPrice: 35,
        actualPrice: 38,
        forecastedProfit: 262500,
        actualProfit: 285000,
    },
    {
        id: 'txn_004',
        cropName: 'Onion',
        date: '2023-10-18',
        mandi: 'Delhi',
        yield: 6000,
        forecastedPrice: 30,
        actualPrice: 35,
        forecastedProfit: 180000,
        actualProfit: 210000,
    },
    {
        id: 'txn_005',
        cropName: 'Potato',
        date: '2023-10-15',
        mandi: 'Mumbai',
        yield: 10000,
        forecastedPrice: 18,
        actualPrice: 17.5,
        forecastedProfit: 180000,
        actualProfit: 175000,
    }
  ];

  export const mockProfitProjections = {
    projected: 850000,
    achieved: 780000,
    month: 'October 2023',
  };
  
  export const mockYieldWeatherCorrelation = [
    { month: 'May', yield: 4500, rainfall: 80, temp: 35 },
    { month: 'Jun', yield: 4800, rainfall: 120, temp: 32 },
    { month: 'Jul', yield: 5200, rainfall: 180, temp: 30 },
    { month: 'Aug', yield: 5100, rainfall: 200, temp: 29 },
    { month: 'Sep', yield: 4900, rainfall: 150, temp: 31 },
    { month: 'Oct', yield: 5300, rainfall: 100, temp: 33 },
  ];

export const mockDailyPerformance = [
    { date: addDays(today, -6), healthy: 92.5 },
    { date: addDays(today, -5), healthy: 91.0 },
    { date: addDays(today, -4), healthy: 93.2 },
    { date: addDays(today, -3), healthy: 94.8 },
    { date: addDays(today, -2), healthy: 95.1 },
    { date: addDays(today, -1), healthy: 96.5 },
    { date: addDays(today, 0), healthy: 97.0 },
];

export const mockIrrigationData = [
    { day: addDays(today, -6), planned: 5000, actual: 5200 },
    { day: addDays(today, -5), planned: 5000, actual: 4800 },
    { day: addDays(today, -4), planned: 5500, actual: 5600 },
    { day: addDays(today, -3), planned: 5500, actual: 5400 },
    { day: addDays(today, -2), planned: 6000, actual: 6100 },
    { day: addDays(today, -1), planned: 6000, actual: 5900 },
    { day: addDays(today, 0), planned: 6200, actual: 6200 },
];

export const mockRegionalData = [
    {
      region: 'Maharashtra',
      crop: 'Tomato',
      diseaseOutbreaks: 5,
      priceTrend: 'Stable',
    },
    {
      region: 'Uttar Pradesh',
      crop: 'Wheat',
      diseaseOutbreaks: 2,
      priceTrend: 'Increasing',
    },
    {
      region: 'Punjab',
      crop: 'Rice',
      diseaseOutbreaks: 1,
      priceTrend: 'Decreasing',
    },
    {
      region: 'West Bengal',
      crop: 'Potato',
      diseaseOutbreaks: 8,
      priceTrend: 'Stable',
    },
];

export const mockCropDistribution: { region: string, crop: string, diseaseSeverity: 'Low' | 'Medium' | 'High' | 'Critical' }[] = [
    { region: 'Punjab', crop: 'Wheat', diseaseSeverity: 'Low' },
    { region: 'Maharashtra', crop: 'Sugarcane', diseaseSeverity: 'High' },
    { region: 'Andhra Pradesh', crop: 'Rice', diseaseSeverity: 'Medium' },
    { region: 'Karnataka', crop: 'Coffee', diseaseSeverity: 'Low' },
    { region: 'Gujarat', crop: 'Cotton', diseaseSeverity: 'Critical' },
];

    
