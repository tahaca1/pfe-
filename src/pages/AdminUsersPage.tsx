import React, { useState } from 'react';
import { Search, Eye, Edit, Ban, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, Badge, Button, Modal } from '@/components/ui';
import { mockUsers } from '@/data/mockData';

export const AdminUsersPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Actif</Badge>;
      case 'inactive':
        return <Badge variant="warning">Inactif</Badge>;
      case 'suspended':
        return <Badge variant="danger">Suspendu</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#0A2647]">Utilisateurs</h1>
          <p className="text-[#64748B]">
            Gestion et suivi des utilisateurs de la plateforme
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info">{mockUsers.length} utilisateurs</Badge>
          <Badge variant="success">
            {mockUsers.filter((u) => u.status === 'active').length} actifs
          </Badge>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0]">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Rechercher par nom ou email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]
                text-[#1E293B] placeholder-[#64748B] focus:outline-none focus:border-[#EAB308]
                focus:ring-2 focus:ring-[#EAB308]/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="text-left px-6 py-4 text-sm font-medium text-[#64748B]">
                  Utilisateur
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[#64748B]">
                  Statut
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-[#64748B]">
                  Conversations
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[#64748B]">
                  Dernière activité
                </th>
                <th className="text-left px-6 py-4 text-sm font-medium text-[#64748B]">
                  Profil de risque
                </th>
                <th className="text-right px-6 py-4 text-sm font-medium text-[#64748B]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {user.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-[#1E293B]">{user.name}</p>
                        <p className="text-sm text-[#64748B]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                  <td className="px-6 py-4 text-right font-mono">{user.conversations}</td>
                  <td className="px-6 py-4 text-sm text-[#64748B]">
                    {formatDate(user.lastActive)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant={
                        user.riskProfile === 'Agressif'
                          ? 'danger'
                          : user.riskProfile === 'Modéré'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {user.riskProfile}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="p-2 rounded-lg hover:bg-[#E2E8F0] text-[#64748B] transition-colors"
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-[#E2E8F0] text-[#64748B] transition-colors"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-[#E2E8F0] text-[#64748B] transition-colors"
                        title="Suspendre"
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg hover:bg-[#EF4444]/10 text-[#EF4444] transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between p-4 border-t border-[#E2E8F0]">
          <p className="text-sm text-[#64748B]">
            Affichage {((currentPage - 1) * itemsPerPage) + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} sur{' '}
            {filteredUsers.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-[#0A2647] text-white'
                    : 'hover:bg-[#E2E8F0] text-[#64748B]'
                }`}
              >
                {page}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Détails de l'utilisateur"
        size="lg"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {selectedUser.name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-semibold">{selectedUser.name}</h4>
                <p className="text-[#64748B]">{selectedUser.email}</p>
                {getStatusBadge(selectedUser.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <p className="text-sm text-[#64748B]">Conversations</p>
                <p className="text-2xl font-bold">{selectedUser.conversations}</p>
              </div>
              <div className="p-4 bg-[#F8FAFC] rounded-lg">
                <p className="text-sm text-[#64748B]">Profil de risque</p>
                <p className="text-2xl font-bold">{selectedUser.riskProfile}</p>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-3">Historique récent</h5>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                  <span className="text-sm">Analyse TotalEnergies</span>
                  <span className="text-xs text-[#64748B]">Il y a 2 heures</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                  <span className="text-sm">Consultation portefeuille</span>
                  <span className="text-xs text-[#64748B]">Hier</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                  <span className="text-sm">Recommandations tech</span>
                  <span className="text-xs text-[#64748B]">Il y a 3 jours</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
              <Button variant="outline" className="flex-1">
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </Button>
              <Button variant="danger" className="flex-1">
                <Ban className="w-4 h-4 mr-2" />
                Suspendre
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
