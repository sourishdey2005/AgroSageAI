









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

export const mockGoals = [
    { name: 'Monthly Income', current: 780000, target: 1000000, unit: '₹' },
    { name: 'Tomato Yield', current: 4500, target: 5000, unit: 'kg' },
    { name: 'Market Reach', current: 3, target: 5, unit: 'mandis' },
];
  
export const mockRoiData = [
    { crop: 'Tomato', roi: 250 },
    { crop: 'Wheat', roi: 180 },
    { crop: 'Onion', roi: 210 },
    { crop: 'Potato', roi: 160 },
    { crop: 'Rice', roi: 220 },
];

export const mockRecommendationEffectiveness = {
    Tomato: { 'Neem Oil': 0.9, 'Copper Fungicide': 0.8, 'Spinosad': 0.7, 'Bt': 0.6 },
    Wheat: { 'Neem Oil': 0.7, 'Copper Fungicide': 0.85, 'Spinosad': 0.6, 'Bt': 0.5 },
    Rice: { 'Neem Oil': 0.8, 'Copper Fungicide': 0.9, 'Spinosad': 0.5, 'Bt': 0.4 },
    Potato: { 'Neem Oil': 0.6, 'Copper Fungicide': 0.7, 'Spinosad': 0.9, 'Bt': 0.8 },
    Onion: { 'Neem Oil': 0.85, 'Copper Fungicide': 0.75, 'Spinosad': 0.6, 'Bt': 0.5 },
};

export const mockCommunityMessages = [
    {
      id: 1,
      author: 'Ramesh Patel',
      avatar: 'https://picsum.photos/seed/ramesh/40/40',
      text: 'Has anyone seen success with the new fertilizer from AgriCo? Thinking of trying it for my next tomato crop.',
      timestamp: '2 hours ago',
      isCurrentUser: false,
    },
    {
      id: 2,
      author: 'Sunita Sharma',
      avatar: 'https://picsum.photos/seed/sunita/40/40',
      text: 'Warning to farmers in the Pune region: I spotted signs of Leaf Curl in my fields this morning. Be vigilant!',
      timestamp: '1 hour ago',
      isCurrentUser: false,
    },
    {
      id: 3,
      author: 'You',
      text: "Thanks for the heads-up, Sunita! I'll check my crops right away. Did you use the AgroSage AI scanner for detection?",
      timestamp: '55 minutes ago',
      isCurrentUser: true,
    },
     {
      id: 4,
      author: 'Vikram Singh',
      avatar: 'https://picsum.photos/seed/vikram/40/40',
      text: 'Yes, Ramesh, the AgriCo fertilizer worked wonders for my wheat yield. Increased it by almost 15%!',
      timestamp: '30 minutes ago',
      isCurrentUser: false,
    },
    {
      id: 5,
      author: 'Sunita Sharma',
      avatar: 'https://picsum.photos/seed/sunita/40/40',
      text: 'I did use the scanner. The confidence level was 98% for Leaf Curl. The AI also recommended a Copper Fungicide treatment, which I just applied.',
      timestamp: '15 minutes ago',
      isCurrentUser: false,
    }
];

export const mockInventoryData = [
    { name: 'Fertilizers', value: 400, unit: 'kg' },
    { name: 'Pesticides', value: 150, unit: 'liters' },
    { name: 'Seeds', value: 300, unit: 'kg' },
    { name: 'Other', value: 100, unit: 'units' },
];

export const mockBenchmarkingData = [
    { crop: 'Tomato', yourYield: 4500, districtAverage: 4200 },
    { crop: 'Wheat', yourYield: 3200, districtAverage: 3500 },
    { crop: 'Rice', yourYield: 6000, districtAverage: 5500 },
    { crop: 'Potato', yourYield: 15000, districtAverage: 14000 },
];
    
export const mockRiskData = [
    { metric: 'Financial', value: 40 },
    { metric: 'Disease', value: 75 },
    { metric: 'Weather', value: 60 },
    { metric: 'Market', value: 80 },
    { metric: 'Pest', value: 55 },
];

export const mockEnergyData = [
    { date: addDays(today, -6), energy: 120, water: 4500 },
    { date: addDays(today, -5), energy: 110, water: 4200 },
    { date: addDays(today, -4), energy: 130, water: 4800 },
    { date: addDays(today, -3), energy: 125, water: 4600 },
    { date: addDays(today, -2), energy: 140, water: 5000 },
    { date: addDays(today, -1), energy: 135, water: 4900 },
    { date: addDays(today, 0), energy: 150, water: 5200 },
];
    
export const mockDailyActions = [
    { time: '06:00', task: 'Field Inspection', description: 'Check for pests and diseases in Zone A.' },
    { time: '08:00', task: 'Irrigation', description: 'Start solar-powered irrigation for tomato crops.' },
    { time: '11:00', task: 'Spraying', description: 'Apply Neem Oil as per the treatment schedule.' },
    { time: '14:00', task: 'Monitor Market Prices', description: 'Check Pune Mandi for tomato price updates.' },
    { time: '16:00', task: 'Harvesting', description: 'Harvest ripe onions from Zone B.' },
];

export const mockAchievementBadges = [
    { id: 'badge1', title: 'Disease-Free Week', icon: 'ShieldCheck', description: 'Kept your crops healthy for a full week.', unlocked: true },
    { id: 'badge2', title: 'Market Master', icon: 'TrendingUp', description: 'Sold a crop at the 30-day price high.', unlocked: true },
    { id: 'badge3', title: 'Perfect Harvest', icon: 'Award', description: 'Achieved 100% of your yield goal.', unlocked: false },
    { id: 'badge4', title: 'Community Helper', icon: 'Heart', description: 'Shared valuable advice in the community hub.', unlocked: true },
    { id: 'badge5', title: 'AI Adopter', icon: 'BrainCircuit', description: 'Used 5 different AI tools in one day.', unlocked: false },
];

export const mockPriceConfidence = [
    { day: 'Day 1', confidence: 95 },
    { day: 'Day 2', confidence: 92 },
    { day: 'Day 3', confidence: 88 },
    { day: 'Day 4', confidence: 85 },
    { day: 'Day 5', confidence: 78 },
    { day: 'Day 6', confidence: 72 },
    { day: 'Day 7', confidence: 65 },
];

export const mockExpenseData = [
    { name: 'Pesticides', value: 15000, color: 'hsl(var(--chart-1))' },
    { name: 'Water', value: 8000, color: 'hsl(var(--chart-2))' },
    { name: 'Transport', value: 12000, color: 'hsl(var(--chart-3))' },
    { name: 'Labor', value: 25000, color: 'hsl(var(--chart-4))' },
    { name: 'Seeds', value: 10000, color: 'hsl(var(--chart-5))' },
];

export const mockCropRankingData = [
    { rank: 1, crop: 'Tomato', profit: 250000, yield: 5000, demand: 'High' },
    { rank: 2, crop: 'Onion', profit: 180000, yield: 6000, demand: 'High' },
    { rank: 3, crop: 'Rice', profit: 220000, yield: 7500, demand: 'Medium' },
    { rank: 4, crop: 'Wheat', profit: 160000, yield: 8000, demand: 'Medium' },
    { rank: 5, crop: 'Potato', profit: 150000, yield: 10000, demand: 'Low' },
];
