import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  Clock, 
  DollarSign,
  Award,
  MessageSquare,
  Briefcase,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface Expert {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  expertise_areas: string[];
  experience_highlights: string;
  advice_style: string;
  availability_status: 'available' | 'limited' | 'unavailable';
  credibility_score: number;
  sessions_completed: number;
  average_rating: number;
  hourly_rate: number;
  verification_status: 'pending' | 'verified' | 'rejected';
}

interface ExpertNetworkProps {
  decisionId?: string;
  decisionType?: string;
}

export const ExpertNetwork: React.FC<ExpertNetworkProps> = ({ 
  decisionId,
  decisionType = 'Career Change'
}) => {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockExperts: Expert[] = [
      {
        id: '1',
        user_id: 'user-1',
        full_name: 'Dr. Sarah Chen',
        expertise_areas: ['Career Transitions', 'Tech Industry', 'Financial Planning'],
        experience_highlights: '15+ years in tech industry recruitment and career coaching. Former HR Director at Fortune 500 companies.',
        advice_style: 'Analytical and data-driven with practical action steps',
        availability_status: 'available',
        credibility_score: 4.8,
        sessions_completed: 127,
        average_rating: 4.9,
        hourly_rate: 150,
        verification_status: 'verified'
      },
      {
        id: '2',
        user_id: 'user-2',
        full_name: 'Michael Rodriguez',
        expertise_areas: ['Software Development', 'Bootcamp Transitions', 'Remote Work'],
        experience_highlights: 'Senior Developer with 10+ years experience. Transitioned from marketing to development via bootcamp.',
        advice_style: 'Supportive and empathetic with focus on practical skill building',
        availability_status: 'limited',
        credibility_score: 4.5,
        sessions_completed: 84,
        average_rating: 4.7,
        hourly_rate: 120,
        verification_status: 'verified'
      },
      {
        id: '3',
        user_id: 'user-3',
        full_name: 'Priya Sharma',
        expertise_areas: ['Career Transitions', 'Work-Life Balance', 'Negotiation'],
        experience_highlights: 'Career coach specializing in mid-career transitions. Author of "Pivot with Purpose".',
        advice_style: 'Holistic approach balancing career goals with personal values',
        availability_status: 'available',
        credibility_score: 4.6,
        sessions_completed: 156,
        average_rating: 4.8,
        hourly_rate: 175,
        verification_status: 'verified'
      },
      {
        id: '4',
        user_id: 'user-4',
        full_name: 'James Wilson',
        expertise_areas: ['Financial Planning', 'Career ROI', 'Education Investment'],
        experience_highlights: 'Certified Financial Planner with specialty in career transitions and education ROI analysis.',
        advice_style: 'Numbers-focused with clear financial projections',
        availability_status: 'available',
        credibility_score: 4.7,
        sessions_completed: 93,
        average_rating: 4.6,
        hourly_rate: 200,
        verification_status: 'verified'
      }
    ];
    
    setExperts(mockExperts);
    setFilteredExperts(mockExperts);
  }, []);

  // Filter experts based on search and filters
  useEffect(() => {
    let filtered = [...experts];
    
    // Search term filter
    if (searchTerm) {
      filtered = filtered.filter(expert => 
        expert.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        expert.expertise_areas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Expertise filter
    if (selectedExpertise.length > 0) {
      filtered = filtered.filter(expert => 
        selectedExpertise.some(expertise => expert.expertise_areas.includes(expertise))
      );
    }
    
    // Price range filter
    filtered = filtered.filter(expert => 
      expert.hourly_rate >= priceRange[0] && expert.hourly_rate <= priceRange[1]
    );
    
    // Rating filter
    if (ratingFilter > 0) {
      filtered = filtered.filter(expert => expert.average_rating >= ratingFilter);
    }
    
    setFilteredExperts(filtered);
  }, [experts, searchTerm, selectedExpertise, priceRange, ratingFilter]);

  // Get all unique expertise areas
  const allExpertiseAreas = Array.from(
    new Set(experts.flatMap(expert => expert.expertise_areas))
  );

  const toggleExpertiseFilter = (expertise: string) => {
    if (selectedExpertise.includes(expertise)) {
      setSelectedExpertise(selectedExpertise.filter(e => e !== expertise));
    } else {
      setSelectedExpertise([...selectedExpertise, expertise]);
    }
  };

  const handleExpertSelect = (expert: Expert) => {
    setSelectedExpert(expert);
    setShowConsultationModal(true);
  };

  const handleRequestConsultation = () => {
    // In real implementation, this would call the API
    console.log('Requesting consultation with:', selectedExpert);
    setShowConsultationModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Expert Network</h2>
            <p className="text-sm text-gray-600">
              Connect with verified experts for personalized guidance
            </p>
          </div>
        </div>
        
        {decisionId && (
          <Badge variant="info" size="lg">
            Matched for: {decisionType}
          </Badge>
        )}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search experts by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {showFilters ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </Button>
              
              <div className="text-sm text-gray-600">
                Showing {filteredExperts.length} of {experts.length} experts
              </div>
            </div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4 pt-3 border-t border-gray-200"
                >
                  {/* Expertise Areas */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {allExpertiseAreas.map((expertise) => (
                        <button
                          key={expertise}
                          onClick={() => toggleExpertiseFilter(expertise)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                            selectedExpertise.includes(expertise)
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {expertise}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-gray-700">Hourly Rate</h4>
                      <span className="text-xs text-gray-600">
                        ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="25"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  
                  {/* Rating Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</h4>
                    <div className="flex items-center space-x-2">
                      {[0, 3, 3.5, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setRatingFilter(rating)}
                          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                            ratingFilter === rating
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          }`}
                        >
                          {rating === 0 ? 'Any' : `${rating}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      {/* Experts List */}
      <div className="space-y-4">
        {filteredExperts.length > 0 ? (
          filteredExperts.map((expert, index) => (
            <motion.div
              key={expert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    {/* Expert Profile */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {expert.full_name.charAt(0)}
                          </span>
                        </div>
                        {expert.verification_status === 'verified' && (
                          <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{expert.full_name}</h3>
                          <Badge variant="success" size="sm">Verified</Badge>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= Math.floor(expert.average_rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">
                            {expert.average_rating} ({expert.sessions_completed} sessions)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {expert.expertise_areas.map((area) => (
                            <Badge key={area} variant="secondary" size="sm">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Expert Details */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Briefcase className="h-4 w-4 text-gray-500" />
                        <div className="text-sm">
                          <span className="text-gray-600">Experience</span>
                          <p className="font-medium text-gray-900">{expert.sessions_completed} sessions</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <div className="text-sm">
                          <span className="text-gray-600">Hourly Rate</span>
                          <p className="font-medium text-gray-900">${expert.hourly_rate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <div className="text-sm">
                          <span className="text-gray-600">Availability</span>
                          <p className="font-medium text-gray-900 capitalize">{expert.availability_status}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Button */}
                    <div>
                      <Button onClick={() => handleExpertSelect(expert)}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Request Consultation
                      </Button>
                    </div>
                  </div>
                  
                  {/* Expert Bio */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-700">{expert.experience_highlights}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Advice style:</span> {expert.advice_style}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-2">No Experts Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search criteria to find experts that match your needs.
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedExpertise([]);
                setPriceRange([0, 500]);
                setRatingFilter(0);
              }}>
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Consultation Modal */}
      <AnimatePresence>
        {showConsultationModal && selectedExpert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowConsultationModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-indigo-600" />
                Request Consultation with {selectedExpert.full_name}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-indigo-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {selectedExpert.full_name.charAt(0)}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{selectedExpert.full_name}</h4>
                      <Badge variant="success" size="sm">Verified</Badge>
                    </div>
                    <div className="flex items-center space-x-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-3 w-3 ${star <= Math.floor(selectedExpert.average_rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-xs text-gray-600 ml-1">
                        {selectedExpert.average_rating} ({selectedExpert.sessions_completed} sessions)
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div className="text-sm">
                      <span className="text-gray-600">Duration</span>
                      <p className="font-medium text-gray-900">60 minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <div className="text-sm">
                      <span className="text-gray-600">Total Cost</span>
                      <p className="font-medium text-gray-900">${selectedExpert.hourly_rate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div className="text-sm">
                      <span className="text-gray-600">Next Available</span>
                      <p className="font-medium text-gray-900">Tomorrow, 2:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message to Expert
                  </label>
                  <textarea
                    placeholder="Describe what you'd like to discuss in this consultation..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>
                
                <div className="flex space-x-3 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setShowConsultationModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleRequestConsultation}
                    className="flex-1"
                  >
                    Request Consultation
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};