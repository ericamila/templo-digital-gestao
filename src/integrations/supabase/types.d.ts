
// Este arquivo é gerado automaticamente. Não o edite diretamente.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          id: string
          type: string
          title: string
          description: string
          timestamp: string
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          title: string
          description: string
          timestamp?: string
          created_at?: string
        }
        Update: {
          id?: string
          type?: string
          title?: string
          description?: string
          timestamp?: string
          created_at?: string
        }
        Relationships: []
      }
      churches: {
        Row: {
          id: string
          name: string
          description: string | null
          address: string | null
          phone: string | null
          email: string | null
          founded_date: string | null
          schedule: string | null
          type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          founded_date?: string | null
          schedule?: string | null
          type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          address?: string | null
          phone?: string | null
          email?: string | null
          founded_date?: string | null
          schedule?: string | null
          type?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          id: string
          month: string
          tithes: number
          offerings: number
          projects: number
          created_at: string
        }
        Insert: {
          id?: string
          month: string
          tithes: number
          offerings: number
          projects: number
          created_at?: string
        }
        Update: {
          id?: string
          month?: string
          tithes?: number
          offerings?: number
          projects?: number
          created_at?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          id: string
          title: string
          date: string
          time: string | null
          type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          date: string
          time?: string | null
          type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          date?: string
          time?: string | null
          type?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      members: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          address: string | null
          member_type: string
          join_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          address?: string | null
          member_type: string
          join_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          member_type?: string
          join_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      membership_stats: {
        Row: {
          id: string
          month: string
          members: number
          visitors: number
          created_at: string
        }
        Insert: {
          id?: string
          month: string
          members: number
          visitors: number
          created_at?: string
        }
        Update: {
          id?: string
          month?: string
          members?: number
          visitors?: number
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
