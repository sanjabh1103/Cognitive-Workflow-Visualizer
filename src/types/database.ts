export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          points: number;
          level: number;
          badges: string[];
          preferences: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          points?: number;
          level?: number;
          badges?: string[];
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          points?: number;
          level?: number;
          badges?: string[];
          preferences?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      decisions: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          core_question: string | null;
          complexity_score: number;
          status: 'draft' | 'in_progress' | 'completed';
          stakeholders: string[];
          constraints: any;
          missing_information: string[];
          cognitive_biases_detected: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          core_question?: string | null;
          complexity_score?: number;
          status?: 'draft' | 'in_progress' | 'completed';
          stakeholders?: string[];
          constraints?: any;
          missing_information?: string[];
          cognitive_biases_detected?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          core_question?: string | null;
          complexity_score?: number;
          status?: 'draft' | 'in_progress' | 'completed';
          stakeholders?: string[];
          constraints?: any;
          missing_information?: string[];
          cognitive_biases_detected?: string[];
          created_at?: string;
          updated_at?: string;
        };
      };
      decision_paths: {
        Row: {
          id: string;
          decision_id: string;
          title: string;
          description: string | null;
          probability_success: number;
          emotional_impact: 'positive' | 'negative' | 'mixed' | 'neutral';
          resource_requirement: 'low' | 'medium' | 'high';
          reversibility: 'reversible' | 'difficult' | 'permanent';
          risk_factors: string[];
          success_enablers: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          decision_id: string;
          title: string;
          description?: string | null;
          probability_success?: number;
          emotional_impact?: 'positive' | 'negative' | 'mixed' | 'neutral';
          resource_requirement?: 'low' | 'medium' | 'high';
          reversibility?: 'reversible' | 'difficult' | 'permanent';
          risk_factors?: string[];
          success_enablers?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          decision_id?: string;
          title?: string;
          description?: string | null;
          probability_success?: number;
          emotional_impact?: 'positive' | 'negative' | 'mixed' | 'neutral';
          resource_requirement?: 'low' | 'medium' | 'high';
          reversibility?: 'reversible' | 'difficult' | 'permanent';
          risk_factors?: string[];
          success_enablers?: string[];
          created_at?: string;
        };
      };
      workflows: {
        Row: {
          id: string;
          decision_id: string;
          nodes: any;
          edges: any;
          layout_data: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          decision_id: string;
          nodes?: any;
          edges?: any;
          layout_data?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          decision_id?: string;
          nodes?: any;
          edges?: any;
          layout_data?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      predicted_outcomes: {
        Row: {
          id: string;
          path_id: string;
          financial_impact: any;
          emotional_impact: any;
          relationship_impact: any;
          personal_growth: any;
          time_horizon: any;
          confidence_score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          path_id: string;
          financial_impact?: any;
          emotional_impact?: any;
          relationship_impact?: any;
          personal_growth?: any;
          time_horizon?: any;
          confidence_score?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          path_id?: string;
          financial_impact?: any;
          emotional_impact?: any;
          relationship_impact?: any;
          personal_growth?: any;
          time_horizon?: any;
          confidence_score?: number;
          created_at?: string;
        };
      };
      actual_outcomes: {
        Row: {
          id: string;
          path_id: string;
          financial_result: any;
          emotional_result: any;
          relationship_result: any;
          personal_growth_result: any;
          satisfaction_score: number;
          lessons_learned: string[];
          recorded_at: string;
        };
        Insert: {
          id?: string;
          path_id: string;
          financial_result?: any;
          emotional_result?: any;
          relationship_result?: any;
          personal_growth_result?: any;
          satisfaction_score?: number;
          lessons_learned?: string[];
          recorded_at?: string;
        };
        Update: {
          id?: string;
          path_id?: string;
          financial_result?: any;
          emotional_result?: any;
          relationship_result?: any;
          personal_growth_result?: any;
          satisfaction_score?: number;
          lessons_learned?: string[];
          recorded_at?: string;
        };
      };
      gamification: {
        Row: {
          id: string;
          user_id: string;
          action_type: string;
          points_earned: number;
          badge_earned: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          action_type: string;
          points_earned?: number;
          badge_earned?: string | null;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          action_type?: string;
          points_earned?: number;
          badge_earned?: string | null;
          description?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_user_points: {
        Args: {
          user_id: string;
          points_to_add: number;
        };
        Returns: void;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}