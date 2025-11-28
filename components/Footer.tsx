export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency Banner */}
        <div className="emergency-banner mb-8">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold text-red-900 text-lg mb-1">Medical Emergency?</h3>
              <p className="text-red-800 text-sm leading-relaxed">
                This is a decision-support tool, <strong>not a replacement for professional medical care</strong>. 
                In case of emergency, call <strong className="text-red-900">911</strong> immediately or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Smart Healthcare</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              AI-powered triage assistant designed to improve healthcare access and symptom communication for all patients.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/patient/triage" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Start Triage
                </a>
              </li>
              <li>
                <a href="/patient/history" className="text-gray-600 hover:text-blue-600 transition-colors">
                  My History
                </a>
              </li>
              <li>
                <a href="/staff/dashboard" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Staff Portal
                </a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Smart Healthcare. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>HIPAA Compliant</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure & Private</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
