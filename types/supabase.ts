export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      folders: {
        Row: {
          id: number
          name: string
          user_id: string
        }
        Insert: {
          id?: number
          name?: string
          user_id: string
        }
        Update: {
          id?: number
          name?: string
          user_id?: string
        }
      }
      images: {
        Row: {
          folder_id: number
          id: number
          url: string
          user_id: string
        }
        Insert: {
          folder_id: number
          id?: number
          url: string
          user_id: string
        }
        Update: {
          folder_id?: number
          id?: number
          url?: string
          user_id?: string
        }
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
