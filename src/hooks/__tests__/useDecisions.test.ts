import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDecisions } from '../useDecisions';

// Mock the services
vi.mock('../../lib/supabase', () => ({
  dbService: {
    getDecisions: vi.fn().mockResolvedValue([
      {
        id: '1',
        title: 'Test Decision',
        complexity_score: 7,
        status: 'in_progress',
        user_id: 'user-1'
      }
    ]),
    createDecision: vi.fn().mockResolvedValue({
      id: '2',
      title: 'New Decision',
      complexity_score: 5
    }),
    updateDecision: vi.fn().mockResolvedValue({
      id: '1',
      title: 'Updated Decision'
    }),
    createDecisionPaths: vi.fn().mockResolvedValue([]),
    savePredictedOutcomes: vi.fn().mockResolvedValue([]),
    addGamificationPoints: vi.fn().mockResolvedValue({})
  },
  mockDecisions: []
}));

vi.mock('../../lib/gemini', () => ({
  geminiService: {
    analyzeDecision: vi.fn().mockResolvedValue({
      decision_title: 'Test Decision',
      complexity_score: 5,
      stakeholders: ['User'],
      constraints: { temporal: '1 week' },
      missing_information: [],
      cognitive_biases_detected: []
    }),
    predictOutcomes: vi.fn().mockResolvedValue({
      path_outcomes: [{
        path_id: 'path-1',
        predicted_outcomes: {
          financial: { impact: '$5,000', confidence: 0.8 },
          emotional: { satisfaction_score: 7, confidence: 0.7 }
        }
      }]
    })
  }
}));

vi.mock('../useAuth', () => ({
  useAuth: () => ({
    user: { id: 'user-1', email: 'test@example.com' }
  })
}));

describe('useDecisions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('initial load', () => {
    it('should load decisions on mount when user is authenticated', async () => {
      const { result } = renderHook(() => useDecisions());

      await waitFor(() => {
        expect(result.current.decisions).toHaveLength(1);
        expect(result.current.decisions[0].title).toBe('Test Decision');
      });
    });

    it('should use mock data when not authenticated', async () => {
      vi.mocked(await import('../useAuth')).useAuth.mockReturnValue({ user: null });

      const { result } = renderHook(() => useDecisions());

      expect(result.current.decisions).toEqual([]);
    });
  });

  describe('createDecision', () => {
    it('should create a decision with AI analysis', async () => {
      const { result } = renderHook(() => useDecisions());

      const formData = {
        title: 'New Career Decision',
        description: 'Should I switch jobs?',
        core_question: 'Is this the right career move?',
        stakeholders: 'Family, Current Employer',
        temporal_constraints: '3 months',
        financial_constraints: '$50,000 budget',
        social_constraints: 'Family relocation',
        personal_constraints: 'Learning new skills'
      };

      const decision = await result.current.createDecision(formData);

      expect(decision).toHaveProperty('id');
      expect(decision.title).toBe('New Decision');
    });

    it('should handle creation errors', async () => {
      const mockDbService = await import('../../lib/supabase');
      vi.mocked(mockDbService.dbService.createDecision).mockRejectedValue(new Error('DB Error'));

      const { result } = renderHook(() => useDecisions());

      const decision = await result.current.createDecision({
        title: 'Test',
        description: 'Test'
      });

      expect(decision).toBeNull();
    });

    it('should prevent creation when not authenticated', async () => {
      vi.mocked(await import('../useAuth')).useAuth.mockReturnValue({ user: null });

      const { result } = renderHook(() => useDecisions());

      const decision = await result.current.createDecision({
        title: 'Test',
        description: 'Test'
      });

      expect(decision).toBeNull();
    });
  });

  describe('updateDecision', () => {
    it('should update a decision', async () => {
      const { result } = renderHook(() => useDecisions());

      const updatedDecision = await result.current.updateDecision('1', {
        title: 'Updated Title'
      });

      expect(updatedDecision).toHaveProperty('title', 'Updated Decision');
    });
  });

  describe('analyzeDecisionPaths', () => {
    it('should analyze decision paths with AI predictions', async () => {
      const { result } = renderHook(() => useDecisions());

      const paths = [
        {
          id: 'path-1',
          title: 'Conservative Path',
          description: 'Safe option'
        }
      ];

      const resultPaths = await result.current.analyzeDecisionPaths('decision-1', paths);

      expect(resultPaths).toBeDefined();
      expect(Array.isArray(resultPaths)).toBe(true);
    });

    it('should handle analysis errors', async () => {
      const mockGeminiService = await import('../../lib/gemini');
      vi.mocked(mockGeminiService.geminiService.predictOutcomes).mockRejectedValue(new Error('AI Error'));

      const { result } = renderHook(() => useDecisions());

      const resultPaths = await result.current.analyzeDecisionPaths('decision-1', []);

      expect(resultPaths).toBeNull();
    });
  });

  describe('refreshDecisions', () => {
    it('should refresh decisions list', async () => {
      const { result } = renderHook(() => useDecisions());

      await result.current.refreshDecisions();

      expect(result.current.decisions).toHaveLength(1);
    });
  });
});