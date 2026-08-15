import React from 'react';
import { Target, Compass, BookOpenCheck, HelpCircle, LineChart, HeartHandshake, Award, Quote, CheckCircle } from 'lucide-react';
import { INSTITUTE_INFO } from '../data/mockData';

export const VisionMission: React.FC = () => {
  return (
    <section id="vision-mission" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
            <Award className="w-3.5 h-3.5 text-blue-600" />
            <span>Guiding Principles & Philosophy</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Vision, Mission & Core Pedagogy
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Founded with a solemn commitment to academic integrity and intellectual excellence, Apex Academy bridges the gap between potential and peak competitive achievement.
          </p>
        </div>

        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Vision Card */}
          <div id="vision-card" className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-blue-300 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full pointer-events-none" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Compass className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                "{INSTITUTE_INFO.vision}"
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-xs text-blue-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>Democratizing top-tier STEM and medical coaching for all merit aspirants</span>
            </div>
          </div>

          {/* Mission Card */}
          <div id="mission-card" className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between group hover:border-indigo-300 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                "{INSTITUTE_INFO.mission}"
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-xs text-indigo-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>Individualized mentorship, rigorous testing & empathetic student guidance</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Apex Pedagogy */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900">The Four Pillars of Apex Academic Ecosystem</h3>
            <p className="text-sm text-slate-500 mt-1">Every element of our curriculum is engineered for conceptual clarity and high examination performance.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div id="pillar-1" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <BookOpenCheck className="w-5 h-5 text-blue-700" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Pedagogical Mastery</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Step-by-step concepts built from first fundamentals to advanced level with multi-step problem solving heuristics.
              </p>
            </div>

            <div id="pillar-2" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
                <HelpCircle className="w-5 h-5 text-amber-700" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">24/7 Doubt Hub</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero questions go unanswered. Physical 1-on-1 faculty counters during the day and verified video doubt engines around the clock.
              </p>
            </div>

            <div id="pillar-3" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                <LineChart className="w-5 h-5 text-emerald-700" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">AI Diagnostics</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pinpoint test analytics showing time spent per question, negative marks pattern, and customized remedial problem sheets.
              </p>
            </div>

            <div id="pillar-4" className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-4">
                <HeartHandshake className="w-5 h-5 text-purple-700" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Student Wellness</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Mental fortitude coaching, meditation spaces, stress alleviation sessions, and regular motivational seminars.
              </p>
            </div>

          </div>
        </div>

        {/* Director's Perspective / Leadership Section */}
        <div id="director-message-banner" className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 text-center lg:text-left space-y-4">
              <div className="relative inline-block mx-auto lg:mx-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                  alt="Dr. Anandvardhan Sharma - Managing Director"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-2 border-amber-400/40 shadow-lg mx-auto lg:mx-0"
                />
                <span className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                  IIT Delhi Alumnus
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">Dr. Anandvardhan Sharma</h4>
                <p className="text-xs text-amber-300 font-medium">Founder & Managing Director, Apex Academy</p>
                <p className="text-[11px] text-slate-400">19+ Years Mentoring JEE/NEET Rankers</p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 relative">
              <Quote className="w-10 h-10 text-slate-700 absolute -top-4 -left-2 -z-0 opacity-40" />
              <div className="relative z-10 space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  "Competitive examinations like JEE Advanced and NEET-UG do not merely test a student's memory; they test <span className="text-amber-300 font-semibold">intellectual honesty, psychological resilience, and clarity of thought under intense pressure</span>."
                </p>
                <p>
                  "At Apex Academy, we refuse to treat students like roll numbers in mass factories. We teach with passion, address every doubt with patience, and nurture future doctors and engineers who will build a better world."
                </p>
              </div>

              <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-400 border-t border-slate-800">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Merit-Driven</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Ethical Pedagogy</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Transparent Audits</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>No Fake Ranks</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
