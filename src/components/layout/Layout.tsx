import React, { useState } from 'react';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  role: 'client' | 'admin';
}

export const Layout: React.FC<LayoutProps> = ({ children, role }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <TopBar onMenuClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        role={role}
      />
      <main
        className={`pt-16 min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}
      >
        <div className="p-4 lg:p-6">{children}</div>
      </main>
    </div>
  );
};
