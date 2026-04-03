import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { currentUser } from '@/data/mockData';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] z-50">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center">
              <svg className="w-6 h-6 text-[#EAB308]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 3v18h18" />
                <path d="M18 9l-5-6-4 8-3-2" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-[#0A2647]">InvestAI Assistant</h1>
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Rechercher une société, un indicateur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC]
                text-[#1E293B] placeholder-[#64748B] transition-all duration-200
                focus:outline-none focus:border-[#EAB308] focus:ring-2 focus:ring-[#EAB308]/20
                focus:bg-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            <span className="text-sm text-[#10B981] font-medium">IA en ligne</span>
          </div>

          <button className="relative p-2 rounded-lg hover:bg-[#F8FAFC] text-[#64748B] transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-1 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0A2647] to-[#1E3A8A] flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {getInitials(currentUser.name)}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#64748B]" />
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E2E8F0] z-20 overflow-hidden">
                  <div className="p-3 border-b border-[#E2E8F0]">
                    <p className="font-medium text-[#1E293B]">{currentUser.name}</p>
                    <p className="text-sm text-[#64748B]">{currentUser.email}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => { navigate('/profile'); setShowDropdown(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Mon profil</span>
                    </button>
                    <button
                      onClick={() => { navigate('/admin/settings'); setShowDropdown(false); }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#1E293B] hover:bg-[#F8FAFC] transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Paramètres</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-[#EF4444] hover:bg-[#EF4444]/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
