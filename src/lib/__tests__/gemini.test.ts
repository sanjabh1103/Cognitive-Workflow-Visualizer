import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeminiService } from '../gemini';

// Mock the GoogleGenerativeAI
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: {
          text: vi.fn().mockReturnValue('{"decision_title": "Test Decision", "complexity_score": 5}')
        }
      })
    })
  }))
}));

describe('GeminiService', () => {
  let geminiService: GeminiService;

  beforeEach(() => {
    vi.clearAllMocks();
    geminiService = new GeminiService();
  });

  describe('analyzeDecision', () => {
    it('should analyze decision input and return structured data', async () => {
      const userInput = 'Should I quit my job to start a business?';

      const result = await geminiService.analyzeDecision(userInput);

      expect(result).toHaveProperty('decision_title');
      expect(result).toHaveProperty('complexity_score');
      expect(result).toHaveProperty('stakeholders');
      expect(result).toHaveProperty('constraints');
    });

    it('should handle API errors gracefully', async () => {
      // Mock API failure
      const mockGenAI = vi.fn().mockImplementation(() => ({
        getGenerativeModel: vi.fn().mockReturnValue({
          generateContent: vi.fn().mockRejectedValue(new Error('API Error'))
        })
      }));

      // Re-instantiate with failed API
      Object.defineProperty(global, 'GoogleGenerativeAI', {
        value: mockGenAI,
        writable: true
      });

      const service = new GeminiService();
      const result = await service.analyzeDecision('test input');

      // Should return mock data as fallback
      expect(result).toHaveProperty('decision_title');
    });
  });

  describe('predictOutcomes', () => {
    it('should predict outcomes for decision paths', async () => {
      const decisionData = {
        title: 'Career Change',
        description: 'Switching careers'
      };
      const paths = [
        { title: 'Path A', description: 'Conservative approach' },
        { title: 'Path B', description: 'Aggressive approach' }
      ];

      const result = await geminiService.predictOutcomes(decisionData, paths);

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('analyzeEmotions', () => {
    it('should analyze emotional state from input', async () => {
      const userInput = 'I feel anxious about this decision';
      const decisionContext = { complexity: 8 };

      const result = await geminiService.analyzeEmotions(userInput, decisionContext);

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('analyzeRisks', () => {
    it('should analyze risks for decision paths', async () => {
      const decisionData = { title: 'Investment Decision' };
      const paths = [{ title: 'High Risk Path' }];

      const result = await geminiService.analyzeRisks(decisionData, paths);

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('mapValues', () => {
    it('should map values to decision context', async () => {
      const userInput = 'Family is most important to me';
      const decisionData = { title: 'Relocation Decision' };

      const result = await geminiService.mapValues(userInput, decisionData);

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });
});