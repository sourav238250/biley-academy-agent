/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { VisionMission } from './components/VisionMission';
import { CoursesSection } from './components/CoursesSection';
import { FacultySection } from './components/FacultySection';
import { ResultsSection } from './components/ResultsSection';
import { ScholarshipCalculator } from './components/ScholarshipCalculator';
import { ContactAndCampuses } from './components/ContactAndCampuses';
import { Footer } from './components/Footer';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AICounsellorModal } from './components/AICounsellorModal';
import { Sparkles, Phone, MessageSquare, GraduationCap } from 'lucide-react';
import { INSTITUTE_INFO } from './data/mockData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState<boolean>(false);
  const [isAICounsellorOpen, setIsAICounsellorOpen] = useState<boolean>(false);
  const [enrollCourseId, setEnrollCourseId] = useState<string | undefined>(undefined);
  const [enrollDiscountPercent, setEnrollDiscountPercent] = useState<number>(0);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenEnroll = (courseId?: string, discountPercent: number = 0) => {
    setEnrollCourseId(courseId);
    setEnrollDiscountPercent(discountPercent);
    setIsEnrollModalOpen(true);
  };

  const handleClaimScholarship = (courseId: string, discountPercent: number) => {
    handleOpenEnroll(courseId, discountPercent);
  };

  const handleRequestFacultyDemo = (facultyName: string) => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
    const messageBox = document.getElementById('query-message') as HTMLTextAreaElement;
    if (messageBox) {
      messageBox.value = `I would like to book a free demo lecture and counselling slot with ${facultyName}.`;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenEnroll={handleOpenEnroll}
        onOpenAICounsellor={() => setIsAICounsellorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          onExploreCourses={(stream) => {
            handleNavigate('courses');
          }}
          onOpenScholarship={() => handleNavigate('scholarship')}
          onOpenEnroll={() => handleOpenEnroll()}
          onOpenAICounsellor={() => setIsAICounsellorOpen(true)}
        />

        <VisionMission />

        <CoursesSection
          onSelectEnroll={(courseId) => handleOpenEnroll(courseId)}
          onOpenAICounsellor={() => setIsAICounsellorOpen(true)}
        />

        <FacultySection
          onRequestDemo={handleRequestFacultyDemo}
        />

        <ResultsSection />

        <ScholarshipCalculator
          onClaimScholarship={handleClaimScholarship}
        />

        <ContactAndCampuses
          onOpenAICounsellor={() => setIsAICounsellorOpen(true)}
          onOpenEnroll={() => handleOpenEnroll()}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAICounsellor={() => setIsAICounsellorOpen(true)}
        onOpenEnroll={() => handleOpenEnroll()}
      />

      {/* Floating Action Trigger for AI Counsellor & Quick Helpline */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Instant AI Academic Counsellor Bubble */}
        <button
          id="floating-ai-counsellor-trigger"
          onClick={() => setIsAICounsellorOpen(true)}
          className="pointer-events-auto group px-4 py-3 rounded-full bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white shadow-xl shadow-blue-900/30 hover:scale-105 transition-all flex items-center gap-2.5 border border-blue-400/40 cursor-pointer"
          title="Ask AI Academic Counsellor"
        >
          <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          </div>
          <span className="text-xs font-bold tracking-tight pr-1 hidden sm:inline">
            AI Academic Advisor
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>

      </div>

      {/* Modals */}
      <EnrollmentModal
        isOpen={isEnrollModalOpen}
        onClose={() => setIsEnrollModalOpen(false)}
        preselectedCourseId={enrollCourseId}
        initialDiscountPercent={enrollDiscountPercent}
      />

      <AICounsellorModal
        isOpen={isAICounsellorOpen}
        onClose={() => setIsAICounsellorOpen(false)}
        onOpenEnroll={() => {
          setIsAICounsellorOpen(false);
          setIsEnrollModalOpen(true);
        }}
      />

    </div>
  );
}
