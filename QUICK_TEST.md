# 🚀 Quick Test Guide - 5 Minutes to Working System

## ⚡ Super Fast Setup

### 1. Environment Setup (2 minutes)
```bash
cd voise-hackathon/smart-healthcare-triage
cp .env.example .env
```

**Edit `.env`** - Add these 3 required values:
```env
DATABASE_URL="postgresql://user:pass@host:5432/db"
GROQ_API_KEY="gsk_your_key_from_console_groq_com"
JWT_SECRET="run_node_crypto_randomBytes_32_hex"
```

**Get Groq API Key**: https://console.groq.com (FREE, takes 1 minute)

**Generate JWT Secret**:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Install & Initialize (2 minutes)
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

### 3. Test It! (1 minute)

**Open**: http://localhost:3000

**Register**: `/auth/register`
- Email: test@example.com
- Password: TestPass123!
- Name: Test Patient
- Role: PATIENT

**Test Triage**: `/patient/triage`

**Try Text Input**:
```
I have a severe headache for 3 days with fever and stiff neck. 
The pain is getting worse and I'm sensitive to light.
```

**Try Voice Input**:
1. Click microphone button
2. Allow microphone access
3. Speak your symptoms
4. Click stop
5. Submit

---

## ✅ What Should Happen

### Text Triage
- ⏱️ Processing: 5-10 seconds
- 📊 Result: Urgency level (EMERGENCY for above example)
- 🚩 Red flags detected
- 📝 AI summary generated
- 💾 Saved to database

### Voice Triage
- 🎙️ Recording: Shows timer
- ⏱️ Transcription: 2-5 seconds
- 📝 Text appears in box
- 📊 Can submit for AI analysis

---

## 🎯 Quick Test Cases

### Test 1: Self-Care (Low Urgency)
```
I have a mild cough and runny nose for 2 days. No fever.
```
**Expected**: SELF_CARE or CLINIC_VISIT

### Test 2: Emergency (High Urgency)
```
Severe chest pain radiating to left arm, difficulty breathing, sweating
```
**Expected**: EMERGENCY with red flags

### Test 3: Voice Recording
1. Click microphone
2. Say: "I have a headache and fever"
3. Stop recording
4. Should transcribe correctly

---

## 🐛 Quick Fixes

### "API key invalid"
```bash
# Check your .env file
cat .env | grep GROQ_API_KEY
# Should start with: gsk_
```

### "Database error"
```bash
# Reinitialize database
npx prisma db push
```

### "Port 3000 in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### "Microphone not working"
- Check browser permissions (lock icon in address bar)
- Use HTTPS in production
- Try different browser

---

## 📊 Success Indicators

✅ Server starts without errors
✅ Can register and login
✅ Can submit text symptoms
✅ AI returns urgency level
✅ Voice recording works
✅ Transcription appears
✅ Cases saved to database

---

## 🎉 You're Done!

All three features are now working:
1. ✅ Groq Whisper transcription
2. ✅ Groq LLaMA triage analysis
3. ✅ Voice recording

**Next**: Check `/patient/history` to see your cases!

---

## 📚 Full Documentation

- Complete guide: `IMPLEMENTATION_COMPLETE.md`
- Migration guide: `COMPLETE_PROJECT_MIGRATION_GUIDE.md`
- Setup details: `SETUP.md`
- Main README: `README.md`
