import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  MessageCircle, 
  UserPlus, 
  Eye, 
  Edit3, 
  MessageSquare,
  Crown,
  Clock,
  Send,
  AtSign,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAuth } from '../../hooks/useAuth';

interface Collaborator {
  id: string;
  user_id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: 'owner' | 'editor' | 'commenter' | 'viewer';
  last_seen: string;
  is_online: boolean;
}

interface Comment {
  id: string;
  user_id: string;
  user_name: string;
  content: string;
  mentions: string[];
  position?: { x: number; y: number };
  is_resolved: boolean;
  created_at: string;
  replies?: Comment[];
}

interface CollaborationPanelProps {
  decisionId: string;
  isOwner: boolean;
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({ 
  decisionId, 
  isOwner 
}) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'collaborators' | 'comments' | 'activity'>('collaborators');
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'editor' | 'commenter' | 'viewer'>('viewer');

  // Mock data for demonstration
  useEffect(() => {
    setCollaborators([
      {
        id: '1',
        user_id: 'user-1',
        email: 'alice@example.com',
        full_name: 'Alice Johnson',
        role: 'owner',
        last_seen: new Date().toISOString(),
        is_online: true
      },
      {
        id: '2',
        user_id: 'user-2',
        email: 'bob@example.com',
        full_name: 'Bob Smith',
        role: 'editor',
        last_seen: new Date(Date.now() - 300000).toISOString(),
        is_online: false
      },
      {
        id: '3',
        user_id: 'user-3',
        email: 'carol@example.com',
        full_name: 'Carol Davis',
        role: 'commenter',
        last_seen: new Date().toISOString(),
        is_online: true
      }
    ]);

    setComments([
      {
        id: '1',
        user_id: 'user-2',
        user_name: 'Bob Smith',
        content: 'Have we considered the financial implications of the part-time learning path?',
        mentions: [],
        is_resolved: false,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        replies: [
          {
            id: '2',
            user_id: 'user-1',
            user_name: 'Alice Johnson',
            content: 'Good point! I\'ll add that to the constraints analysis.',
            mentions: ['user-2'],
            is_resolved: false,
            created_at: new Date(Date.now() - 3000000).toISOString()
          }
        ]
      }
    ]);
  }, [decisionId]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'editor':
        return <Edit3 className="h-4 w-4 text-blue-600" />;
      case 'commenter':
        return <MessageSquare className="h-4 w-4 text-green-600" />;
      case 'viewer':
        return <Eye className="h-4 w-4 text-gray-600" />;
      default:
        return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'warning';
      case 'editor':
        return 'primary';
      case 'commenter':
        return 'success';
      case 'viewer':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const handleInviteCollaborator = () => {
    // In real implementation, this would call the API
    console.log('Inviting:', inviteEmail, 'as', inviteRole);
    setShowInviteModal(false);
    setInviteEmail('');
    setInviteRole('viewer');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user_id: user?.id || 'current-user',
      user_name: user?.user_metadata?.full_name || 'You',
      content: newComment,
      mentions: [],
      is_resolved: false,
      created_at: new Date().toISOString()
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const tabs = [
    { id: 'collaborators', label: 'Collaborators', icon: Users, count: collaborators.length },
    { id: 'comments', label: 'Comments', icon: MessageCircle, count: comments.length },
    { id: 'activity', label: 'Activity', icon: Clock, count: 0 }
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Collaboration</h3>
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInviteModal(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Invite
            </Button>
          )}
        </div>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <Badge variant="secondary" size="sm">
                  {tab.count}
                </Badge>
              )}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === 'collaborators' && (
            <motion.div
              key="collaborators"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {collaborators.map((collaborator) => (
                <div
                  key={collaborator.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">
                        {collaborator.full_name.charAt(0)}
                      </span>
                    </div>
                    {collaborator.is_online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900 truncate">
                        {collaborator.full_name}
                      </p>
                      {getRoleIcon(collaborator.role)}
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {collaborator.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      {collaborator.is_online 
                        ? 'Online now' 
                        : `Last seen ${new Date(collaborator.last_seen).toLocaleDateString()}`
                      }
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={getRoleColor(collaborator.role) as any} size="sm">
                      {collaborator.role}
                    </Badge>
                    {isOwner && collaborator.role !== 'owner' && (
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'comments' && (
            <motion.div
              key="comments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Add Comment */}
              <div className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <AtSign className="h-4 w-4" />
                    <span>Use @ to mention collaborators</span>
                  </div>
                  <Button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    size="sm"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Comment
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-xs">
                          {comment.user_name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {comment.user_name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.content}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <button className="text-gray-600 hover:text-indigo-600">
                            Reply
                          </button>
                          <button className="text-gray-600 hover:text-green-600">
                            {comment.is_resolved ? 'Unresolve' : 'Resolve'}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-11 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex space-x-3">
                            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium text-xs">
                                {reply.user_name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900 text-sm">
                                  {reply.user_name}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {new Date(reply.created_at).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 mb-2">Activity Feed</h3>
                <p className="text-gray-600 text-sm">
                  Recent collaboration activity will appear here
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowInviteModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Invite Collaborator
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="viewer">Viewer - Can view only</option>
                    <option value="commenter">Commenter - Can view and comment</option>
                    <option value="editor">Editor - Can view, comment, and edit</option>
                  </select>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleInviteCollaborator}
                  disabled={!inviteEmail.trim()}
                  className="flex-1"
                >
                  Send Invite
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
};