// Custom types for our Supabase tables
export interface Church {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  founded_date: string | null;
  schedule: string | null;
  type: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Member {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  member_type: string;
  join_date: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string | null;
  type: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Donation {
  id: string;
  month: string;
  tithes: number;
  offerings: number;
  projects: number;
  created_at: string | null;
}

export interface MembershipStat {
  id: string;
  month: string;
  members: number;
  visitors: number;
  created_at: string | null;
}

export interface Activity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string | null;
}

export interface SchoolClass {
  id: string;
  name: string;
  description: string | null;
  teacher_id: string | null;
  schedule: string | null;
  room: string | null;
  max_students: number | null;
  current_students: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Student {
  id: string;
  member_id: string;
  class_id: string;
  enrollment_date: string;
  attendance_rate: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Attendance {
  id: string;
  class_id: string;
  student_id: string;
  date: string;
  present: boolean;
  created_at: string | null;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  payment_method: string | null;
  reference_number: string | null;
  account_id: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Budget {
  id: string;
  year: number;
  month: number;
  category: string;
  allocated_amount: number;
  spent_amount: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface Report {
  id: string;
  title: string;
  description: string | null;
  report_type: string;
  date_range_start: string | null;
  date_range_end: string | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface AccountCategory {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'asset' | 'liability' | 'equity';
  description: string | null;
  created_at: string | null;
}

export interface Account {
  id: string;
  category_id: string;
  code: string;
  name: string;
  description: string | null;
  parent_id: string | null;
  is_active: boolean;
  created_at: string | null;
}
