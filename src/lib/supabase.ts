import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Database service functions
export class DatabaseService {
  // Decision operations
  async createDecision(decisionData: any) {
    const { data, error } = await supabase
      .from('decisions')
      .insert([decisionData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async getDecisions(userId: string) {
    const { data, error } = await supabase
      .from('decisions')
      .select(`
        *,
        decision_paths(*),
        workflows(*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async getDecision(id: string) {
    const { data, error } = await supabase
      .from('decisions')
      .select(`
        *,
        decision_paths(*),
        workflows(*),
        predicted_outcomes(*),
        actual_outcomes(*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateDecision(id: string, updates: any) {
    const { data, error } = await supabase
      .from('decisions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Decision paths operations
  async createDecisionPaths(paths: any[]) {
    const { data, error } = await supabase
      .from('decision_paths')
      .insert(paths)
      .select();
    
    if (error) throw error;
    return data;
  }

  // Workflow operations
  async saveWorkflow(workflowData: any) {
    const { data, error } = await supabase
      .from('workflows')
      .upsert([workflowData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Outcome tracking
  async savePredictedOutcomes(outcomes: any[]) {
    const { data, error } = await supabase
      .from('predicted_outcomes')
      .insert(outcomes)
      .select();
    
    if (error) throw error;
    return data;
  }

  async saveActualOutcome(outcomeData: any) {
    const { data, error } = await supabase
      .from('actual_outcomes')
      .insert([outcomeData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // User profile operations
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  async createProfile(profileData: any) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Gamification
  async addGamificationPoints(userId: string, actionType: string, points: number, description?: string) {
    const { data, error } = await supabase
      .from('gamification')
      .insert([{
        user_id: userId,
        action_type: actionType,
        points_earned: points,
        description: description
      }])
      .select()
      .single();
    
    if (error) throw error;

    // Update user's total points
    await supabase.rpc('increment_user_points', {
      user_id: userId,
      points_to_add: points
    });

    return data;
  }

  // Real-time subscriptions
  subscribeToDecision(decisionId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`decision:${decisionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'decisions',
        filter: `id=eq.${decisionId}`
      }, callback)
      .subscribe();
  }

  subscribeToWorkflow(decisionId: string, callback: (payload: any) => void) {
    return supabase
      .channel(`workflow:${decisionId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'workflows',
        filter: `decision_id=eq.${decisionId}`
      }, callback)
      .subscribe();
  }
}

export const dbService = new DatabaseService();

// Mock data for demo purposes (fallback when Supabase is not configured)
export const mockDecisions = [
  {
    id: '1',
    title: 'Career Change to Tech',
    description: 'Considering transitioning from marketing to software development',
    complexity_score: 8,
    status: 'in_progress' as const,
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-20T14:45:00Z',
    user_id: 'user-1',
    core_question: 'Should I make a career change from marketing to software development?',
    stakeholders: ['Partner', 'Current Team', 'Family', 'Future Self'],
    constraints: {
      temporal: '6-month timeline for transition',
      financial: 'Need to maintain current income for 3 months',
      social: 'Leaving established professional network',
      personal: 'Need to learn new technical skills'
    },
    missing_information: [
      'Specific tech role preferences',
      'Market demand in target location',
      'Salary expectations vs reality'
    ],
    cognitive_biases_detected: ['Optimism bias', 'Sunk cost fallacy']
  },
  {
    id: '2',
    title: 'Home Purchase Decision',
    description: 'Deciding between renting vs buying in current market',
    complexity_score: 7,
    status: 'draft' as const,
    created_at: '2024-01-18T09:15:00Z',
    updated_at: '2024-01-18T09:15:00Z',
    user_id: 'user-1',
    core_question: 'Should we buy a house now or continue renting?',
    stakeholders: ['Spouse', 'Children', 'Parents', 'Financial Advisor'],
    constraints: {
      temporal: 'Current lease expires in 4 months',
      financial: 'Down payment vs emergency fund trade-off',
      social: 'Children\'s school district considerations',
      personal: 'First-time homebuyer uncertainty'
    },
    missing_information: [
      'Interest rate predictions',
      'Local market trends',
      'True cost of homeownership'
    ],
    cognitive_biases_detected: ['Loss aversion', 'Status quo bias']
  }
];