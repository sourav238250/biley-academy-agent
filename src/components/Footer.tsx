import React from 'react';
import { GraduationCap, Phone, Mail, MapPin, Heart, ShieldCheck, Award, ArrowUp } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/mockData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAICounsellor: () => void;
  onOpenEnroll: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAICounsellor,
  onOpenEnroll,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top CTA Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black">
              Ready to Realize Your IIT / AIIMS Rank Ambitions?
            </h3>
            <p className="text-xs text-blue-200">
              Registrations for 2025-26 Batch & ANTS Scholarship Test are closing soon.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 justify-center">
            <button
              id="footer-talk-counsellor-btn"
              onClick={onOpenAICounsellor}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
            >
              Talk to AI Counsellor
            </button>
            <button
              id="footer-enroll-now-btn"
              onClick={() => onOpenEnroll()}
              className="px-6 py-2.5 rounded-xl text-xs font-black bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Enroll Online Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white">
                <GraduationCap className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-base font-black tracking-tight text-white">BILEY ACADEMY</div>
                <div className="text-[10px] text-slate-400 font-medium">SCIENCE & EXCELLENCE INSTITUTE</div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {INSTITUTE_INFO.tagline}. Leading coaching hub for IIT-JEE (Main + Advanced), NEET-UG, AIIMS, and Pre-Foundation Olympiads with personalized doubt counters and verified All-India Ranks.
            </p>
            <div className="flex items-center gap-4 text-slate-300 pt-2">
              <span className="flex items-center gap-1.5 text-xs text-amber-300">
                <Award className="w-4 h-4" />
                <span>Est. {INSTITUTE_INFO.estYear}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-xs text-blue-300">
                <ShieldCheck className="w-4 h-4" />
                <span>Govt. Registered</span>
              </span>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Academic Programs</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-300 transition-colors">
                  JEE 2-Year Pinnacle Masterclass
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-300 transition-colors">
                  NEET-UG Ascend Medical Cohort
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-300 transition-colors">
                  1-Year Dropper / Repeater Batch
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-300 transition-colors">
                  Pre-Foundation & Olympiads (9-10th)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('courses')} className="hover:text-amber-300 transition-colors">
                  Live Interactive Online Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Portals</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('scholarship')} className="hover:text-amber-300 transition-colors">
                  ANTS Scholarship Test
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faculty')} className="hover:text-amber-300 transition-colors">
                  Faculty Directory & Demo Clips
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('results')} className="hover:text-amber-300 transition-colors">
                  Hall of Fame & Scorecards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('campuses')} className="hover:text-amber-300 transition-colors">
                  Campus Facilities & Centers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('vision-mission')} className="hover:text-amber-300 transition-colors">
                  Vision & Educational Philosophy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Central Admissions Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Central Admissions</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>{INSTITUTE_INFO.phone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>{INSTITUTE_INFO.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                <span className="line-clamp-2">{INSTITUTE_INFO.headOffice}</span>
              </div>
            </div>
            <div className="pt-2">
              <button
                id="footer-scroll-top-btn"
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors flex items-center gap-1.5 text-[11px]"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} {INSTITUTE_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Terms of Admission</span>
            <span>•</span>
            <span className="hover:underline cursor-pointer">Grievance Redressal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
