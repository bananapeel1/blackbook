export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "boat_owner" | "provider" | "admin";
          full_name: string | null;
          avatar_url: string | null;
          phone: string | null;
          preferred_language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          role?: "boat_owner" | "provider" | "admin";
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          preferred_language?: string;
        };
        Update: {
          role?: "boat_owner" | "provider" | "admin";
          full_name?: string | null;
          avatar_url?: string | null;
          phone?: string | null;
          preferred_language?: string;
        };
      };
      service_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          icon: string | null;
          description: string | null;
          parent_id: string | null;
          sort_order: number;
          segment: "practical" | "shore" | "premium";
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          icon?: string | null;
          description?: string | null;
          parent_id?: string | null;
          sort_order?: number;
          segment?: "practical" | "shore" | "premium";
        };
        Update: {
          name?: string;
          slug?: string;
          icon?: string | null;
          description?: string | null;
          sort_order?: number;
          segment?: "practical" | "shore" | "premium";
        };
      };
      locations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          country: string;
          region: string | null;
          latitude: number | null;
          longitude: number | null;
          type: "marina" | "port" | "bay" | "anchorage";
          description: string | null;
          emergency_contacts: Json | null;
          amenities: string[] | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          country: string;
          region?: string | null;
          latitude?: number | null;
          longitude?: number | null;
          type?: "marina" | "port" | "bay" | "anchorage";
          description?: string | null;
          emergency_contacts?: Json | null;
          amenities?: string[] | null;
          image_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["locations"]["Insert"]>;
      };
      vessels: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          type: "motor_yacht" | "sailing_yacht" | "catamaran" | "superyacht" | "other";
          length_meters: number | null;
          manufacturer: string | null;
          model: string | null;
          year: number | null;
          flag: string | null;
          imo_number: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          type?: "motor_yacht" | "sailing_yacht" | "catamaran" | "superyacht" | "other";
          length_meters?: number | null;
          manufacturer?: string | null;
          model?: string | null;
          year?: number | null;
          flag?: string | null;
          imo_number?: string | null;
          image_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["vessels"]["Insert"]>;
      };
      providers: {
        Row: {
          id: string;
          user_id: string | null;
          business_name: string;
          slug: string;
          description: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          email: string | null;
          phone: string | null;
          whatsapp: string | null;
          website: string | null;
          languages: string[];
          founded_year: number | null;
          team_size: number | null;
          verification_status: "unverified" | "pending" | "verified" | "premium";
          verified_at: string | null;
          availability: "available" | "busy" | "unavailable";
          emergency_available: boolean;
          reliability_score: number;
          response_rate: number;
          avg_response_time_minutes: number | null;
          completion_rate: number;
          cancellation_rate: number;
          avg_rating: number;
          total_jobs: number;
          total_reviews: number;
          last_active_at: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          business_name: string;
          slug: string;
          description?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          email?: string | null;
          phone?: string | null;
          whatsapp?: string | null;
          website?: string | null;
          languages?: string[];
          founded_year?: number | null;
          team_size?: number | null;
          verification_status?: "unverified" | "pending" | "verified" | "premium";
          availability?: "available" | "busy" | "unavailable";
          emergency_available?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["providers"]["Insert"]>;
      };
      provider_services: {
        Row: {
          id: string;
          provider_id: string;
          category_id: string;
          description: string | null;
          price_min: number | null;
          price_max: number | null;
          currency: string;
          emergency_available: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          category_id: string;
          description?: string | null;
          price_min?: number | null;
          price_max?: number | null;
          currency?: string;
          emergency_available?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["provider_services"]["Insert"]>;
      };
      provider_coverage: {
        Row: {
          id: string;
          provider_id: string;
          location_id: string;
          radius_km: number;
          is_primary: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          location_id: string;
          radius_km?: number;
          is_primary?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["provider_coverage"]["Insert"]>;
      };
      provider_certifications: {
        Row: {
          id: string;
          provider_id: string;
          name: string;
          issuer: string | null;
          issued_date: string | null;
          expiry_date: string | null;
          document_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          name: string;
          issuer?: string | null;
          issued_date?: string | null;
          expiry_date?: string | null;
          document_url?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["provider_certifications"]["Insert"]>;
      };
      provider_gallery: {
        Row: {
          id: string;
          provider_id: string;
          image_url: string;
          caption: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          image_url: string;
          caption?: string | null;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["provider_gallery"]["Insert"]>;
      };
      service_requests: {
        Row: {
          id: string;
          user_id: string;
          vessel_id: string | null;
          location_id: string | null;
          category_id: string | null;
          title: string;
          description: string | null;
          urgency: "standard" | "priority" | "emergency";
          status: "draft" | "submitted" | "collecting_quotes" | "quotes_received" | "accepted" | "in_progress" | "completed" | "cancelled";
          preferred_date: string | null;
          preferred_time: string | null;
          flexible_dates: boolean;
          budget_min: number | null;
          budget_max: number | null;
          currency: string;
          location_name: string | null;
          location_lat: number | null;
          location_lng: number | null;
          berth_info: string | null;
          attachments: Json;
          matched_provider_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          vessel_id?: string | null;
          location_id?: string | null;
          category_id?: string | null;
          title: string;
          description?: string | null;
          urgency?: "standard" | "priority" | "emergency";
          status?: "draft" | "submitted" | "collecting_quotes" | "quotes_received" | "accepted" | "in_progress" | "completed" | "cancelled";
          preferred_date?: string | null;
          preferred_time?: string | null;
          flexible_dates?: boolean;
          budget_min?: number | null;
          budget_max?: number | null;
          currency?: string;
          location_name?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          berth_info?: string | null;
          attachments?: Json;
        };
        Update: Partial<Database["public"]["Tables"]["service_requests"]["Insert"]>;
      };
      quotes: {
        Row: {
          id: string;
          request_id: string;
          provider_id: string;
          amount: number;
          currency: string;
          description: string | null;
          estimated_duration: string | null;
          warranty_months: number | null;
          earliest_start: string | null;
          status: "pending" | "sent" | "accepted" | "declined" | "expired";
          stripe_payment_intent_id: string | null;
          commission_rate: number;
          accepted_at: string | null;
          expires_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          request_id: string;
          provider_id: string;
          amount: number;
          currency?: string;
          description?: string | null;
          estimated_duration?: string | null;
          warranty_months?: number | null;
          earliest_start?: string | null;
          status?: "pending" | "sent" | "accepted" | "declined" | "expired";
          commission_rate?: number;
          expires_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["quotes"]["Insert"]>;
      };
      reviews: {
        Row: {
          id: string;
          request_id: string;
          quote_id: string;
          reviewer_id: string;
          provider_id: string;
          rating: number;
          title: string | null;
          body: string | null;
          response: string | null;
          response_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          request_id: string;
          quote_id: string;
          reviewer_id: string;
          provider_id: string;
          rating: number;
          title?: string | null;
          body?: string | null;
        };
        Update: {
          response?: string | null;
          response_at?: string | null;
        };
      };
      conversations: {
        Row: {
          id: string;
          request_id: string | null;
          participant_1: string;
          participant_2: string;
          last_message_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          request_id?: string | null;
          participant_1: string;
          participant_2: string;
        };
        Update: {
          last_message_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_id: string;
          content: string | null;
          attachments: Json;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_id: string;
          content?: string | null;
          attachments?: Json;
        };
        Update: {
          read_at?: string | null;
        };
      };
      saved_providers: {
        Row: {
          id: string;
          user_id: string;
          provider_id: string;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider_id: string;
          notes?: string | null;
        };
        Update: {
          notes?: string | null;
        };
      };
    };
  };
};
