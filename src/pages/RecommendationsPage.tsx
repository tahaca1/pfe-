import React, { useState } from 'react';
import { Filter, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { mockRecommendations } from '@/data/mockData';

export const RecommendationsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredRecs = mockRecommendations.filter((rec) => {
    if (filter === 'all') return true;
    return rec.action === filter;
  });

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'buy':
        return <TrendingUp className="w-5 h-5" />;
      case 'sell':
        return <TrendingDown className="w-5 h-5" />;
      default:
        return <Minus className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2647]">Recommandations</h1>
        <p className="text-[#64748B]">
          Conseils d'investissement générés par notre IA
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="w-5 h-5 text-[#64748B]" />
        <Button
          variant={filter === 'all' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          Toutes
        </Button>
        <Button
          variant={filter === 'buy' ? 'success' : 'outline'}
          size="sm"
          onClick={() => setFilter('buy')}
        >
          Achat
        </Button>
        <Button
          variant={filter === 'sell' ? 'danger' : 'outline'}
          size="sm"
          onClick={() => setFilter('sell')}
        >
          Vente
        </Button>
        <Button
          variant={filter === 'hold' ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => setFilter('hold')}
        >
          Conserver
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecs.map((rec) => (
          <Card key={rec.id} hover>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#0A2647]/10 flex items-center justify-center">
                  <span className="font-bold text-[#0A2647]">
                    {rec.symbol.slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-[#1E293B]">{rec.symbol}</p>
                  <p className="text-sm text-[#64748B]">{rec.name}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant={
                  rec.action === 'buy'
                    ? 'success'
                    : rec.action === 'sell'
                    ? 'danger'
                    : 'warning'
                }
                size="md"
              >
                {getActionIcon(rec.action)}
                <span className="ml-1">
                  {rec.action === 'buy'
                    ? 'ACHAT'
                    : rec.action === 'sell'
                    ? 'VENTE'
                    : 'CONSERVER'}
                </span>
              </Badge>
              <Badge variant="info" size="sm">
                {rec.analysisType === 'technical'
                  ? 'Technique'
                  : rec.analysisType === 'fundamental'
                  ? 'Fondamentale'
                  : 'Mixte'}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 bg-[#F8FAFC] rounded-lg">
                <p className="text-xs text-[#64748B]">Prix actuel</p>
                <p className="font-mono font-semibold text-[#1E293B]">
                  ${rec.currentPrice.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-[#F8FAFC] rounded-lg">
                <p className="text-xs text-[#64748B]">Prix cible</p>
                <p className="font-mono font-semibold text-[#10B981]">
                  ${rec.targetPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-[#EAB308]" />
                <span className="text-sm font-medium">
                  Confiance: {rec.confidenceScore}%
                </span>
              </div>
              <span className="text-xs text-[#64748B]">{rec.date}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
