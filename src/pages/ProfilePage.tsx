import React, { useState } from 'react';
import { Save, Award, Check } from 'lucide-react';
import { Card, Button, Slider, Badge, Chip } from '@/components/ui';
import { currentUser } from '@/data/mockData';

type InvestmentGoal = 'growth' | 'income' | 'preservation';
type InvestmentHorizon = 'short' | 'medium' | 'long';

interface ProfileState {
  riskLevel: number;
  investmentGoal: InvestmentGoal;
  investmentHorizon: InvestmentHorizon;
  capitalAvailable: number;
  sectors: string[];
}

export const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileState>({
    riskLevel: currentUser.riskLevel,
    investmentGoal: currentUser.investmentGoal as InvestmentGoal,
    investmentHorizon: currentUser.investmentHorizon as InvestmentHorizon,
    capitalAvailable: currentUser.capitalAvailable,
    sectors: currentUser.sectors,
  });

  const [isSaving, setIsSaving] = useState(false);

  const allSectors = [
    'technology',
    'energy',
    'finance',
    'healthcare',
    'consumer',
    'industrial',
    'utilities',
    'real_estate',
  ];

  const sectorLabels: Record<string, string> = {
    technology: 'Technologie',
    energy: 'Énergie',
    finance: 'Finance',
    healthcare: 'Santé',
    consumer: 'Consommation',
    industrial: 'Industrie',
    utilities: 'Services publics',
    real_estate: 'Immobilier',
  };

  const getRiskLabel = (level: number) => {
    if (level <= 3) return 'Prudent';
    if (level <= 6) return 'Modéré';
    if (level <= 8) return 'Agressif';
    return 'Très agressif';
  };

  const getGoalLabel = (goal: string) => {
    const labels: Record<string, string> = {
      growth: 'Croissance',
      income: 'Revenus',
      preservation: 'Préservation',
    };
    return labels[goal] || goal;
  };

  const getHorizonLabel = (horizon: string) => {
    const labels: Record<string, string> = {
      short: 'Court terme (< 1 an)',
      medium: 'Moyen terme (1-5 ans)',
      long: 'Long terme (> 5 ans)',
    };
    return labels[horizon] || horizon;
  };

  const toggleSector = (sector: string) => {
    setProfile((prev) => ({
      ...prev,
      sectors: prev.sectors.includes(sector)
        ? prev.sectors.filter((s) => s !== sector)
        : [...prev.sectors, sector],
    }));
  };

  const calculateCompletion = () => {
    let score = 0;
    if (profile.riskLevel > 0) score += 20;
    if (profile.investmentGoal) score += 20;
    if (profile.investmentHorizon) score += 20;
    if (profile.capitalAvailable > 0) score += 20;
    if (profile.sectors.length > 0) score += 20;
    return score;
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2647]">Profil investisseur</h1>
          <p className="text-[#64748B]">
            Personnalisez votre expérience d'investissement
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <span className="animate-spin">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Enregistrer
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-semibold text-[#0A2647] mb-6">
              Niveau de risque
            </h3>
            <Slider
              value={profile.riskLevel}
              min={1}
              max={10}
              onChange={(value) =>
                setProfile((prev) => ({ ...prev, riskLevel: value }))
              }
              labels={{ min: 'Prudent', max: 'Agressif' }}
            />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    profile.riskLevel <= 3
                      ? 'info'
                      : profile.riskLevel <= 6
                      ? 'warning'
                      : 'danger'
                  }
                >
                  {getRiskLabel(profile.riskLevel)}
                </Badge>
              </div>
              <p className="text-sm text-[#64748B]">
                {profile.riskLevel <= 3
                  ? 'Vous préférez les investissements sécurisés avec des rendements稳定'
                  : profile.riskLevel <= 6
                  ? 'Vous acceptez un risque modéré pour des rendements potentiellement plus élevés'
                  : 'Vous êtes prêt à accepter des risques importants pour maximiser les gains'}
              </p>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-[#0A2647] mb-6">
              Objectif principal
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['growth', 'income', 'preservation'].map((goal) => (
                <button
                  key={goal}
                  onClick={() =>
                    setProfile((prev) => ({ ...prev, investmentGoal: goal as InvestmentGoal }))
                  }
                  className={`p-4 rounded-xl border-2 transition-all ${
                    profile.investmentGoal === goal
                      ? 'border-[#0A2647] bg-[#0A2647]/5'
                      : 'border-[#E2E8F0] hover:border-[#0A2647]/50'
                  }`}
                >
                  <div className="flex flex-col items-center text-center gap-2">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        profile.investmentGoal === goal
                          ? 'bg-[#0A2647] text-white'
                          : 'bg-[#F8FAFC] text-[#64748B]'
                      }`}
                    >
                      {goal === 'growth' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      )}
                      {goal === 'income' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {goal === 'preservation' && (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium text-[#1E293B]">
                      {getGoalLabel(goal)}
                    </span>
                    <span className="text-sm text-[#64748B]">
                      {goal === 'growth' && 'Maximiser la croissance'}
                      {goal === 'income' && 'Générer des revenus passifs'}
                      {goal === 'preservation' && 'Protéger votre capital'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-[#0A2647] mb-6">
              Horizon d'investissement
            </h3>
            <div className="relative">
              <div className="flex justify-between mb-4">
                {['short', 'medium', 'long'].map((horizon) => (
                  <button
                    key={horizon}
                    onClick={() =>
                      setProfile((prev) => ({ ...prev, investmentHorizon: horizon as InvestmentHorizon }))
                    }
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      profile.investmentHorizon === horizon
                        ? 'border-[#0A2647] bg-[#0A2647]/5'
                        : 'border-[#E2E8F0] hover:border-[#0A2647]/50'
                    }`}
                  >
                    <span className="font-medium text-[#1E293B]">
                      {horizon === 'short' && 'Court'}
                      {horizon === 'medium' && 'Moyen'}
                      {horizon === 'long' && 'Long'}
                    </span>
                  </button>
                ))}
              </div>
              <div className="relative h-3 bg-[#E2E8F0] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 h-full bg-gradient-to-r from-[#0A2647] to-[#EAB308] rounded-full transition-all duration-300"
                  style={{
                    width:
                      profile.investmentHorizon === 'short'
                        ? '33%'
                        : profile.investmentHorizon === 'medium'
                        ? '66%'
                        : '100%',
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-[#64748B]">
                <span>&lt; 1 an</span>
                <span>1-5 ans</span>
                <span>&gt; 5 ans</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-[#0A2647] mb-6">
              Capital disponible
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={1000}
                  max={500000}
                  step={1000}
                  value={profile.capitalAvailable}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      capitalAvailable: Number(e.target.value),
                    }))
                  }
                  className="flex-1 h-3 bg-[#E2E8F0] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#EAB308] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md"
                />
                <div className="w-40">
                  <input
                    type="number"
                    value={profile.capitalAvailable}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        capitalAvailable: Number(e.target.value),
                      }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] text-[#1E293B] font-mono text-right focus:outline-none focus:border-[#EAB308]"
                  />
                </div>
              </div>
              <p className="text-sm text-[#64748B]">
                Capital que vous souhaitez investir avec notre assistant
              </p>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-[#0A2647] mb-6">
              Secteurs d'intérêt
            </h3>
            <p className="text-sm text-[#64748B] mb-4">
              Sélectionnez les secteurs qui vous intéressent pour recevoir des recommandations ciblées
            </p>
            <div className="flex flex-wrap gap-2">
              {allSectors.map((sector) => (
                <Chip
                  key={sector}
                  selected={profile.sectors.includes(sector)}
                  onClick={() => toggleSector(sector)}
                >
                  {profile.sectors.includes(sector) && (
                    <Check className="w-4 h-4 mr-1" />
                  )}
                  {sectorLabels[sector]}
                </Chip>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#1E293B]">
                {currentUser.name}
              </h3>
              <p className="text-[#64748B]">{currentUser.email}</p>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-[#64748B] mb-4">
              Personnalisation
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#1E293B]">
                    Profil complété
                  </span>
                  <span className="text-sm font-medium text-[#0A2647]">
                    {calculateCompletion()}%
                  </span>
                </div>
                <div className="h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0A2647] to-[#10B981] rounded-full transition-all duration-500"
                    style={{ width: `${calculateCompletion()}%` }}
                  />
                </div>
              </div>

              {calculateCompletion() === 100 ? (
                <Badge variant="success" className="w-full justify-center py-2">
                  <Award className="w-4 h-4 mr-1" />
                  Personnalisation active
                </Badge>
              ) : (
                <p className="text-sm text-[#64748B]">
                  Complétez votre profil pour des recommandations plus précises
                </p>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-medium text-[#64748B] mb-4">
              Résumé du profil
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
                <span className="text-sm text-[#64748B]">Niveau de risque</span>
                <Badge variant={profile.riskLevel <= 3 ? 'info' : profile.riskLevel <= 6 ? 'warning' : 'danger'}>
                  {getRiskLabel(profile.riskLevel)}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
                <span className="text-sm text-[#64748B]">Objectif</span>
                <span className="text-sm font-medium">
                  {getGoalLabel(profile.investmentGoal)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
                <span className="text-sm text-[#64748B]">Horizon</span>
                <span className="text-sm font-medium">
                  {getHorizonLabel(profile.investmentHorizon)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-[#E2E8F0]">
                <span className="text-sm text-[#64748B]">Capital</span>
                <span className="text-sm font-medium font-mono">
                  {formatCurrency(profile.capitalAvailable)}
                </span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-[#64748B]">Secteurs</span>
                <span className="text-sm font-medium">
                  {profile.sectors.length}
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] text-white">
            <h3 className="font-semibold mb-2">Conseil InvestAI</h3>
            <p className="text-sm text-white/80">
              Basé sur votre profil {getRiskLabel(profile.riskLevel).toLowerCase()},
              nous vous recommandons de diversifier vos investissements entre actions
              et instruments à revenu fixe.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
