import React, { useState } from 'react';
import { Users, Star, Award, GraduationCap, BookOpen, Play, CheckCircle, Video, X, Sparkles, PhoneCall } from 'lucide-react';
import { Faculty } from '../types';
import { FACULTY_DATA } from '../data/mockData';

interface FacultySectionProps {
  onRequestDemo: (facultyName: string) => void;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ onRequestDemo }) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeFacultyModal, setActiveFacultyModal] = useState<Faculty | null>(null);

  const departments = ['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics', 'Mental Ability'];

  const filteredFaculty = selectedDept === 'All'
    ? FACULTY_DATA
    : FACULTY_DATA.filter((f) => f.department === selectedDept);

  return (
    <section id="faculty" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
            <span>Master Educators & Mentors</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Learn from India's Most Celebrated Gurus
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Our permanent senior faculty team comprises ex-IITians, AIIMS doctors, and Olympiad medalists who teach full-time with relentless passion and individual student accountability.
          </p>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {departments.map((dept) => (
            <button
              key={dept}
              id={`faculty-filter-${dept.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedDept(dept)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {dept} {dept !== 'All' ? 'Faculty' : ''}
            </button>
          ))}
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFaculty.map((faculty) => (
            <div
              key={faculty.id}
              id={`faculty-card-${faculty.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Faculty Photo & Background Banner */}
                <div className="relative h-60 overflow-hidden bg-slate-900">
                  <img
                    src={faculty.image}
                    alt={faculty.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/90 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 backdrop-blur-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{faculty.rating} / 5.0</span>
                  </div>

                  {/* Alma Mater Tag */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="inline-block text-[11px] font-bold text-amber-300 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded backdrop-blur-xs">
                      {faculty.almaMater}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1 leading-snug">{faculty.name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{faculty.role}</p>
                  </div>
                </div>

                {/* Faculty Details */}
                <div className="p-5 space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Subject Mastery:</span>
                      <span className="font-semibold text-blue-700 text-right">{faculty.department}</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Teaching Experience:</span>
                      <span className="font-semibold text-slate-900">{faculty.experienceYears}+ Years</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Aspirants Mentored:</span>
                      <span className="font-semibold text-emerald-700">{faculty.studentsMentored}</span>
                    </div>
                  </div>

                  {/* Top Ranks Produced */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Award className="w-3 h-3 text-amber-500" />
                      <span>Notable Rankers Mentored:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {faculty.topRanksProduced.map((rank, rIdx) => (
                        <span
                          key={rIdx}
                          className="text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-200/80 px-2 py-0.5 rounded-md"
                        >
                          {rank}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {faculty.bio}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  id={`faculty-bio-btn-${faculty.id}`}
                  onClick={() => setActiveFacultyModal(faculty)}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-slate-600" />
                  <span>Full Profile</span>
                </button>

                <button
                  id={`faculty-demo-btn-${faculty.id}`}
                  onClick={() => onRequestDemo(faculty.name)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-blue-700/20 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-amber-300" />
                  <span>Book Demo</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Faculty Modal */}
        {activeFacultyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              
              {/* Modal Header with Portrait */}
              <div className="relative bg-slate-900 text-white p-6 rounded-t-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-slate-900 pointer-events-none" />
                <button
                  id="close-faculty-modal-btn"
                  onClick={() => setActiveFacultyModal(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                  <img
                    src={activeFacultyModal.image}
                    alt={activeFacultyModal.name}
                    className="w-24 h-24 rounded-2xl object-cover object-top border-2 border-amber-400 shadow-md shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded">
                      {activeFacultyModal.almaMater}
                    </span>
                    <h3 className="text-xl font-bold text-white">{activeFacultyModal.name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{activeFacultyModal.role}</p>
                    <p className="text-xs text-blue-300">{activeFacultyModal.qualification}</p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div>
                    <div className="text-base font-extrabold text-blue-700">{activeFacultyModal.experienceYears}+ Yrs</div>
                    <div className="text-[11px] text-slate-500">Experience</div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-emerald-700">{activeFacultyModal.studentsMentored}</div>
                    <div className="text-[11px] text-slate-500">Students Taught</div>
                  </div>
                  <div>
                    <div className="text-base font-extrabold text-amber-600 flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{activeFacultyModal.rating}</span>
                    </div>
                    <div className="text-[11px] text-slate-500">Student Rating</div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Teaching Philosophy & Bio</h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                    {activeFacultyModal.bio}
                  </p>
                </div>

                {/* Demo Lecture Clip Simulator */}
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-blue-600" />
                      <span>Featured Masterclass Demo Topic:</span>
                    </span>
                    <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded">4K Studio Lecture</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">
                    "{activeFacultyModal.demoTopic}"
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Book a free demo seat to watch live classroom problem-solving heuristics in action.
                  </p>
                </div>

                {/* Publications / Authored Books */}
                {activeFacultyModal.publications && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Authored Problem Books & Papers</h4>
                    <div className="space-y-1.5">
                      {activeFacultyModal.publications.map((pub, pIdx) => (
                        <div key={pIdx} className="text-xs text-slate-700 flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="font-medium">{pub}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex items-center justify-between gap-3">
                <button
                  id="close-faculty-footer-btn"
                  onClick={() => setActiveFacultyModal(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Close
                </button>
                <button
                  id="request-demo-modal-cta"
                  onClick={() => {
                    const fname = activeFacultyModal.name;
                    setActiveFacultyModal(null);
                    onRequestDemo(fname);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Book Free Demo with {activeFacultyModal.name.split(' ')[0]}</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
