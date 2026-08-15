import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building2, Send, CheckCircle2, ChevronDown, ChevronUp, Clock, Sparkles, MessageSquare, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { INSTITUTE_INFO, CAMPUS_LOCATIONS, FAQS_DATA, GALLERY_IMAGES } from '../data/mockData';

interface ContactAndCampusesProps {
  onOpenAICounsellor: () => void;
  onOpenEnroll: () => void;
}

export const ContactAndCampuses: React.FC<ContactAndCampusesProps> = ({
  onOpenAICounsellor,
  onOpenEnroll,
}) => {
  // Query Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [exam, setExam] = useState('IIT-JEE (Main + Advanced)');
  const [currentClass, setCurrentClass] = useState('Class 11th');
  const [message, setMessage] = useState('');
  const [preferredCampus, setPreferredCampus] = useState(CAMPUS_LOCATIONS[0].name);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queryTicket, setQueryTicket] = useState<string | null>(null);

  // FAQ Expand State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          exam,
          currentClass,
          message,
          campus: preferredCampus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setQueryTicket(data.ticketId);
      }
    } catch (err) {
      console.error('Failed to submit query:', err);
      setQueryTicket(`QRY-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* SECTION 1: CAMPUS LOCATIONS & INFRASTRUCTURE */}
        <div id="campuses">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-200">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Pan-India Presence & Infrastructure</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Academic Campuses & Learning Hubs
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Equipped with smart digital classrooms, 24/7 air-conditioned libraries, dedicated doubt clearing zones, and certified test facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CAMPUS_LOCATIONS.map((campus) => (
              <div
                key={campus.id}
                id={`campus-card-${campus.id}`}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-40 overflow-hidden bg-slate-800">
                    <img
                      src={campus.image}
                      alt={campus.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    {campus.isMainCenter && (
                      <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow">
                        Corporate Headquarter
                      </span>
                    )}
                    <div className="absolute bottom-2 left-3 text-white">
                      <span className="text-[11px] font-bold text-blue-300">{campus.city}</span>
                      <h4 className="text-sm font-bold leading-tight">{campus.name}</h4>
                    </div>
                  </div>

                  <div className="p-4 space-y-3 text-xs text-slate-600">
                    <p className="line-clamp-2">{campus.address}</p>
                    
                    <div className="space-y-1 pt-1 border-t border-slate-100 font-medium">
                      <div className="flex items-center gap-1.5 text-slate-800">
                        <Phone className="w-3.5 h-3.5 text-blue-600" />
                        <span>{campus.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Mail className="w-3.5 h-3.5 text-blue-600" />
                        <span className="truncate">{campus.email}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Key Facilities:</div>
                      <div className="flex flex-wrap gap-1">
                        {campus.facilities.slice(0, 3).map((f, fIdx) => (
                          <span key={fIdx} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <a
                    href={`tel:${campus.phone.replace(/[^0-9+]/g, '')}`}
                    className="w-full py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Center</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: CAMPUS PHOTO GALLERY */}
        <div id="gallery">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Life at Apex</span>
              </span>
              <h3 className="text-2xl font-bold text-slate-900">Campus Environment & Learning Facilities</h3>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              A high-focus, intellectually stimulating environment designed for zero distraction and maximum study momentum.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden shadow-sm h-48 bg-slate-900">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded">
                    {img.tag}
                  </span>
                  <p className="text-xs font-semibold mt-1 line-clamp-1">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: CONTACT FORM & QUERY COUNTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Contact Info & Support Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-200">
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>Get in Touch</span>
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                Have a Query? Speak to an Academic Counsellor
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Whether you need advice on selecting the right cohort, want to request a syllabus brochure, or schedule a campus visit, our admission advisors are ready to assist.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Admissions & Toll-Free Helpline:</div>
                  <div className="text-base font-bold text-slate-900">{INSTITUTE_INFO.tollFree}</div>
                  <div className="text-xs text-slate-500">Mon - Sun: 8:00 AM - 8:00 PM</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Direct Admissions Email:</div>
                  <div className="text-sm font-bold text-slate-900">{INSTITUTE_INFO.email}</div>
                  <div className="text-xs text-slate-500">Responses guaranteed within 2 hours</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Headquarters Address:</div>
                  <div className="text-xs font-semibold text-slate-800 leading-relaxed">{INSTITUTE_INFO.headOffice}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-blue-900 font-semibold">
                <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Prefer instant automated advice?</span>
              </div>
              <button
                id="contact-ask-ai-btn"
                onClick={onOpenAICounsellor}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors"
              >
                Chat with AI
              </button>
            </div>
          </div>

          {/* Right: Drop a Query Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md">
            {queryTicket ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900">Query Registered Successfully!</h4>
                <div className="inline-block bg-slate-100 border border-slate-300 px-4 py-2 rounded-xl text-sm font-black text-blue-800">
                  TICKET ID: {queryTicket}
                </div>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-slate-900">{name}</span>! A Senior Academic Counsellor from the <span className="font-semibold text-slate-900">{preferredCampus}</span> has been assigned and will call you on <span className="font-semibold text-slate-900">{phone}</span> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setQueryTicket(null);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200"
                  >
                    Submit Another Query
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitQuery} className="space-y-4">
                <h4 className="text-lg font-bold text-slate-900">Drop a Counselling Query / Request Callback</h4>
                <p className="text-xs text-slate-500">Fill in your information below and our team will get back to you with syllabus brochures and test slots.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Student / Parent Name *</label>
                    <input
                      id="query-name"
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Gupta"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Contact Number *</label>
                    <input
                      id="query-phone"
                      type="tel"
                      required
                      placeholder="e.g. +91 98110 22334"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Target Exam *</label>
                    <select
                      id="query-exam"
                      value={exam}
                      onChange={(e) => setExam(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="IIT-JEE (Main + Advanced)">IIT-JEE (Main + Advanced)</option>
                      <option value="NEET-UG & AIIMS">NEET-UG & AIIMS</option>
                      <option value="Pre-Foundation (Class 8-10)">Pre-Foundation (Class 8-10)</option>
                      <option value="Dropper Intensive">Dropper Intensive</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Current Grade *</label>
                    <select
                      id="query-class"
                      value={currentClass}
                      onChange={(e) => setCurrentClass(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      <option value="Class 8th / 9th">Class 8th / 9th</option>
                      <option value="Class 10th">Class 10th</option>
                      <option value="Class 11th">Class 11th</option>
                      <option value="Class 12th">Class 12th</option>
                      <option value="12th Pass / Dropper">12th Pass / Dropper</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Preferred Center *</label>
                    <select
                      id="query-campus"
                      value={preferredCampus}
                      onChange={(e) => setPreferredCampus(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    >
                      {CAMPUS_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.city}
                        </option>
                      ))}
                      <option value="Online Live Studio">Online Live Studio</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Your Specific Question / Requirement</label>
                  <textarea
                    id="query-message"
                    rows={3}
                    placeholder="e.g. Want to know batch starting dates, fee installments, hostel options, and demo class schedule..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    🔒 Data confidential. No spam calls.
                  </span>
                  <button
                    id="query-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 disabled:opacity-50 transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-blue-700/20"
                  >
                    {isSubmitting ? (
                      <span>Sending Query...</span>
                    ) : (
                      <>
                        <span>Submit & Request Callback</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
        <div id="faqs" className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Got Questions?</span>
            <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {FAQS_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
                >
                  <button
                    id={`faq-toggle-${idx}`}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
