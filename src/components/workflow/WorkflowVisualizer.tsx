import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  ArrowRight, 
  Target, 
  AlertTriangle, 
  TrendingUp,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface WorkflowNode {
  id: string;
  type: 'decision' | 'path' | 'outcome' | 'risk';
  title: string;
  description: string;
  probability?: number;
  impact?: number;
  position: { x: number; y: number };
  data?: any;
}

interface WorkflowVisualizerProps {
  decisionId: string;
}

export const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({ decisionId }) => {
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  // Mock workflow data
  const workflowNodes: WorkflowNode[] = [
    {
      id: 'decision-1',
      type: 'decision',
      title: 'Career Change Decision',
      description: 'Should I transition from marketing to software development?',
      position: { x: 400, y: 100 },
      data: {
        complexity: 8,
        stakeholders: ['Partner', 'Current Team', 'Family'],
        urgency: 'medium'
      }
    },
    {
      id: 'path-1',
      type: 'path',
      title: 'Full-Time Bootcamp',
      description: 'Quit job and attend intensive coding bootcamp',
      probability: 75,
      position: { x: 200, y: 300 },
      data: {
        duration: '6 months',
        cost: '$15,000',
        risk: 'high'
      }
    },
    {
      id: 'path-2',
      type: 'path',
      title: 'Part-Time Learning',
      description: 'Learn programming while maintaining current job',
      probability: 60,
      position: { x: 600, y: 300 },
      data: {
        duration: '18 months',
        cost: '$3,000',
        risk: 'low'
      }
    },
    {
      id: 'outcome-1',
      type: 'outcome',
      title: 'Tech Career Success',
      description: 'Successfully transition to tech role',
      probability: 80,
      impact: 9,
      position: { x: 200, y: 500 }
    },
    {
      id: 'outcome-2',
      type: 'outcome',
      title: 'Gradual Transition',
      description: 'Slowly build skills while maintaining stability',
      probability: 70,
      impact: 7,
      position: { x: 600, y: 500 }
    },
    {
      id: 'risk-1',
      type: 'risk',
      title: 'Financial Strain',
      description: 'Income loss during transition period',
      probability: 60,
      impact: 8,
      position: { x: 100, y: 400 }
    }
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'decision':
        return Brain;
      case 'path':
        return Target;
      case 'outcome':
        return TrendingUp;
      case 'risk':
        return AlertTriangle;
      default:
        return Brain;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'decision':
        return 'from-indigo-500 to-purple-600';
      case 'path':
        return 'from-emerald-500 to-teal-600';
      case 'outcome':
        return 'from-blue-500 to-cyan-600';
      case 'risk':
        return 'from-red-500 to-pink-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const handleNodeClick = useCallback((node: WorkflowNode) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="space-y-6">
      {/* Workflow Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Decision Workflow</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === 'overview' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('overview')}
            >
              Overview
            </Button>
            <Button
              variant={viewMode === 'detailed' ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setViewMode('detailed')}
            >
              Detailed
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="info">Interactive</Badge>
          <Badge variant="success">AI-Powered</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow Visualization */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 h-96 lg:h-[600px] overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0">
                  {/* Connection Lines */}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="#6366f1"
                        opacity="0.6"
                      />
                    </marker>
                  </defs>
                  
                  {/* Decision to Paths */}
                  <line
                    x1="400"
                    y1="150"
                    x2="200"
                    y2="280"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.6"
                    markerEnd="url(#arrowhead)"
                  />
                  <line
                    x1="400"
                    y1="150"
                    x2="600"
                    y2="280"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    opacity="0.6"
                    markerEnd="url(#arrowhead)"
                  />
                  
                  {/* Paths to Outcomes */}
                  <line
                    x1="200"
                    y1="350"
                    x2="200"
                    y2="480"
                    stroke="#10b981"
                    strokeWidth="2"
                    opacity="0.6"
                    markerEnd="url(#arrowhead)"
                  />
                  <line
                    x1="600"
                    y1="350"
                    x2="600"
                    y2="480"
                    stroke="#10b981"
                    strokeWidth="2"
                    opacity="0.6"
                    markerEnd="url(#arrowhead)"
                  />
                  
                  {/* Risk Connection */}
                  <line
                    x1="150"
                    y1="380"
                    x2="180"
                    y2="320"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    opacity="0.6"
                  />
                </svg>

                {/* Workflow Nodes */}
                {workflowNodes.map((node, index) => {
                  const Icon = getNodeIcon(node.type);
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="absolute cursor-pointer"
                      style={{
                        left: `${node.position.x}px`,
                        top: `${node.position.y}px`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      onClick={() => handleNodeClick(node)}
                    >
                      <div className={`relative p-4 rounded-2xl bg-gradient-to-r ${getNodeColor(node.type)} shadow-lg hover:shadow-xl transition-all duration-300 text-white min-w-[160px] ${selectedNode?.id === node.id ? 'ring-4 ring-white ring-opacity-50' : ''}`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon className="h-5 w-5" />
                          <span className="font-semibold text-sm">{node.title}</span>
                        </div>
                        <p className="text-xs opacity-90 line-clamp-2">
                          {node.description}
                        </p>
                        {node.probability && (
                          <div className="mt-2 text-xs font-medium">
                            {node.probability}% probability
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Node Details Panel */}
        <div className="space-y-6">
          {selectedNode ? (
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  {React.createElement(getNodeIcon(selectedNode.type), { className: "h-5 w-5 text-indigo-600" })}
                  <h3 className="font-semibold text-gray-900">{selectedNode.title}</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{selectedNode.description}</p>
                
                {selectedNode.probability && (
                  <div>
                    <span className="text-sm font-medium text-gray-700">Success Probability:</span>
                    <div className="mt-1 flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${selectedNode.probability}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-indigo-600">
                        {selectedNode.probability}%
                      </span>
                    </div>
                  </div>
                )}
                
                {selectedNode.data && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Details:</h4>
                    {Object.entries(selectedNode.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="capitalize text-gray-600">{key.replace('_', ' ')}:</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Select a Node</h3>
                <p className="text-sm text-gray-600">
                  Click on any node in the workflow to see detailed information
                </p>
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold text-gray-900">AI Insights</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <TrendingUp className="h-4 w-4 text-indigo-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-indigo-900">Recommendation</p>
                    <p className="text-xs text-indigo-700 mt-1">
                      Part-time learning path shows better risk-adjusted returns
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">Risk Alert</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Consider emergency fund before full-time transition
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Users className="h-4 w-4 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-emerald-900">Stakeholder Input</p>
                    <p className="text-xs text-emerald-700 mt-1">
                      86% of similar decisions benefit from partner discussion
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};