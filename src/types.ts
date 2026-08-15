export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: 'jee' | 'neet' | 'foundation' | 'boards';
  targetExam: string;
  targetClass: string;
  duration: string;
  mode: 'Offline Classroom' | 'Hybrid (Classroom + Online)' | 'Live Interactive Online';
  badge?: string;
  rating: number;
  enrolledStudents: number;
  originalFee: number;
  discountedFee: number;
  installmentsAvailable: boolean;
  startDate: string;
  batchTimings: string;
  description: string;
  curriculum: {
    phase: string;
    topics: string[];
    durationWeeks: number;
  }[];
  features: string[];
  image: string;
}

export interface Faculty {
  id: string;
  name: string;
  role: string;
  subject: string;
  department: 'Physics' | 'Chemistry' | 'Mathematics' | 'Biology' | 'Mental Ability';
  qualification: string;
  almaMater: string;
  experienceYears: number;
  topRanksProduced: string[];
  rating: number;
  studentsMentored: string;
  bio: string;
  demoTopic: string;
  image: string;
  publications?: string[];
}

export interface TopperResult {
  id: string;
  studentName: string;
  exam: 'JEE Advanced' | 'NEET-UG' | 'JEE Main' | 'Olympiad / KVPY';
  rank: string;
  scoreOrPercentile: string;
  year: number;
  courseAttended: string;
  collegeAllotted: string;
  testimonial: string;
  image: string;
  hometown: string;
}

export interface QuerySubmission {
  id: string;
  studentName: string;
  guardianName?: string;
  email: string;
  phone: string;
  targetExam: string;
  currentClass: string;
  preferredCampus: string;
  message: string;
  submittedAt: string;
  status: 'Pending' | 'Counsellor Assigned' | 'Resolved';
}

export interface EnrollmentRecord {
  enrollmentId: string;
  studentName: string;
  guardianName: string;
  email: string;
  phone: string;
  courseId: string;
  courseName: string;
  campus: string;
  mode: string;
  batchTiming: string;
  finalFee: number;
  scholarshipApplied: number;
  paymentMode: string;
  enrollmentDate: string;
  rollNumber: string;
}

export interface CampusLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  facilities: string[];
  image: string;
  isMainCenter: boolean;
}
