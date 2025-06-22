export interface Decision {
  id: string;
  title: string;
  description: string;
  complexity_score: number;
  status: 'draft' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
  user_id: string;
  core_question: string;
  stakeholders: string[];
  constraints: {
    temporal: string;
    financial: string;
    social: string;
    personal: string;
  };
  missing_information: string[];
  cognitive_biases_detected: string[];
}

export interface DecisionPath {
  id: string;
  decision_id: string;
  title: string;
  description: string;
  probability_success: number;
  emotional_impact: 'positive' | 'negative' | 'mixed';
  resource_requirement: 'low' | 'medium' | 'high';
  reversibility: 'reversible' | 'difficult' | 'permanent';
  outcomes: PredictedOutcome[];
  risk_factors: string[];
  success_enablers: string[];
}

export interface PredictedOutcome {
  path_id: string;
  financial: {
    impact: string;
    confidence: number;
    reasoning: string;
  };
  emotional: {
    satisfaction_score: number;
    confidence: number;
    reasoning: string;
  };
  relationships: Array<{
    stakeholder: string;
    impact: 'positive' | 'negative' | 'neutral';
    reasoning: string;
  }>;
  personal_growth: {
    opportunities: string[];
    challenges: string[];
  };
  time_horizon: {
    short_term: string;
    medium_term: string;
    long_term: string;
  };
}

export interface WorkflowNode {
  id: string;
  type: 'decision' | 'outcome' | 'risk' | 'opportunity';
  position: { x: number; y: number };
  data: {
    label: string;
    description?: string;
    probability?: number;
    impact?: number;
    category?: string;
  };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  style?: React.CSSProperties;
  type?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  points: number;
  level: number;
  badges: string[];
  preferences: {
    ui_theme: 'light' | 'dark' | 'auto';
    email_notifications: boolean;
    privacy_mode: boolean;
  };
  created_at: string;
}

export interface EmotionalState {
  primary_emotions: string[];
  stress_level: number;
  decision_readiness: 'optimal' | 'suboptimal' | 'poor';
  emotional_biases_detected: string[];
  recommendations: string[];
}

export interface ValuesAlignment {
  detected_values: Array<{
    value_name: string;
    evidence: string;
    priority_level: 'high' | 'medium' | 'low';
    confidence: number;
  }>;
  alignment_scores: Array<{
    path_id: string;
    score: number;
    values_supported: string[];
    values_compromised: string[];
  }>;
}