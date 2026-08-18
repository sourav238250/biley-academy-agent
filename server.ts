import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with optional safety check
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    } catch (err) {
      console.error('Failed to initialize Gemini AI client:', err);
    }
  }
  return aiClient;
}

// In-memory query and enrollment store
const querySubmissions: Array<{
  id: string;
  name: string;
  phone: string;
  email: string;
  exam: string;
  currentClass: string;
  message: string;
  campus: string;
  createdAt: string;
}> = [];

const enrollmentRecords: Array<{
  enrollmentId: string;
  rollNumber: string;
  studentName: string;
  guardianName: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  campus: string;
  mode: string;
  finalFee: number;
  scholarshipPercent: number;
  enrollmentDate: string;
}> = [];

// API: AI Academic & Course Counsellor
app.post('/api/ai-counsellor', async (req, res) => {
  const { question, userContext } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Question is required' });
  }

  const ai = getAiClient();

  if (ai) {
    try {
      const systemInstruction = `You are the Lead Academic Counsellor & Dean of Admissions at "Biley Academy of Science & Excellence", India's top-ranked coaching institute for IIT-JEE (Main & Advanced), NEET-UG/AIIMS, Olympiads, and Pre-Foundation.
Institute Highlights:
- Programs: JEE 2-Year Pinnacle Masterclass (Class 11-12), NEET-UG 2-Year Ascend Cohort, JEE/NEET 1-Year Dropper / Repeater batches, Pinnacle Foundation (Class 9-10), Live Interactive Online Global program.
- Faculty: Led by Dr. Anandvardhan Sharma (IIT Delhi, Physics HOD), Dr. Meenakshi Sundaram (AIIMS, Biology HOD), Er. Vikrant Singhania (IIT Bombay, Math HOD), Prof. Rajeshwar Verma (IIT Kanpur, Chemistry HOD).
- Results: AIR 4 (JEE Adv), AIR 12 (NEET-UG), AIR 19 (JEE Main 100%ile), 4,200+ selections in IITs & Top Govt Medical Colleges.
- Scholarship: Apex National Talent Scholarship (ANTS) offering up to 100% tuition waiver based on test or 90%+ in previous board exams.
- Features: 1:15 Faculty-student ratio, 24/7 dedicated Doubt Desks, Daily Practice Problems (DPPs), Computer-Based Testing (CBT), hostel tie-ups.
- Centers: New Delhi (South Ext Part-II & Janakpuri), Kota Academic Hub, Bengaluru (Koramangala), and 100% Live Online.

Provide an encouraging, crystal-clear, warm, highly structured, and empathetic response. Include practical advice, subject-wise strategy tips, recommended course at Apex, and clear next steps (e.g. taking the ANTS scholarship test or visiting a campus for free demo/counselling). Keep the tone professional, motivating, and concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `Student Context: ${JSON.stringify(userContext || {})}\nStudent/Parent Query: ${question}`,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      return res.json({
        answer: response.text,
        source: 'gemini-ai',
      });
    } catch (error) {
      console.error('Error generating AI counselling response:', error);
      // Fallback below
    }
  }

  // Smart algorithmic fallback counsellor
  let fallbackAnswer = `Thank you for reaching out to Biley Academy Academic Counselling! Regarding your query on "${question}":\n\n`;

  const qLower = question.toLowerCase();
  if (qLower.includes('fee') || qLower.includes('cost') || qLower.includes('installment') || qLower.includes('price')) {
    fallbackAnswer += `• **Fee Structure & Scholarships:** Our 2-Year flagship programs for JEE and NEET are priced at ₹1,85,000 - ₹1,98,000 with flexible 0% interest monthly installment (EMI) options.\n• **Scholarships:** You can save up to 100% through the Apex National Talent Scholarship (ANTS) test conducted every Sunday, or secure 15%-30% direct merit waivers with 90%+ in your previous boards.`;
  } else if (qLower.includes('neet') || qLower.includes('medical') || qLower.includes('doctor') || qLower.includes('biology')) {
    fallbackAnswer += `• **NEET-UG Preparation Strategy:** Led by Dr. Meenakshi Sundaram (AIIMS New Delhi), our Ascend Medical batch emphasizes line-by-line NCERT mastery, 15,000+ targeted MCQ drills, and specialized physics numerical workshops.\n• **Track Record:** Our 2024 results include AIR 12 (715/720) and over 680+ students scoring 650+ in NEET.`;
  } else if (qLower.includes('jee') || qLower.includes('iit') || qLower.includes('engineering') || qLower.includes('math')) {
    fallbackAnswer += `• **IIT-JEE Masterclass:** Guided by Dr. Anandvardhan Sharma (IIT Delhi) and Er. Vikrant Singhania (IIT Bombay), we build concepts from foundational fundamentals to challenging multi-concept Olympiad level.\n• **Batch Timings:** Both Morning (8:00 AM - 1:30 PM) and Evening batches are available at our Delhi, Kota, Bengaluru campuses and Live Online.`;
  } else if (qLower.includes('hostel') || qLower.includes('accommodation') || qLower.includes('food') || qLower.includes('mess')) {
    fallbackAnswer += `• **Hostel & Living:** We offer verified, secure AC hostels with biometric entry, 24/7 warden supervision, hygienic four-meal mess, and designated silent study rooms in Kota, Delhi South Extension, and Bangalore.`;
  } else if (qLower.includes('foundation') || qLower.includes('class 9') || qLower.includes('class 10') || qLower.includes('class 8') || qLower.includes('olympiad')) {
    fallbackAnswer += `• **Pinnacle Foundation (Class 8-10):** Focuses on school board excellence (95%+ target) while laying the ground for NTSE, IJSO, PRMO, and early JEE/NEET conceptual maturity without mental strain.`;
  } else {
    fallbackAnswer += `• **Personalized Guidance:** At Apex Academy, our 1:15 faculty ratio ensures that every student receives individualized attention, daily doubt clearing, and continuous diagnostic test feedback.\n• **Next Steps:** We invite you to book a Free Demo Lecture & Diagnostic Assessment at any of our campuses or online.`;
  }

  fallbackAnswer += `\n\nWould you like to schedule a free 1-on-1 career counselling session with our Senior HOD or take the online ANTS scholarship test?`;

  return res.json({
    answer: fallbackAnswer,
    source: 'academic-counsellor-fallback',
  });
});

// API: Submit a Contact/Counselling Query
app.post('/api/query', (req, res) => {
  const { name, phone, email, exam, currentClass, message, campus } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone number are required.' });
  }

  const queryId = `QRY-${Math.floor(100000 + Math.random() * 900000)}`;
  const record = {
    id: queryId,
    name,
    phone,
    email: email || '',
    exam: exam || 'General Enquiry',
    currentClass: currentClass || 'Not Specified',
    message: message || 'Requested callback from senior counsellor',
    campus: campus || 'South Extension, Delhi',
    createdAt: new Date().toISOString(),
  };

  querySubmissions.push(record);

  return res.json({
    success: true,
    ticketId: queryId,
    message: 'Your query has been registered successfully. A senior academic counselor will call you within 2 working hours.',
    record,
  });
});

// API: Process Online Enrollment
app.post('/api/enroll', (req, res) => {
  const {
    studentName,
    guardianName,
    email,
    phone,
    courseId,
    courseName,
    campus,
    mode,
    finalFee,
    scholarshipPercent,
    batchTiming,
  } = req.body;

  if (!studentName || !phone || !courseName) {
    return res.status(400).json({ error: 'Student name, phone, and course are required.' });
  }

  const currentYear = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const rollNumber = `APEX-${currentYear}-${randomSuffix}`;
  const enrollmentId = `ENR-${Date.now().toString().slice(-6)}-${randomSuffix}`;

  const record = {
    enrollmentId,
    rollNumber,
    studentName,
    guardianName: guardianName || 'Parent / Guardian',
    email: email || '',
    phone,
    courseId: courseId || 'custom',
    courseName,
    campus: campus || 'South Delhi Corporate Campus',
    mode: mode || 'Offline Classroom',
    batchTiming: batchTiming || 'Morning Batch (8:30 AM)',
    finalFee: Number(finalFee) || 120000,
    scholarshipPercent: Number(scholarshipPercent) || 0,
    enrollmentDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };

  enrollmentRecords.push(record);

  return res.json({
    success: true,
    enrollmentId,
    rollNumber,
    receiptData: record,
    message: 'Provisional Admission Confirmed! Your student roll number and batch assignment have been generated.',
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    institute: 'Apex Academy',
    geminiEnabled: !!process.env.GEMINI_API_KEY,
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Biley Academy Portal Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
