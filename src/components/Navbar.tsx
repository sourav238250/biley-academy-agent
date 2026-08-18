import React, { useState, useEffect } from 'react';
import { Phone, Mail, Award, Sparkles, BookOpen, GraduationCap, Users, Trophy, MessageSquare, Compass, Menu, X, ArrowRight } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/mockData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenEnroll: (courseId?: string) => void;
  onOpenAICounsellor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenEnroll,
  onOpenAICounsellor,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'vision-mission', label: 'Vision & Mission', icon: Award },
    { id: 'courses', label: 'Courses & Batches', icon: BookOpen },
    { id: 'faculty', label: 'Star Faculty', icon: Users },
    { id: 'results', label: 'Results & Toppers', icon: Trophy },
    { id: 'scholarship', label: 'Scholarship Test', icon: GraduationCap },
    { id: 'campuses', label: 'Campuses', icon: Compass },
    { id: 'contact', label: 'Contact & Query', icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Announcement Bar */}
      <div id="top-announcement-bar" className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              ★ Admissions 2025-26 Open
            </span>
            <span className="hidden sm:inline text-slate-300">
              National Talent Scholarship Test (ANTS) every Sunday • Up to 100% Fee Waiver
            </span>
          </div>
          <div className="flex items-center space-x-4 text-slate-300">
            <a href={`tel:${INSTUTE_INFO_CLEAN(INSTITUTE_INFO.phone)}`} className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Helpline: {INSTITUTE_INFO.phone}</span>
            </a>
            <span className="hidden md:inline text-slate-600">|</span>
            <button
              id="top-ai-counsellor-btn"
              onClick={onOpenAICounsellor}
              className="hidden md:flex items-center gap-1 text-sky-300 hover:text-sky-200 font-medium hover:underline"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Ask AI Academic Counsellor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        id="main-navigation"
        className={`w-full bg-white transition-all duration-200 ${
          isScrolled ? 'shadow-md border-b border-slate-200 py-2.5' : 'border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            id="brand-logo-container"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-900">BILEY</span>
                <span className="text-xl font-bold tracking-tight text-blue-700">ACADEMY</span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                  Est. {INSTITUTE_INFO.estYear}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium tracking-normal hidden md:block">
                IIT-JEE • NEET-UG • AIIMS • Olympiads & Pre-Foundation
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-blue-700 bg-blue-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              id="nav-ai-chat-btn"
              onClick={onOpenAICounsellor}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>AI Counsellor</span>
            </button>
            <button
              id="nav-enroll-btn"
              onClick={() => onOpenEnroll()}
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 shadow-sm shadow-blue-700/20 transition-all flex items-center gap-1.5"
            >
              <span>Enroll Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-enroll-btn"
              onClick={() => onOpenEnroll()}
              className="sm:hidden px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-700"
            >
              Enroll
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div id="mobile-nav-menu" className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-500" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                id="mobile-ai-counsellor-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAICounsellor();
                }}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-medium bg-sky-50 text-sky-800 border border-sky-200 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Instant AI Academic Counsellor</span>
              </button>
              <button
                id="mobile-nav-enroll-now-cta"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEnroll();
                }}
                className="w-full py-2.5 px-4 rounded-lg text-sm font-semibold bg-blue-700 text-white flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Apply for Admission 2025-26</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

function INSTUTE_INFO_CLEAN(str?: string) {
  return (str || '').replace(/[^0-9+]/g, '');
}
