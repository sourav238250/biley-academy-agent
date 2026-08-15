import React, { useState } from 'react';
import { Calculator, Award, Sparkles, CheckCircle2, ArrowRight, ShieldAlert, GraduationCap } from 'lucide-react';
import { COURSES_DATA } from '../data/mockData';

interface ScholarshipCalculatorProps {
  onClaimScholarship: (courseId: string, discountPercent: number) => void;
}

export const ScholarshipCalculator: React.FC<ScholarshipCalculatorProps> = ({
  onClaimScholarship,
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(COURSES_DATA[0].id);
  const [previousScorePercent, setPreviousScorePercent] = useState<number>(92);
  const [hasTakenAnts, setHasTakenAnts] = useState<boolean>(false);
  const [antsScore, setAntsScore] = useState<number>(85);

  const currentCourse = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];

  // Calculate scholarship percentage based on score
  const calculateScholarshipPercent = () => {
    const effectiveScore = hasTakenAnts ? Math.max(previousScorePercent, antsScore) : previousScorePercent;
    
    if (effectiveScore >= 98) return 100; // 100% full waiver
    if (effectiveScore >= 95) return 75;  // 75% waiver
    if (effectiveScore >= 90) return 50;  // 50% waiver
    if (effectiveScore >= 85) return 30;  // 30% waiver
    if (effectiveScore >= 80) return 20;  // 20% waiver
    if (effectiveScore >= 75) return 10;  // 10% waiver
    return 5;                             // 5% minimum incentive
  };

  const discountPercent = calculateScholarshipPercent();
  const baseFee = currentCourse.discountedFee;
  const savingsAmount = Math.round((baseFee * discountPercent) / 100);
  const netPayable = baseFee - savingsAmount;
  const monthlyEmi = Math.round(netPayable / 6);

  return (
    <section id="scholarship" className="py-16 lg:py-24 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Apex National Talent Scholarship (ANTS)</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate Your Merit Scholarship & Fee Waiver
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            We believe financial constraints should never stand between a bright mind and top All-India ranks. Test your eligibility and unlock up to 100% tuition concession.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left: Interactive Input Controls */}
          <div className="lg:col-span-6 bg-slate-800/80 p-6 sm:p-8 rounded-3xl border border-slate-700/80 backdrop-blur-md space-y-6">
            
            {/* Step 1: Select Desired Course */}
            <div className="space-y-2">
              <label htmlFor="scholarship-course-select" className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                1. Select Your Target Program:
              </label>
              <select
                id="scholarship-course-select"
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {COURSES_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.targetClass})
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Previous Academic Marks % Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="scholarship-marks-slider" className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  2. Previous Board / Class Percentage:
                </label>
                <span className="text-base font-extrabold text-amber-400">{previousScorePercent}%</span>
              </div>
              <input
                id="scholarship-marks-slider"
                type="range"
                min="60"
                max="100"
                step="1"
                aria-label="Previous board or class percentage"
                value={previousScorePercent}
                onChange={(e) => setPreviousScorePercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                <span>60%</span>
                <span>80%</span>
                <span>90% (30% Waiver)</span>
                <span>95%+ (75% Waiver)</span>
                <span>100%</span>
              </div>
            </div>

            {/* Step 3: ANTS Scholarship Test Option */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-200">
                  Have you appeared for the ANTS Sunday Test?
                </span>
                <button
                  type="button"
                  id="toggle-ants-score-btn"
                  onClick={() => setHasTakenAnts(!hasTakenAnts)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    hasTakenAnts ? 'bg-amber-400' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-slate-950 transition duration-200 ease-in-out ${
                      hasTakenAnts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {hasTakenAnts && (
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Expected / Scored ANTS Marks (%):</span>
                    <span className="font-bold text-amber-400">{antsScore}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    aria-label="Expected ANTS Test marks percentage"
                    value={antsScore}
                    onChange={(e) => setAntsScore(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right: Live Fee & Concession Card */}
          <div className="lg:col-span-6 bg-gradient-to-br from-slate-800 to-slate-850 p-6 sm:p-8 rounded-3xl border-2 border-amber-500/40 shadow-2xl relative">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 mb-4 shadow">
              <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
              <span>{discountPercent}% MERIT SCHOLARSHIP APPROVED</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">
              {currentCourse.title}
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Batch Mode: {currentCourse.mode} • Duration: {currentCourse.duration}
            </p>

            {/* Cost Breakdown Sheet */}
            <div className="space-y-3 text-sm bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 mb-6">
              <div className="flex items-center justify-between text-slate-400">
                <span>Standard Program Fee:</span>
                <span className="line-through text-slate-400">₹{baseFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex items-center justify-between text-amber-400 font-semibold">
                <span>ANTS Scholarship Savings ({discountPercent}%):</span>
                <span>- ₹{savingsAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-baseline justify-between text-white">
                <span className="font-bold text-base">Net Payable Tuition Fee:</span>
                <span className="text-2xl font-black text-emerald-400">₹{netPayable.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                <span>Flexible 6-Month 0% EMI:</span>
                <span className="font-bold text-slate-200">₹{monthlyEmi.toLocaleString('en-IN')} / month</span>
              </div>
            </div>

            {/* Direct Action Button */}
            <button
              id="claim-scholarship-btn"
              onClick={() => onClaimScholarship(currentCourse.id, discountPercent)}
              className="w-full py-4 rounded-xl text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Claim {discountPercent}% Scholarship & Enroll Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-center text-slate-400 mt-3">
              ★ Free ANTS slot reservation included. No registration charges.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};
