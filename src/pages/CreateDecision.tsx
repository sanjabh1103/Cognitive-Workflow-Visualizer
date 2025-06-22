import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  Brain, 
  ArrowRight, 
  Users, 
  Clock, 
  DollarSign,
  AlertCircle,
  Lightbulb,
  Target,
  CheckCircle
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useDecisions } from '../hooks/useDecisions';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

interface DecisionFormData {
  title: string;
  description: string;
  core_question: string;
  stakeholders: string;
  temporal_constraints: string;
  financial_constraints: string;
  social_constraints: string;
  personal_constraints: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  values: string;
}

const urgencyOptions = [
  { value: 'low', label: 'Low', description: 'No rush, can take time to decide', color: 'success' },
  { value: 'medium', label: 'Medium', description: 'Some time pressure but manageable', color: 'warning' },
  { value: 'high', label: 'High', description: 'Urgent, need to decide soon', color: 'error' },
  { value: 'critical', label: 'Critical', description: 'Emergency decision required', color: 'error' }
] as const;

export const CreateDecision: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createDecision } = useDecisions();
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<any>(null);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<DecisionFormData>();
  
  const watchedValues = watch();

  const onSubmit = async (data: DecisionFormData) => {
    if (!user) {
      toast.error('Please sign in to create decisions');
      return;
    }

    setIsAnalyzing(true);
    setStep(2);
    
    try {
      // Create decision with AI analysis
      const decision = await createDecision(data);
      
      if (decision) {
        // Simulate AI insights (in real implementation, this would come from Gemini)
        setAiInsights({
          complexity_score: decision.complexity_score,
          cognitive_biases: decision.cognitive_biases_detected,
          missing_information: decision.missing_information,
          recommendations: [
            'Consider breaking this into smaller decisions',
            'Consult with stakeholders before finalizing',
            'Set up regular review checkpoints'
          ]
        });
        setStep(3);
      }
    } catch (error) {
      console.error('Error creating decision:', error);
      toast.error('Failed to create decision');
      setStep(1);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleComplete = () => {
    navigate('/dashboard');
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to create and manage your decision workflows.
          </p>
          <Button onClick={() => window.location.reload()}>
            Sign In to Continue
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Progress Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Decision</h1>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center space-x-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    stepNumber <= step
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber < step ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-600">
            {step === 1 && 'Describe your decision'}
            {step === 2 && 'AI is analyzing your decision...'}
            {step === 3 && 'Review insights and create workflow'}
          </div>
        </div>

        {/* Step 1: Decision Input */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Tell us about your decision
                  </h2>
                  <p className="text-gray-600">
                    The more detail you provide, the better our AI can help you.
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Decision Title *
                      </label>
                      <input
                        {...register('title', { required: 'Title is required' })}
                        type="text"
                        placeholder="e.g., Should I change careers?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      {errors.title && (
                        <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        {...register('description', { required: 'Description is required' })}
                        rows={4}
                        placeholder="Describe your situation in detail..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      />
                      {errors.description && (
                        <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Core Question *
                      </label>
                      <input
                        {...register('core_question', { required: 'Core question is required' })}
                        type="text"
                        placeholder="What exactly are you trying to decide?"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      {errors.core_question && (
                        <p className="text-red-600 text-sm mt-1">{errors.core_question.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Stakeholders */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-1" />
                      Who is affected by this decision?
                    </label>
                    <input
                      {...register('stakeholders')}
                      type="text"
                      placeholder="e.g., Spouse, Children, Colleagues, Manager"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  {/* Constraints */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline h-4 w-4 mr-1" />
                        Time Constraints
                      </label>
                      <input
                        {...register('temporal_constraints')}
                        type="text"
                        placeholder="e.g., Need to decide by March"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <DollarSign className="inline h-4 w-4 mr-1" />
                        Financial Constraints
                      </label>
                      <input
                        {...register('financial_constraints')}
                        type="text"
                        placeholder="e.g., Budget limit of $50,000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Social Constraints
                      </label>
                      <input
                        {...register('social_constraints')}
                        type="text"
                        placeholder="e.g., Family obligations"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Personal Constraints
                      </label>
                      <input
                        {...register('personal_constraints')}
                        type="text"
                        placeholder="e.g., Skills, experience"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Urgency */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <AlertCircle className="inline h-4 w-4 mr-1" />
                      Urgency Level
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {urgencyOptions.map((option) => (
                        <label key={option.value} className="cursor-pointer">
                          <input
                            {...register('urgency')}
                            type="radio"
                            value={option.value}
                            className="sr-only"
                          />
                          <div className="p-3 border border-gray-300 rounded-lg hover:border-indigo-500 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-gray-900">{option.label}</span>
                              <Badge variant={option.color as any} size="sm">
                                {option.value}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600">{option.description}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Values */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Target className="inline h-4 w-4 mr-1" />
                      What values are important to you in this decision?
                    </label>
                    <textarea
                      {...register('values')}
                      rows={3}
                      placeholder="e.g., Work-life balance, financial security, personal growth..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={!watchedValues.title || !watchedValues.description}>
                  Analyze Decision
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 2: AI Analysis */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <Card>
              <CardContent className="py-16">
                <div className="space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <Brain className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 animate-ping"></div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      AI Analysis in Progress
                    </h2>
                    <p className="text-gray-600">
                      Our cognitive AI is analyzing your decision context, identifying patterns, 
                      and generating insights...
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                      <span>Analyzing decision complexity</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                      <span>Identifying cognitive biases</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
                      <span>Generating recommendations</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: AI Insights */}
        {step === 3 && aiInsights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">
                  AI Analysis Complete
                </h2>
                <p className="text-gray-600">
                  Here are the insights from our cognitive analysis of your decision.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Complexity Score */}
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-indigo-900">Complexity Score</h3>
                    <Badge variant="primary" size="lg">
                      {aiInsights.complexity_score}/10
                    </Badge>
                  </div>
                  <p className="text-sm text-indigo-700">
                    This is a moderately complex decision that may benefit from structured analysis.
                  </p>
                </div>

                {/* Cognitive Biases */}
                {aiInsights.cognitive_biases && aiInsights.cognitive_biases.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      <AlertCircle className="inline h-5 w-5 mr-2 text-amber-600" />
                      Potential Cognitive Biases
                    </h3>
                    <div className="space-y-2">
                      {aiInsights.cognitive_biases.map((bias: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{bias}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Information */}
                {aiInsights.missing_information && aiInsights.missing_information.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      <Lightbulb className="inline h-5 w-5 mr-2 text-blue-600" />
                      Missing Information
                    </h3>
                    <div className="space-y-2">
                      {aiInsights.missing_information.map((info: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{info}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {aiInsights.recommendations && aiInsights.recommendations.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      <Target className="inline h-5 w-5 mr-2 text-emerald-600" />
                      AI Recommendations
                    </h3>
                    <div className="space-y-2">
                      {aiInsights.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back to Edit
              </Button>
              <Button onClick={handleComplete} size="lg">
                Create Workflow
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};