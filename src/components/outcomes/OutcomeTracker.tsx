import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Star, 
  BookOpen,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit3
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

interface PredictedOutcome {
  id: string;
  path_id: string;
  financial_impact: any;
  emotional_impact: any;
  relationship_impact: any;
  personal_growth: any;
  time_horizon: any;
  confidence_score: number;
}

interface ActualOutcome {
  id: string;
  path_id: string;
  financial_result: any;
  emotional_result: any;
  relationship_result: any;
  personal_growth_result: any;
  satisfaction_score: number;
  lessons_learned: string[];
  recorded_at: string;
}

interface OutcomeTrackerProps {
  decisionId: string;
  pathId?: string;
}

export const OutcomeTracker: React.FC<OutcomeTrackerProps> = ({ 
  decisionId,
  pathId
}) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'journal' | 'metrics'>('comparison');
  const [predictedOutcome, setPredictedOutcome] = useState<PredictedOutcome | null>(null);
  const [actualOutcome, setActualOutcome] = useState<ActualOutcome | null>(null);
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [journalEntries, setJournalEntries] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>({
    accuracy_score: 0.72,
    satisfaction_score: 8.5,
    time_efficiency: 0.85,
    stakeholder_alignment: 0.65,
    overall_quality: 0.76
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulated API call to fetch outcomes
    setTimeout(() => {
      setPredictedOutcome({
        id: '1',
        path_id: pathId || '1',
        financial_impact: {
          short_term: 'Initial investment of $15,000',
          medium_term: 'Potential 20% salary increase within 1 year',
          long_term: 'Significant career earning potential increase'
        },
        emotional_impact: {
          stress: 'Temporary increase during transition',
          satisfaction: 'High potential for increased job satisfaction',
          confidence: 'Initial decrease followed by significant growth'
        },
        relationship_impact: {
          family: 'Short-term strain due to time commitment',
          professional: 'New network development, temporary loss of current network'
        },
        personal_growth: {
          skills: ['Technical skills', 'Problem-solving', 'Adaptability'],
          opportunities: ['Career advancement', 'Industry change', 'Remote work']
        },
        time_horizon: {
          short_term: '6 months of intensive learning',
          medium_term: '1 year to establish in new role',
          long_term: '3+ years of career development'
        },
        confidence_score: 0.75
      });

      setActualOutcome({
        id: '1',
        path_id: pathId || '1',
        financial_result: {
          short_term: 'Investment of $12,000 (less than expected)',
          medium_term: '15% salary increase after 9 months',
          long_term: 'On track for projected career earnings'
        },
        emotional_result: {
          stress: 'Higher than anticipated during transition',
          satisfaction: 'Exceeded expectations - very fulfilling',
          confidence: 'Grew faster than expected'
        },
        relationship_result: {
          family: 'Supportive throughout the process',
          professional: 'Maintained more connections than expected'
        },
        personal_growth_result: {
          skills: ['Technical skills exceeded expectations', 'Leadership opportunities'],
          opportunities: ['Remote work options abundant', 'More diverse roles available']
        },
        satisfaction_score: 8,
        lessons_learned: [
          'Start networking earlier in the transition',
          'Focus on fewer technologies at first',
          'Set clearer boundaries for work-life balance'
        ],
        recorded_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      });

      setJournalEntries([
        {
          id: '1',
          title: 'Initial Decision Reflection',
          content: 'Today I made the decision to transition to software development. I feel both excited and nervous about the journey ahead. The NeuroFlow analysis helped me see potential biases in my thinking, particularly optimism bias about how quickly I might land a job.',
          mood_rating: 8,
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '2',
          title: 'Midway Checkpoint',
          content: 'Three months into my coding bootcamp. The learning curve has been steeper than I expected, but I\'m making progress. The financial strain is real, but manageable. I'm starting to build a portfolio of projects and making connections in the industry.',
          mood_rating: 6,
          created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '3',
          title: 'Outcome Reflection',
          content: 'I\'ve completed the bootcamp and landed my first developer role! The salary is slightly lower than projected, but the company culture and growth opportunities are excellent. Looking back, the decision was absolutely worth it despite the challenges.',
          mood_rating: 9,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]);
    }, 500);
  }, [decisionId, pathId]);

  const getComparisonColor = (category: string) => {
    // In a real implementation, this would compare predicted vs actual
    const comparisonMap: Record<string, 'success' | 'warning' | 'error'> = {
      'financial': 'warning',
      'emotional': 'success',
      'relationship': 'success',
      'personal_growth': 'success',
      'time_horizon': 'warning'
    };
    
    return comparisonMap[category] || 'primary';
  };

  const getMoodColor = (rating: number) => {
    if (rating >= 8) return 'success';
    if (rating >= 5) return 'warning';
    return 'error';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Outcome Tracking</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          {actualOutcome ? (
            <Button variant="outline" size="sm" onClick={() => setShowRecordModal(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Update Outcome
            </Button>
          ) : (
            <Button size="sm" onClick={() => setShowRecordModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Record Outcome
            </Button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'comparison'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Target className="h-4 w-4" />
          <span>Prediction vs Reality</span>
        </button>
        <button
          onClick={() => setActiveTab('journal')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'journal'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Decision Journal</span>
        </button>
        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'metrics'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Quality Metrics</span>
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'comparison' && (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {predictedOutcome && actualOutcome ? (
              <div className="space-y-6">
                {/* Summary Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-gray-600">Satisfaction Score</div>
                        <div className="text-3xl font-bold text-indigo-600">{actualOutcome.satisfaction_score}/10</div>
                        <ProgressBar 
                          value={actualOutcome.satisfaction_score * 10} 
                          color={actualOutcome.satisfaction_score >= 7 ? 'success' : 'warning'} 
                        />
                      </div>
                      
                      <div className="text-center space-y-2">
                        <div className="text-sm text-gray-600">Prediction Accuracy</div>
                        <div className="text-3xl font-bold text-indigo-600">72%</div>
                        <ProgressBar value={72} color="primary" />
                      </div>
                      
                      <div className="text-center space-y-2">
                        <div className="text-sm text-gray-600">Decision Quality</div>
                        <div className="text-3xl font-bold text-indigo-600">8.2/10</div>
                        <ProgressBar value={82} color="success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Financial Impact */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Financial Impact</h3>
                        <Badge variant={getComparisonColor('financial')}>
                          {getComparisonColor('financial') === 'success' ? 'Better than expected' : 
                           getComparisonColor('financial') === 'warning' ? 'Slightly below expected' : 
                           'Below expected'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                          <h4 className="text-sm font-medium text-indigo-900 mb-2">Predicted</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Short-term:</span> {predictedOutcome.financial_impact.short_term}</p>
                            <p><span className="font-medium">Medium-term:</span> {predictedOutcome.financial_impact.medium_term}</p>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-emerald-50 rounded-lg">
                          <h4 className="text-sm font-medium text-emerald-900 mb-2">Actual</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Short-term:</span> {actualOutcome.financial_result.short_term}</p>
                            <p><span className="font-medium">Medium-term:</span> {actualOutcome.financial_result.medium_term}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Emotional Impact */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Emotional Impact</h3>
                        <Badge variant={getComparisonColor('emotional')}>
                          {getComparisonColor('emotional') === 'success' ? 'Better than expected' : 
                           getComparisonColor('emotional') === 'warning' ? 'As expected' : 
                           'Below expected'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                          <h4 className="text-sm font-medium text-indigo-900 mb-2">Predicted</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Stress:</span> {predictedOutcome.emotional_impact.stress}</p>
                            <p><span className="font-medium">Satisfaction:</span> {predictedOutcome.emotional_impact.satisfaction}</p>
                          </div>
                        </div>
                        
                        <div className="p-3 bg-emerald-50 rounded-lg">
                          <h4 className="text-sm font-medium text-emerald-900 mb-2">Actual</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Stress:</span> {actualOutcome.emotional_result.stress}</p>
                            <p><span className="font-medium">Satisfaction:</span> {actualOutcome.emotional_result.satisfaction}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Lessons Learned */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <h3 className="font-semibold text-gray-900">Lessons Learned</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {actualOutcome.lessons_learned.map((lesson, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="p-1 bg-indigo-100 rounded-full mt-0.5">
                              <CheckCircle className="h-4 w-4 text-indigo-600" />
                            </div>
                            <p className="text-gray-700">{lesson}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No Outcome Recorded Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Record the actual outcome of your decision to compare with predictions
                    and improve future decision-making.
                  </p>
                  <Button onClick={() => setShowRecordModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Record Outcome
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {activeTab === 'journal' && (
          <motion.div
            key="journal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Decision Journal</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Entry
                </Button>
              </div>
              
              {journalEntries.length > 0 ? (
                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <Card key={entry.id} hover>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{entry.title}</h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                              <Badge 
                                variant={getMoodColor(entry.mood_rating) as any} 
                                size="sm"
                              >
                                Mood: {entry.mood_rating}/10
                              </Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-gray-700 text-sm">{entry.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No Journal Entries Yet</h3>
                    <p className="text-gray-600 mb-4">
                      Start documenting your decision journey to track insights and learnings.
                    </p>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Entry
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'metrics' && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Decision Quality Metrics</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Prediction Accuracy</span>
                        <span className="text-sm font-medium text-indigo-600">{Math.round(metrics.accuracy_score * 100)}%</span>
                      </div>
                      <ProgressBar value={metrics.accuracy_score * 100} color="primary" />
                      <p className="text-xs text-gray-600">
                        How closely the actual outcome matched predictions
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Satisfaction Score</span>
                        <span className="text-sm font-medium text-indigo-600">{metrics.satisfaction_score}/10</span>
                      </div>
                      <ProgressBar value={metrics.satisfaction_score * 10} color="success" />
                      <p className="text-xs text-gray-600">
                        Overall satisfaction with the decision outcome
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Time Efficiency</span>
                        <span className="text-sm font-medium text-indigo-600">{Math.round(metrics.time_efficiency * 100)}%</span>
                      </div>
                      <ProgressBar value={metrics.time_efficiency * 100} color="warning" />
                      <p className="text-xs text-gray-600">
                        How efficiently the decision was made
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Stakeholder Alignment</span>
                        <span className="text-sm font-medium text-indigo-600">{Math.round(metrics.stakeholder_alignment * 100)}%</span>
                      </div>
                      <ProgressBar value={metrics.stakeholder_alignment * 100} color="primary" />
                      <p className="text-xs text-gray-600">
                        How well the decision satisfied stakeholder needs
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-gray-900">Overall Decision Quality</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${star <= Math.round(metrics.overall_quality * 5) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <ProgressBar 
                      value={metrics.overall_quality * 100} 
                      color={metrics.overall_quality >= 0.7 ? 'success' : metrics.overall_quality >= 0.5 ? 'warning' : 'error'} 
                    />
                    <p className="text-sm text-gray-600 mt-2">
                      This decision ranks in the top 25% of your decisions based on outcome quality.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="font-semibold text-gray-900">Learning Insights</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <TrendingUp className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-indigo-900">Decision Pattern Identified</h4>
                        <p className="text-sm text-indigo-700 mt-1">
                          You tend to make better decisions when you involve stakeholders early in the process.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-amber-100 rounded-full">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-900">Bias Detection</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Optimism bias was detected in your predictions. Actual financial outcomes were 15% lower than predicted.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-emerald-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-100 rounded-full">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-emerald-900">Strength Identified</h4>
                        <p className="text-sm text-emerald-700 mt-1">
                          You accurately predicted emotional outcomes and relationship impacts, showing strong emotional intelligence.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Record Outcome Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowRecordModal(false)}
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {actualOutcome ? 'Update Outcome' : 'Record Actual Outcome'}
            </h3>
            
            <div className="space-y-6">
              {/* Form would go here */}
              <p className="text-gray-600">
                This form would allow users to record the actual outcomes of their decision,
                including financial results, emotional impact, relationship changes, and personal growth.
              </p>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowRecordModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowRecordModal(false)}
                  className="flex-1"
                >
                  {actualOutcome ? 'Update Outcome' : 'Save Outcome'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};