import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Plus,
  Edit3,
  Trash2,
  Bell,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface RiskCategory {
  id: string;
  name: string;
  description: string;
  impact: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  probability: 'very_low' | 'low' | 'medium' | 'high' | 'very_high';
  score: number;
  mitigation_strategies: string[];
}

interface RiskHeatMap {
  id: string;
  decision_id: string;
  risk_matrix: Array<Array<number>>;
  risk_categories: RiskCategory[];
  created_at: string;
}

interface RiskMonitor {
  id: string;
  risk_indicator: string;
  threshold_value: number;
  current_value: number;
  alert_triggered: boolean;
  is_active: boolean;
}

interface RiskManagementProps {
  decisionId: string;
}

export const RiskManagement: React.FC<RiskManagementProps> = ({ decisionId }) => {
  const [activeTab, setActiveTab] = useState<'heatmap' | 'contingency' | 'monitoring'>('heatmap');
  const [heatMap, setHeatMap] = useState<RiskHeatMap | null>(null);
  const [riskMonitors, setRiskMonitors] = useState<RiskMonitor[]>([]);
  const [showAddMonitorModal, setShowAddMonitorModal] = useState(false);
  const [showRiskDetailModal, setShowRiskDetailModal] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState<RiskCategory | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // Simulated API call to fetch risk data
    setTimeout(() => {
      setHeatMap({
        id: '1',
        decision_id: decisionId,
        risk_matrix: [
          [1, 2, 3, 4, 5],
          [2, 3, 4, 5, 6],
          [3, 4, 5, 6, 7],
          [4, 5, 6, 7, 8],
          [5, 6, 7, 8, 9]
        ],
        risk_categories: [
          {
            id: '1',
            name: 'Financial Risk',
            description: 'Risk of financial loss or insufficient return on investment',
            impact: 'high',
            probability: 'medium',
            score: 7,
            mitigation_strategies: [
              'Create emergency fund covering 6 months of expenses',
              'Develop part-time income stream during transition',
              'Secure pre-approval for low-interest loan as backup'
            ]
          },
          {
            id: '2',
            name: 'Career Progression Risk',
            description: 'Risk of career setback or difficulty finding employment',
            impact: 'high',
            probability: 'low',
            score: 5,
            mitigation_strategies: [
              'Build portfolio of projects before full transition',
              'Maintain relationships with current industry contacts',
              'Target companies with demonstrated hiring of career changers'
            ]
          },
          {
            id: '3',
            name: 'Skill Acquisition Risk',
            description: 'Risk of not developing sufficient skills for employability',
            impact: 'very_high',
            probability: 'low',
            score: 6,
            mitigation_strategies: [
              'Set specific skill milestones with deadlines',
              'Arrange mentorship with experienced developer',
              'Join coding communities for peer learning and feedback'
            ]
          },
          {
            id: '4',
            name: 'Work-Life Balance Risk',
            description: 'Risk of burnout or family strain during transition',
            impact: 'medium',
            probability: 'high',
            score: 6,
            mitigation_strategies: [
              'Schedule dedicated family time during transition',
              'Set clear boundaries for study/work hours',
              'Regular check-ins with family about stress levels'
            ]
          }
        ],
        created_at: new Date().toISOString()
      });

      setRiskMonitors([
        {
          id: '1',
          risk_indicator: 'Emergency Fund Balance',
          threshold_value: 10000,
          current_value: 12500,
          alert_triggered: false,
          is_active: true
        },
        {
          id: '2',
          risk_indicator: 'Weekly Learning Hours',
          threshold_value: 15,
          current_value: 12,
          alert_triggered: true,
          is_active: true
        },
        {
          id: '3',
          risk_indicator: 'Portfolio Projects Completed',
          threshold_value: 3,
          current_value: 2,
          alert_triggered: false,
          is_active: true
        }
      ]);
    }, 500);
  }, [decisionId]);

  const getImpactLevel = (impact: string): number => {
    const levels: Record<string, number> = {
      'very_low': 1,
      'low': 2,
      'medium': 3,
      'high': 4,
      'very_high': 5
    };
    return levels[impact] || 3;
  };

  const getProbabilityLevel = (probability: string): number => {
    const levels: Record<string, number> = {
      'very_low': 1,
      'low': 2,
      'medium': 3,
      'high': 4,
      'very_high': 5
    };
    return levels[probability] || 3;
  };

  const getRiskColor = (score: number): string => {
    if (score >= 8) return 'bg-red-500';
    if (score >= 6) return 'bg-orange-500';
    if (score >= 4) return 'bg-yellow-500';
    if (score >= 2) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const getRiskTextColor = (score: number): string => {
    if (score >= 8) return 'text-red-600';
    if (score >= 6) return 'text-orange-600';
    if (score >= 4) return 'text-yellow-600';
    if (score >= 2) return 'text-green-600';
    return 'text-blue-600';
  };

  const getRiskBadgeColor = (score: number): 'error' | 'warning' | 'success' | 'info' => {
    if (score >= 8) return 'error';
    if (score >= 6) return 'warning';
    if (score >= 4) return 'warning';
    if (score >= 2) return 'success';
    return 'info';
  };

  const handleRiskClick = (risk: RiskCategory) => {
    setSelectedRisk(risk);
    setShowRiskDetailModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Risk Management</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="info">AI-Powered</Badge>
          <Badge variant="warning">4 Risks Identified</Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('heatmap')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'heatmap'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Risk Heat Map</span>
        </button>
        <button
          onClick={() => setActiveTab('contingency')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'contingency'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <CheckCircle className="h-4 w-4" />
          <span>Contingency Plans</span>
        </button>
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'monitoring'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Bell className="h-4 w-4" />
          <span>Risk Monitoring</span>
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {/* Heat Map View */}
        {activeTab === 'heatmap' && (
          <motion.div
            key="heatmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {heatMap ? (
              <div className="space-y-6">
                {/* Heat Map Visualization */}
                <Card>
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Risk Heat Map</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Impact</span>
                        <div className="flex space-x-2">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Low</span>
                          <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Medium</span>
                          <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">High</span>
                          <span className="text-xs px-2 py-1 bg-orange-100 text-orange-800 rounded-full">Very High</span>
                          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">Critical</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-2">
                        {heatMap.risk_matrix.map((row, rowIndex) => (
                          <React.Fragment key={`row-${rowIndex}`}>
                            {row.map((cell, colIndex) => (
                              <div 
                                key={`cell-${rowIndex}-${colIndex}`}
                                className={`h-16 ${getRiskColor(cell)} rounded-lg flex items-center justify-center text-white font-medium`}
                              >
                                {cell}
                              </div>
                            ))}
                          </React.Fragment>
                        ))}
                      </div>
                      
                      <div className="flex justify-between mt-2">
                        <span className="text-sm font-medium text-gray-700">Probability</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {heatMap.risk_categories.map((risk) => {
                        const impactLevel = getImpactLevel(risk.impact);
                        const probLevel = getProbabilityLevel(risk.probability);
                        
                        return (
                          <div 
                            key={risk.id}
                            className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50/30 transition-colors cursor-pointer"
                            onClick={() => handleRiskClick(risk)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-3">
                                <div className={`p-2 rounded-full ${getRiskColor(risk.score)} bg-opacity-20 mt-0.5`}>
                                  <AlertCircle className={`h-5 w-5 ${getRiskTextColor(risk.score)}`} />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{risk.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                                </div>
                              </div>
                              <Badge variant={getRiskBadgeColor(risk.score)}>
                                Score: {risk.score}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Impact:</span>
                                <span className="font-medium capitalize">{risk.impact.replace('_', ' ')}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Probability:</span>
                                <span className="font-medium capitalize">{risk.probability.replace('_', ' ')}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No Risk Analysis Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Generate a risk heat map to identify and prioritize potential risks.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Generate Risk Analysis
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* Contingency Plans View */}
        {activeTab === 'contingency' && (
          <motion.div
            key="contingency"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {heatMap ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Contingency Plans</h3>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Plan
                  </Button>
                </div>
                
                {heatMap.risk_categories.map((risk) => (
                  <Card key={risk.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-full ${getRiskColor(risk.score)} bg-opacity-20`}>
                            <AlertCircle className={`h-5 w-5 ${getRiskTextColor(risk.score)}`} />
                          </div>
                          <h4 className="font-medium text-gray-900">{risk.name}</h4>
                        </div>
                        <Badge variant={getRiskBadgeColor(risk.score)}>
                          Risk Score: {risk.score}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Mitigation Strategies</h5>
                        <div className="space-y-2">
                          {risk.mitigation_strategies.map((strategy, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="p-1 bg-indigo-100 rounded-full mt-0.5">
                                <CheckCircle className="h-4 w-4 text-indigo-600" />
                              </div>
                              <p className="text-sm text-gray-700">{strategy}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Zap className="h-5 w-5 text-indigo-600 mt-0.5" />
                          <div>
                            <h5 className="font-medium text-indigo-900">Trigger Indicators</h5>
                            <p className="text-sm text-indigo-700 mt-1">
                              {risk.name === 'Financial Risk' && 'Emergency fund drops below 3 months of expenses'}
                              {risk.name === 'Career Progression Risk' && 'No interview callbacks after 20 applications'}
                              {risk.name === 'Skill Acquisition Risk' && 'Unable to complete basic projects independently after 3 months'}
                              {risk.name === 'Work-Life Balance Risk' && 'Consistent stress levels above 7/10 for two weeks'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 border border-gray-200 rounded-lg">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Contingency Response</h5>
                          <p className="text-sm text-gray-600">
                            {risk.name === 'Financial Risk' && 'Activate part-time consulting in previous field to generate income while continuing learning at reduced pace.'}
                            {risk.name === 'Career Progression Risk' && 'Pivot to adjacent tech roles (QA, technical support) as stepping stones while building more advanced portfolio.'}
                            {risk.name === 'Skill Acquisition Risk' && 'Engage mentor for personalized learning plan and switch to more structured learning program.'}
                            {risk.name === 'Work-Life Balance Risk' && 'Reduce learning hours temporarily and implement strict boundaries between study and personal time.'}
                          </p>
                        </div>
                        
                        <div className="p-3 border border-gray-200 rounded-lg">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Resources Needed</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {risk.name === 'Financial Risk' && (
                              <>
                                <li>• Emergency fund: $10,000</li>
                                <li>• Pre-approved credit line: $5,000</li>
                                <li>• Contact list of previous clients</li>
                              </>
                            )}
                            {risk.name === 'Career Progression Risk' && (
                              <>
                                <li>• List of entry-level tech positions</li>
                                <li>• Updated resume for adjacent roles</li>
                                <li>• Network contacts in target companies</li>
                              </>
                            )}
                            {risk.name === 'Skill Acquisition Risk' && (
                              <>
                                <li>• Budget for paid mentorship: $1,000</li>
                                <li>• Alternative learning platforms list</li>
                                <li>• Skill assessment tools</li>
                              </>
                            )}
                            {risk.name === 'Work-Life Balance Risk' && (
                              <>
                                <li>• Family support agreement</li>
                                <li>• Stress management techniques</li>
                                <li>• Revised schedule template</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">No Contingency Plans</h3>
                  <p className="text-gray-600 mb-6">
                    Create contingency plans to prepare for potential risks.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Contingency Plan
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}

        {/* Monitoring View */}
        {activeTab === 'monitoring' && (
          <motion.div
            key="monitoring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Risk Monitoring</h3>
                <Button size="sm" onClick={() => setShowAddMonitorModal(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Monitor
                </Button>
              </div>
              
              {riskMonitors.length > 0 ? (
                <div className="space-y-4">
                  {riskMonitors.map((monitor) => (
                    <Card key={monitor.id} className={monitor.alert_triggered ? 'border-red-300' : ''}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-full ${monitor.alert_triggered ? 'bg-red-100' : 'bg-green-100'} mt-0.5`}>
                              {monitor.alert_triggered ? (
                                <AlertCircle className="h-5 w-5 text-red-600" />
                              ) : (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{monitor.risk_indicator}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-sm text-gray-600">Threshold: {monitor.threshold_value}</span>
                                <span className="text-sm text-gray-600">|</span>
                                <span className={`text-sm font-medium ${monitor.alert_triggered ? 'text-red-600' : 'text-green-600'}`}>
                                  Current: {monitor.current_value}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {monitor.alert_triggered && (
                              <Badge variant="error">Alert Triggered</Badge>
                            )}
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        {monitor.alert_triggered && (
                          <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <div className="flex items-start space-x-3">
                              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                              <div>
                                <h5 className="font-medium text-red-900">Action Required</h5>
                                <p className="text-sm text-red-700 mt-1">
                                  {monitor.risk_indicator === 'Emergency Fund Balance' && 'Your emergency fund is below the safe threshold. Consider reducing expenses or finding additional income sources.'}
                                  {monitor.risk_indicator === 'Weekly Learning Hours' && 'Your learning hours are below target. This may delay your skill development timeline.'}
                                  {monitor.risk_indicator === 'Portfolio Projects Completed' && 'You\'re behind on portfolio project completion. This could impact your job readiness.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-gray-900 mb-2">No Risk Monitors</h3>
                    <p className="text-gray-600 mb-6">
                      Set up risk monitors to track key indicators and receive alerts.
                    </p>
                    <Button onClick={() => setShowAddMonitorModal(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Risk Monitor
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Risk Detail Modal */}
      <AnimatePresence>
        {showRiskDetailModal && selectedRisk && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowRiskDetailModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-full ${getRiskColor(selectedRisk.score)} bg-opacity-20`}>
                  <AlertCircle className={`h-5 w-5 ${getRiskTextColor(selectedRisk.score)}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedRisk.name}</h3>
                <Badge variant={getRiskBadgeColor(selectedRisk.score)}>
                  Score: {selectedRisk.score}
                </Badge>
              </div>
              
              <p className="text-gray-700 mb-4">{selectedRisk.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Impact</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getRiskColor(selectedRisk.score)}`} 
                        style={{ width: `${getImpactLevel(selectedRisk.impact) * 20}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium capitalize">
                      {selectedRisk.impact.replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Probability</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getRiskColor(selectedRisk.score)}`} 
                        style={{ width: `${getProbabilityLevel(selectedRisk.probability) * 20}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium capitalize">
                      {selectedRisk.probability.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Mitigation Strategies</h4>
                <div className="space-y-2">
                  {selectedRisk.mitigation_strategies.map((strategy, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="p-1 bg-indigo-100 rounded-full mt-0.5">
                        <CheckCircle className="h-4 w-4 text-indigo-600" />
                      </div>
                      <p className="text-gray-700">{strategy}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowRiskDetailModal(false)}
                  className="flex-1"
                >
                  Close
                </Button>
                <Button className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Monitor
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Monitor Modal */}
      <AnimatePresence>
        {showAddMonitorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowAddMonitorModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Risk Monitor
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Indicator
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Emergency Fund Balance"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Threshold Value
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 10000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Value
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 12500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Condition
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="less_than">Less than threshold</option>
                    <option value="greater_than">Greater than threshold</option>
                    <option value="equal_to">Equal to threshold</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddMonitorModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowAddMonitorModal(false)}
                  className="flex-1"
                >
                  Add Monitor
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};