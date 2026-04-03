import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  PieChart,
  TrendingUp,
  User,
  Activity,
  Users,
  Settings,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  role: 'client' | 'admin';
}

const clientNavItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
  { path: '/chat', icon: MessageSquare, label: 'Assistant IA' },
  { path: '/portfolio', icon: PieChart, label: 'Portefeuille' },
  { path: '/recommendations', icon: TrendingUp, label: 'Recommandations' },
  { path: '/profile', icon: User, label: 'Profil' },
];

const adminNavItems = [
  { path: '/admin/supervision', icon: Activity, label: 'Supervision' },
  { path: '/admin/users', icon: Users, label: 'Utilisateurs' },
  { path: '/admin/validation', icon: FileText, label: 'Validation' },
  { path: '/admin/settings', icon: Settings, label: 'Configuration' },
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle, role }) => {
  const location = useLocation();
  const navItems = role === 'admin' ? adminNavItems : clientNavItems;

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-[#E2E8F0]
        transition-all duration-300 z-40 ${isCollapsed ? 'w-16' : 'w-64'}`}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200
                  ${isActive
                    ? 'bg-[#0A2647] text-white'
                    : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B]'
                  }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="font-medium truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={onToggle}
          className="p-3 border-t border-[#E2E8F0] flex items-center justify-center
            text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#1E293B] transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
};
