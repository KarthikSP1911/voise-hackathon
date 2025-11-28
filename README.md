# Smart Healthcare AI Triage System

A full-stack web application for voice-enabled symptom triage using Next.js, Prisma, PostgreSQL, and Groq APIs (Whisper + LLaMA).

## Features

- **Voice & Text Input**: Patients can describe symptoms via voice recording or text
- **AI Processing**: Groq Whisper for transcription and LLaMA for triage analysis
- **Urgency Classification**: Automatic categorization (Self-care, Clinic visit, Urgent, Emergency)
- **Staff Dashboard**: Queue management, case review, and clinician notes
- **Accessibility**: Designed for elderly, low-literacy, and diverse patient populations
- **Red Flag Detection**: Automatic identification of concerning symptoms

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TailwindCSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **AI**: Groq SDK (Whisper for transcription, LLaMA for analysis)
- **Auth**: JWT with bcrypt

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Groq API key

### Installation

1. Clone and navigate to the project:
```bash
cd smart-healthcare-triage
```

2. Install dependencies:
```bash
npm install
npm install @prisma/adapter-pg
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```
DATABASE_URL="postgresql://user:password@localhost:5432/triage_db"
GROQ_API_KEY="your_groq_api_key"
JWT_SECRET="your_secure_random_secret"
```

4. Initialize the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
smart-healthcare-triage/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   ├── cases/
│   │   │   ├── [id]/route.ts
│   │   │   └── route.ts
│   │   ├── triage/route.ts
│   │   └── transcribe/route.ts
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── patient/
│   │   ├── triage/page.tsx
│   │   └── history/page.tsx
│   ├── staff/
│   │   ├── dashboard/page.tsx
│   │   └── case/[id]/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── CaseSummaryPanel.tsx
│   ├── DashboardSidebar.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── PatientCaseCard.tsx
│   ├── TriageForm.tsx
│   ├── UrgencyBadge.tsx
│   └── VoiceRecorderButton.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── groq.ts
│   ├── triage.ts
│   └── validators.ts
├── prisma/
│   └── schema.prisma
└── .env
```

## Database Schema

- **User**: Patient/staff accounts with role-based access
- **TriageCase**: Symptom submissions with AI analysis
- **AIOutput**: Logs of AI processing (Whisper/LLaMA)
- **Notification**: Follow-ups and reminders

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - User login

### Triage
- `POST /api/transcribe` - Transcribe audio using Groq Whisper
- `POST /api/triage` - Process symptoms with LLaMA

### Cases
- `GET /api/cases` - List triage cases (filtered by role)
- `GET /api/cases/[id]` - Get case details
- `PATCH /api/cases/[id]` - Update case (staff only)

## TODO: Implementation Tasks

### High Priority
- [ ] Implement Groq Whisper transcription in `/lib/groq.ts`
- [ ] Implement LLaMA triage processing with structured output
- [ ] Add Web Audio API recording in `VoiceRecorderButton.tsx`
- [ ] Implement authentication context/provider
- [ ] Add case update form in `CaseSummaryPanel.tsx`

### Medium Priority
- [ ] Add notification system
- [ ] Implement follow-up reminders
- [ ] Add analytics dashboard
- [ ] Implement search and filtering
- [ ] Add export functionality for cases

### Low Priority
- [ ] Add unit tests
- [ ] Implement rate limiting
- [ ] Add audit logging
- [ ] Create admin panel
- [ ] Add multi-language support

## Important Notes

⚠️ **Medical Disclaimer**: This is a decision-support tool, NOT a diagnostic tool. It does not replace professional medical advice. In emergencies, call 911 immediately.

## Security Considerations

- All passwords are hashed with bcrypt
- JWT tokens for authentication
- Role-based access control (RBAC)
- Input validation with Zod
- SQL injection protection via Prisma

## License

This project is for educational/demonstration purposes.
