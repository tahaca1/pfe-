export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'client' | 'admin';
  riskLevel: number;
  investmentGoal: 'growth' | 'income' | 'preservation';
  investmentHorizon: 'short' | 'medium' | 'long';
  capitalAvailable: number;
  sectors: string[];
  profileCompletion: number;
}

export interface Position {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  sector: string;
  assetClass: 'actions' | 'obligations' | 'etf' | 'crypto';
}

export interface Portfolio {
  totalValue: number;
  dailyChange: number;
  dailyChangePercent: number;
  positions: Position[];
  sparklineData: number[];
  performanceHistory: { date: string; value: number; benchmark: number }[];
  sectorAllocation: { name: string; value: number; color: string }[];
  assetAllocation: { name: string; value: number }[];
}

export interface Recommendation {
  id: string;
  symbol: string;
  name: string;
  action: 'buy' | 'sell' | 'hold';
  targetPrice: number;
  confidenceScore: number;
  currentPrice: number;
  analysisType: 'technical' | 'fundamental' | 'mixed';
  date: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: 'movement' | 'news' | 'system';
  date: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  recommendation?: Recommendation;
  chartData?: { data: number[]; label: string };
}

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export interface AdminStats {
  activeUsers: number;
  conversationsPerDay: number;
  aiResponseRate: number;
  recommendationsGenerated: number;
}

export interface SystemAlert {
  id: string;
  type: 'etl' | 'api' | 'latency';
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: Date;
}
