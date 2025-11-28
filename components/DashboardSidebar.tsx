'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/staff/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/staff/cases', label: 'All Cases', icon: '📋' },
    { href: '/staff/urgent', label: 'Urgent Cases', icon: '🚨' },
    { href: '/staff/analytics', label: 'Analytics', icon: '📈' },
  ];
  
  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900">Staff Portal</h2>
        <p className="text-sm text-gray-500">Triage Management</p>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              pathname === item.href
                ? 'bg-blue-50 text-blue-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      
      {/* TODO: Add filters section */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Filters</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Emergency</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Urgent Visit</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Open Cases</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
