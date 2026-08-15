import React, { useState, useEffect } from 'react';
import { GraduationCap, CheckCircle2, ShieldCheck, ArrowRight, Printer, X, Sparkles, Building2, Calendar, Phone, Mail, User } from 'lucide-react';
import { COURSES_DATA, CAMPUS_LOCATIONS } from '../data/mockData';
import { Course } from '../types';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCourseId?: string;
  initialDiscountPercent?: number;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  preselectedCourseId,
  initialDiscountPercent = 0,
}) => {
  const [step, setStep] = useState<number>(1);
  const [studentName, setStudentName] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(preselectedCourseId || COURSES_DATA[0].id);
  const [selectedCampus, setSelectedCampus] = useState<string>(CAMPUS_LOCATIONS[0].name);
  const [selectedMode, setSelectedMode] = useState<string>('Offline Classroom');
  const [batchTiming, setBatchTiming] = useState<string>('Morning Batch (8:30 AM - 1:30 PM)');
  const [scholarshipPercent, setScholarshipPercent] = useState<number>(initialDiscountPercent);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReceipt, setConfirmedReceipt] = useState<any>(null);

  useEffect(() => {
    if (preselectedCourseId) {
      setSelectedCourseId(preselectedCourseId);
    }
    if (initialDiscountPercent) {
      setScholarshipPercent(initialDiscountPercent);
    }
  }, [preselectedCourseId, initialDiscountPercent]);

  if (!isOpen) return null;

  const currentCourse = COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];
  const baseFee = currentCourse.discountedFee;
  const discountAmount = Math.round((baseFee * scholarshipPercent) / 100);
  const finalPayableFee = baseFee - discountAmount;

  const handleSubmitEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName,
          guardianName,
          email,
          phone,
          courseId: selectedCourseId,
          courseName: currentCourse.title,
          campus: selectedCampus,
          mode: selectedMode,
          batchTiming,
          finalFee: finalPayableFee,
          scholarshipPercent,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setConfirmedReceipt(data.receiptData);
        setStep(3); // Receipt step
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      // Client-side fallback receipt
      const fallbackRoll = `APEX-2025-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedReceipt({
        enrollmentId: `ENR-${Date.now().toString().slice(-6)}`,
        rollNumber: fallbackRoll,
        studentName: studentName || 'Applicant Student',
        guardianName: guardianName || 'Parent / Guardian',
        phone,
        email,
        courseName: currentCourse.title,
        campus: selectedCampus,
        mode: selectedMode,
        batchTiming,
        finalFee: finalPayableFee,
        scholarshipPercent,
        enrollmentDate: new Date().toLocaleDateString(),
      });
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 text-white flex items-center justify-center font-bold">
              <GraduationCap className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {step === 3 ? 'Provisional Admission Slip' : 'Online Admission & Batch Enrollment'}
              </h3>
              <p className="text-xs text-slate-500">Academic Session 2025 - 2026</p>
            </div>
          </div>
          <button
            id="close-enrollment-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress bar */}
        {step < 3 && (
          <div className="px-6 pt-4 pb-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs font-semibold">
            <span className={step === 1 ? 'text-blue-700 flex items-center gap-1.5' : 'text-slate-400'}>
              <span className="w-5 h-5 rounded-full bg-blue-700 text-white flex items-center justify-center text-[10px]">1</span>
              Student Details
            </span>
            <div className="h-0.5 w-12 bg-slate-200" />
            <span className={step === 2 ? 'text-blue-700 flex items-center gap-1.5' : 'text-slate-400'}>
              <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-[10px]">2</span>
              Course & Campus
            </span>
            <div className="h-0.5 w-12 bg-slate-200" />
            <span className="text-slate-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-[10px]">3</span>
              Receipt
            </span>
          </div>
        )}

        {/* Modal Form Content */}
        <div className="p-6 flex-1">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Student Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      id="enroll-student-name"
                      type="text"
                      required
                      placeholder="e.g. Aryan Sharma"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Parent / Guardian Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      id="enroll-guardian-name"
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Mobile Phone (WhatsApp enabled) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      id="enroll-phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address (For admission slip) *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      id="enroll-email"
                      type="email"
                      required
                      placeholder="e.g. student@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  id="enroll-step-1-next-btn"
                  type="button"
                  disabled={!studentName || !phone}
                  onClick={() => setStep(2)}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <span>Select Course & Campus</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitEnrollment} className="space-y-4">
              
              {/* Course Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Selected Course Program *</label>
                <select
                  id="enroll-selected-course"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  {COURSES_DATA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Campus Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Preferred Campus Center *</label>
                  <select
                    id="enroll-selected-campus"
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    {CAMPUS_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.name}>
                        {loc.name} ({loc.city})
                      </option>
                    ))}
                    <option value="Live Interactive Online Studio">100% Live Online Studio</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Batch Timing Slot *</label>
                  <select
                    id="enroll-batch-timing"
                    value={batchTiming}
                    onChange={(e) => setBatchTiming(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  >
                    <option value="Morning Batch (8:30 AM - 1:30 PM)">Morning Batch (8:30 AM - 1:30 PM)</option>
                    <option value="Evening Batch (3:30 PM - 8:30 PM)">Evening Batch (3:30 PM - 8:30 PM)</option>
                    <option value="Weekend Special (Sat & Sun Full Day)">Weekend Special (Sat & Sun)</option>
                  </select>
                </div>
              </div>

              {/* Mode Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Learning Mode *</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Offline Classroom', 'Hybrid (Classroom + Online)', 'Live Interactive Online'].map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setSelectedMode(m)}
                      className={`p-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                        selectedMode === m
                          ? 'bg-blue-50 border-blue-600 text-blue-800'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {m.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fee Summary with Scholarship */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Standard Program Fee:</span>
                  <span>₹{baseFee.toLocaleString('en-IN')}</span>
                </div>
                {scholarshipPercent > 0 && (
                  <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                    <span>Applied ANTS Scholarship ({scholarshipPercent}%):</span>
                    <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-800 flex items-baseline justify-between">
                  <span className="text-xs font-bold text-slate-200">Provisional Payable Fee:</span>
                  <span className="text-lg font-black text-emerald-400">
                    ₹{finalPayableFee.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  ← Back to Student Info
                </button>
                <button
                  id="enroll-submit-final-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-700/20"
                >
                  {isSubmitting ? (
                    <span>Generating Admission Slip...</span>
                  ) : (
                    <>
                      <span>Confirm & Generate Admission Slip</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {step === 3 && confirmedReceipt && (
            <div className="space-y-6">
              
              {/* Receipt Printable Card */}
              <div id="admission-slip-printable" className="p-6 rounded-2xl border-2 border-slate-900 bg-white space-y-5 text-slate-900">
                
                {/* Slip Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                  <div>
                    <div className="text-xl font-black tracking-tight text-blue-900">APEX ACADEMY</div>
                    <div className="text-[11px] text-slate-500 font-medium">Center for Excellence in JEE, NEET & Foundation</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black text-slate-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded">
                      ROLL NO: {confirmedReceipt.rollNumber}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">ID: {confirmedReceipt.enrollmentId}</div>
                  </div>
                </div>

                {/* Student Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Student Name:</span>
                    <div className="font-bold text-slate-900">{confirmedReceipt.studentName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Guardian Name:</span>
                    <div className="font-bold text-slate-900">{confirmedReceipt.guardianName}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Registered Phone:</span>
                    <div className="font-bold text-slate-900">{confirmedReceipt.phone}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Admission Date:</span>
                    <div className="font-bold text-slate-900">{confirmedReceipt.enrollmentDate}</div>
                  </div>
                </div>

                {/* Course Details */}
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Enrolled Program:</span>
                    <span className="font-bold text-slate-900">{confirmedReceipt.courseName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Allotted Campus:</span>
                    <span className="font-semibold text-blue-800">{confirmedReceipt.campus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Batch Timing:</span>
                    <span className="font-semibold text-slate-800">{confirmedReceipt.batchTiming}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 text-sm">
                    <span className="font-bold text-slate-900">Net Tuition Fee:</span>
                    <span className="font-black text-emerald-700">₹{confirmedReceipt.finalFee.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Verification Stamp */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200">
                  <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Seat Reserved Provisionally</span>
                  </div>
                  <div className="text-right">
                    <span>Authorized Registrar Stamp</span>
                    <div className="font-bold text-blue-900">Apex Academy Central Admissions</div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  id="print-receipt-btn"
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-700" />
                  <span>Print / Save Admission Slip</span>
                </button>

                <button
                  id="finish-enrollment-btn"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
