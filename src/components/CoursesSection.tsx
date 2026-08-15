import React, { useState } from 'react';
import { BookOpen, CheckCircle, Clock, Calendar, Users, Star, ArrowRight, Download, Eye, Sparkles, Filter, X, FileText } from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/mockData';

interface CoursesSectionProps {
  onSelectEnroll: (courseId: string) => void;
  onOpenAICounsellor: () => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  onSelectEnroll,
  onOpenAICounsellor,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Programs' },
    { id: 'jee', label: 'IIT-JEE (Main + Adv)' },
    { id: 'neet', label: 'NEET-UG & AIIMS' },
    { id: 'foundation', label: 'Pre-Foundation (Class 9-10)' },
  ];

  const filteredCourses = selectedCategory === 'all'
    ? COURSES_DATA
    : COURSES_DATA.filter((c) => c.category === selectedCategory);

  const handleDownloadBrochure = (courseTitle: string) => {
    setDownloadSuccessToast(`Syllabus & Admission Brochure for "${courseTitle}" downloaded successfully!`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 4000);
  };

  return (
    <section id="courses" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
              <BookOpen className="w-3.5 h-3.5 text-amber-700" />
              <span>Academic Programs & Cohorts</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Curated Courses for Every Aspirant
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Engineered by experienced senior faculties with comprehensive study materials, chapter-wise DPPs, 24/7 doubt resolution, and proctored All-India CBT tests.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="course-need-guidance-btn"
              onClick={onOpenAICounsellor}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-sky-50 text-sky-800 border border-sky-200 hover:bg-sky-100 transition-colors flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Need Help Choosing? Ask AI</span>
            </button>
          </div>
        </div>

        {/* Stream Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-slate-100">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Stream:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-blue-700 text-white shadow-sm shadow-blue-700/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              id={`course-card-${course.id}`}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Course Image & Badge Header */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  {course.badge && (
                    <span className="absolute top-3 left-3 bg-amber-400 text-slate-950 text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow">
                      {course.badge}
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-300 bg-blue-950/80 px-2 py-0.5 rounded backdrop-blur-xs">
                      {course.targetExam}
                    </span>
                    <h3 className="text-base font-bold leading-tight mt-1 text-white line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Course Metadata Strip */}
                <div className="p-5 space-y-4">
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-blue-600" />
                        <span>Target Class:</span>
                      </span>
                      <span className="font-semibold text-slate-900">{course.targetClass}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        <span>Duration:</span>
                      </span>
                      <span className="font-semibold text-slate-900">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span>Delivery Mode:</span>
                      </span>
                      <span className="font-semibold text-blue-700">{course.mode}</span>
                    </div>
                  </div>

                  {/* Top Features Checkmarks */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Inclusions:</div>
                    {course.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Fee Breakdown */}
                  <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">Tuition Fee:</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-slate-900">
                          ₹{course.discountedFee.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-400 line-through">
                          ₹{course.originalFee.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      ANTS Scholarship Eligible
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  id={`view-syllabus-btn-${course.id}`}
                  onClick={() => setActiveCourseModal(course)}
                  className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-600" />
                  <span>Syllabus</span>
                </button>

                <button
                  id={`enroll-course-btn-${course.id}`}
                  onClick={() => onSelectEnroll(course.id)}
                  className="py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-blue-700/20 cursor-pointer"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Download Success Toast Notification */}
        {downloadSuccessToast && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs sm:text-sm font-medium">{downloadSuccessToast}</span>
          </div>
        )}

        {/* Syllabus & Course Detail Modal */}
        {activeCourseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 flex items-start justify-between sticky top-0 bg-white z-10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                    {activeCourseModal.targetExam}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{activeCourseModal.title}</h3>
                  <p className="text-xs text-slate-500">{activeCourseModal.subtitle}</p>
                </div>
                <button
                  id="close-syllabus-modal-btn"
                  onClick={() => setActiveCourseModal(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {/* Course Quick Summary */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div>
                    <div className="text-slate-400 font-medium">Duration</div>
                    <div className="font-bold text-slate-900">{activeCourseModal.duration}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">Target Class</div>
                    <div className="font-bold text-slate-900">{activeCourseModal.targetClass}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">Mode</div>
                    <div className="font-bold text-blue-700">{activeCourseModal.mode}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 font-medium">Total Fee</div>
                    <div className="font-bold text-emerald-700">₹{activeCourseModal.discountedFee.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                {/* Batch Timings */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Batch Timings & Schedule</h4>
                  <p className="text-xs font-semibold text-slate-800 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                    {activeCourseModal.batchTimings}
                  </p>
                </div>

                {/* Phase-wise Curriculum */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span>Phase-wise Academic Syllabus Roadmap</span>
                  </h4>
                  <div className="space-y-3">
                    {activeCourseModal.curriculum.map((phase, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-white">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-blue-800">{phase.phase}</span>
                          <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {phase.durationWeeks} Weeks
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {phase.topics.map((t, tIdx) => (
                            <div key={tIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                              <span>{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Features */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Included Support & Materials:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeCourseModal.features.map((feat, fIdx) => (
                      <div key={fIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-3xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  id="download-brochure-modal-btn"
                  onClick={() => handleDownloadBrochure(activeCourseModal.title)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full PDF Brochure</span>
                </button>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    id="close-syllabus-footer-btn"
                    onClick={() => setActiveCourseModal(null)}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    id="enroll-from-modal-btn"
                    onClick={() => {
                      const cid = activeCourseModal.id;
                      setActiveCourseModal(null);
                      onSelectEnroll(cid);
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Enroll</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
