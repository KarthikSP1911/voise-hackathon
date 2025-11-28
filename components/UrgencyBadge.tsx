import { UrgencyLevel } from '@prisma/client';

interface UrgencyBadgeProps {
  level: UrgencyLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export default function UrgencyBadge({ level, size = 'md', showIcon = true }: UrgencyBadgeProps) {
  const config = {
    EMERGENCY: {
      color: 'bg-red-100 text-red-800 border-red-300 ring-red-500',
      icon: '🚨',
      label: 'Emergency',
      description: 'Immediate attention required',
    },
    URGENT_VISIT: {
      color: 'bg-orange-100 text-orange-800 border-orange-300 ring-orange-500',
      icon: '⚠️',
      label: 'Urgent Visit',
      description: 'See doctor today',
    },
    CLINIC_VISIT: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300 ring-yellow-500',
      icon: '📅',
      label: 'Clinic Visit',
      description: 'Schedule appointment',
    },
    SELF_CARE: {
      color: 'bg-green-100 text-green-800 border-green-300 ring-green-500',
      icon: '✅',
      label: 'Self-Care',
      description: 'Monitor at home',
    },
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };
  
  const iconSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const { color, icon, label } = config[level];
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${color} ${sizeClasses[size]} shadow-sm`}
      role="status"
      aria-label={`Urgency level: ${label}`}
    >
      {showIcon && <span className={iconSizes[size]} aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </span>
  );
}

// Detailed urgency card for case details
export function UrgencyCard({ level }: { level: UrgencyLevel }) {
  const config = {
    EMERGENCY: {
      color: 'bg-red-50 border-red-200',
      textColor: 'text-red-900',
      icon: '🚨',
      label: 'Emergency',
      description: 'Immediate medical attention required',
      action: 'Call 911 or go to ER immediately',
    },
    URGENT_VISIT: {
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-900',
      icon: '⚠️',
      label: 'Urgent Visit',
      description: 'Requires same-day medical evaluation',
      action: 'Visit urgent care or doctor today',
    },
    CLINIC_VISIT: {
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-900',
      icon: '📅',
      label: 'Clinic Visit',
      description: 'Schedule appointment within a few days',
      action: 'Contact primary care provider',
    },
    SELF_CARE: {
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-900',
      icon: '✅',
      label: 'Self-Care',
      description: 'Can be managed at home',
      action: 'Monitor symptoms and rest',
    },
  };
  
  const { color, textColor, icon, label, description, action } = config[level];
  
  return (
    <div className={`${color} border-2 rounded-xl p-6`}>
      <div className="flex items-start space-x-4">
        <div className="text-4xl" aria-hidden="true">{icon}</div>
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${textColor} mb-2`}>{label}</h3>
          <p className={`${textColor} mb-3`}>{description}</p>
          <div className={`${textColor} font-semibold flex items-center space-x-2`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{action}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
