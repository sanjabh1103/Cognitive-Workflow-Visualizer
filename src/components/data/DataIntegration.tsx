import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Plus, 
  RefreshCw, 
  Calendar, 
  DollarSign, 
  BarChart3,
  Globe,
  Zap,
  CheckCircle,
  Trash2,
  Settings,
  Link,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface DataSource {
  id: string;
  name: string;
  source_type: 'api' | 'webhook' | 'manual' | 'scheduled';
  connection_config: any;
  is_active: boolean;
  last_sync?: string;
  sync_frequency_hours: number;
}

interface DataIntegrationProps {
  decisionId: string;
}

export const DataIntegration: React.FC<DataIntegrationProps> = ({ decisionId }) => {
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [showAddSourceModal, setShowAddSourceModal] = useState(false);
  const [selectedSourceType, setSelectedSourceType] = useState<'api' | 'webhook' | 'manual' | 'scheduled'>('api');
  const [showDataPreview, setShowDataPreview] = useState(false);
  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);

  // Mock data for demonstration
  useEffect(() => {
    // Simulated API call to fetch data sources
    setTimeout(() => {
      setDataSources([
        {
          id: '1',
          name: 'Google Calendar',
          source_type: 'api',
          connection_config: {
            api_key: '***********',
            endpoint: 'https://www.googleapis.com/calendar/v3',
            scopes: ['calendar.readonly']
          },
          is_active: true,
          last_sync: new Date(Date.now() - 3600000).toISOString(),
          sync_frequency_hours: 24
        },
        {
          id: '2',
          name: 'Financial Tracker',
          source_type: 'scheduled',
          connection_config: {
            spreadsheet_id: '1A2B3C4D5E',
            sheet_name: 'Monthly Budget'
          },
          is_active: true,
          last_sync: new Date(Date.now() - 86400000).toISOString(),
          sync_frequency_hours: 168
        },
        {
          id: '3',
          name: 'Job Market API',
          source_type: 'api',
          connection_config: {
            api_key: '***********',
            endpoint: 'https://api.jobmarket.example.com/v1',
            region: 'US'
          },
          is_active: false,
          sync_frequency_hours: 72
        }
      ]);
    }, 500);
  }, [decisionId]);

  const getSourceTypeIcon = (type: string) => {
    switch (type) {
      case 'api':
        return <Globe className="h-5 w-5" />;
      case 'webhook':
        return <Zap className="h-5 w-5" />;
      case 'manual':
        return <Database className="h-5 w-5" />;
      case 'scheduled':
        return <Calendar className="h-5 w-5" />;
      default:
        return <Database className="h-5 w-5" />;
    }
  };

  const getSourceTypeColor = (type: string) => {
    switch (type) {
      case 'api':
        return 'text-blue-600 bg-blue-100';
      case 'webhook':
        return 'text-purple-600 bg-purple-100';
      case 'manual':
        return 'text-gray-600 bg-gray-100';
      case 'scheduled':
        return 'text-emerald-600 bg-emerald-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getSourceTypeBadge = (type: string): 'primary' | 'secondary' | 'success' | 'warning' => {
    switch (type) {
      case 'api':
        return 'primary';
      case 'webhook':
        return 'warning';
      case 'manual':
        return 'secondary';
      case 'scheduled':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const handleAddSource = () => {
    // In real implementation, this would call the API
    console.log('Adding source of type:', selectedSourceType);
    setShowAddSourceModal(false);
  };

  const handleViewData = (source: DataSource) => {
    setSelectedSource(source);
    setShowDataPreview(true);
  };

  const handleSyncNow = (sourceId: string) => {
    // In real implementation, this would call the API
    console.log('Syncing source:', sourceId);
    
    // Update the last_sync time for demonstration
    setDataSources(dataSources.map(source => 
      source.id === sourceId 
        ? { ...source, last_sync: new Date().toISOString() } 
        : source
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">External Data Integration</h2>
            <p className="text-sm text-gray-600">
              Connect external data sources to enhance your decision-making
            </p>
          </div>
        </div>
        
        <Button onClick={() => setShowAddSourceModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Data Source
        </Button>
      </div>

      {/* Data Sources */}
      {dataSources.length > 0 ? (
        <div className="space-y-4">
          {dataSources.map((source) => (
            <Card key={source.id} hover>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getSourceTypeColor(source.source_type)}`}>
                      {getSourceTypeIcon(source.source_type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{source.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant={getSourceTypeBadge(source.source_type)} size="sm">
                          {source.source_type}
                        </Badge>
                        {source.is_active ? (
                          <Badge variant="success" size="sm">Active</Badge>
                        ) : (
                          <Badge variant="error" size="sm">Inactive</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="h-4 w-4 text-gray-500" />
                      <div className="text-sm">
                        <span className="text-gray-600">Sync Frequency</span>
                        <p className="font-medium text-gray-900">
                          {source.sync_frequency_hours === 24 ? 'Daily' : 
                           source.sync_frequency_hours === 168 ? 'Weekly' : 
                           `Every ${source.sync_frequency_hours} hours`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div className="text-sm">
                        <span className="text-gray-600">Last Synced</span>
                        <p className="font-medium text-gray-900">
                          {source.last_sync 
                            ? new Date(source.last_sync).toLocaleString() 
                            : 'Never'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSyncNow(source.id)}
                      disabled={!source.is_active}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewData(source)}
                    >
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Data
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 mb-2">No Data Sources Connected</h3>
            <p className="text-gray-600 mb-6">
              Connect external data sources to enhance your decision with real-world data.
            </p>
            <Button onClick={() => setShowAddSourceModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Data Source
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Data Insights */}
      <Card>
        <CardHeader>
          <h3 className="font-semibold text-gray-900">Data Insights</h3>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-indigo-900">Calendar Availability</h4>
                <p className="text-sm text-indigo-700 mt-1">
                  You have 15 hours of available time slots in the next 2 weeks that could be used for learning.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-emerald-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-emerald-900">Financial Projection</h4>
                <p className="text-sm text-emerald-700 mt-1">
                  Based on your current savings rate, you can fund a bootcamp in approximately 8 months.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Job Market Trends</h4>
                <p className="text-sm text-blue-700 mt-1">
                  There are currently 342 entry-level developer positions in your area, a 15% increase from last quarter.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Source Modal */}
      <AnimatePresence>
        {showAddSourceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowAddSourceModal(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Add Data Source
              </h3>
              
              <div className="space-y-6">
                {/* Source Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Source Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedSourceType('api')}
                      className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                        selectedSourceType === 'api'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Globe className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">API Connection</h4>
                        <p className="text-xs text-gray-600">
                          Connect to third-party APIs like Google Calendar, Trello, etc.
                        </p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setSelectedSourceType('webhook')}
                      className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                        selectedSourceType === 'webhook'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Zap className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">Webhook</h4>
                        <p className="text-xs text-gray-600">
                          Receive real-time data from external services
                        </p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setSelectedSourceType('scheduled')}
                      className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                        selectedSourceType === 'scheduled'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">Scheduled Import</h4>
                        <p className="text-xs text-gray-600">
                          Import data from spreadsheets or files on a schedule
                        </p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setSelectedSourceType('manual')}
                      className={`p-4 border rounded-lg flex items-center space-x-3 transition-colors ${
                        selectedSourceType === 'manual'
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Database className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-medium text-gray-900">Manual Data</h4>
                        <p className="text-xs text-gray-600">
                          Manually input or upload data
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
                
                {/* Configuration Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data Source Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Google Calendar"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  
                  {selectedSourceType === 'api' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          API Endpoint
                        </label>
                        <input
                          type="text"
                          placeholder="https://api.example.com/v1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          API Key
                        </label>
                        <input
                          type="password"
                          placeholder="Your API key"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  )}
                  
                  {selectedSourceType === 'webhook' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Webhook URL
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          value="https://neuroflow.example.com/webhook/abc123"
                          readOnly
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                        <button className="px-3 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-lg text-gray-600 hover:bg-gray-200">
                          Copy
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Use this URL in your external service to send data to NeuroFlow
                      </p>
                    </div>
                  )}
                  
                  {selectedSourceType === 'scheduled' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Data Source URL
                        </label>
                        <input
                          type="text"
                          placeholder="https://docs.google.com/spreadsheets/d/..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sync Frequency
                        </label>
                        <select
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="24">Daily</option>
                          <option value="12">Twice Daily</option>
                          <option value="168">Weekly</option>
                          <option value="720">Monthly</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {selectedSourceType === 'manual' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Data File
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Database className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drag and drop a CSV or Excel file, or click to browse
                        </p>
                        <Button variant="outline" size="sm">
                          Browse Files
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddSourceModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddSource}
                  className="flex-1"
                >
                  Add Data Source
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Data Preview Modal */}
      <AnimatePresence>
        {showDataPreview && selectedSource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowDataPreview(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getSourceTypeColor(selectedSource.source_type)}`}>
                    {getSourceTypeIcon(selectedSource.source_type)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{selectedSource.name} Data</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowDataPreview(false)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-6">
                {selectedSource.name === 'Google Calendar' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Upcoming Events</h4>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Team Meeting</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 21, 2025 10:00 AM</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 hour</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Coding Workshop</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 22, 2025 2:00 PM</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 hours</td>
                          </tr>
                          <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Career Counseling</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Jun 25, 2025 11:30 AM</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 minutes</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-indigo-900">Calendar Insights</h4>
                          <p className="text-sm text-indigo-700 mt-1">
                            You have 15 hours of free time in the next week that could be allocated to learning activities.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedSource.name === 'Financial Tracker' && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Financial Summary</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-emerald-50 rounded-lg">
                        <h5 className="text-sm font-medium text-emerald-900 mb-1">Current Savings</h5>
                        <p className="text-2xl font-bold text-emerald-700">$12,500</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h5 className="text-sm font-medium text-blue-900 mb-1">Monthly Income</h5>
                        <p className="text-2xl font-bold text-blue-700">$4,200</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <h5 className="text-sm font-medium text-amber-900 mb-1">Monthly Expenses</h5>
                        <p className="text-2xl font-bold text-amber-700">$3,100</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-indigo-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-indigo-900">Financial Insights</h4>
                          <p className="text-sm text-indigo-700 mt-1">
                            At your current savings rate, you can fund a $15,000 bootcamp in approximately 8 months without touching your emergency fund.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedSource.name === 'Job Market API' && (
                  <div className="flex items-center justify-center p-8">
                    <div className="text-center">
                      <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                      <h4 className="font-medium text-gray-900 mb-2">Connection Inactive</h4>
                      <p className="text-gray-600 mb-4">
                        This data source is currently inactive. Activate it to view job market data.
                      </p>
                      <Button size="sm">
                        <Link className="h-4 w-4 mr-2" />
                        Activate Connection
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
                <Button variant="outline" onClick={() => setShowDataPreview(false)}>
                  Close
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Last synced: {selectedSource.last_sync 
                      ? new Date(selectedSource.last_sync).toLocaleString() 
                      : 'Never'}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSyncNow(selectedSource.id)}
                    disabled={!selectedSource.is_active}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
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