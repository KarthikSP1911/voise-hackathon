# Setup Instructions

Follow these steps to get the Smart Healthcare AI Triage System running locally.

## Step 1: Database Setup

### Option A: Local PostgreSQL
1. Install PostgreSQL on your machine
2. Create a new database:
```sql
CREATE DATABASE triage_db;
```

### Option B: Cloud PostgreSQL (Recommended for quick start)
Use a free PostgreSQL service like:
- [Neon](https://neon.tech) - Free tier with instant setup
- [Supabase](https://supabase.com) - Free tier with additional features
- [Railway](https://railway.app) - Free tier available

## Step 2: Environment Variables

1. Copy the example env file:
```bash
cp .env.example .env
```

2. Update `.env` with your credentials:
```env
DATABASE_URL="postgresql://username:password@host:5432/triage_db"
GROQ_API_KEY="your_groq_api_key_here"
JWT_SECRET="generate_a_long_random_string_here"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Get a Groq API Key:
1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste into `.env`

### Generate JWT Secret:
Run this command to generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Install Prisma Adapter

Prisma v7 requires the PostgreSQL adapter:
```bash
npm install @prisma/adapter-pg
```

## Step 4: Initialize Database

Run Prisma migrations to create database tables:
```bash
npx prisma generate
npx prisma db push
```

To view your database in Prisma Studio:
```bash
npx prisma studio
```

## Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 6: Create Test Accounts

### Create a Patient Account:
1. Go to http://localhost:3000/auth/register
2. Fill in the form with role: PATIENT
3. Submit to create account

### Create a Staff Account:
You can either:
- Register with role: STAFF through the UI
- Or manually update a user in the database:
```sql
UPDATE "User" SET role = 'STAFF' WHERE email = 'staff@example.com';
```

## Testing the System

### As a Patient:
1. Login at `/auth/login`
2. Go to `/patient/triage`
3. Describe symptoms (text input works, voice needs implementation)
4. View history at `/patient/history`

### As Staff:
1. Login with staff account
2. Go to `/staff/dashboard`
3. View triage queue
4. Click on cases to see details

## Next Steps: Implement AI Features

The scaffold is complete, but AI features need implementation:

### 1. Groq Whisper Integration
Edit `lib/groq.ts` - `transcribeAudio()` function

### 2. Groq LLaMA Integration
Edit `lib/groq.ts` - `processTriageWithLLaMA()` function

### 3. Voice Recording
Edit `components/VoiceRecorderButton.tsx` - Add Web Audio API

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Test connection with: `npx prisma db pull`

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

### Prisma Client Issues
```bash
# Regenerate Prisma Client
npx prisma generate
```

### TypeScript Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

## Production Deployment

### Environment Variables
Set these in your hosting platform:
- `DATABASE_URL` - Production PostgreSQL URL
- `GROQ_API_KEY` - Your Groq API key
- `JWT_SECRET` - Secure random string
- `NEXT_PUBLIC_APP_URL` - Your production URL

### Recommended Platforms
- **Vercel** - Best for Next.js (automatic deployment)
- **Railway** - Includes PostgreSQL database
- **Render** - Free tier available

### Pre-deployment Checklist
- [ ] Update JWT_SECRET to a secure value
- [ ] Set up production database
- [ ] Configure CORS if needed
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Review security settings
- [ ] Test all user flows

## Support

For issues or questions, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Groq Documentation](https://console.groq.com/docs)
