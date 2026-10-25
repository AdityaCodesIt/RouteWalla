import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRoute } from '../../context/RouteContext';
import { Language } from '../../i18n/translations';
import { Sun, Eye } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, highContrast, toggleHighContrast, t } = useRoute();
  const location = useLocation();

  const navLinks = [
    { to: '/plan', label: t.nav.plan },
    { to: '/route', label: t.nav.route },
    { to: '/go', label: t.nav.go },
    { to: '/wishlist', label: t.nav.wishlist },
    { to: '/summary', label: t.nav.summary },
    { to: '/settings', label: t.nav.settings },
    { to: '/design', label: 'Design' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F4F1EA] border-b-2 border-[#0E0E0E] px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <Link
          to="/"
          className="flex items-center gap-2 group whitespace-nowrap shrink-0 text-decoration-none"
        >
          <span className="w-8 h-8 rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] font-display font-extrabold text-lg flex items-center justify-center shadow-hard-sm group-hover:bg-[#15171A] group-hover:text-[#F6B800] transition-colors">
            RW
          </span>
          <span className="font-display font-extrabold text-2xl tracking-tighter text-[#0E0E0E]">
            RouteWala
          </span>
        </Link>

        {/* Zone 2: 4-5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 font-display font-bold text-sm text-[#0E0E0E]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
                  isActive
                    ? 'border-[#0E0E0E] text-[#0E0E0E]'
                    : 'border-transparent text-[#0E0E0E]/70 hover:text-[#0E0E0E] hover:border-[#0E0E0E]/40'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Utility Toggles */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher Segmented Control */}
          <div className="flex items-center border-2 border-[#0E0E0E] rounded-[4px] bg-white overflow-hidden text-xs font-mono font-bold">
            {(['en', 'hi', 'mr'] as Language[]).map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => setLanguage(lng)}
                className={`min-h-[34px] px-2.5 transition-colors cursor-pointer ${
                  language === lng
                    ? 'bg-[#F6B800] text-[#0E0E0E]'
                    : 'bg-white text-[#0E0E0E]/70 hover:bg-[#F4F1EA]'
                }`}
              >
                {lng === 'en' ? 'EN' : lng === 'hi' ? 'हिंदी' : 'मराठी'}
              </button>
            ))}
          </div>

          {/* High Contrast Toggle Button */}
          <button
            type="button"
            onClick={toggleHighContrast}
            title="Toggle High Contrast Mode for Mumbai Daylight"
            className={`min-h-[36px] min-w-[36px] px-2 flex items-center justify-center rounded-[4px] border-2 border-[#0E0E0E] transition-all cursor-pointer ${
              highContrast
                ? 'bg-[#0E0E0E] text-[#F6B800] shadow-hard-sm'
                : 'bg-white text-[#0E0E0E] hover:bg-[#F4F1EA]'
            }`}
            aria-label="Toggle High Contrast"
          >
            {highContrast ? <Eye className="w-4 h-4 stroke-[2.5]" /> : <Sun className="w-4 h-4 stroke-[2.5]" />}
          </button>

          {/* Primary Action Button */}
          <Link
            to="/plan"
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-4 font-display font-extrabold text-xs uppercase tracking-wider rounded-[4px] border-2 border-[#0E0E0E] bg-[#F6B800] text-[#0E0E0E] shadow-hard-sm hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all whitespace-nowrap"
          >
            {t.planMyDay}
          </Link>
        </div>
      </div>
    </header>
  );
};
