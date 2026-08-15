import React, { useState } from 'react';
import { Trophy, Award, Star, Quote, Play, CheckCircle2, Sparkles, X, Video, Building2, MapPin } from 'lucide-react';
import { TopperResult } from '../types';
import { TOPPERS_DATA } from '../data/mockData';

export const ResultsSection: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [activeInterviewTopper, setActiveInterviewTopper] = useState<TopperResult | null>(null);

  const examOptions = ['All', 'JEE Advanced', 'NEET-UG', 'JEE Main', 'Olympiad / KVPY'];

  const filteredToppers = TOPPERS_DATA.filter((t) => {
    const matchesExam = selectedExam === 'All' || t.exam === selectedExam;
    const matchesYear = selectedYear === 0 || t.year === selectedYear;
    return matchesExam && matchesYear;
  });

  return (
    <section id="results" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Hall of Fame & Results Track Record</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Proof of Our Pedagogical Excellence
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Consistent top All-India ranks year after year in JEE Advanced, NEET-UG, and International Olympiads. Every rank is 100% verified from classroom and regular test programs.
          </p>
        </div>

        {/* Filter Bar (Exam & Year) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-100">
          
          {/* Exam Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {examOptions.map((exam) => (
              <button
                key={exam}
                id={`results-filter-exam-${exam.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedExam(exam)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  selectedExam === exam
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>

          {/* Year Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              id="results-year-2024"
              onClick={() => setSelectedYear(2024)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedYear === 2024 ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2024 Ranks
            </button>
            <button
              id="results-year-2023"
              onClick={() => setSelectedYear(2023)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedYear === 2023 ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2023 Ranks
            </button>
            <button
              id="results-year-all"
              onClick={() => setSelectedYear(0)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                selectedYear === 0 ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Years
            </button>
          </div>

        </div>

        {/* Toppers Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredToppers.map((topper) => (
            <div
              key={topper.id}
              id={`topper-card-${topper.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Topper Header with Photo and Rank Ribbon */}
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={topper.image}
                    alt={topper.studentName}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* AIR Rank Banner */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-sm px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 fill-slate-950" />
                    <span>{topper.rank}</span>
                  </div>

                  {/* Exam & Score badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-700 backdrop-blur-xs">
                    {topper.exam} • {topper.year}
                  </div>

                  {/* Student Details Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-bold text-white leading-snug">{topper.studentName}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                      <Award className="w-3.5 h-3.5" />
                      <span>{topper.scoreOrPercentile}</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3.5">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-semibold text-slate-900">{topper.collegeAllotted}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500 pt-1 border-t border-slate-200/60">
                      <span>Program: {topper.courseAttended}</span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {topper.hometown}
                      </span>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="relative pl-3 border-l-2 border-amber-400 py-0.5">
                    <p className="text-xs text-slate-600 italic leading-relaxed line-clamp-3">
                      "{topper.testimonial}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  id={`topper-interview-btn-${topper.id}`}
                  onClick={() => setActiveInterviewTopper(topper)}
                  className="w-full py-2 px-3 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-blue-600" />
                  <span>Read Full Journey & Strategy</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* High-Level Selection Statistics Strip */}
        <div id="results-analytics-box" className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl border border-blue-800">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-2xl font-bold text-white">2024 Cumulative Selection Highlights</h3>
            <p className="text-xs text-blue-200 mt-1">Direct classroom students qualified in premier engineering & medical institutions.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl font-black text-amber-400">120+</div>
              <div className="text-xs text-slate-200 mt-1">Students in All India Top 1,000</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl font-black text-amber-400">680+</div>
              <div className="text-xs text-slate-200 mt-1">NEET Aspirants with 650+ Marks</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl font-black text-amber-400">420+</div>
              <div className="text-xs text-slate-200 mt-1">Admitted to IITs & AIIMS New Delhi</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <div className="text-3xl font-black text-amber-400">100%</div>
              <div className="text-xs text-slate-200 mt-1">Verified Classroom Results</div>
            </div>
          </div>
        </div>

        {/* Modal: Full Journey & Topper Interview */}
        {activeInterviewTopper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              
              <div className="p-6 bg-slate-900 text-white rounded-t-3xl relative">
                <button
                  id="close-topper-modal-btn"
                  onClick={() => setActiveInterviewTopper(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <img
                    src={activeInterviewTopper.image}
                    alt={activeInterviewTopper.studentName}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30">
                      {activeInterviewTopper.rank} • {activeInterviewTopper.exam}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">{activeInterviewTopper.studentName}</h3>
                    <p className="text-xs text-slate-300">{activeInterviewTopper.collegeAllotted}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Student's Success Testimonial</h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-xl border border-amber-200/60">
                    "{activeInterviewTopper.testimonial}"
                  </p>
                </div>

                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900">Key Preparation Insights Shared by {activeInterviewTopper.studentName}:</h4>
                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Solved all Daily Practice Problem (DPP) sets on the exact same day without backlog.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Maintained a dedicated Error Analysis Notebook for every Sunday mock test.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Utilized physical 1-on-1 faculty doubt clearing desks at Apex after classroom lectures.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex justify-end">
                <button
                  id="close-topper-footer-btn"
                  onClick={() => setActiveInterviewTopper(null)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800"
                >
                  Close Window
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
