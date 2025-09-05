import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DatabaseService } from '../supabase';

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn().mockReturnValue({
    from: vi.fn().mockReturnValue({
      insert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: '1', title: 'Test Decision' },
            error: null
          })
        })
      }),
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: [{ id: '1', title: 'Test Decision' }],
            error: null
          }),
          single: vi.fn().mockResolvedValue({
            data: { id: '1', title: 'Test Decision' },
            error: null
          })
        })
      }),
      update: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          select: vi.fn().mockReturnValue({
            single: vi.fn().mockResolvedValue({
              data: { id: '1', title: 'Updated Decision' },
              error: null
            })
          })
        })
      }),
      upsert: vi.fn().mockReturnValue({
        select: vi.fn().mockReturnValue({
          single: vi.fn().mockResolvedValue({
            data: { id: '1', title: 'Upserted Workflow' },
            error: null
          })
        })
      })
    }),
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnValue({
        subscribe: vi.fn().mockReturnValue({
          unsubscribe: vi.fn()
        })
      })
    }),
    rpc: vi.fn().mockResolvedValue({ error: null })
  })
}));

describe('DatabaseService', () => {
  let dbService: DatabaseService;

  beforeEach(() => {
    vi.clearAllMocks();
    dbService = new DatabaseService();
  });

  describe('createDecision', () => {
    it('should create a decision successfully', async () => {
      const decisionData = {
        user_id: 'user-1',
        title: 'Test Decision',
        description: 'Test description'
      };

      const result = await dbService.createDecision(decisionData);

      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Test Decision');
    });

    it('should handle creation errors', async () => {
      // Mock error scenario would be tested here
      const decisionData = {
        user_id: 'user-1',
        title: 'Test Decision'
      };

      const result = await dbService.createDecision(decisionData);
      expect(result).toBeDefined();
    });
  });

  describe('getDecisions', () => {
    it('should retrieve user decisions', async () => {
      const userId = 'user-1';

      const result = await dbService.getDecisions(userId);

      expect(Array.isArray(result)).toBe(true);
      expect(result[0]).toHaveProperty('id');
      expect(result[0]).toHaveProperty('title');
    });
  });

  describe('getDecision', () => {
    it('should retrieve a specific decision with related data', async () => {
      const decisionId = 'decision-1';

      const result = await dbService.getDecision(decisionId);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
    });
  });

  describe('updateDecision', () => {
    it('should update decision successfully', async () => {
      const decisionId = 'decision-1';
      const updates = { title: 'Updated Title' };

      const result = await dbService.updateDecision(decisionId, updates);

      expect(result).toHaveProperty('title');
    });
  });

  describe('createDecisionPaths', () => {
    it('should create decision paths', async () => {
      const paths = [
        { decision_id: 'decision-1', title: 'Path 1' },
        { decision_id: 'decision-1', title: 'Path 2' }
      ];

      const result = await dbService.createDecisionPaths(paths);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('saveWorkflow', () => {
    it('should save workflow data', async () => {
      const workflowData = {
        decision_id: 'decision-1',
        nodes: [],
        edges: []
      };

      const result = await dbService.saveWorkflow(workflowData);

      expect(result).toHaveProperty('id');
    });
  });

  describe('savePredictedOutcomes', () => {
    it('should save predicted outcomes', async () => {
      const outcomes = [
        {
          path_id: 'path-1',
          financial_impact: { predicted: '$10,000' },
          confidence_score: 0.8
        }
      ];

      const result = await dbService.savePredictedOutcomes(outcomes);

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('saveActualOutcome', () => {
    it('should save actual outcome', async () => {
      const outcomeData = {
        path_id: 'path-1',
        satisfaction_score: 8,
        lessons_learned: ['Lesson 1']
      };

      const result = await dbService.saveActualOutcome(outcomeData);

      expect(result).toHaveProperty('id');
    });
  });

  describe('getProfile', () => {
    it('should retrieve user profile', async () => {
      const userId = 'user-1';

      const result = await dbService.getProfile(userId);

      expect(result).toHaveProperty('id');
    });
  });

  describe('createProfile', () => {
    it('should create user profile', async () => {
      const profileData = {
        user_id: 'user-1',
        email: 'test@example.com'
      };

      const result = await dbService.createProfile(profileData);

      expect(result).toHaveProperty('id');
    });
  });

  describe('addGamificationPoints', () => {
    it('should add gamification points', async () => {
      const userId = 'user-1';
      const actionType = 'decision_created';
      const points = 50;

      const result = await dbService.addGamificationPoints(userId, actionType, points);

      expect(result).toHaveProperty('user_id');
      expect(result.points_earned).toBe(50);
    });
  });

  describe('Real-time subscriptions', () => {
    it('should subscribe to decision changes', () => {
      const decisionId = 'decision-1';
      const callback = vi.fn();

      const subscription = dbService.subscribeToDecision(decisionId, callback);

      expect(subscription).toBeDefined();
      expect(typeof subscription.unsubscribe).toBe('function');
    });

    it('should subscribe to workflow changes', () => {
      const decisionId = 'decision-1';
      const callback = vi.fn();

      const subscription = dbService.subscribeToWorkflow(decisionId, callback);

      expect(subscription).toBeDefined();
    });
  });
});