import React, { useState } from 'react';
import { Check, X, Edit, Clock, TrendingUp, User } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import { mockPendingRecommendations } from '@/data/mockData';

type TabType = 'pending' | 'approved' | 'rejected';

export const AdminValidationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('pending');
  const [recommendations, setRecommendations] = useState(mockPendingRecommendations);

  const tabs = [
    { id: 'pending', label: 'En attente', count: 3 },
    { id: 'approved', label: 'Validées', count: 12 },
    { id: 'rejected', label: 'Rejetées', count: 2 },
  ];

  const handleApprove = (id: string) => {
    setRecommendations((prev) =>
      prev.filter((rec) => rec.id !== id)
    );
  };

  const handleReject = (id: string) => {
    setRecommendations((prev) =>
      prev.filter((rec) => rec.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2647]">
          Validation des recommandations
        </h1>
        <p className="text-[#64748B]">
          Examinez et validez les recommandations générées par l'IA
        </p>
      </div>

      <div className="flex gap-2 border-b border-[#E2E8F0]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#0A2647] text-[#0A2647]'
                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            {tab.label}
            <Badge
              variant={
                tab.id === 'pending'
                  ? 'warning'
                  : tab.id === 'approved'
                  ? 'success'
                  : 'danger'
              }
              size="sm"
            >
              {tab.count}
            </Badge>
          </button>
        ))}
      </div>

      {activeTab === 'pending' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="overflow-hidden">
              <div className="p-4 border-b border-[#E2E8F0]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0A2647]/10 flex items-center justify-center">
                      <span className="font-bold text-[#0A2647]">
                        {rec.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{rec.symbol}</p>
                      <p className="text-sm text-[#64748B]">{rec.name}</p>
                    </div>
                  </div>
                  <Badge
                    variant={
                      rec.action === 'buy'
                        ? 'success'
                        : rec.action === 'sell'
                        ? 'danger'
                        : 'warning'
                    }
                  >
                    {rec.action === 'buy'
                      ? 'ACHAT'
                      : rec.action === 'sell'
                      ? 'VENTE'
                      : 'CONSERVER'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-[#64748B]">Prix actuel</p>
                    <p className="font-mono font-medium">--</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B]">Prix cible</p>
                    <p className="font-mono font-medium text-[#10B981]">
                      ${rec.targetPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#EAB308]" />
                    <span className="text-sm">
                      Confiance: {rec.confidenceScore}%
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-[#64748B]">
                    <User className="w-3 h-3" />
                    <span>{rec.analyst}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="p-3 bg-[#F8FAFC] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-[#10B981] rounded-full" />
                    <span className="text-sm font-medium">Analyse technique</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Signaux de strength sur RSI et MACD, support à $520
                  </p>
                </div>

                <div className="p-3 bg-[#F8FAFC] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full" />
                    <span className="text-sm font-medium">Analyse fondamentale</span>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Croissance du CA de 15%, dette maîtrisée
                  </p>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#64748B]">
                  <Clock className="w-3 h-3" />
                  <span>Générée le {rec.date}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFC] flex gap-2">
                <Button
                  variant="success"
                  className="flex-1"
                  onClick={() => handleApprove(rec.id)}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approuver
                </Button>
                <Button variant="outline" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Modifier
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleReject(rec.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'approved' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#10B981]/10 flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-[#10B981]" />
          </div>
          <h3 className="text-lg font-semibold text-[#1E293B]">
            12 recommandations validées
          </h3>
          <p className="text-[#64748B]">
            Toutes les recommandations approuvées sont disponibles dans l'historique.
          </p>
        </div>
      )}

      {activeTab === 'rejected' && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#EF4444]/10 flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-[#EF4444]" />
          </div>
          <h3 className="text-lg font-semibold text-[#1E293B]">
            2 recommandations rejetées
          </h3>
          <p className="text-[#64748B]">
            Les recommandations rejetées ne sont pas visibles par les utilisateurs.
          </p>
        </div>
      )}

      <Card className="bg-gradient-to-r from-[#0A2647] to-[#1E3A8A] text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Validation batch</h3>
            <p className="text-sm text-white/80">
              Validez plusieurs recommandations en une seule action
            </p>
          </div>
          <Button variant="secondary">
            Validation batch
          </Button>
        </div>
      </Card>
    </div>
  );
};
