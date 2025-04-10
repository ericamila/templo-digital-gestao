export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      alarmes: {
        Row: {
          codigo: string | null
          descricao: string | null
          id: number
        }
        Insert: {
          codigo?: string | null
          descricao?: string | null
          id?: number
        }
        Update: {
          codigo?: string | null
          descricao?: string | null
          id?: number
        }
        Relationships: []
      }
      area: {
        Row: {
          descricao: string | null
          hospital: number | null
          id: number
        }
        Insert: {
          descricao?: string | null
          hospital?: number | null
          id?: number
        }
        Update: {
          descricao?: string | null
          hospital?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_area_hospital_fkey"
            columns: ["hospital"]
            isOneToOne: false
            referencedRelation: "pessoa_juridica"
            referencedColumns: ["id"]
          },
        ]
      }
      cargo: {
        Row: {
          descricao: string | null
          id: number
        }
        Insert: {
          descricao?: string | null
          id?: number
        }
        Update: {
          descricao?: string | null
          id?: number
        }
        Relationships: []
      }
      dispositivo: {
        Row: {
          id: string
          mac: string | null
          nome: string | null
          status: boolean | null
          tag: string | null
          tipo: string | null
        }
        Insert: {
          id?: string
          mac?: string | null
          nome?: string | null
          status?: boolean | null
          tag?: string | null
          tipo?: string | null
        }
        Update: {
          id?: string
          mac?: string | null
          nome?: string | null
          status?: boolean | null
          tag?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      dispositivo_pessoa: {
        Row: {
          data_time_fim: string | null
          data_time_inicio: string | null
          dispositivo_id: string | null
          id: number
          pessoa_id: string | null
          vinculado: boolean | null
        }
        Insert: {
          data_time_fim?: string | null
          data_time_inicio?: string | null
          dispositivo_id?: string | null
          id?: number
          pessoa_id?: string | null
          vinculado?: boolean | null
        }
        Update: {
          data_time_fim?: string | null
          data_time_inicio?: string | null
          dispositivo_id?: string | null
          id?: number
          pessoa_id?: string | null
          vinculado?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_dispositivo_pessoa_dispositivo_id_fkey"
            columns: ["dispositivo_id"]
            isOneToOne: false
            referencedRelation: "dispositivo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_dispositivo_pessoa_dispositivo_id_fkey"
            columns: ["dispositivo_id"]
            isOneToOne: false
            referencedRelation: "vw_dispositivos_livres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_dispositivo_pessoa_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "pessoa_fisica"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_dispositivo_pessoa_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "vw_dispositivos_usuarios"
            referencedColumns: ["pessoa_id"]
          },
          {
            foreignKeyName: "public_dispositivo_pessoa_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "vw_dispositivos_usuarios_all"
            referencedColumns: ["pessoa_id"]
          },
          {
            foreignKeyName: "public_dispositivo_pessoa_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "vw_pessoas_livres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_dispositivo_pessoa_pessoa_id_fkey"
            columns: ["pessoa_id"]
            isOneToOne: false
            referencedRelation: "vw_registro_alarmes"
            referencedColumns: ["id_pessoa"]
          },
        ]
      }
      equipamento: {
        Row: {
          codigo: string | null
          descricao: string | null
          foto: string | null
          id: string
          tipo: string | null
        }
        Insert: {
          codigo?: string | null
          descricao?: string | null
          foto?: string | null
          id?: string
          tipo?: string | null
        }
        Update: {
          codigo?: string | null
          descricao?: string | null
          foto?: string | null
          id?: string
          tipo?: string | null
        }
        Relationships: []
      }
      externo: {
        Row: {
          area_id: number | null
          cpf: string | null
          externo_id: string | null
          foto: string | null
          id: string
          nome: string | null
          tipo_externo: string | null
          tipo_paciente: string | null
        }
        Insert: {
          area_id?: number | null
          cpf?: string | null
          externo_id?: string | null
          foto?: string | null
          id?: string
          nome?: string | null
          tipo_externo?: string | null
          tipo_paciente?: string | null
        }
        Update: {
          area_id?: number | null
          cpf?: string | null
          externo_id?: string | null
          foto?: string | null
          id?: string
          nome?: string | null
          tipo_externo?: string | null
          tipo_paciente?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_externo_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "area"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_externo_externo_id_fkey"
            columns: ["externo_id"]
            isOneToOne: false
            referencedRelation: "externo"
            referencedColumns: ["id"]
          },
        ]
      }
      funcionario: {
        Row: {
          cargo_id: number | null
          cpf: string | null
          foto: string | null
          id: string
          nome: string | null
          tipo_externo: string | null
        }
        Insert: {
          cargo_id?: number | null
          cpf?: string | null
          foto?: string | null
          id?: string
          nome?: string | null
          tipo_externo?: string | null
        }
        Update: {
          cargo_id?: number | null
          cpf?: string | null
          foto?: string | null
          id?: string
          nome?: string | null
          tipo_externo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_funcionario_cargo_id_fkey"
            columns: ["cargo_id"]
            isOneToOne: false
            referencedRelation: "cargo"
            referencedColumns: ["id"]
          },
        ]
      }
      pessoa_fisica: {
        Row: {
          area_id: number | null
          cpf: string | null
          id: string
          nome: string | null
          tipo_externo: string | null
        }
        Insert: {
          area_id?: number | null
          cpf?: string | null
          id?: string
          nome?: string | null
          tipo_externo?: string | null
        }
        Update: {
          area_id?: number | null
          cpf?: string | null
          id?: string
          nome?: string | null
          tipo_externo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_pessoa_fisica_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "area"
            referencedColumns: ["id"]
          },
        ]
      }
      pessoa_juridica: {
        Row: {
          cnpj: string | null
          id: number
          logo: string | null
          nome: string
        }
        Insert: {
          cnpj?: string | null
          id?: number
          logo?: string | null
          nome: string
        }
        Update: {
          cnpj?: string | null
          id?: number
          logo?: string | null
          nome?: string
        }
        Relationships: []
      }
      raspberry: {
        Row: {
          area_id: number | null
          descricao: string | null
          id: number
          ip: string | null
          mac: string | null
          status: boolean | null
        }
        Insert: {
          area_id?: number | null
          descricao?: string | null
          id?: number
          ip?: string | null
          mac?: string | null
          status?: boolean | null
        }
        Update: {
          area_id?: number | null
          descricao?: string | null
          id?: number
          ip?: string | null
          mac?: string | null
          status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "public_raspberry_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "area"
            referencedColumns: ["id"]
          },
        ]
      }
      registro_movimentacao: {
        Row: {
          alarme_id: number | null
          closed: boolean
          created_at: string
          data_hora: string | null
          dispositivo_id: string | null
          id: number
          raspberry_id: number | null
        }
        Insert: {
          alarme_id?: number | null
          closed?: boolean
          created_at?: string
          data_hora?: string | null
          dispositivo_id?: string | null
          id?: number
          raspberry_id?: number | null
        }
        Update: {
          alarme_id?: number | null
          closed?: boolean
          created_at?: string
          data_hora?: string | null
          dispositivo_id?: string | null
          id?: number
          raspberry_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_registro_movimentacao_alarme_id_fkey"
            columns: ["alarme_id"]
            isOneToOne: false
            referencedRelation: "alarmes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_registro_movimentacao_dispositivo_id_fkey"
            columns: ["dispositivo_id"]
            isOneToOne: false
            referencedRelation: "dispositivo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_registro_movimentacao_dispositivo_id_fkey"
            columns: ["dispositivo_id"]
            isOneToOne: false
            referencedRelation: "vw_dispositivos_livres"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_registro_movimentacao_raspberry_id_fkey"
            columns: ["raspberry_id"]
            isOneToOne: false
            referencedRelation: "raspberry"
            referencedColumns: ["id"]
          },
        ]
      }
      tb_registro_alarmes_new: {
        Row: {
          alarme: string | null
          area: string | null
          closed: boolean | null
          codigo: string | null
          data_hora: string | null
          descricao: string | null
          id: number
          id_pessoa: string | null
          mac: string | null
          nome: string | null
          status: boolean | null
          tag: string | null
          tipo: string | null
          tipo_externo: string | null
        }
        Insert: {
          alarme?: string | null
          area?: string | null
          closed?: boolean | null
          codigo?: string | null
          data_hora?: string | null
          descricao?: string | null
          id: number
          id_pessoa?: string | null
          mac?: string | null
          nome?: string | null
          status?: boolean | null
          tag?: string | null
          tipo?: string | null
          tipo_externo?: string | null
        }
        Update: {
          alarme?: string | null
          area?: string | null
          closed?: boolean | null
          codigo?: string | null
          data_hora?: string | null
          descricao?: string | null
          id?: number
          id_pessoa?: string | null
          mac?: string | null
          nome?: string | null
          status?: boolean | null
          tag?: string | null
          tipo?: string | null
          tipo_externo?: string | null
        }
        Relationships: []
      }
      usuario: {
        Row: {
          created_at: string
          email: string | null
          foto: string | null
          funcionario_id: string | null
          id: string
          uid: string | null
          username: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          foto?: string | null
          funcionario_id?: string | null
          id?: string
          uid?: string | null
          username?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          foto?: string | null
          funcionario_id?: string | null
          id?: string
          uid?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_usuarios_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionario"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      vw_dispositivos_livres: {
        Row: {
          id: string | null
          mac: string | null
          nome: string | null
          status: boolean | null
          tag: string | null
          tipo: string | null
        }
        Insert: {
          id?: string | null
          mac?: string | null
          nome?: string | null
          status?: boolean | null
          tag?: string | null
          tipo?: string | null
        }
        Update: {
          id?: string | null
          mac?: string | null
          nome?: string | null
          status?: boolean | null
          tag?: string | null
          tipo?: string | null
        }
        Relationships: []
      }
      vw_dispositivos_usuarios: {
        Row: {
          data_time_inicio: string | null
          id: number | null
          mac: string | null
          nome: string | null
          pessoa_id: string | null
          tag: string | null
          tipo: string | null
          tipo_externo: string | null
        }
        Relationships: []
      }
      vw_dispositivos_usuarios_all: {
        Row: {
          data_time_inicio: string | null
          id: number | null
          mac: string | null
          nome: string | null
          pessoa_id: string | null
          tag: string | null
          tipo: string | null
          tipo_externo: string | null
        }
        Relationships: []
      }
      vw_pessoas_livres: {
        Row: {
          area_id: number | null
          cpf: string | null
          id: string | null
          nome: string | null
          tipo_externo: string | null
        }
        Insert: {
          area_id?: number | null
          cpf?: string | null
          id?: string | null
          nome?: string | null
          tipo_externo?: string | null
        }
        Update: {
          area_id?: number | null
          cpf?: string | null
          id?: string | null
          nome?: string | null
          tipo_externo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_pessoa_fisica_area_id_fkey"
            columns: ["area_id"]
            isOneToOne: false
            referencedRelation: "area"
            referencedColumns: ["id"]
          },
        ]
      }
      vw_registro_alarmes: {
        Row: {
          alarme: string | null
          area: string | null
          codigo: string | null
          data_hora: string | null
          id: number | null
          id_pessoa: string | null
          mac: string | null
          nome: string | null
          status: boolean | null
          tag: string | null
          tipo: string | null
          tipo_externo: string | null
        }
        Relationships: []
      }
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
