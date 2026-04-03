// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertCircle,
  Clock,
  ChevronRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Card, Badge, Button } from '@/components/ui';
import {
  mockPortfolio,
  mockRecommendations,
  mockAlerts,
  mockConversations,
} from '@/data/mockData';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');

  const periods = ['1M', '3M', '6M', '1Y'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
  };

  const sparklineData = mockPortfolio.sparklineData.map((value, index) => ({
    day: `J${index + 1}`,
    value,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2647]">Tableau de bord</h1>
          <p className="text-[#64748B]">Bienvenue, Thomas</p>
        </div>
        <Button onClick={() => navigate('/chat')}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Nouvelle analyse
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <Card className="h-full">
            <h3 className="text-sm font-medium text-[#64748B] mb-4">
              Valeur totale du portefeuille
            </h3>
            <div className="mb-4">
              <p className="text-3xl font-bold text-[#0A2647] font-mono">
                {formatCurrency(mockPortfolio.totalValue)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {mockPortfolio.dailyChange >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-[#10B981]" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-[#EF4444]" />
                )}
                <span
                  className={`font-medium ${
                    mockPortfolio.dailyChange >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                  }`}
                >
                  {formatCurrency(mockPortfolio.dailyChange)} ({formatPercent(mockPortfolio.dailyChangePercent)})
                </span>
                <span className="text-sm text-[#64748B]">aujourd'hui</span>
              </div>
            </div>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparklineData}>
                  <defs>
                    <linearGradient id="sparklineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#10B981"
                    strokeWidth={2}
                    fill="url(#sparklineGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Card className="h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#64748B]">Performance</h3>
              <div className="flex gap-1">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      selectedPeriod === period
                        ? 'bg-[#0A2647] text-white'
                        : 'text-[#64748B] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPortfolio.performanceHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
                  <YAxis stroke="#64748B" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#0A2647"
                    strokeWidth={2}
                    dot={false}
                    name="Portefeuille"
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="#EAB308"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Benchmark"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-[#0A2647] rounded" />
                <span className="text-sm text-[#64748B]">Portefeuille</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-[#EAB308] rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #EAB308 0, #EAB308 4px, transparent 4px, transparent 8px)' }} />
                <span className="text-sm text-[#64748B]">Benchmark</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#64748B]">
                Recommandations récentes
              </h3>
              <button
                onClick={() => navigate('/recommendations')}
                className="flex items-center gap-1 text-sm text-[#0A2647] hover:underline"
              >
                Voir tout <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {mockRecommendations.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-[#F8FAFC] hover:bg-[#E2E8F0]/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0A2647]/10 flex items-center justify-center">
                      <span className="text-sm font-bold text-[#0A2647]">
                        {rec.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-[#1E293B]">{rec.symbol}</p>
                      <p className="text-sm text-[#64748B]">{rec.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        rec.action === 'buy'
                          ? 'success'
                          : rec.action === 'sell'
                          ? 'danger'
                          : 'warning'
                      }
                    >
                      {rec.action === 'buy' ? 'Achat' : rec.action === 'sell' ? 'Vente' : 'Conserver'}
                    </Badge>
                    <p className="text-sm text-[#64748B] mt-1">
                      Confiance: {rec.confidenceScore}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#64748B]">Alertes</h3>
              <Badge variant={mockAlerts.filter((a) => !a.read).length > 0 ? 'danger' : 'default'}>
                {mockAlerts.filter((a) => !a.read).length} non lues
              </Badge>
            </div>
            <div className="space-y-3">
              {mockAlerts.slice(0, 4).map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-colors cursor-pointer ${
                    !alert.read ? 'bg-[#F8FAFC]' : ''
                  } hover:bg-[#E2E8F0]/50`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      alert.priority === 'high'
                        ? 'bg-[#EF4444]'
                        : alert.priority === 'medium'
                        ? 'bg-[#EAB308]'
                        : 'bg-[#64748B]'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!alert.read ? 'font-medium text-[#1E293B]' : 'text-[#64748B]'}`}>
                      {alert.title}
                    </p>
                    <p className="text-xs text-[#64748B] mt-1 truncate">
                      {alert.description}
                    </p>
                  </div>
                  <span className="text-xs text-[#64748B] whitespace-nowrap">
                    {alert.date}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-12">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#64748B]">
                Activité récente avec l'assistant IA
              </h3>
              <button
                onClick={() => navigate('/chat')}
                className="flex items-center gap-1 text-sm text-[#0A2647] hover:underline"
              >
                Voir tout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => navigate('/chat')}
                  className="p-4 rounded-lg border border-[#E2E8F0] hover:border-[#0A2647] hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#EAB308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3v18h18" />
                        <path d="M18 9l-5-6-4 8-3-2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#1E293B] group-hover:text-[#0A2647]">
                        {conv.title}
                      </p>
                      <p className="text-sm text-[#64748B] truncate mt-1">
                        {conv.lastMessage}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-[#64748B]">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(conv.timestamp).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
