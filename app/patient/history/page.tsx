'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PatientCaseCard from '@/components/PatientCaseCard';

export default function PatientHistoryPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchCases();
  }, []);
  
  const fetchCases = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        window.location.href = '/auth/login?redirect=/patient/history';
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
      setCases(data.cases);
      
    } catch (err: any) {
      console.error('Fetch cases error:', err);
      setError(err.message || 'Failed to load your history');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Triage History
            </h1>
            <p className="text-gray-600">
              View your past symptom assessments and recommendations
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading your history...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="text-red-800">{error}</p>
            </div>
          ) : cases.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600 mb-4">No triage cases yet</p>
              <a
                href="/patient/triage"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                Start Your First Assessment
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {cases.map((triageCase: any) => (
                <PatientCaseCard key={triageCase.id} triageCase={triageCase} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
