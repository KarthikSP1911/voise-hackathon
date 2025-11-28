import { TriageCase, User } from '@prisma/client';
import UrgencyBadge from './UrgencyBadge';
import Link from 'next/link';

interface PatientCaseCardProps {
  triageCase: TriageCase & { user?: Partial<User> };
  showPatientInfo?: boolean;
}

export default function PatientCaseCard({ triageCase, showPatientInfo = false }: PatientCaseCardProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <Link href={`/staff/case/${triageCase.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            {showPatientInfo && triageCase.user && (
              <p className="text-sm font-medium text-gray-900 mb-1">
                {triageCase.user.name}
              </p>
            )}
            <p className="text-xs text-gray-500">
              {formatDate(triageCase.createdAt)}
            </p>
          </div>
          
          <div className="flex flex-col items-end space-y-2">
            {triageCase.urgencyLevel && (
              <UrgencyBadge level={triageCase.urgencyLevel} size="sm" />
            )}
            <span className={`text-xs px-2 py-1 rounded-full ${
              triageCase.status === 'OPEN' ? 'bg-blue-100 text-blue-800' :
              triageCase.status === 'IN_PROGRESS' ? 'bg-purple-100 text-purple-800' :
              triageCase.status === 'RESOLVED' ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {triageCase.status}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-700 line-clamp-2 mb-2">
          {triageCase.rawInput}
        </p>
        
        {triageCase.aiSummary && (
          <p className="text-xs text-gray-600 line-clamp-1 italic">
            {triageCase.aiSummary}
          </p>
        )}
      </div>
    </Link>
  );
}
