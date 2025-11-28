import { z } from 'zod';

// Auth validators
export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(),
  role: z.enum(['PATIENT', 'STAFF', 'ADMIN']).default('PATIENT'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Triage validators
export const triageInputSchema = z.object({
  rawInput: z.string().min(10, 'Please provide more details about your symptoms'),
  inputType: z.enum(['voice', 'text']),
  transcript: z.string().optional(),
});

export const updateCaseSchema = z.object({
  status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
  clinicianNotes: z.string().optional(),
  staffOverride: z.boolean().optional(),
  overrideReason: z.string().optional(),
  urgencyLevel: z.enum(['SELF_CARE', 'CLINIC_VISIT', 'URGENT_VISIT', 'EMERGENCY']).optional(),
});

// Structured data schema
export const structuredDataSchema = z.object({
  chiefComplaint: z.string(),
  symptoms: z.array(z.string()),
  duration: z.string(),
  onset: z.string(),
  severity: z.enum(['mild', 'moderate', 'severe']),
  associatedSymptoms: z.array(z.string()),
  relevantHistory: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type TriageInput = z.infer<typeof triageInputSchema>;
export type UpdateCaseInput = z.infer<typeof updateCaseSchema>;
export type StructuredData = z.infer<typeof structuredDataSchema>;
