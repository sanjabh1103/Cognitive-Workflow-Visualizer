import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  TrendingUp, 
  Calendar, 
  ArrowRight,
  Zap,
  BarChart3,
  RefreshCw,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';

interface TimelineScenario {
  id: string;
  name: string;
  description: string;
  timeHorizons: {
    short: {
      title: string;
      description: string;
      impact: number;
      probability: number;
    };
    medium: {
      title: string;
      description: string;
      impact: number;
      probability: number;
    };
    long: {
      title: string;
      description: string;
      impact: number;
      probability: number;
    };
  };
  compoundEffects: {
    financial: {
      initialValue: number;
      growthRate: number;
      finalValue: number;
      years: number;
    };
    skills: {
      initialValue: number;
      growthRate: number;
      finalValue: number;
      years: number;
    };
    network: {
      initialValue: number;
      growthRate: number;
      finalValue: number;
      years: number;
    };
  };
  reversibility: {
    score: number;
    factors: string[];
  };
}

interface TimelineVisualizerProps {
  decisionId: string;
  pathId?: string;
}

export const TimelineVisualizer: React.FC<TimelineVisualizerProps> = ({ 
  decisionId,
  pathId
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'compound' | 'reversibility'>('timeline');
  const [activeTimeframe, setActiveTimeframe] = useState<'short' | 'medium' | 'long'>('short');
  const [scenarios, setScenarios] = useState<TimelineScenario[]>([]);
  const [activeScenario, setActiveScenario] = useState<number>(0);

  // Mock data for demonstration
  React.useEffect(() => {
    const mockScenarios: TimelineScenario[] = [
      {
        id: '1',
        name: 'Full-Time Bootcamp Path',
        description: 'Quit current job and attend intensive coding bootcamp',
        timeHorizons: {
          short: {
            title: '6 Months: Bootcamp Completion',
            description: 'Complete intensive bootcamp training and build initial portfolio. No income during this period, using savings.',
            impact: 6,
            probability: 0.9
          },
          medium: {
            title: '1-2 Years: Junior Developer',
            description: 'Secure entry-level developer position with starting salary around industry average. Begin building professional network.',
            impact: 7,
            probability: 0.75
          },
          long: {
            title: '3-5 Years: Mid-Level Developer',
            description: 'Progress to mid-level developer role with significant salary increase. Specialized skills development and expanded career options.',
            impact: 9,
            probability: 0.65
          }
        },
        compoundEffects: {
          financial: {
            initialValue: -15000,
            growthRate: 0.25,
            finalValue: 120000,
            years: 5
          },
          skills: {
            initialValue: 10,
            growthRate: 0.4,
            finalValue: 85,
            years: 5
          },
          network: {
            initialValue: 5,
            growthRate: 0.3,
            finalValue: 60,
            years: 5
          }
        },
        reversibility: {
          score: 0.4,
          factors: [
            'Time investment cannot be recovered',
            'Financial investment partially recoverable',
            'Skills gained are transferable',
            'Can return to previous career but with gap'
          ]
        }
      },
      {
        id: '2',
        name: 'Part-Time Learning Path',
        description: 'Keep current job while learning programming on nights/weekends',
        timeHorizons: {
          short: {
            title: '6 Months: Basic Skills',
            description: 'Develop foundational programming skills while maintaining current income. Slower progress but no financial disruption.',
            impact: 4,
            probability: 0.95
          },
          medium: {
            title: '1-2 Years: Career Transition',
            description: 'Complete enough projects for portfolio and begin applying for entry-level positions or internships.',
            impact: 6,
            probability: 0.8
          },
          long: {
            title: '3-5 Years: Established Developer',
            description: 'Fully transitioned to development role with competitive salary. More gradual but stable career progression.',
            impact: 8,
            probability: 0.7
          }
        },
        compoundEffects: {
          financial: {
            initialValue: -3000,
            growthRate: 0.15,
            finalValue: 90000,
            years: 5
          },
          skills: {
            initialValue: 10,
            growthRate: 0.25,
            finalValue: 70,
            years: 5
          },
          network: {
            initialValue: 20,
            growthRate: 0.2,
            finalValue: 65,
            years: 5
          }
        },
        reversibility: {
          score: 0.8,
          factors: [
            'Minimal financial risk',
            'Current career maintained during transition',
            'Can pause or stop learning if needed',
            'Professional network preserved'
          ]
        }
      }
    ];
    
    setScenarios(mockScenarios);
  }, [decisionId, pathId]);

  const currentScenario = scenarios[activeScenario];
  
  const getImpactColor = (impact: number) => {
    if (impact >= 8) return 'success';
    if (impact >= 5) return 'warning';
    return 'error';
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 0.8) return 'success';
    if (probability >= 0.5) return 'warning';
    return 'error';
  };

  const getReversibilityColor = (score: number) => {
    if (score >= 0.7) return 'success';
    if (score >= 0.4) return 'warning';
    return 'error';
  };

  const nextScenario = () => {
    setActiveScenario((prev) => (prev + 1) % scenarios.length);
  };

  const prevScenario = () => {
    setActiveScenario((prev) => (prev - 1 + scenarios.length) % scenarios.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Temporal Impact Modeling</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <Badge variant="info">AI-Powered</Badge>
          <Badge variant="success">Multi-Timeline</Badge>
        </div>
      </div>

      {/* Scenario Selector */}
      {scenarios.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={prevScenario}
                disabled={scenarios.length <= 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="text-center">
                <h3 className="font-semibold text-gray-900">{currentScenario.name}</h3>
                <p className="text-sm text-gray-600">{currentScenario.description}</p>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={nextScenario}
                disabled={scenarios.length <= 1}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'timeline'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Time Horizons</span>
        </button>
        <button
          onClick={() => setActiveTab('compound')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'compound'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Compound Effects</span>
        </button>
        <button
          onClick={() => setActiveTab('reversibility')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'reversibility'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Reversibility</span>
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {scenarios.length > 0 ? (
          <>
            {/* Timeline View */}
            {activeTab === 'timeline' && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Timeframe Selector */}
                <div className="flex space-x-2 mb-6">
                  <Button
                    variant={activeTimeframe === 'short' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTimeframe('short')}
                    className="flex-1"
                  >
                    Short-term
                  </Button>
                  <Button
                    variant={activeTimeframe === 'medium' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTimeframe('medium')}
                    className="flex-1"
                  >
                    Medium-term
                  </Button>
                  <Button
                    variant={activeTimeframe === 'long' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTimeframe('long')}
                    className="flex-1"
                  >
                    Long-term
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        {currentScenario.timeHorizons[activeTimeframe].title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={getImpactColor(currentScenario.timeHorizons[activeTimeframe].impact)} 
                          size="sm"
                        >
                          Impact: {currentScenario.timeHorizons[activeTimeframe].impact}/10
                        </Badge>
                        <Badge 
                          variant={getProbabilityColor(currentScenario.timeHorizons[activeTimeframe].probability)} 
                          size="sm"
                        >
                          Probability: {Math.round(currentScenario.timeHorizons[activeTimeframe].probability * 100)}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700">
                      {currentScenario.timeHorizons[activeTimeframe].description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Impact Score</h4>
                        <ProgressBar 
                          value={currentScenario.timeHorizons[activeTimeframe].impact * 10} 
                          color={getImpactColor(currentScenario.timeHorizons[activeTimeframe].impact)} 
                        />
                        <p className="text-sm text-gray-600">
                          How significant the effects will be on your life and career
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">Probability</h4>
                        <ProgressBar 
                          value={currentScenario.timeHorizons[activeTimeframe].probability * 100} 
                          color={getProbabilityColor(currentScenario.timeHorizons[activeTimeframe].probability)} 
                        />
                        <p className="text-sm text-gray-600">
                          Likelihood of this outcome occurring based on available data
                        </p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-indigo-900">AI Insight</h4>
                          <p className="text-sm text-indigo-700 mt-1">
                            {activeTimeframe === 'short' && 'The short-term challenges are significant but temporary. Focus on building a support system to navigate this period.'}
                            {activeTimeframe === 'medium' && 'Your medium-term prospects show strong potential for career growth. Networking will be crucial during this phase.'}
                            {activeTimeframe === 'long' && 'The long-term outlook is very positive with high impact. Consider how these skills will position you for future opportunities.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Timeline Visualization */}
                <div className="mt-6 relative">
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-200 -translate-y-1/2"></div>
                  <div className="relative flex justify-between">
                    <div className={`flex flex-col items-center ${activeTimeframe === 'short' ? 'opacity-100' : 'opacity-60'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTimeframe === 'short' ? 'bg-indigo-600' : 'bg-gray-400'} text-white font-medium`}>
                        1
                      </div>
                      <span className="text-xs font-medium mt-2 text-center">
                        6 Months
                      </span>
                    </div>
                    
                    <div className={`flex flex-col items-center ${activeTimeframe === 'medium' ? 'opacity-100' : 'opacity-60'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTimeframe === 'medium' ? 'bg-indigo-600' : 'bg-gray-400'} text-white font-medium`}>
                        2
                      </div>
                      <span className="text-xs font-medium mt-2 text-center">
                        1-2 Years
                      </span>
                    </div>
                    
                    <div className={`flex flex-col items-center ${activeTimeframe === 'long' ? 'opacity-100' : 'opacity-60'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTimeframe === 'long' ? 'bg-indigo-600' : 'bg-gray-400'} text-white font-medium`}>
                        3
                      </div>
                      <span className="text-xs font-medium mt-2 text-center">
                        3-5 Years
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Compound Effects View */}
            {activeTab === 'compound' && (
              <motion.div
                key="compound"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Financial Compound Effect */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Financial Impact</h3>
                        <DollarSign className="h-5 w-5 text-emerald-600" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Initial Investment</span>
                        <span className="font-medium text-gray-900">
                          ${Math.abs(currentScenario.compoundEffects.financial.initialValue).toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Annual Growth</span>
                        <span className="font-medium text-gray-900">
                          {Math.round(currentScenario.compoundEffects.financial.growthRate * 100)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">5-Year Projection</span>
                        <span className="font-medium text-emerald-600">
                          ${currentScenario.compoundEffects.financial.finalValue.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Compound growth chart</span>
                      </div>
                      
                      <p className="text-xs text-gray-600">
                        Projected financial impact over {currentScenario.compoundEffects.financial.years} years, 
                        accounting for salary growth and initial investment.
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Skills Compound Effect */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Skills Growth</h3>
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Starting Level</span>
                        <span className="font-medium text-gray-900">
                          {currentScenario.compoundEffects.skills.initialValue}/100
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Growth Rate</span>
                        <span className="font-medium text-gray-900">
                          {Math.round(currentScenario.compoundEffects.skills.growthRate * 100)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">5-Year Projection</span>
                        <span className="font-medium text-blue-600">
                          {currentScenario.compoundEffects.skills.finalValue}/100
                        </span>
                      </div>
                      
                      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Skills growth chart</span>
                      </div>
                      
                      <p className="text-xs text-gray-600">
                        Projected skill development over {currentScenario.compoundEffects.skills.years} years, 
                        accounting for learning curve and practice.
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Network Compound Effect */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">Network Growth</h3>
                        <Users className="h-5 w-5 text-purple-600" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Starting Value</span>
                        <span className="font-medium text-gray-900">
                          {currentScenario.compoundEffects.network.initialValue}/100
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Growth Rate</span>
                        <span className="font-medium text-gray-900">
                          {Math.round(currentScenario.compoundEffects.network.growthRate * 100)}%
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">5-Year Projection</span>
                        <span className="font-medium text-purple-600">
                          {currentScenario.compoundEffects.network.finalValue}/100
                        </span>
                      </div>
                      
                      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500 text-sm">Network growth chart</span>
                      </div>
                      
                      <p className="text-xs text-gray-600">
                        Projected professional network development over {currentScenario.compoundEffects.network.years} years, 
                        including industry connections.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="mt-6">
                  <CardHeader>
                    <h3 className="font-semibold text-gray-900">Compound Effect Analysis</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">
                      This analysis shows how your decision compounds over time across multiple dimensions.
                      The initial investment of time and resources leads to accelerating returns as skills,
                      network, and financial benefits build upon each other.
                    </p>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-indigo-900">Key Insight</h4>
                          <p className="text-sm text-indigo-700 mt-1">
                            The most significant compound growth occurs between years 2-4, after the initial
                            learning curve but before diminishing returns. Focus your efforts during this
                            critical period to maximize long-term benefits.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Financial Impact</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Skills Growth</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        <span className="text-sm text-gray-600">Network Growth</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Reversibility View */}
            {activeTab === 'reversibility' && (
              <motion.div
                key="reversibility"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Reversibility Analysis</h3>
                      <Badge 
                        variant={getReversibilityColor(currentScenario.reversibility.score)} 
                        size="lg"
                      >
                        {currentScenario.reversibility.score >= 0.7 ? 'Highly Reversible' : 
                         currentScenario.reversibility.score >= 0.4 ? 'Moderately Reversible' : 
                         'Difficult to Reverse'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Reversibility Score</h4>
                      <ProgressBar 
                        value={currentScenario.reversibility.score * 100} 
                        color={getReversibilityColor(currentScenario.reversibility.score)} 
                      />
                      <p className="text-sm text-gray-600">
                        How easily you can change course if this decision doesn't work out as expected
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900">Key Factors</h4>
                      <div className="space-y-2">
                        {currentScenario.reversibility.factors.map((factor, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="p-1 bg-indigo-100 rounded-full mt-0.5">
                              <ArrowRight className="h-4 w-4 text-indigo-600" />
                            </div>
                            <p className="text-gray-700">{factor}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-indigo-900">Reversibility Strategy</h4>
                          <p className="text-sm text-indigo-700 mt-1">
                            {currentScenario.reversibility.score >= 0.7 ? 
                              'This path offers high flexibility. Consider setting specific checkpoints to evaluate progress and reassess if needed.' : 
                              currentScenario.reversibility.score >= 0.4 ? 
                              'This path has moderate reversibility. Maintain key relationships in your current field and keep skills updated as insurance.' : 
                              'This path has limited reversibility. Consider creating a contingency fund and backup plan before proceeding.'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Exit Points</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">1 Month</span>
                            <span className="font-medium text-emerald-600">Very Easy</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">3 Months</span>
                            <span className="font-medium text-emerald-600">Easy</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">6 Months</span>
                            <span className="font-medium text-amber-600">Moderate</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">1 Year+</span>
                            <span className="font-medium text-red-600">Difficult</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Sunk Costs Over Time</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Financial</span>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Time</span>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Opportunity</span>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Emotional</span>
                            <div className="w-32 bg-gray-200 rounded-full h-2">
                              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No Timeline Scenarios</h3>
              <p className="text-gray-600 mb-6">
                Create timeline scenarios to visualize how your decision will unfold over time.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Timeline Scenario
              </Button>
            </CardContent>
          </Card>
        )}
      </AnimatePresence>
    </div>
  );
};