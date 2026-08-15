import React, { useState } from 'react';
import { Sparkles, Trophy, ArrowRight, ShieldCheck, CheckCircle2, Star, Users, Calculator, Play, BookOpen } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/mockData';

interface HeroSectionProps {
  onExploreCourses: (stream?: string) => void;
  onOpenScholarship: () => void;
  onOpenEnroll: () => void;
  onOpenAICounsellor: () => void;
  onOpenVideoModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCourses,
  onOpenScholarship,
  onOpenEnroll,
  onOpenAICounsellor,
}) => {
  const [selectedClass, setSelectedClass] = useState('11th');
  const [selectedStream, setSelectedStream] = useState('jee');

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreCourses(selectedStream);
  };

  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-800">
      {/* Background Subtle Grid & Lighting Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>India\'s Premier STEM & Medical Coaching Powerhouse</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="text-amber-300 font-bold">AIR 4, AIR 12 in 2024</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Transforming Aspirations into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">Top All-India Ranks</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              Join over 18,500+ successful alumni. Learn under distinguished ex-IITians and AIIMS faculties with line-by-line concept mastery, 24/7 dedicated doubt counters, and adaptive AI diagnostics.
            </p>

            {/* Key Benefit Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-sm text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1:15 Faculty-to-Student Ratio</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Daily 1-on-1 Physical Doubt Desks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Up to 100% ANTS Scholarship</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Offline, Hybrid & Live Studio Batches</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <button
                id="hero-enroll-cta"
                onClick={onOpenEnroll}
                className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Enroll for 2025-26</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-scholarship-cta"
                onClick={onOpenScholarship}
                className="px-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-blue-400" />
                <span>Calculate Scholarship</span>
              </button>

              <button
                id="hero-ai-advisor-cta"
                onClick={onOpenAICounsellor}
                className="px-4 py-3.5 rounded-xl text-sm font-medium text-sky-300 hover:text-white bg-sky-950/40 hover:bg-sky-900/60 border border-sky-800/50 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>AI Counsellor</span>
              </button>
            </div>

            {/* Fast Batch Finder Form */}
            <div id="quick-batch-finder" className="mt-6 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Quick Course & Batch Finder</span>
              </p>
              <form onSubmit={handleQuickSearch} className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <select
                  id="hero-class-select"
                  aria-label="Select target class"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="9th">Class 9th (Pre-Foundation)</option>
                  <option value="10th">Class 10th (NTSE/Boards)</option>
                  <option value="11th">Class 11th (2-Year Target)</option>
                  <option value="12th">Class 12th (1-Year Booster)</option>
                  <option value="dropper">12th Pass / Dropper Batch</option>
                </select>

                <select
                  id="hero-stream-select"
                  aria-label="Select target stream or exam"
                  value={selectedStream}
                  onChange={(e) => setSelectedStream(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="jee">IIT-JEE (Main + Advanced)</option>
                  <option value="neet">NEET-UG & AIIMS Medical</option>
                  <option value="foundation">Foundation & Olympiads</option>
                  <option value="boards">Board Booster Program</option>
                </select>

                <button
                  type="submit"
                  id="hero-find-batch-btn"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Find My Batch</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

          {/* Right Column: Visual Card Showcase & Highlights */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Banner Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                  alt="Apex Academy Interactive High-Tech Classroom"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Overlay Highlights */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500 text-slate-950">
                      ★ Kota & Delhi Pedagogy
                    </span>
                    <span className="text-xs text-slate-300 font-medium">Smart Studio Classrooms</span>
                  </div>
                  <h4 className="text-base font-bold leading-snug">
                    State-of-the-art Hybrid Learning Hubs & Doubt Counters
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Equipped with 4K digital interactive panels, biometric attendance, and personal acoustic study pods.
                  </p>
                </div>
              </div>

              {/* Floating Stat Badge 1: Top Ranks */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3 max-w-[210px]">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">AIR 4 & AIR 12</div>
                  <div className="text-[11px] text-slate-400">JEE & NEET 2024 Rankers</div>
                </div>
              </div>

              {/* Floating Stat Badge 2: Selections count */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">4,200+ Selections</div>
                  <div className="text-[11px] text-slate-400">In IITs, NITs & AIIMS</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Key Metric Strip */}
        <div id="stats-ribbon" className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-2xl lg:text-3xl font-extrabold text-amber-400">{INSTITUTE_INFO.stats.selectionsCount}</div>
            <div className="text-xs text-slate-400 font-medium">Total Career Selections</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl lg:text-3xl font-extrabold text-blue-400">{INSTITUTE_INFO.stats.iitAiimsSelections}</div>
            <div className="text-xs text-slate-400 font-medium">IITs, NITs & AIIMS Admissions</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl lg:text-3xl font-extrabold text-amber-300">{INSTITUTE_INFO.stats.top100Ranks}</div>
            <div className="text-xs text-slate-400 font-medium">All India Top 100 Ranks</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl lg:text-3xl font-extrabold text-sky-400">{INSTITUTE_INFO.stats.experiencedFaculty}</div>
            <div className="text-xs text-slate-400 font-medium">Ex-IIT & AIIMS Mentors</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl lg:text-3xl font-extrabold text-emerald-400">{INSTITUTE_INFO.stats.satisfactionRate}</div>
            <div className="text-xs text-slate-400 font-medium">Student & Parent Satisfaction</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl lg:text-3xl font-extrabold text-purple-400">{INSTITUTE_INFO.stats.scholarshipDisbursed}</div>
            <div className="text-xs text-slate-400 font-medium">Merit Scholarships Granted</div>
          </div>
        </div>

      </div>
    </section>
  );
};
