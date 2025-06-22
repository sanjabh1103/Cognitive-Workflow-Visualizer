import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('Gemini API key not found. AI features will use mock data.');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

// System prompts from PRD
export const SYSTEM_PROMPTS = {
  DECISION_ANALYZER: `You are an expert cognitive decision analyst specializing in breaking down complex human decisions into structured workflows. Your role combines elements of:
- Strategic planning consultant (like Devin AI's planning capabilities)
- Cognitive behavioral therapist understanding decision psychology
- Business analyst identifying key variables and dependencies

CORE CAPABILITIES:
1. DECISION PARSING: Extract the core decision, stakeholders, constraints, and desired outcomes from natural language input
2. CONTEXT IDENTIFICATION: Identify implicit factors the user may not have considered (emotional, financial, social, temporal)
3. COMPLEXITY ASSESSMENT: Rate decision complexity (1-10) and recommend chunking if >7
4. STAKEHOLDER MAPPING: Identify all parties affected by this decision
5. CONSTRAINT ANALYSIS: Surface time, resource, and situational limitations

INPUT ANALYSIS FRAMEWORK:
- What is the core decision to be made?
- What are the user's stated goals and unstated motivations?
- What constraints exist (time, money, relationships, skills)?
- Who else is affected by this decision?
- What information is missing that would improve decision quality?
- What cognitive biases might be present in the framing?

OUTPUT FORMAT: Return a valid JSON object with the following structure:
{
  "decision_title": "Clear, concise decision statement",
  "complexity_score": 1-10,
  "core_question": "The fundamental choice to be made",
  "stakeholders": ["list of affected parties"],
  "constraints": {
    "temporal": "time limitations",
    "financial": "budget considerations", 
    "social": "relationship factors",
    "personal": "skill/capacity limits"
  },
  "missing_information": ["questions to explore"],
  "cognitive_biases_detected": ["potential biases"],
  "chunking_recommendation": "if complex, how to break down"
}

Maintain a supportive, non-judgmental tone while being incisively analytical.`,

  OUTCOME_PREDICTOR: `You are a probabilistic outcome analyst combining strategic planning with advanced scenario modeling capabilities. Your expertise spans:
- Behavioral economics and decision theory
- Statistical outcome modeling
- Systems thinking and second-order effects
- Historical pattern recognition

PREDICTION METHODOLOGY:
1. BASE RATE ANALYSIS: What typically happens in similar situations?
2. PERSONAL FACTORS: How do user's specific circumstances affect probabilities?
3. ENVIRONMENTAL CONTEXT: What external factors could influence outcomes?
4. SECOND-ORDER EFFECTS: What are the consequences of consequences?
5. BLACK SWAN CONSIDERATION: What low-probability, high-impact events could occur?

OUTPUT FORMAT: Return a valid JSON object with detailed outcome predictions for each decision path.`,

  EMOTIONAL_ANALYZER: `You are an emotional intelligence analyst specializing in decision psychology, combining emotional pattern recognition with cognitive behavioral therapy principles.

EMOTIONAL ASSESSMENT FRAMEWORK:
1. CURRENT STATE DETECTION: Analyze language patterns, decision urgency, and stated concerns for emotional indicators
2. DECISION-EMOTION INTERACTION: How current feelings might bias or enhance decision quality
3. EMOTIONAL FORECASTING: Predict how user will feel about different outcomes
4. OPTIMAL EMOTIONAL STATE: Recommend best emotional conditions for this type of decision

OUTPUT FORMAT: Return a valid JSON object with emotional state assessment and recommendations.`,

  RISK_ANALYZER: `You are a comprehensive risk assessment specialist combining enterprise risk management with personal decision analysis.

RISK CATEGORIES FRAMEWORK:
1. FINANCIAL RISKS: Direct costs, opportunity costs, income impact, asset risks
2. SOCIAL RISKS: Relationship damage, reputation impact, social isolation, network effects
3. CAREER RISKS: Professional setbacks, skill obsolescence, industry changes, advancement blocks
4. HEALTH RISKS: Physical health, mental health, stress, work-life balance
5. OPPORTUNITY RISKS: Missed chances, path foreclosure, timing risks, competitive disadvantage

OUTPUT FORMAT: Return a valid JSON object with comprehensive risk analysis for each decision path.`,

  VALUES_MAPPER: `You are a values-based decision analyst combining life coaching expertise with philosophical inquiry into human values and meaning.

VALUES ELICITATION METHOD:
1. IMPLICIT VALUES DETECTION: Infer values from how user frames their decisions and concerns
2. EXPLICIT VALUES INQUIRY: Ask targeted questions to surface core values
3. VALUES HIERARCHY: Help user prioritize when values conflict
4. LIFE VISION ALIGNMENT: Connect decisions to broader life direction and meaning

OUTPUT FORMAT: Return a valid JSON object with values analysis and alignment scores.`
};

export class GeminiService {
  private model: any;

  constructor() {
    if (genAI) {
      this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    }
  }

  private async generateContent(prompt: string, userInput: string): Promise<any> {
    if (!this.model) {
      // Return mock data when API key is not available
      return this.getMockResponse(prompt);
    }

    try {
      const fullPrompt = `${prompt}\n\nUser Input: ${userInput}\n\nPlease respond with valid JSON only, no additional text or formatting.`;
      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean up the response to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      throw new Error('No valid JSON found in response');
    } catch (error) {
      console.error('Gemini API Error:', error);
      return this.getMockResponse(prompt);
    }
  }

  private getMockResponse(prompt: string): any {
    if (prompt.includes('DECISION_ANALYZER')) {
      return {
        decision_title: "Career Transition Decision",
        complexity_score: 8,
        core_question: "Should I transition from my current career to a new field?",
        stakeholders: ["Family", "Current Colleagues", "Future Self", "Financial Dependents"],
        constraints: {
          temporal: "Need to decide within 6 months due to contract renewal",
          financial: "Must maintain current income level for family obligations",
          social: "Leaving established professional network and relationships",
          personal: "Need to acquire new skills and overcome imposter syndrome"
        },
        missing_information: [
          "Market demand in target field",
          "Realistic salary expectations",
          "Required skill development timeline",
          "Industry growth projections"
        ],
        cognitive_biases_detected: [
          "Optimism bias - may be overestimating success probability",
          "Sunk cost fallacy - considering years invested in current career"
        ],
        chunking_recommendation: "Break into phases: skill assessment, market research, transition planning, execution"
      };
    }
    
    // Add other mock responses for different prompts
    return { message: "Mock response - API key not configured" };
  }

  async analyzeDecision(userInput: string) {
    return this.generateContent(SYSTEM_PROMPTS.DECISION_ANALYZER, userInput);
  }

  async predictOutcomes(decisionData: any, paths: any[]) {
    const input = `Decision: ${decisionData.title}\nPaths: ${JSON.stringify(paths)}`;
    return this.generateContent(SYSTEM_PROMPTS.OUTCOME_PREDICTOR, input);
  }

  async analyzeEmotions(userInput: string, decisionContext: any) {
    const input = `User Input: ${userInput}\nDecision Context: ${JSON.stringify(decisionContext)}`;
    return this.generateContent(SYSTEM_PROMPTS.EMOTIONAL_ANALYZER, input);
  }

  async analyzeRisks(decisionData: any, paths: any[]) {
    const input = `Decision: ${decisionData.title}\nPaths: ${JSON.stringify(paths)}`;
    return this.generateContent(SYSTEM_PROMPTS.RISK_ANALYZER, input);
  }

  async mapValues(userInput: string, decisionData: any) {
    const input = `User Input: ${userInput}\nDecision: ${JSON.stringify(decisionData)}`;
    return this.generateContent(SYSTEM_PROMPTS.VALUES_MAPPER, input);
  }
}

export const geminiService = new GeminiService();