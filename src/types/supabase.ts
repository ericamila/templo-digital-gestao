
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
