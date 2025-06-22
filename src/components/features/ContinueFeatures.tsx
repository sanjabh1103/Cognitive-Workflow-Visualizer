import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Users, 
  TrendingUp, 
  Target, 
  Clock,
  Shield,
  Zap,
  Globe
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const pendingFeatures = [
  {
    id: 'collaborative-workflows',
    title: 'Real-time Collaborative Workflows',
    description: 'Enable multiple users to work together on decision workflows with live editing, comments, and notifications.',
    priority: 'High',
    icon: Users,
    estimatedTime: '2-3 weeks',
    userStories: ['US-012: Collaborative Decision Workflow'],
    features: [
      'Real-time collaborative editing',
      'Comment system with mentions',
      'Role-based permissions (Owner, Editor, Commenter, Viewer)',
      'Activity logs and notifications',
      'Conflict resolution for simultaneous edits'
    ]
  },
  {
    id: 'outcome-tracking',
    title: 'Advanced Outcome Tracking & Learning',
    description: 'Track actual decision outcomes, compare with AI predictions, and improve future decision-making.',
    priority: 'High',
    icon: TrendingUp,
    estimatedTime: '2 weeks',
    userStories: ['US-017: Outcome Tracking & Analysis'],
    features: [
      'Outcome recording interface',
      'Prediction vs reality comparison',
      'Learning insights generation',
      'Decision quality metrics',
      'Personal decision journal'
    ]
  },
  {
    id: 'expert-network',
    title: 'Expert Network & Consultation',
    description: 'Connect with verified experts and experienced decision-makers for personalized guidance.',
    priority: 'High',
    icon: Target,
    estimatedTime: '3-4 weeks',
    userStories: ['US-005: Expert Network Connection'],
    features: [
      'Expert profile system',
      'Smart matching algorithm',
      'Consultation booking system',
      'Rating and review system',
      'Expert verification process'
    ]
  },
  {
    id: 'temporal-modeling',
    title: 'Advanced Temporal Impact Modeling',
    description: 'Visualize how decisions play out over different time horizons with compound effect calculations.',
    priority: 'Medium',
    icon: Clock,
    estimatedTime: '2-3 weeks',
    userStories: ['US-008: Future Scenario Visualization', 'US-009: Compound Effect Calculator'],
    features: [
      'Multi-timeline scenario visualization',
      'Compound effect calculator',
      'Path dependency analysis',
      'Reversibility assessment',
      'Long-term trajectory modeling'
    ]
  },
  {
    id: 'risk-management',
    title: 'Comprehensive Risk Management',
    description: 'Advanced risk analysis with heat maps, mitigation strategies, and contingency planning.',
    priority: 'Medium',
    icon: Shield,
    estimatedTime: '2 weeks',
    userStories: ['US-010: Risk Heat Map Generation', 'US-011: Contingency Plan Builder'],
    features: [
      'Multi-dimensional risk analysis',
      'Interactive risk heat maps',
      'Automated contingency plan generation',
      'Risk monitoring and alerts',
      'Mitigation strategy recommendations'
    ]
  },
  {
    id: 'external-integrations',
    title: 'External Data Integration',
    description: 'Connect with external APIs and data sources to enhance decision-making with real-world data.',
    priority: 'Medium',
    icon: Zap,
    estimatedTime: '3 weeks',
    userStories: ['US-013: External Data Integration'],
    features: [
      'API connector framework',
      'Data mapping and transformation',
      'Automated data updates',
      'Custom data visualizations',
      'Popular service integrations (Calendar, Finance, Health)'
    ]
  },
  {
    id: 'collective-intelligence',
    title: 'Collective Intelligence Platform',
    description: 'Learn from anonymized decision patterns and contribute to the collective wisdom.',
    priority: 'Medium',
    icon: Globe,
    estimatedTime: '4 weeks',
    userStories: ['US-004: Similar Decision Pattern Matching'],
    features: [
      'Pattern matching algorithm',
      'Anonymized data sharing',
      'Collective insights dashboard',
      'Decision archetype identification',
      'Community wisdom aggregation'
    ]
  }
];

interface ContinueFeaturesProps {
  onContinue: () => void;
}

export const ContinueFeatures: React.FC<ContinueFeaturesProps> = ({ onContinue }) => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Pending Features Implementation</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          The core NeuroFlow Designer application is now functional with Gemini AI integration and Supabase backend. 
          Here are the remaining features from the PRD that can be implemented next.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pendingFeatures.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                      <feature.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={feature.priority === 'High' ? 'error' : 'warning'}
                    size="sm"
                  >
                    {feature.priority}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Estimated Time:</span>
                  <span className="font-medium text-gray-900">{feature.estimatedTime}</span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">User Stories:</h4>
                  <div className="space-y-1">
                    {feature.userStories.map((story, idx) => (
                      <Badge key={idx} variant="info" size="sm" className="mr-1 mb-1">
                        {story}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {feature.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></div>
                        {feat}
                      </li>
                    ))}
                    {feature.features.length > 3 && (
                      <li className="text-sm text-gray-500">
                        +{feature.features.length - 3} more features...
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="text-center space-y-4">
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Ready to Continue?</h2>
          <p className="text-gray-600 mb-4">
            Click below to implement the next set of high-priority features and continue building 
            the complete NeuroFlow Designer experience.
          </p>
          <Button onClick={onContinue} size="lg">
            Continue with Remaining Features
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        <div className="text-sm text-gray-500">
          <p>
            <strong>Implementation Status:</strong> Core platform ✅ | AI Integration ✅ | Database Schema ✅ | Authentication ✅
          </p>
          <p>
            <strong>Next Phase:</strong> Collaborative features, outcome tracking, expert network, and advanced analytics
          </p>
        </div>
      </div>
    </div>
  );
};