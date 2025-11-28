# Smart Healthcare AI Triage System - Project Overview

## 🎯 Project Goal

Build a voice-enabled triage assistant to reduce non-emergency healthcare load and improve symptom communication for elderly, low-literacy, and patients who struggle to describe symptoms.

## ✅ What Has Been Completed

### 1. Project Initialization ✓
- Next.js 15 with App Router
- TypeScript configuration
- TailwindCSS styling
- ESLint setup

### 2. Dependencies Installed ✓
- `@prisma/client` - Database ORM
- `prisma` - Database toolkit
- `pg` - PostgreSQL driver
- `groq-sdk` - Groq AI APIs
- `zod` - Schema validation
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `axios` - HTTP client

### 3. Database Schema ✓
Complete Prisma schema with:
- **User** model (role-based: PATIENT/STAFF/ADMIN)
- **TriageCase** model (symptoms, AI analysis, urgency)
- **AIOutput** model (Whisper/LLaMA logs)
- **Notification** model (follow-ups, reminders)

### 4. Library Utilities ✓
- `lib/auth.ts` - JWT & password utilities
- `lib/db.ts` - Prisma client singleton
- `lib/groq.ts` - Groq API helpers (scaffolded)
- `lib/triage.ts` - Triage logic helpers
- `lib/validators.ts` - Zod validation schemas

### 5. API Routes ✓
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/transcribe` - Audio transcription (scaffolded)
- `POST /api/triage` - Symptom processing (scaffolded)
- `GET /api/cases` - List cases
- `GET /api/cases/[id]` - Get case details
- `PATCH /api/cases/[id]` - Update case (staff only)

### 6. UI Components ✓
- `Navbar.tsx` - Navigation with auth
- `Footer.tsx` - Footer with disclaimer
- `TriageForm.tsx` - Voice/text symptom input
- `VoiceRecorderButton.tsx` - Voice recording (scaffolded)
- `UrgencyBadge.tsx` - Visual urgency indicators
- `PatientCaseCard.tsx` - Case list item
- `CaseSummaryPanel.tsx` - Detailed case view
- `DashboardSidebar.tsx` - Staff navigation

### 7. Pages ✓
- `/` - Landing page with features
- `/auth/login` - User login
- `/auth/register` - User registration
- `/patient/triage` - Symptom submission
- `/patient/history` - Patient case history
- `/staff/dashboard` - Staff triage queue
- `/staff/case/[id]` - Case detail view

### 8. Configuration Files ✓
- `.env.example` - Environment template
- `.gitignore` - Git ignore rules
- `prisma/schema.prisma` - Database schema
- `prisma/prisma.config.ts` - Prisma v7 config
- `README.md` - Project documentation
- `SETUP.md` - Setup instructions
- `PROJECT_OVERVIEW.md` - This file

## 🚧 What Needs Implementation

### High Priority (Core Functionality)

#### 1. Groq Whisper Integration
**File**: `lib/groq.ts` - `transcribeAudio()` function
```typescript
// TODO: Implement audio transcription
const transcription = await groq.audio.transcriptions.create({
  file: audioFile,
  model: "whisper-large-v3",
});
return transcription.text;
```

#### 2. Groq LLaMA Processing
**File**: `lib/groq.ts` - `processTriageWithLLaMA()` function
```typescript
// TODO: Implement structured triage analysis
const completion = await groq.chat.completions.create({
  messages: [...],
  model: "llama-3.3-70b-versatile",
  response_format: { type: "json_object" }
});
```

#### 3. Voice Recording
**File**: `components/VoiceRecorderButton.tsx`
- Implement Web Audio API / MediaRecorder
- Capture audio blob
- Send to `/api/transcribe`
- Handle response

#### 4. Authentication Context
Create a React Context for:
- User state management
- Token storage/retrieval
- Protected route handling
- Role-based UI rendering

#### 5. Case Update Form
**File**: `components/CaseSummaryPanel.tsx`
- Add form for staff to update cases
- Status dropdown
- Clinician notes textarea
- Urgency override
- Submit handler

### Medium Priority (Enhanced Features)

#### 6. Notification System
- Email/SMS integration
- Follow-up scheduling
- Reminder triggers
- Notification preferences

#### 7. Search & Filtering
- Search cases by patient name
- Filter by urgency level
- Filter by status
- Date range filtering

#### 8. Analytics Dashboard
- Case volume metrics
- Urgency distribution
- Response time tracking
- Staff performance

#### 9. Export Functionality
- Export case data to PDF
- CSV export for analytics
- Print-friendly case summaries

### Low Priority (Polish & Scale)

#### 10. Testing
- Unit tests for utilities
- Integration tests for API routes
- E2E tests for user flows
- Component tests

#### 11. Security Enhancements
- Rate limiting
- CSRF protection
- Audit logging
- Session management

#### 12. Admin Panel
- User management
- System configuration
- Audit log viewer
- Analytics dashboard

#### 13. Accessibility
- Screen reader optimization
- Keyboard navigation
- High contrast mode
- Font size controls

#### 14. Internationalization
- Multi-language support
- Localized content
- RTL language support

## 📁 Project Structure

```
smart-healthcare-triage/
├── app/
│   ├── api/                    # API route handlers
│   │   ├── auth/              # Authentication endpoints
│   │   ├── cases/             # Case management
│   │   ├── triage/            # Triage processing
│   │   └── transcribe/        # Audio transcription
│   ├── auth/                  # Auth pages
│   ├── patient/               # Patient portal
│   ├── staff/                 # Staff dashboard
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
├── components/                # React components
├── lib/                       # Utility functions
├── prisma/                    # Database schema
├── .env                       # Environment variables
├── .env.example              # Environment template
├── README.md                 # Main documentation
├── SETUP.md                  # Setup guide
└── PROJECT_OVERVIEW.md       # This file
```

## 🔑 Key Features by User Role

### Patient Features
- ✅ Voice or text symptom input
- ✅ View triage history
- ✅ See urgency classification
- ✅ Receive recommendations
- 🚧 Get follow-up notifications
- 🚧 Access self-care guidance

### Staff Features
- ✅ View prioritized triage queue
- ✅ Access detailed case information
- ✅ See AI-generated summaries
- ✅ View red flag indicators
- 🚧 Update case status
- 🚧 Add clinician notes
- 🚧 Override AI decisions
- 🚧 Search and filter cases

### Admin Features
- 🚧 User management
- 🚧 System analytics
- 🚧 Configuration settings
- 🚧 Audit logs

## 🎨 Design Principles

1. **Accessibility First**: Large buttons, high contrast, voice-first
2. **Clinical Safety**: Clear disclaimers, red flag highlighting
3. **Decision Support**: AI assists, doesn't diagnose
4. **Privacy**: Secure data handling, role-based access
5. **Simplicity**: Clean UI, minimal cognitive load

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma db push

# Run development server
npm run dev

# View database
npx prisma studio
```

## 📊 Database Models

### User
- Authentication & profile
- Role-based access (PATIENT/STAFF/ADMIN)
- Contact information

### TriageCase
- Patient symptoms (raw + structured)
- AI analysis results
- Urgency classification
- Case management (status, notes)

### AIOutput
- Logs of AI processing
- Model used (Whisper/LLaMA)
- Processing time
- Prompts & responses

### Notification
- Follow-up reminders
- Self-care guidance
- Appointment reminders
- Read/unread status

## 🔐 Security Features

- ✅ Password hashing (bcrypt)
- ✅ JWT authentication
- ✅ Role-based access control
- ✅ Input validation (Zod)
- ✅ SQL injection protection (Prisma)
- 🚧 Rate limiting
- 🚧 CSRF protection
- 🚧 Audit logging

## 📝 Environment Variables

```env
DATABASE_URL="postgresql://..."     # PostgreSQL connection
GROQ_API_KEY="gsk_..."             # Groq API key
JWT_SECRET="random_string"          # JWT signing secret
NEXT_PUBLIC_APP_URL="http://..."   # App URL
```

## 🎯 Next Steps

1. **Get Groq API Key**: Sign up at https://console.groq.com
2. **Set up Database**: Use Neon, Supabase, or local PostgreSQL
3. **Configure Environment**: Copy `.env.example` to `.env`
4. **Initialize Database**: Run `npx prisma db push`
5. **Start Development**: Run `npm run dev`
6. **Implement AI Features**: Follow TODO comments in code

## 📚 Documentation Links

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Groq Docs](https://console.groq.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## ⚠️ Important Notes

- This is a **decision-support tool**, not a diagnostic tool
- Always include medical disclaimers
- In emergencies, direct users to call 911
- Comply with healthcare data regulations (HIPAA, etc.)
- Test thoroughly before production use

## 📞 Support

For questions or issues:
1. Check `SETUP.md` for setup help
2. Review `README.md` for API documentation
3. Check TODO comments in code files
4. Refer to official documentation links above
