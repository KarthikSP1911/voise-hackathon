'use client';

import { useEffect, useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import PatientCaseCard from '@/components/PatientCaseCard';

type FilterType = 'all' | 'EMERGENCY' | 'URGENT_VISIT' | 'CLINIC_VISIT' | 'SELF_CARE';
type StatusFilterType = 'all' | 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';

export default function StaffDashboardPage() {
  const [allCases, setAllCases] = useState<any[]>([]);
  const [filteredCases, setFilteredCases] = useState<any[]>([]);
  const [urgencyFilter, setUrgencyFilter] = useState<FilterType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('all');
  const [stats, setStats] = useState({
    total: 0,
    emergency: 0,
    urgent: 0,
    open: 0,
    distressed: 0,
  });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  useEffect(() => {
    applyFilters();
  }, [urgencyFilter, statusFilter, allCases]);
  
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        window.location.href = '/auth/login?redirect=/staff/dashboard';
        return;
      }
      
      const response = await fetch('/api/cases', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cases');
      }
      
      const data = await response.json();
      setAllCases(data.cases);
      
      // Calculate stats
      const emergency = data.cases.filter((c: any) => c.urgencyLevel === 'EMERGENCY').length;
      const urgent = data.cases.filter((c: any) => c.urgencyLevel === 'URGENT_VISIT').length;
      const open = data.cases.filter((c: any) => c.status === 'OPEN').length;
      
      // Count distressed patients (from sentiment analysis)
      const distressed = data.cases.filter((c: any) => {
        const emotionalState = c.structuredData?.emotionalState;
        return emotionalState === 'distressed' || emotionalState === 'panicked';
      }).length;
      
      setStats({
        total: data.cases.length,
        emergency,
        urgent,
        open,
        distressed,
      });
      
    } catch (err) {
      console.error('Fetch dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const applyFilters = () => {
    let filtered = [...allCases];
    
    // Apply urgency filter
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(c => c.urgencyLevel === urgencyFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }
    
    setFilteredCases(filtered);
  };
  
  const clearFilters = () => {
    setUrgencyFilter('all');
    setStatusFilter('all');
  };
  
  const activeFiltersCount = (urgencyFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Triage Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage patient triage cases with AI-powered sentiment analysis
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Cases</p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          </div>
          
          <div className="bg-red-50 rounded-lg shadow-sm p-6 border-2 border-red-300 cursor-pointer hover:shadow-md transition-shadow"
               onClick={() => setUrgencyFilter(urgencyFilter === 'EMERGENCY' ? 'all' : 'EMERGENCY')}>
            <p className="text-sm text-red-600 mb-1 font-semibold">🚨 Emergency</p>
            <p className="text-3xl font-bold text-red-700">{stats.emergency}</p>
            {urgencyFilter === 'EMERGENCY' && (
              <p className="text-xs text-red-600 mt-2">✓ Filtered</p>
            )}
          </div>
          
          <div className="bg-orange-50 rounded-lg shadow-sm p-6 border-2 border-orange-300 cursor-pointer hover:shadow-md transition-shadow"
               onClick={() => setUrgencyFilter(urgencyFilter === 'URGENT_VISIT' ? 'all' : 'URGENT_VISIT')}>
            <p className="text-sm text-orange-600 mb-1 font-semibold">⚠️ Urgent</p>
            <p className="text-3xl font-bold text-orange-700">{stats.urgent}</p>
            {urgencyFilter === 'URGENT_VISIT' && (
              <p className="text-xs text-orange-600 mt-2">✓ Filtered</p>
            )}
          </div>
          
          <div className="bg-blue-50 rounded-lg shadow-sm p-6 border-2 border-blue-300 cursor-pointer hover:shadow-md transition-shadow"
               onClick={() => setStatusFilter(statusFilter === 'OPEN' ? 'all' : 'OPEN')}>
            <p className="text-sm text-blue-600 mb-1 font-semibold">📋 Open Cases</p>
            <p className="text-3xl font-bold text-blue-700">{stats.open}</p>
            {statusFilter === 'OPEN' && (
              <p className="text-xs text-blue-600 mt-2">✓ Filtered</p>
            )}
          </div>
          
          <div className="bg-purple-50 rounded-lg shadow-sm p-6 border-2 border-purple-300">
            <p className="text-sm text-purple-600 mb-1 font-semibold">😰 Distressed</p>
            <p className="text-3xl font-bold text-purple-700">{stats.distressed}</p>
            <p className="text-xs text-purple-600 mt-1">High anxiety</p>
          </div>
        </div>
        
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Urgency:</span>
              <select
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value as FilterType)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="EMERGENCY">🚨 Emergency</option>
                <option value="URGENT_VISIT">⚠️ Urgent Visit</option>
                <option value="CLINIC_VISIT">🏥 Clinic Visit</option>
                <option value="SELF_CARE">💊 Self Care</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilterType)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            
            {activeFiltersCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters ({activeFiltersCount})
              </button>
            )}
            
            <div className="ml-auto text-sm text-gray-600">
              Showing {filteredCases.length} of {stats.total} cases
            </div>
          </div>
        </div>
        
        {/* Cases List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            {urgencyFilter !== 'all' || statusFilter !== 'all' ? 'Filtered Cases' : 'All Cases'}
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading cases...</p>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No cases found</p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Clear filters to see all cases
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredCases.map((triageCase: any) => (
                <PatientCaseCard
                  key={triageCase.id}
                  triageCase={triageCase}
                  showPatientInfo={true}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
