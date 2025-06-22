import { useState, useEffect } from 'react';
import { dbService, mockDecisions } from '../lib/supabase';
import { geminiService } from '../lib/gemini';
import { useAuth } from './useAuth';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export const useDecisions = () => {
  const { user } = useAuth();
  const [decisions, setDecisions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadDecisions();
    } else {
      // Use mock data when not authenticated
      setDecisions(mockDecisions);
      setLoading(false);
    }
  }, [user]);

  const loadDecisions = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const data = await dbService.getDecisions(user.id);
      setDecisions(data || []);
    } catch (err) {
      console.error('Error loading decisions:', err);
      setError('Failed to load decisions');
      // Fallback to mock data
      setDecisions(mockDecisions);
    } finally {
      setLoading(false);
    }
  };

  const createDecision = async (formData: any) => {
    if (!user) {
      toast.error('Please sign in to create decisions');
      return null;
    }

    try {
      setLoading(true);
      
      // Analyze decision with Gemini AI
      const userInput = `${formData.title}: ${formData.description}. Core question: ${formData.core_question}`;
      const analysis = await geminiService.analyzeDecision(userInput);
      
      // Create decision record
      const decisionData = {
        id: uuidv4(),
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        core_question: formData.core_question,
        complexity_score: analysis.complexity_score || 5,
        status: 'draft' as const,
        stakeholders: formData.stakeholders ? formData.stakeholders.split(',').map((s: string) => s.trim()) : [],
        constraints: {
          temporal: formData.temporal_constraints || '',
          financial: formData.financial_constraints || '',
          social: formData.social_constraints || '',
          personal: formData.personal_constraints || ''
        },
        missing_information: analysis.missing_information || [],
        cognitive_biases_detected: analysis.cognitive_biases_detected || []
      };

      const decision = await dbService.createDecision(decisionData);
      
      // Add gamification points
      await dbService.addGamificationPoints(
        user.id,
        'decision_created',
        50,
        `Created decision: ${decision.title}`
      );

      await loadDecisions();
      toast.success('Decision created successfully!');
      
      return decision;
    } catch (err) {
      console.error('Error creating decision:', err);
      toast.error('Failed to create decision');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDecision = async (id: string, updates: any) => {
    if (!user) return null;

    try {
      const decision = await dbService.updateDecision(id, updates);
      await loadDecisions();
      toast.success('Decision updated successfully!');
      return decision;
    } catch (err) {
      console.error('Error updating decision:', err);
      toast.error('Failed to update decision');
      return null;
    }
  };

  const analyzeDecisionPaths = async (decisionId: string, paths: any[]) => {
    if (!user) return null;

    try {
      const decision = decisions.find(d => d.id === decisionId);
      if (!decision) return null;

      // Create decision paths
      const pathsData = paths.map(path => ({
        ...path,
        id: uuidv4(),
        decision_id: decisionId
      }));

      await dbService.createDecisionPaths(pathsData);

      // Generate outcome predictions
      const predictions = await geminiService.predictOutcomes(decision, pathsData);
      
      if (predictions && predictions.path_outcomes) {
        const outcomesData = predictions.path_outcomes.map((outcome: any) => ({
          id: uuidv4(),
          path_id: outcome.path_id,
          financial_impact: outcome.predicted_outcomes?.financial || {},
          emotional_impact: outcome.predicted_outcomes?.emotional || {},
          relationship_impact: outcome.predicted_outcomes?.relationships || {},
          personal_growth: outcome.predicted_outcomes?.personal_growth || {},
          time_horizon: outcome.predicted_outcomes?.time_horizon || {},
          confidence_score: 0.7
        }));

        await dbService.savePredictedOutcomes(outcomesData);
      }

      await loadDecisions();
      return pathsData;
    } catch (err) {
      console.error('Error analyzing decision paths:', err);
      toast.error('Failed to analyze decision paths');
      return null;
    }
  };

  return {
    decisions,
    loading,
    error,
    createDecision,
    updateDecision,
    analyzeDecisionPaths,
    refreshDecisions: loadDecisions
  };
};