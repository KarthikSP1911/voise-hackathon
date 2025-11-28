'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TriageForm from '@/components/TriageForm';

export default function TriagePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (data: { rawInput: string; inputType: 'voice' | 'text' }) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // TODO: Get auth token from context/localStorage
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        router.push('/auth/login?redirect=/patient/triage');
        return;
      }
      
      const response = await fetch('/api/triage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit triage');
      }
      
      const result = await response.json();
      
      // Redirect to case details or history
      router.push(`/patient/history`);
      
    } catch (err: any) {
      console.error('Triage submission error:', err);
      setError(err.message || 'Failed to submit symptoms. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Symptom Assessment
            </h1>
            <p className="text-gray-600">
              Describe your symptoms in detail. You can type or use voice input.
            </p>
          </div>
          
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}
          
          {isSubmitting ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-700">Processing your symptoms...</p>
            </div>
          ) : (
            <TriageForm onSubmit={handleSubmit} />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
