import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Smart Healthcare AI Triage
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Voice-enabled symptom assessment to improve healthcare access
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/patient/triage"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors"
                >
                  Start Triage Assessment
                </Link>
                <Link
                  href="/staff/dashboard"
                  className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-600 transition-colors border-2 border-white"
                >
                  Staff Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎤</div>
              <h3 className="text-xl font-semibold mb-3">Voice or Text Input</h3>
              <p className="text-gray-600">
                Describe your symptoms using voice recording or text. Designed for accessibility.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">
                Advanced AI processes your symptoms and identifies urgency levels and red flags.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="text-5xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold mb-3">Clinical Review</h3>
              <p className="text-gray-600">
                Healthcare staff review AI recommendations and provide appropriate care guidance.
              </p>
            </div>
          </div>
        </div>
        
        {/* Benefits Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Who Benefits
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">For Patients</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Easy voice-based symptom reporting</li>
                  <li>✓ Accessible for elderly and low-literacy users</li>
                  <li>✓ Quick urgency assessment</li>
                  <li>✓ Clear guidance on next steps</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3 text-blue-600">For Healthcare Staff</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Structured patient information</li>
                  <li>✓ Automated red flag detection</li>
                  <li>✓ Prioritized triage queue</li>
                  <li>✓ Reduced non-emergency load</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">
              Important Medical Disclaimer
            </h3>
            <p className="text-yellow-800">
              This system is a decision-support tool designed to assist with triage and symptom assessment.
              It is NOT a replacement for professional medical advice, diagnosis, or treatment.
              In case of emergency, call 911 or go to the nearest emergency room immediately.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
