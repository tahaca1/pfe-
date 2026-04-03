// @ts-nocheck
import React from 'react';
import {
  Users,
  MessageSquare,
  Zap,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { Card, Badge } from '@/components/ui';
import { mockAdminStats, mockSystemAlerts } from '@/data/mockData';

export const AdminSupervisionPage: React.FC = () => {
  const activityData = [
    { time: '00h', users: 245 },
    { time: '04h', users: 189 },
    { time: '08h', users: 892 },
    { time: '12h', users: 1245 },
    { time: '16h', users: 2156 },
    { time: '20h', users: 1847 },
    { time: '24h', users: 2847 },
  ];

  const responseTimeData = [
    { time: '00h', ms: 320 },
    { time: '04h', ms: 280 },
    { time: '08h', ms: 350 },
    { time: '12h', ms: 420 },
    { time: '16h', ms: 380 },
    { time: '20h', ms: 290 },
    { time: '24h', ms: 250 },
  ];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-[#EF4444]" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-[#EAB308]" />;
      default:
        return <Info className="w-4 h-4 text-[#3B82F6]" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2647]">Supervision</h1>
        <p className="text-[#64748B]">
          Surveillance en temps réel du système et des performances
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#0A2647]/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-[#0A2647]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#1E293B]">
              {mockAdminStats.activeUsers.toLocaleString()}
            </p>
            <p className="text-sm text-[#64748B]">Utilisateurs actifs</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#EAB308]/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-[#EAB308]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#1E293B]">
              {mockAdminStats.conversationsPerDay.toLocaleString()}
            </p>
            <p className="text-sm text-[#64748B]">Conversations/jour</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#10B981]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#1E293B]">
              {mockAdminStats.aiResponseRate}%
            </p>
            <p className="text-sm text-[#64748B]">Taux de réponse IA</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-[#1E293B]">
              {mockAdminStats.recommendationsGenerated.toLocaleString()}
            </p>
            <p className="text-sm text-[#64748B]">Recommandations générées</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#64748B]">
              Utilisateurs actifs (24h)
            </h3>
            <Badge variant="success">
              <Activity className="w-3 h-3 mr-1" />
              Temps réel
            </Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A2647" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#0A2647" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#0A2647"
                  strokeWidth={2}
                  fill="url(#activityGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#64748B]">
              Temps de réponse IA moyen
            </h3>
            <Badge variant="info">
              <Zap className="w-3 h-3 mr-1" />
              ~280ms
            </Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responseTimeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} unit="ms" />
                <Line
                  type="monotone"
                  dataKey="ms"
                  stroke="#EAB308"
                  strokeWidth={2}
                  dot={{ fill: '#EAB308', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#64748B]">
            Alertes système
          </h3>
          <Badge variant="success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Tout opérationnel
          </Badge>
        </div>
        <div className="space-y-3">
          {mockSystemAlerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-[#F8FAFC]"
            >
              {getSeverityIcon(alert.severity)}
              <div className="flex-1">
                <p className="text-sm font-medium text-[#1E293B]">
                  {alert.message}
                </p>
                <p className="text-xs text-[#64748B]">
                  {alert.type.toUpperCase()} •{' '}
                  {new Date(alert.timestamp).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <Badge
                variant={
                  alert.severity === 'critical'
                    ? 'danger'
                    : alert.severity === 'warning'
                    ? 'warning'
                    : 'success'
                }
                size="sm"
              >
                {alert.severity}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm font-medium text-[#64748B] mb-4">
            Satisfaction estimée
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-[#10B981]">94%</span>
            <span className="text-sm text-[#64748B] mb-1">+2% vs mois dernier</span>
          </div>
          <div className="mt-4 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full bg-[#10B981] rounded-full" style={{ width: '94%' }} />
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-[#64748B] mb-4">
            Disponibilité API
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-[#0A2647]">99.9%</span>
            <span className="text-sm text-[#64748B] mb-1">SLA garanti</span>
          </div>
          <div className="mt-4 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full bg-[#0A2647] rounded-full" style={{ width: '99.9%' }} />
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-medium text-[#64748B] mb-4">
            Requêtes/jour
          </h3>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-[#3B82F6]">1.2M</span>
            <span className="text-sm text-[#64748B] mb-1">Pic à 15:00</span>
          </div>
          <div className="mt-4 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '75%' }} />
          </div>
        </Card>
      </div>
    </div>
  );
};
