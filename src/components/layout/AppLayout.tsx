import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { OfflineBanner } from '../common/OfflineBanner';
import { ErrorBoundary } from '../common/ErrorBoundary';
import { useRoute } from '../../context/RouteContext';
import { MapPin, Navigation, ListOrdered, Heart, Sliders } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const { stats, t } = useRoute();

  const isDriverMode = location.pathname === '/go';

  // Mobile bottom tab bar items
  const tabs = [
    { to: '/plan', label: t.nav.plan, icon: MapPin },
    { to: '/route', label: t.nav.route, icon: ListOrdered },
    { to: '/go', label: t.nav.go, icon: Navigation },
    { to: '/wishlist', label: t.nav.wishlist, icon: Heart },
    { to: '/settings', label: t.nav.settings, icon: Sliders },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#0E0E0E]">
      <Navbar />

      {/* Persistent Offline Banner for Transit Resilience */}
      <OfflineBanner />

      <main className="flex-1 pb-20 md:pb-8">
        <ErrorBoundary key={location.pathname}>
          <div className="page-fade-in">
            <Outlet />
          </div>
        </ErrorBoundary>
      </main>

      {/* Mobile Bottom Thumb Navigation (visible only on mobile viewports, compact 56px height, within 15% sticky cap) */}
      {!isDriverMode && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t-2 border-[#0E0E0E] shadow-[0_-4px_0_0_#0E0E0E]"
        >
          <div className="grid grid-cols-5 h-14">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = location.pathname === tab.to;
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className={`flex flex-col items-center justify-center py-1 transition-colors select-none ${
                    isActive
                      ? 'bg-[#F6B800] text-[#0E0E0E] font-bold border-r border-[#0E0E0E]/10 last:border-r-0'
                      : 'text-[#0E0E0E]/70 hover:text-[#0E0E0E] border-r border-[#0E0E0E]/10 last:border-r-0'
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span className="text-[10px] font-mono font-bold mt-0.5 truncate max-w-[64px]">
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};
