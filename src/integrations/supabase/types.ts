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
      account_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          type?: string
        }
        Relationships: []
      }
      accounts: {
        Row: {
          category_id: string
          code: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
        }
        Insert: {
          category_id: string
          code: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
        }
        Update: {
          category_id?: string
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "account_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      activities: {
        Row: {
          description: string
          id: string
          timestamp: string | null
          title: string
          type: string
        }
        Insert: {
          description: string
          id?: string
          timestamp?: string | null
          title: string
          type: string
        }
        Update: {
          description?: string
          id?: string
          timestamp?: string | null
          title?: string
          type?: string
        }
        Relationships: []
      }
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
      attendance: {
        Row: {
          class_id: string
          created_at: string | null
          date: string
          id: string
          present: boolean
          student_id: string
        }
        Insert: {
          class_id: string
          created_at?: string | null
          date: string
          id?: string
          present?: boolean
          student_id: string
        }
        Update: {
          class_id?: string
          created_at?: string | null
          date?: string
          id?: string
          present?: boolean
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "attendance_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "school_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
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
      churches: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          email: string | null
          founded_date: string | null
          id: string
          name: string
          phone: string | null
          schedule: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          founded_date?: string | null
          id?: string
          name: string
          phone?: string | null
          schedule?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          founded_date?: string | null
          id?: string
          name?: string
          phone?: string | null
          schedule?: string | null
          type?: string | null
          updated_at?: string | null
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
      documentos: {
        Row: {
          created_at: string
          id: string
          nome: string
          relatorio_gestao_id: string | null
          removido_em: string | null
          uri: string
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          relatorio_gestao_id?: string | null
          removido_em?: string | null
          uri: string
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          relatorio_gestao_id?: string | null
          removido_em?: string | null
          uri?: string
        }
        Relationships: [
          {
            foreignKeyName: "documentos_relatorio_gestao_id_fkey"
            columns: ["relatorio_gestao_id"]
            isOneToOne: false
            referencedRelation: "relatorios_gestao"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          created_at: string | null
          id: string
          month: string
          offerings: number
          projects: number
          tithes: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          month: string
          offerings: number
          projects: number
          tithes: number
        }
        Update: {
          created_at?: string | null
          id?: string
          month?: string
          offerings?: number
          projects?: number
          tithes?: number
        }
        Relationships: []
      }
      emendas_parlamentares: {
        Row: {
          ciente: boolean
          codigo: string
          created_at: string
          id: string
          municipio_id: string | null
          parlamentar_id: string | null
          programa_id: string | null
          removido_em: string | null
          valor_custeio: number
          valor_investimento: number
        }
        Insert: {
          ciente?: boolean
          codigo: string
          created_at?: string
          id?: string
          municipio_id?: string | null
          parlamentar_id?: string | null
          programa_id?: string | null
          removido_em?: string | null
          valor_custeio?: number
          valor_investimento?: number
        }
        Update: {
          ciente?: boolean
          codigo?: string
          created_at?: string
          id?: string
          municipio_id?: string | null
          parlamentar_id?: string | null
          programa_id?: string | null
          removido_em?: string | null
          valor_custeio?: number
          valor_investimento?: number
        }
        Relationships: [
          {
            foreignKeyName: "emendas_parlamentares_municipio_id_fkey"
            columns: ["municipio_id"]
            isOneToOne: false
            referencedRelation: "municipios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emendas_parlamentares_parlamentar_id_fkey"
            columns: ["parlamentar_id"]
            isOneToOne: false
            referencedRelation: "parlamentares"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "emendas_parlamentares_programa_id_fkey"
            columns: ["programa_id"]
            isOneToOne: false
            referencedRelation: "programas"
            referencedColumns: ["id"]
          },
        ]
      }
      empenhos: {
        Row: {
          codigo: string
          created_at: string
          data: string
          id: string
          plano_de_acao_id: string | null
          processo_sei: string | null
          removido_em: string | null
          situacao: string
          valor: number
        }
        Insert: {
          codigo: string
          created_at?: string
          data: string
          id?: string
          plano_de_acao_id?: string | null
          processo_sei?: string | null
          removido_em?: string | null
          situacao: string
          valor?: number
        }
        Update: {
          codigo?: string
          created_at?: string
          data?: string
          id?: string
          plano_de_acao_id?: string | null
          processo_sei?: string | null
          removido_em?: string | null
          situacao?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "empenhos_plano_de_acao_id_fkey"
            columns: ["plano_de_acao_id"]
            isOneToOne: false
            referencedRelation: "planos_de_acao"
            referencedColumns: ["id"]
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
      events: {
        Row: {
          created_at: string | null
          date: string
          id: string
          time: string | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          time?: string | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          time?: string | null
          title?: string
          type?: string | null
          updated_at?: string | null
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
      financial_transactions: {
        Row: {
          account_id: string | null
          amount: number
          category: string
          created_at: string | null
          date: string
          description: string
          id: string
          payment_method: string | null
          reference_number: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          account_id?: string | null
          amount: number
          category: string
          created_at?: string | null
          date: string
          description: string
          id?: string
          payment_method?: string | null
          reference_number?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          account_id?: string | null
          amount?: number
          category?: string
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          payment_method?: string | null
          reference_number?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
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
      members: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          id: string
          join_date: string | null
          member_type: string
          name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          join_date?: string | null
          member_type: string
          name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          join_date?: string | null
          member_type?: string
          name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      membership_stats: {
        Row: {
          created_at: string | null
          id: string
          members: number
          month: string
          visitors: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          members: number
          month: string
          visitors: number
        }
        Update: {
          created_at?: string | null
          id?: string
          members?: number
          month?: string
          visitors?: number
        }
        Relationships: []
      }
      municipios: {
        Row: {
          created_at: string
          estado: string
          id: string
          nome: string
          removido_em: string | null
        }
        Insert: {
          created_at?: string
          estado: string
          id?: string
          nome: string
          removido_em?: string | null
        }
        Update: {
          created_at?: string
          estado?: string
          id?: string
          nome?: string
          removido_em?: string | null
        }
        Relationships: []
      }
      parlamentares: {
        Row: {
          created_at: string
          id: string
          nome: string
          partido: string | null
          removido_em: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          partido?: string | null
          removido_em?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          partido?: string | null
          removido_em?: string | null
        }
        Relationships: []
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
      planos_de_acao: {
        Row: {
          codigo: string
          created_at: string
          emenda_parlamentar_id: string | null
          id: string
          removido_em: string | null
        }
        Insert: {
          codigo: string
          created_at?: string
          emenda_parlamentar_id?: string | null
          id?: string
          removido_em?: string | null
        }
        Update: {
          codigo?: string
          created_at?: string
          emenda_parlamentar_id?: string | null
          id?: string
          removido_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "planos_de_acao_emenda_parlamentar_id_fkey"
            columns: ["emenda_parlamentar_id"]
            isOneToOne: false
            referencedRelation: "emendas_parlamentares"
            referencedColumns: ["id"]
          },
        ]
      }
      politicas_publicas: {
        Row: {
          created_at: string
          id: string
          nome: string
          removido_em: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          removido_em?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          removido_em?: string | null
        }
        Relationships: []
      }
      politicas_publicas_planos_de_acao: {
        Row: {
          created_at: string
          id: string
          plano_de_acao_id: string | null
          politica_publica_id: string | null
          removido_em: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          plano_de_acao_id?: string | null
          politica_publica_id?: string | null
          removido_em?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          plano_de_acao_id?: string | null
          politica_publica_id?: string | null
          removido_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "politicas_publicas_planos_de_acao_plano_de_acao_id_fkey"
            columns: ["plano_de_acao_id"]
            isOneToOne: false
            referencedRelation: "planos_de_acao"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "politicas_publicas_planos_de_acao_politica_publica_id_fkey"
            columns: ["politica_publica_id"]
            isOneToOne: false
            referencedRelation: "politicas_publicas"
            referencedColumns: ["id"]
          },
        ]
      }
      programas: {
        Row: {
          created_at: string
          descricao: string | null
          id: string
          nome: string
          removido_em: string | null
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          id?: string
          nome: string
          removido_em?: string | null
        }
        Update: {
          created_at?: string
          descricao?: string | null
          id?: string
          nome?: string
          removido_em?: string | null
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
      relatorios_gestao: {
        Row: {
          created_at: string
          descricao: string
          id: string
          plano_de_acao_id: string | null
          removido_em: string | null
          valor_executado: number
        }
        Insert: {
          created_at?: string
          descricao: string
          id?: string
          plano_de_acao_id?: string | null
          removido_em?: string | null
          valor_executado?: number
        }
        Update: {
          created_at?: string
          descricao?: string
          id?: string
          plano_de_acao_id?: string | null
          removido_em?: string | null
          valor_executado?: number
        }
        Relationships: [
          {
            foreignKeyName: "relatorios_gestao_plano_de_acao_id_fkey"
            columns: ["plano_de_acao_id"]
            isOneToOne: false
            referencedRelation: "planos_de_acao"
            referencedColumns: ["id"]
          },
        ]
      }
      school_classes: {
        Row: {
          created_at: string | null
          current_students: number | null
          description: string | null
          id: string
          max_students: number | null
          name: string
          room: string | null
          schedule: string | null
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_students?: number | null
          description?: string | null
          id?: string
          max_students?: number | null
          name: string
          room?: string | null
          schedule?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_students?: number | null
          description?: string | null
          id?: string
          max_students?: number | null
          name?: string
          room?: string | null
          schedule?: string | null
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "school_classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          attendance_rate: number | null
          class_id: string
          created_at: string | null
          enrollment_date: string
          id: string
          member_id: string
          updated_at: string | null
        }
        Insert: {
          attendance_rate?: number | null
          class_id: string
          created_at?: string | null
          enrollment_date?: string
          id?: string
          member_id: string
          updated_at?: string | null
        }
        Update: {
          attendance_rate?: number | null
          class_id?: string
          created_at?: string | null
          enrollment_date?: string
          id?: string
          member_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "students_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "school_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: false
            referencedRelation: "members"
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
      decrement_class_students: {
        Args: { class_id: string }
        Returns: undefined
      }
      increment_class_students: {
        Args: { class_id: string }
        Returns: undefined
      }
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
