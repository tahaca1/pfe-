// @ts-nocheck
import React, { useState } from 'react';
import { Download, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { Card, Badge, Button, Modal } from '@/components/ui';
import { Position } from '@/types';
import { mockPortfolio } from '@/data/mockData';

export const PortfolioPage: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

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

  const calculateGain = (position: Position) => {
    const currentValue = position.quantity * position.currentPrice;
    const buyValue = position.quantity * position.buyPrice;
    const gain = currentValue - buyValue;
    const gainPercent = (gain / buyValue) * 100;
    return { gain, gainPercent };
  };

  const calculateTotalGain = () => {
    return mockPortfolio.positions.reduce((total, pos) => {
      const { gain } = calculateGain(pos);
      return total + gain;
    }, 0);
  };

  const totalGain = calculateTotalGain();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2647]">Portefeuille</h1>
          <p className="text-[#64748B]">Gestion et analyse de vos positions</p>
        </div>

        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowExportMenu(!showExportMenu)}
          >
            <Download className="w-4 h-4" />
            Exporter
            <ChevronDown className="w-4 h-4" />
          </Button>
          {showExportMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowExportMenu(false)}
              />
              <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-lg border border-[#E2E8F0] z-20 overflow-hidden">
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] transition-colors">
                  Exporter en PDF
                </button>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-[#F8FAFC] transition-colors">
                  Exporter en CSV
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <Card>
            <h3 className="text-sm font-medium text-[#64748B] mb-4">
              Valeur totale
            </h3>
            <p className="text-3xl font-bold font-mono text-[#0A2647]">
              {formatCurrency(mockPortfolio.totalValue)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              {totalGain >= 0 ? (
                <TrendingUp className="w-5 h-5 text-[#10B981]" />
              ) : (
                <TrendingDown className="w-5 h-5 text-[#EF4444]" />
              )}
              <span
                className={`font-medium ${
                  totalGain >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}
              >
                {formatCurrency(totalGain)} ({formatPercent((totalGain / (mockPortfolio.totalValue - totalGain)) * 100)})
              </span>
              <span className="text-sm text-[#64748B]">P/L total</span>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card>
            <h3 className="text-sm font-medium text-[#64748B] mb-4">
              Répartition sectorielle
            </h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPortfolio.sectorAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {mockPortfolio.sectorAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `${value}%`}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {mockPortfolio.sectorAllocation.slice(0, 4).map((sector) => (
                <div key={sector.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sector.color }}
                  />
                  <span className="text-sm text-[#64748B] truncate">
                    {sector.name}
                  </span>
                  <span className="text-sm font-medium ml-auto">{sector.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <Card>
            <h3 className="text-sm font-medium text-[#64748B] mb-4">
              Répartition par classe d'actifs
            </h3>
            <div className="space-y-3">
              {mockPortfolio.assetAllocation.map((asset) => (
                <div key={asset.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#1E293B]">{asset.name}</span>
                    <span className="text-sm font-medium">{asset.value}%</span>
                  </div>
                  <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0A2647] rounded-full transition-all duration-500"
                      style={{ width: `${asset.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-12">
          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                    <th className="text-left px-6 py-4 text-sm font-medium text-[#64748B]">
                      Société
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-[#64748B]">
                      Quantité
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-[#64748B]">
                      Prix d'achat
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-[#64748B]">
                      Prix actuel
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-[#64748B]">
                      Valeur
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-[#64748B]">
                      Plus-value
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-[#64748B]">
                      Poids
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockPortfolio.positions.map((position) => {
                    const { gain, gainPercent } = calculateGain(position);
                    const value = position.quantity * position.currentPrice;
                    const weight = (value / mockPortfolio.totalValue) * 100;

                    return (
                      <tr
                        key={position.id}
                        onClick={() => setSelectedPosition(position)}
                        className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-[#0A2647]/10 flex items-center justify-center">
                              <span className="font-bold text-[#0A2647] text-sm">
                                {position.symbol.slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-[#1E293B]">
                                {position.symbol}
                              </p>
                              <p className="text-sm text-[#64748B]">{position.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-[#1E293B]">
                          {position.quantity}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-[#64748B]">
                          {formatCurrency(position.buyPrice)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-[#1E293B]">
                          {formatCurrency(position.currentPrice)}
                        </td>
                        <td className="px-6 py-4 text-right font-mono font-medium text-[#1E293B]">
                          {formatCurrency(value)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex flex-col items-end">
                            <span
                              className={`font-mono font-medium ${
                                gain >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                              }`}
                            >
                              {formatCurrency(gain)}
                            </span>
                            <Badge
                              variant={gain >= 0 ? 'success' : 'danger'}
                              size="sm"
                            >
                              {formatPercent(gainPercent)}
                            </Badge>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-[#64748B]">
                          {weight.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-12">
          <Card>
            <h3 className="text-sm font-medium text-[#64748B] mb-4">
              Évolution du portefeuille
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPortfolio.performanceHistory}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0A2647" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#0A2647" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
                  <YAxis
                    stroke="#64748B"
                    fontSize={12}
                    tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#0A2647"
                    strokeWidth={2}
                    fill="url(#portfolioGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
        title={`Analyse ${selectedPosition?.symbol}`}
        size="lg"
      >
        {selectedPosition && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-[#0A2647]/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#0A2647]">
                  {selectedPosition.symbol.slice(0, 2)}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold">{selectedPosition.symbol}</h4>
                <p className="text-[#64748B]">{selectedPosition.name}</p>
                <Badge variant="info" size="sm" className="mt-1">
                  {selectedPosition.sector}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-[#F8FAFC] rounded-lg">
              <div>
                <p className="text-sm text-[#64748B]">Quantité</p>
                <p className="font-mono font-semibold">{selectedPosition.quantity}</p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Prix d'achat</p>
                <p className="font-mono font-semibold">
                  {formatCurrency(selectedPosition.buyPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Prix actuel</p>
                <p className="font-mono font-semibold text-[#10B981]">
                  {formatCurrency(selectedPosition.currentPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#64748B]">Valeur totale</p>
                <p className="font-mono font-semibold">
                  {formatCurrency(selectedPosition.quantity * selectedPosition.currentPrice)}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium text-[#1E293B]">Analyse IA</h5>
              <div className="p-4 bg-[#F8FAFC] rounded-lg space-y-2 text-sm">
                <p>
                  <strong>Signal technique:</strong>{' '}
                  <span className="text-[#10B981]">Neutre à haussier</span>
                </p>
                <p>
                  <strong>Support:</strong>{' '}
                  <span className="font-mono">{formatCurrency(selectedPosition.buyPrice * 0.95)}</span>
                </p>
                <p>
                  <strong>Résistance:</strong>{' '}
                  <span className="font-mono">{formatCurrency(selectedPosition.currentPrice * 1.1)}</span>
                </p>
                <p>
                  <strong>Recommandation:</strong>{' '}
                  <Badge variant="success" size="sm">Maintenir</Badge>
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0]">
              <p className="text-xs text-[#64748B]">
                <strong>Avertissement:</strong> Cette analyse est générée automatiquement par notre IA et ne constitue pas un conseil financier.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
