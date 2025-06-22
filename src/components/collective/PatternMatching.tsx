import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Zap, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  BarChart3,
  Search,
  Filter,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

interface DecisionArchetype {
  id: string;
  name: string;
  description: string;
  success_rate: number;
  example_count: number;
  success_factors: string[];
  common_pitfalls: string[];
}

interface PatternMatch {
  id: string;
  decision_id: string;
  archetype_id: string;
  archetype: DecisionArchetype;
  similarity_score: number;
  matching_factors: string[];
  recommendations: string[];
}

interface PatternMatchingProps {
  decisionId: string;
  decisionType?: string;
}

export const PatternMatching: React.FC<PatternMatchingProps> = ({ 
  decisionId,
  decisionType = 'Career Change'
}) => {
  const [patternMatches, setPatternMatches] = useState<PatternMatch[]>([]);
  const [communityInsights, setCommunityInsights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<PatternMatch | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Simulated API call to fetch pattern matches
    setTimeout(() => {
      const archetypes: DecisionArchetype[] = [
        {
          id: '1',
          name: 'Career Transition to Tech',
          description: 'Individuals changing careers to technology fields, often involving education investment and skill development.',
          success_rate: 0.78,
          example_count: 1243,
          success_factors: [
            'Structured learning plan with clear milestones',
            'Building portfolio of projects during transition',
            'Maintaining financial runway of 6+ months',
            'Leveraging existing network for opportunities'
          ],
          common_pitfalls: [
            'Underestimating learning curve and time investment',
            'Insufficient financial planning',
            'Focusing too broadly instead of specializing',
            'Neglecting soft skills and networking'
          ]
        },
        {
          id: '2',
          name: 'Mid-Life Career Pivot',
          description: 'Experienced professionals changing industries or roles after establishing expertise in another field.',
          success_rate: 0.65,
          example_count: 876,
          success_factors: [
            'Identifying transferable skills from previous career',
            'Securing mentor in target industry',
            'Gradual transition when possible',
            'Leveraging experience as competitive advantage'
          ],
          common_pitfalls: [
            'Overvaluing previous experience in new context',
            'Resistance to starting at lower levels',
            'Underinvesting in new skill development',
            'Insufficient industry research'
          ]
        }
      ];

      const matches: PatternMatch[] = [
        {
          id: '1',
          decision_id: decisionId,
          archetype_id: '1',
          archetype: archetypes[0],
          similarity_score: 0.92,
          matching_factors: [
            'Career field transition',
            'Requires education investment',
            'Similar time horizon (1-2 years)',
            'Comparable financial considerations'
          ],
          recommendations: [
            'Allocate 20+ hours weekly to structured learning',
            'Build 3-5 portfolio projects before applying to jobs',
            'Join tech communities for networking and support',
            'Consider part-time transition to maintain income'
          ]
        },
        {
          id: '2',
          decision_id: decisionId,
          archetype_id: '2',
          archetype: archetypes[1],
          similarity_score: 0.68,
          matching_factors: [
            'Career change after establishing expertise',
            'Significant identity shift',
            'Leveraging transferable skills'
          ],
          recommendations: [
            'Identify and emphasize transferable skills',
            'Seek mentorship from someone who made similar transition',
            'Create narrative connecting past experience to new direction',
            'Consider gradual transition through adjacent roles'
          ]
        }
      ];

      const insights = [
        {
          id: '1',
          title: 'Success Rate by Preparation Time',
          data: {
            '0-3 months': 0.45,
            '3-6 months': 0.62,
            '6-12 months': 0.78,
            '12+ months': 0.85
          },
          insight: 'Career transitions with 6+ months of preparation have significantly higher success rates.'
        },
        {
          id: '2',
          title: 'Financial Buffer Impact',
          data: {
            'No buffer': 0.32,
            '1-3 months': 0.58,
            '3-6 months': 0.76,
            '6+ months': 0.89
          },
          insight: 'Having a 6+ month financial buffer increases success probability by 57% compared to no buffer.'
        },
        {
          id: '3',
          title: 'Learning Method Effectiveness',
          data: {
            'Self-taught': 0.65,
            'Bootcamp': 0.72,
            'Part-time courses': 0.68,
            'Degree program': 0.81
          },
          insight: 'Structured learning programs show higher success rates, but self-taught approaches can be effective with strong discipline.'
        }
      ];

      setPatternMatches(matches);
      setCommunityInsights(insights);
      setLoading(false);
    }, 1000);
  }, [decisionId]);

  const handleViewDetails = (match: PatternMatch) => {
    setSelectedMatch(match);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Collective Intelligence</h2>
            <p className="text-sm text-gray-600">
              Learn from anonymized decision patterns and community wisdom
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="info">AI-Powered</Badge>
          <Badge variant="success">2 Matches Found</Badge>
        </div>
      </div>

      {/* Pattern Matches */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Similar Decision Patterns</h3>
        
        {loading ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Analyzing decision patterns...</p>
            </CardContent>
          </Card>
        ) : patternMatches.length > 0 ? (
          <div className="space-y-4">
            {patternMatches.map((match) => (
              <Card key={match.id} hover>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          <Users className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{match.archetype.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant={match.similarity_score > 0.8 ? 'success' : 'warning'} 
                              size="sm"
                            >
                              {Math.round(match.similarity_score * 100)}% Match
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Based on {match.archetype.example_count.toLocaleString()} similar decisions
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">
                        {match.archetype.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span className="text-gray-700">
                            {Math.round(match.archetype.success_rate * 100)}% Success Rate
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <span className="text-gray-700">
                            {match.archetype.common_pitfalls.length} Common Pitfalls
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Button onClick={() => handleViewDetails(match)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Insights
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Globe className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No Pattern Matches Found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find similar decision patterns in our database.
                This might be a unique decision or we need more information.
              </p>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Refine Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Community Insights */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Community Insights</h3>
        </CardHeader>
        <CardContent className="space-y-6">
          {communityInsights.map((insight) => (
            <div key={insight.id} className="space-y-3">
              <h4 className="font-medium text-gray-900">{insight.title}</h4>
              <div className="space-y-2">
                {Object.entries(insight.data).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <div className="w-24 text-sm text-gray-600">{key}</div>
                    <div className="flex-1">
                      <ProgressBar 
                        value={(value as number) * 100} 
                        color={(value as number) > 0.7 ? 'success' : (value as number) > 0.5 ? 'warning' : 'error'} 
                      />
                    </div>
                    <div className="w-16 text-right text-sm font-medium text-gray-900">
                      {Math.round((value as number) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Zap className="h-4 w-4 text-indigo-600 mt-0.5" />
                  <p className="text-sm text-indigo-700">{insight.insight}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {showDetailModal && selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDetailModal(false)}
          />
          
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{selectedMatch.archetype.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant={selectedMatch.similarity_score > 0.8 ? 'success' : 'warning'} 
                    size="sm"
                  >
                    {Math.round(selectedMatch.similarity_score * 100)}% Match
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Based on {selectedMatch.archetype.example_count.toLocaleString()} similar decisions
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-700">
                {selectedMatch.archetype.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <h4 className="font-medium text-gray-900">Success Factors</h4>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedMatch.archetype.success_factors.map((factor, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-1 bg-emerald-100 rounded-full mt-0.5">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                        </div>
                        <p className="text-gray-700">{factor}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5 text-amber-600" />
                      <h4 className="font-medium text-gray-900">Common Pitfalls</h4>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {selectedMatch.archetype.common_pitfalls.map((pitfall, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-1 bg-amber-100 rounded-full mt-0.5">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                        </div>
                        <p className="text-gray-700">{pitfall}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-indigo-600" />
                    <h4 className="font-medium text-gray-900">Personalized Recommendations</h4>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedMatch.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-1 bg-indigo-100 rounded-full mt-0.5">
                        <Zap className="h-4 w-4 text-indigo-600" />
                      </div>
                      <p className="text-gray-700">{recommendation}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Success Metrics</h4>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Overall Success Rate</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round(selectedMatch.archetype.success_rate * 100)}%
                      </span>
                    </div>
                    <ProgressBar 
                      value={selectedMatch.archetype.success_rate * 100} 
                      color={selectedMatch.archetype.success_rate > 0.7 ? 'success' : 'warning'} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">Avg. Transition Time</h5>
                      <p className="text-lg font-semibold text-indigo-600">9.2 months</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">Avg. Investment</h5>
                      <p className="text-lg font-semibold text-indigo-600">$12,400</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <h5 className="text-sm font-medium text-gray-900 mb-1">Satisfaction</h5>
                      <p className="text-lg font-semibold text-indigo-600">8.4/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex justify-end mt-6">
              <Button onClick={() => setShowDetailModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};