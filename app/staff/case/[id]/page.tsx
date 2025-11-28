'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardSidebar from '@/components/DashboardSidebar';
import CaseSummaryPanel from '@/components/CaseSummaryPanel';

export default function CaseDetailPage() {
  const params = useParams();
  const [triageCase, setTriageCase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (params.id) {
      fetchCase(params.id as string);
    }
  }, [params.id]);
  
  const fetchCase = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        window.location.href = '/auth/login?redirect=/staff/case/' + id;
        return;
      }
      
      const response = await fetch(`/api/cases/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch case');
      }
      
      const data = await response.json();
      setTriageCase(data.case);
      
    } catch (err: any) {
      console.error('Fetch case error:', err);
      setError(err.message || 'Failed to load case');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      
      <main className="flex-1 p-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading case details...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">{error}</p>
          </div>
        ) : triageCase ? (
          <CaseSummaryPanel triageCase={triageCase} />
        ) : null}
      </main>
    </div>
  );
}
