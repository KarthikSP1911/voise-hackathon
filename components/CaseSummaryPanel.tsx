import { TriageCase, User } from '@prisma/client';
import UrgencyBadge from './UrgencyBadge';

interface CaseSummaryPanelProps {
  triageCase: TriageCase & { user: Partial<User> };
}

export default function CaseSummaryPanel({ triageCase }: CaseSummaryPanelProps) {
  const structuredData = triageCase.structuredData as any;
  const redFlags = triageCase.redFlags as string[] | null;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-gray-900">Case Summary</h2>
          {triageCase.urgencyLevel && (
            <UrgencyBadge level={triageCase.urgencyLevel} size="lg" />
          )}
        </div>
        <p className="text-sm text-gray-500">
          Case ID: {triageCase.id}
        </p>
      </div>
      
      {/* Patient Info */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Patient Information</h3>
        <div className="bg-gray-50 rounded p-4 space-y-1">
          <p><strong>Name:</strong> {triageCase.user.name}</p>
          <p><strong>Email:</strong> {triageCase.user.email}</p>
          {triageCase.user.phone && (
            <p><strong>Phone:</strong> {triageCase.user.phone}</p>
          )}
        </div>
      </div>
      
      {/* Raw Input */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Patient Description</h3>
        <p className="text-gray-700 bg-gray-50 rounded p-4">
          {triageCase.rawInput}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Input type: {triageCase.inputType}
        </p>
      </div>
      
      {/* Structured Data */}
      {structuredData && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Structured Analysis</h3>
          <div className="bg-blue-50 rounded p-4 space-y-2">
            {structuredData.chiefComplaint && (
              <p><strong>Chief Complaint:</strong> {structuredData.chiefComplaint}</p>
            )}
            {structuredData.symptoms && (
              <p><strong>Symptoms:</strong> {structuredData.symptoms.join(', ')}</p>
            )}
            {structuredData.duration && (
              <p><strong>Duration:</strong> {structuredData.duration}</p>
            )}
            {structuredData.severity && (
              <p><strong>Severity:</strong> {structuredData.severity}</p>
            )}
          </div>
        </div>
      )}
      
      {/* Red Flags */}
      {redFlags && redFlags.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-red-700">⚠️ Red Flags</h3>
          <ul className="bg-red-50 rounded p-4 space-y-1">
            {redFlags.map((flag, index) => (
              <li key={index} className="text-red-800">• {flag}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* AI Summary */}
      {triageCase.aiSummary && (
        <div>
          <h3 className="text-lg font-semibold mb-2">AI Summary</h3>
          <p className="text-gray-700 bg-gray-50 rounded p-4">
            {triageCase.aiSummary}
          </p>
        </div>
      )}
      
      {/* Rationale */}
      {triageCase.rationale && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Rationale</h3>
          <p className="text-gray-700 bg-gray-50 rounded p-4">
            {triageCase.rationale}
          </p>
        </div>
      )}
      
      {/* Clinician Notes */}
      {triageCase.clinicianNotes && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Clinician Notes</h3>
          <p className="text-gray-700 bg-yellow-50 rounded p-4">
            {triageCase.clinicianNotes}
          </p>
        </div>
      )}
      
      {/* TODO: Add form for staff to update case */}
    </div>
  );
}
