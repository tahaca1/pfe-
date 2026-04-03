import { User, Portfolio, Recommendation, Alert, ChatMessage, Conversation, AdminStats, SystemAlert } from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Thomas Martin',
  email: 'thomas.martin@email.com',
  role: 'client',
  riskLevel: 7,
  investmentGoal: 'growth',
  investmentHorizon: 'long',
  capitalAvailable: 50000,
  sectors: ['technology', 'energy', 'finance'],
  profileCompletion: 85,
};

export const adminUser: User = {
  id: '2',
  name: 'Sophie Dubois',
  email: 'sophie.dubois@investai.com',
  role: 'admin',
  riskLevel: 5,
  investmentGoal: 'growth',
  investmentHorizon: 'medium',
  capitalAvailable: 0,
  sectors: [],
  profileCompletion: 100,
};

export const mockPortfolio: Portfolio = {
  totalValue: 127450.89,
  dailyChange: 1245.67,
  dailyChangePercent: 0.99,
  sparklineData: [124000, 124500, 125200, 124800, 126100, 126500, 127450],
  performanceHistory: [
    { date: '2025-01', value: 100000, benchmark: 100000 },
    { date: '2025-02', value: 103200, benchmark: 102500 },
    { date: '2025-03', value: 105800, benchmark: 104200 },
    { date: '2025-04', value: 108900, benchmark: 105800 },
    { date: '2025-05', value: 112400, benchmark: 108500 },
    { date: '2025-06', value: 115200, benchmark: 110200 },
    { date: '2025-07', value: 118500, benchmark: 112800 },
    { date: '2025-08', value: 116800, benchmark: 111500 },
    { date: '2025-09', value: 120100, benchmark: 114200 },
    { date: '2025-10', value: 123500, benchmark: 116800 },
    { date: '2025-11', value: 125800, benchmark: 118500 },
    { date: '2025-12', value: 127450, benchmark: 120200 },
  ],
  positions: [
    { id: '1', symbol: 'AAPL', name: 'Apple Inc.', quantity: 50, buyPrice: 145.00, currentPrice: 178.50, sector: 'technology', assetClass: 'actions' },
    { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', quantity: 30, buyPrice: 280.00, currentPrice: 378.90, sector: 'technology', assetClass: 'actions' },
    { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', quantity: 20, buyPrice: 120.00, currentPrice: 142.30, sector: 'technology', assetClass: 'actions' },
    { id: '4', symbol: 'JPM', name: 'JPMorgan Chase', quantity: 40, buyPrice: 140.00, currentPrice: 198.70, sector: 'finance', assetClass: 'actions' },
    { id: '5', symbol: 'XOM', name: 'Exxon Mobil', quantity: 60, buyPrice: 85.00, currentPrice: 112.40, sector: 'energy', assetClass: 'actions' },
    { id: '6', symbol: 'BND', name: 'Vanguard Total Bond', quantity: 100, buyPrice: 72.00, currentPrice: 74.50, sector: 'bonds', assetClass: 'obligations' },
    { id: '7', symbol: 'VWCE', name: 'Vanguard FTSE All-World', quantity: 45, buyPrice: 95.00, currentPrice: 108.20, sector: 'diversified', assetClass: 'etf' },
    { id: '8', symbol: 'BTC', name: 'Bitcoin', quantity: 0.5, buyPrice: 35000.00, currentPrice: 67500.00, sector: 'crypto', assetClass: 'crypto' },
  ],
  sectorAllocation: [
    { name: 'Technologie', value: 45, color: '#0A2647' },
    { name: 'Finance', value: 18, color: '#EAB308' },
    { name: 'Énergie', value: 12, color: '#10B981' },
    { name: 'Obligations', value: 10, color: '#3B82F6' },
    { name: 'ETF', value: 10, color: '#8B5CF6' },
    { name: 'Crypto', value: 5, color: '#F59E0B' },
  ],
  assetAllocation: [
    { name: 'Actions', value: 75 },
    { name: 'Obligations', value: 10 },
    { name: 'ETF', value: 10 },
    { name: 'Crypto', value: 5 },
  ],
};

export const mockRecommendations: Recommendation[] = [
  { id: '1', symbol: 'NVDA', name: 'NVIDIA Corporation', action: 'buy', targetPrice: 920.00, confidenceScore: 92, currentPrice: 875.50, analysisType: 'mixed', date: '2026-04-02' },
  { id: '2', symbol: 'TSLA', name: 'Tesla Inc.', action: 'sell', targetPrice: 145.00, confidenceScore: 78, currentPrice: 168.30, analysisType: 'technical', date: '2026-04-01' },
  { id: '3', symbol: 'AMZN', name: 'Amazon.com Inc.', action: 'hold', targetPrice: 195.00, confidenceScore: 85, currentPrice: 192.40, analysisType: 'fundamental', date: '2026-04-01' },
];

export const mockAlerts: Alert[] = [
  { id: '1', title: 'AAPL franchit un nouveau plus haut', description: 'Apple atteint 178,50$ avec un volume inhabituel', priority: 'high', type: 'movement', date: '2026-04-03', read: false },
  { id: '2', title: 'Publication résultats NVIDIA', description: 'Résultats trimestriels attendus le 15 avril', priority: 'medium', type: 'news', date: '2026-04-02', read: false },
  { id: '3', title: 'Portefeuille +0.99% aujourd\'hui', description: 'Votre portefeuille a gagné 1 245,67€ aujourd\'hui', priority: 'low', type: 'movement', date: '2026-04-03', read: true },
  { id: '4', title: 'Rebond du prix du pétrole', description: 'Les cours du brut repartent à la hausse', priority: 'medium', type: 'news', date: '2026-04-02', read: true },
];

export const mockConversations: Conversation[] = [
  { id: '1', title: 'Analyse TotalEnergies', lastMessage: 'Voici mon analyse complète...', timestamp: new Date('2026-04-03T09:30:00') },
  { id: '2', title: 'Performance mensuelle', lastMessage: 'Votre portefeuille a performé de...', timestamp: new Date('2026-04-02T15:45:00') },
  { id: '3', title: 'Recommandations tech', lastMessage: 'Je vous recommande de surveiller...', timestamp: new Date('2026-04-01T11:20:00') },
];

export const mockChatMessages: ChatMessage[] = [
  { id: '1', role: 'user', content: 'Bonjour, pouvez-vous analyser TotalEnergies pour moi ?', timestamp: new Date('2026-04-03T09:00:00') },
  { id: '2', role: 'assistant', content: 'Bien sûr ! Voici mon analyse de TotalEnergies (TTE.FP). Le titre montre des signaux techniques positifs avec un support à 58€ et une résistance à 65€. Sur le plan fondamental, la société bénéficie de la hausse des cours du pétrole et de sa transition énergétique.', timestamp: new Date('2026-04-03T09:01:00') },
  { id: '3', role: 'assistant', content: 'Je recommande une position d\'achat avec un objectif à 67€ et un stop-loss à 55€. Le score de confiance est de 78%.', timestamp: new Date('2026-04-03T09:01:00'), recommendation: mockRecommendations[0] },
  { id: '4', role: 'user', content: 'Merci ! Qu\'en est-il de mon portefeuille actuel ?', timestamp: new Date('2026-04-03T09:05:00') },
  { id: '5', role: 'assistant', content: 'Votre portefeuille est bien diversifié avec une performance de +27.45% depuis le début de l\'année, surpassant le benchmark de +20.2%. Votre exposition technologique (45%) est cohérente avec votre profil agressif. Je suggère de maintenir vos positions actuelles.', timestamp: new Date('2026-04-03T09:06:00') },
];

export const mockAdminStats: AdminStats = {
  activeUsers: 2847,
  conversationsPerDay: 12453,
  aiResponseRate: 94.7,
  recommendationsGenerated: 15682,
};

export const mockSystemAlerts: SystemAlert[] = [
  { id: '1', type: 'latency', message: 'Latence API IA: 250ms (normal)', severity: 'info', timestamp: new Date('2026-04-03T09:50:00') },
  { id: '2', type: 'api', message: 'API OpenAI: Opérationnel', severity: 'info', timestamp: new Date('2026-04-03T09:45:00') },
  { id: '3', type: 'etl', message: 'Sync donnéesborsières: Succès', severity: 'info', timestamp: new Date('2026-04-03T09:40:00') },
  { id: '4', type: 'api', message: 'Pic de requêtes détecté', severity: 'warning', timestamp: new Date('2026-04-03T09:30:00') },
];

export const mockUsers = [
  { id: '1', name: 'Thomas Martin', email: 'thomas.martin@email.com', status: 'active', conversations: 45, lastActive: '2026-04-03T09:55:00', riskProfile: 'Agressif' },
  { id: '2', name: 'Marie Dupont', email: 'marie.dupont@email.com', status: 'active', conversations: 32, lastActive: '2026-04-03T09:40:00', riskProfile: 'Modéré' },
  { id: '3', name: 'Pierre Leroy', email: 'pierre.leroy@email.com', status: 'inactive', conversations: 12, lastActive: '2026-03-28T14:20:00', riskProfile: 'Prudent' },
  { id: '4', name: 'Julie Bernard', email: 'julie.bernard@email.com', status: 'active', conversations: 67, lastActive: '2026-04-03T09:58:00', riskProfile: 'Agressif' },
  { id: '5', name: 'Nicolas Petit', email: 'nicolas.petit@email.com', status: 'suspended', conversations: 8, lastActive: '2026-03-15T11:30:00', riskProfile: 'Modéré' },
];

export const mockPendingRecommendations = [
  { id: '1', symbol: 'META', name: 'Meta Platforms', action: 'buy', targetPrice: 580.00, confidenceScore: 88, analyst: 'IA-Sophia', date: '2026-04-03' },
  { id: '2', symbol: 'NFLX', name: 'Netflix Inc.', action: 'hold', targetPrice: 680.00, confidenceScore: 75, analyst: 'IA-Epsilon', date: '2026-04-03' },
  { id: '3', symbol: 'DIS', name: 'Walt Disney Co.', action: 'sell', targetPrice: 85.00, confidenceScore: 82, analyst: 'IA-Delta', date: '2026-04-02' },
];

export const quickSuggestions = [
  'Analyse TotalEnergies',
  'Performance mensuelle',
  'Recommandations tech',
  'Alertes du jour',
  'Répartition secteur',
];
