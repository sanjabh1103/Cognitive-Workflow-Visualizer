import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Brain, 
  Users, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Target,
  Settings,
  Share2,
  Download,
  MessageSquare,
  Shield,
  Database
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { WorkflowVisualizer } from '../components/workflow/WorkflowVisualizer';
import { CollaborationPanel } from '../components/collaboration/CollaborationPanel';
import { OutcomeTracker } from '../components/outcomes/OutcomeTracker';
import { ExpertNetwork } from '../components/experts/ExpertNetwork';
import { TimelineVisualizer } from '../components/temporal/TimelineVisualizer';
import { RiskManagement } from '../components/risk/RiskManagement';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { mockDecisions } from '../lib/supabase';

const tabs = [
  { id: 'workflow', label: 'Workflow', icon: Brain },
  { id: 'collaboration', label: 'Collaboration', icon: Users },
  { id: 'outcomes', label: 'Outcomes', icon: TrendingUp },
  { id: 'experts', label: 'Expert Network', icon: MessageSquare },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'risks', label: 'Risk Management', icon: Shield },
  { id: 'data', label: 'Data Integration', icon: Database },
];

export const DecisionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('workflow');
  
  // Mock decision data - in real app, fetch from API
  const decision = mockDecisions.find(d => d.id === id);
  
  if (!decision) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900">Decision not found</h1>
          <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </Layout>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{decision.title}</h1>
                <Badge variant={getStatusColor(decision.status) as any}>
                  {decision.status.replace('_', ' ')}
                </Badge>
              </div>
              <p className="text-gray-600">{decision.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Decision Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Complexity</p>
                  <p className="text-2xl font-bold text-indigo-600">{decision.complexity_score}/10</p>
                </div>
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Stakeholders</p>
                  <p className="text-2xl font-bold text-emerald-600">{decision.stakeholders.length}</p>
                </div>
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Biases Detected</p>
                  <p className="text-2xl font-bold text-amber-600">{decision.cognitive_biases_detected.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Days Active</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Math.floor((new Date().getTime() - new Date(decision.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <div className="flex space-x-8 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'workflow' && (
            <WorkflowVisualizer decisionId={decision.id} />
          )}
          
          {activeTab === 'collaboration' && (
            <CollaborationPanel decisionId={decision.id} isOwner={true} />
          )}
          
          {activeTab === 'outcomes' && (
            <OutcomeTracker decisionId={decision.id} />
          )}
          
          {activeTab === 'experts' && (
            <ExpertNetwork decisionId={decision.id} decisionType={decision.title} />
          )}
          
          {activeTab === 'timeline' && (
            <TimelineVisualizer decisionId={decision.id} />
          )}
          
          {activeTab === 'risks' && (
            <RiskManagement decisionId={decision.id} />
          )}
          
          {activeTab === 'data' && (
            <Card>
              <CardContent className="text-center py-12">
                <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Data Integration</h3>
                <p className="text-gray-600 mb-6">
                  Connect external data sources to enhance your decision-making with real-world data.
                </p>
                <Button>
                  Connect Data Source
                </Button>
              </CardContent>
            </Card>
          )}
          
          {activeTab === 'analysis' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Core Question</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{decision.core_question}"</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Constraints</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-900">Temporal:</span>
                    <p className="text-gray-600 text-sm">{decision.constraints.temporal}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Financial:</span>
                    <p className="text-gray-600 text-sm">{decision.constraints.financial}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Social:</span>
                    <p className="text-gray-600 text-sm">{decision.constraints.social}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Personal:</span>
                    <p className="text-gray-600 text-sm">{decision.constraints.personal}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Cognitive Biases</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {decision.cognitive_biases_detected.map((bias, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <span className="text-sm text-gray-700">{bias}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Missing Information</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {decision.missing_information.map((info, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm text-gray-700">{info}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === 'stakeholders' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {decision.stakeholders.map((stakeholder, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{stakeholder}</h4>
                        <p className="text-sm text-gray-600">Affected party</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};