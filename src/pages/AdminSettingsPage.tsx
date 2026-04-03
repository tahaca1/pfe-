import React, { useState } from 'react';
import { Save, Bell, Shield, Database, Globe } from 'lucide-react';
import { Card, Button } from '@/components/ui';

export const AdminSettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'Général', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Sécurité', icon: Shield },
    { id: 'data', label: 'Données', icon: Database },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A2647]">Configuration</h1>
        <p className="text-[#64748B]">
          Gérez les paramètres de la plateforme
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="p-2">
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-[#0A2647] text-white'
                      : 'text-[#64748B] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{section.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        <div className="lg:col-span-3 space-y-6">
          {activeSection === 'general' && (
            <>
              <Card>
                <h3 className="text-lg font-semibold mb-4">Paramètres généraux</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Nom de l'application
                    </label>
                    <input
                      type="text"
                      defaultValue="InvestAI Assistant"
                      className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#EAB308]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Langue par défaut
                    </label>
                    <select className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#EAB308]">
                      <option>Français</option>
                      <option>English</option>
                      <option>Español</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Fuseau horaire
                    </label>
                    <select className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#EAB308]">
                      <option>Europe/Paris (GMT+1)</option>
                      <option>Europe/London (GMT+0)</option>
                      <option>America/New_York (GMT-5)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-6">
                  <Button>
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </Button>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold mb-4">Configuration IA</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mode agressif</p>
                      <p className="text-sm text-[#64748B]">
                        Autoriser les recommandations plus risquées
                      </p>
                    </div>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Suggestions automatiques</p>
                      <p className="text-sm text-[#64748B]">
                        Proposer des analyses sans sollicitation
                      </p>
                    </div>
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1E293B] mb-2">
                      Seuil de confiance minimum
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="95"
                      defaultValue="70"
                      className="w-full"
                    />
                    <p className="text-xs text-[#64748B] mt-1">
                      70% - Les recommandations en dessous de ce seuil seront masquées
                    </p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeSection === 'notifications' && (
            <Card>
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[#E2E8F0]">
                  <div>
                    <p className="font-medium">Alertes de prix</p>
                    <p className="text-sm text-[#64748B]">
                      Notifications lors de mouvements significatifs
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#E2E8F0]">
                  <div>
                    <p className="font-medium">Nouvelles recommandations</p>
                    <p className="text-sm text-[#64748B]">
                      Alerter lors de nouvelles recommandations IA
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#E2E8F0]">
                  <div>
                    <p className="font-medium">Rapport quotidien</p>
                    <p className="text-sm text-[#64748B]">
                      Envoyer un résumé journalier par email
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Newsletter marché</p>
                    <p className="text-sm text-[#64748B]">
                      Actualités et tendances du marché
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'security' && (
            <Card>
              <h3 className="text-lg font-semibold mb-4">Sécurité</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[#E2E8F0]">
                  <div>
                    <p className="font-medium">Authentification à deux facteurs</p>
                    <p className="text-sm text-[#64748B]">
                      Ajouter une couche de sécurité supplémentaire
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[#E2E8F0]">
                  <div>
                    <p className="font-medium">Sessions simultanées</p>
                    <p className="text-sm text-[#64748B]">
                      Limiter à une session active par utilisateur
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
                <div className="py-3">
                  <label className="block text-sm font-medium text-[#1E293B] mb-2">
                    Délai d'inactivité (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    className="w-full px-4 py-2 rounded-lg border border-[#E2E8F0] focus:outline-none focus:border-[#EAB308]"
                  />
                </div>
              </div>
            </Card>
          )}

          {activeSection === 'data' && (
            <Card>
              <h3 className="text-lg font-semibold mb-4">Gestion des données</h3>
              <div className="space-y-4">
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <h4 className="font-medium mb-2">Export de données</h4>
                  <p className="text-sm text-[#64748B] mb-3">
                    Téléchargez une copie complète de toutes les données
                  </p>
                  <Button variant="outline">Exporter en JSON</Button>
                </div>
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <h4 className="font-medium mb-2">Sauvegardes automatiques</h4>
                  <p className="text-sm text-[#64748B] mb-3">
                    Dernière sauvegarde: il y a 2 heures
                  </p>
                  <Button variant="outline">Sauvegarder maintenant</Button>
                </div>
                <div className="p-4 border border-[#EF4444]/20 bg-[#EF4444]/5 rounded-lg">
                  <h4 className="font-medium text-[#EF4444] mb-2">Zone dangereuse</h4>
                  <p className="text-sm text-[#64748B] mb-3">
                    Ces actions sont irréversibles
                  </p>
                  <div className="flex gap-3">
                    <Button variant="danger">Réinitialiser les données</Button>
                    <Button variant="danger">Supprimer le compte</Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
