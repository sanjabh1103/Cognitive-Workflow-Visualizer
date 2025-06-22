import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Users, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Circle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Decision } from '../../types';

interface DecisionCardProps {
  decision: Decision;
  index?: number;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({ decision, index = 0 }) => {
  const getStatusIcon = (status: Decision['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'in_progress':
        return <Circle className="h-4 w-4 text-indigo-600" />;
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Decision['status']) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'primary';
      default:
        return 'secondary';
    }
  };

  const getComplexityColor = (score: number) => {
    if (score >= 8) return 'error';
    if (score >= 6) return 'warning';
    return 'success';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/decision/${decision.id}`}>
        <Card hover className="h-full">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                  {decision.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {decision.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {getStatusIcon(decision.status)}
                <Badge variant={getStatusColor(decision.status)} size="sm">
                  {decision.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-3">
            {/* Complexity Score */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Complexity Score
                </span>
                <Badge variant={getComplexityColor(decision.complexity_score)} size="sm">
                  {decision.complexity_score}/10
                </Badge>
              </div>
              <ProgressBar 
                value={decision.complexity_score * 10} 
                color={getComplexityColor(decision.complexity_score)}
              />
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                <span>{decision.stakeholders.length} stakeholders</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <AlertCircle className="h-4 w-4" />
                <span>{decision.cognitive_biases_detected.length} biases</span>
              </div>
            </div>

            {/* Core Question */}
            <div className="mb-4">
              <p className="text-sm text-gray-700 font-medium mb-1">Core Question:</p>
              <p className="text-sm text-gray-600 line-clamp-2 italic">
                "{decision.core_question}"
              </p>
            </div>

            {/* Timestamps */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Created {new Date(decision.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-3 w-3" />
                <span>Updated {new Date(decision.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};