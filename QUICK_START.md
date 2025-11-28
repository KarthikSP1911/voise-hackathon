# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+
- PostgreSQL database
- Groq API key

## 1️⃣ Environment Setup (2 minutes)

```bash
cd smart-healthcare-triage
cp .env.example .env
```

Edit `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/triage_db"
GROQ_API_KEY="gsk_your_key_here"
JWT_SECRET="your_random_secret_here"
```

**Get Groq API Key**: https://console.groq.com (free tier available)

**Database Options**:
- Local PostgreSQL
- [Neon](https://neon.tech) - Free cloud PostgreSQL
- [Supabase](https://supabase.com) - Free tier

## 2️⃣ Database Setup (1 minute)

```bash
npx prisma generate
npx prisma db push
```

## 3️⃣ Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

## 4️⃣ Test the Application

### Create Accounts
1. Go to http://localhost:3000/auth/register
2. Create a PATIENT account
3. Create a STAFF account (or update role in database)

### Test Patient Flow
1. Login as patient
2. Go to `/patient/triage`
3. Enter symptoms (text works, voice needs implementation)
4. View history at `/patient/history`

### Test Staff Flow
1. Login as staff
2. Go to `/staff/dashboard`
3. View triage queue
4. Click on cases for details

## 🔧 Useful Commands

```bash
# View database in browser
npx prisma studio

# Regenerate Prisma client
npx prisma generate

# Reset database (careful!)
npx prisma db push --force-reset

# Build for production
npm run build

# Start production server
npm start
```

## 📝 What Works Now

✅ User registration & login
✅ JWT authentication
✅ Database operations
✅ Text symptom input
✅ Case listing & viewing
✅ Staff dashboard
✅ Role-based access

## 🚧 What Needs Implementation

🔨 Groq Whisper transcription
🔨 Groq LLaMA triage analysis
🔨 Voice recording (Web Audio API)
🔨 Authentication context
🔨 Case update forms
🔨 Notifications

## 🐛 Troubleshooting

**Database connection error?**
```bash
# Check your DATABASE_URL in .env
# Test connection:
npx prisma db pull
```

**Port 3000 in use?**
```bash
npx kill-port 3000
# Or use different port:
npm run dev -- -p 3001
```

**Prisma errors?**
```bash
rm -rf node_modules/.prisma
npx prisma generate
```

**TypeScript errors?**
```bash
rm -rf .next
npm run dev
```

## 📚 Next Steps

1. **Implement AI Features**
   - Edit `lib/groq.ts`
   - Add Whisper transcription
   - Add LLaMA processing

2. **Add Voice Recording**
   - Edit `components/VoiceRecorderButton.tsx`
   - Implement MediaRecorder API

3. **Create Auth Context**
   - Add React Context for user state
   - Protect routes

4. **Enhance UI**
   - Add loading states
   - Improve error handling
   - Add animations

## 🎯 File Locations

**Need to edit for AI?**
- `lib/groq.ts` - Whisper & LLaMA
- `components/VoiceRecorderButton.tsx` - Voice recording

**Need to add features?**
- `app/api/` - Backend endpoints
- `components/` - UI components
- `app/` - Pages

**Database changes?**
- `prisma/schema.prisma` - Schema
- Run `npx prisma db push` after changes

## 💡 Tips

- Use `npx prisma studio` to view/edit database
- Check browser console for errors
- Check terminal for server errors
- Read TODO comments in code files
- Refer to SETUP.md for detailed instructions

## 🆘 Need Help?

1. Check `SETUP.md` for detailed setup
2. Check `PROJECT_OVERVIEW.md` for architecture
3. Check `README.md` for API documentation
4. Review TODO comments in code

---

**Ready to build!** 🎉
