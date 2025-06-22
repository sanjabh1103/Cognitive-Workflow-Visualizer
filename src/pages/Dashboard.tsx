import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Brain, 
  TrendingUp, 
  Clock, 
  Target,
  Users,
  BarChart3,
  Filter,
  Search
} from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { DecisionCard } from '../components/decision/DecisionCard';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useDecisions } from '../hooks/useDecisions';
import { useAuth } from '../hooks/useAuth';

const quickStats = [
  {
    icon: Brain,
    label: 'Active Decisions',
    value: '3',
    change: '+2 this week',
    color: 'text-indigo-600'
  },
  {
    icon: TrendingUp,
    label: 'Completion Rate',
    value: '87%',
    change: '+5% this month',
    color: 'text-emerald-600'
  },
  {
    icon: Clock,
    label: 'Avg Decision Time',
    value: '2.3 days',
    change: '-40% improvement',
    color: 'text-amber-600'
  },
  {
    icon: Target,
    label: 'Success Rate',
    value: '92%',
    change: '+8% this quarter',
    color: 'text-purple-600'
  }
];

const recentActivity = [
  {
    id: '1',
    type: 'decision_created',
    title: 'Created "Home Purchase Decision"',
    time: '2 hours ago',
    icon: Plus
  },
  {
    id: '2',
    type: 'outcome_tracked',
    title: 'Tracked outcome for "Career Change"',
    time: '1 day ago',
    icon: TrendingUp
  },
  {
    id: '3',
    type: 'expert_consulted',
    title: 'Consulted with Sarah Chen (Financial Advisor)',
    time: '3 days ago',
    icon: Users
  }
];

export const Dashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const { decisions, loading } = useDecisions();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'in_progress' | 'completed'>('all');

  const filteredDecisions = decisions.filter(decision => {
    const matchesSearch = decision.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         decision.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || decision.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!user) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to NeuroFlow</h1>
          <p className="text-gray-600 mb-6">
            Sign in to start creating AI-powered decision workflows and transform how you make complex choices.
          </p>
          <Button onClick={() => window.location.reload()}>
            Sign In to Get Started
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your decisions.
            </p>
          </div>
          <Link to="/create">
            <Button size="lg" className="w-full sm:w-auto">
              <Plus className="h-5 w-5 mr-2" />
              New Decision
            </Button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover gradient>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.label === 'Active Decisions' ? decisions.filter(d => d.status === 'in_progress').length : stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color === 'text-indigo-600' ? 'from-indigo-500 to-purple-600' : stat.color === 'text-emerald-600' ? 'from-emerald-500 to-teal-600' : stat.color === 'text-amber-600' ? 'from-amber-500 to-orange-600' : 'from-purple-500 to-pink-600'}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Decisions List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search decisions..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="draft">Draft</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decisions Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Decisions ({filteredDecisions.length})
                </h2>
                <Badge variant="info">
                  {filteredDecisions.filter(d => d.status === 'in_progress').length} active
                </Badge>
              </div>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading decisions...</p>
                </div>
              ) : filteredDecisions.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredDecisions.map((decision, index) => (
                    <DecisionCard key={decision.id} decision={decision} index={index} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="text-center py-12">
                    <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm || statusFilter !== 'all' ? 'No decisions found' : 'No decisions yet'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria'
                        : 'Start by creating your first decision workflow'
                      }
                    </p>
                    <Link to="/create">
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Decision
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            {profile && (
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Level</span>
                    <Badge variant="primary">{profile.level}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Points</span>
                    <span className="font-semibold text-indigo-600">{profile.points}</span>
                  </div>
                  {profile.badges && profile.badges.length > 0 && (
                    <div>
                      <span className="text-sm text-gray-600 block mb-2">Badges</span>
                      <div className="flex flex-wrap gap-1">
                        {profile.badges.map((badge, index) => (
                          <Badge key={index} variant="success" size="sm">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <activity.icon className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Insights */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-indigo-900">
                        Decision Pattern
                      </p>
                      <p className="text-xs text-indigo-700 mt-1">
                        You tend to make better decisions when you involve stakeholders early
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-emerald-900">
                        Success Streak
                      </p>
                      <p className="text-xs text-emerald-700 mt-1">
                        Your last 5 decisions had positive outcomes - great job!
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Clock className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-900">
                        Time Saver
                      </p>
                      <p className="text-xs text-amber-700 mt-1">
                        You've saved 3.2 hours this week using decision workflows
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};