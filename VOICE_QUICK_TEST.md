# 🎤 Voice Assistant - Quick Test Guide

## ✅ Voice Assistant is Ready!

Your voice assistant is now fully implemented and ready to test.

## 🚀 Quick Test (5 minutes)

### Step 1: Open the Application
```
http://localhost:3001/patient/triage
```
(Note: Using port 3001 since 3000 is in use)

### Step 2: Switch to Voice Mode
1. Click the **"Voice Input"** tab
2. You'll see a large blue microphone button

### Step 3: Test Recording
1. **Click the microphone button**
2. Browser will ask for microphone permission → **Click "Allow"**
3. **Speak clearly**: 
   > "I have a headache and fever for two days"
4. **Click the stop button** (red square)
5. Wait 2-5 seconds for transcription
6. You'll see the transcribed text appear!

### Step 4: Verify Transcription
- The transcript should appear in a green box
- It will auto-submit after 1 second
- Check if the text matches what you said

## 🎯 Test Scenarios

### Test 1: Simple Symptom
**Say:** "I have a cough and sore throat"
**Expected:** Accurate transcription of symptoms

### Test 2: Detailed Description
**Say:** "I've been experiencing severe headaches for three days, along with fever of 101 degrees, body aches, and nausea. The pain is on the right side of my head."
**Expected:** Full detailed transcription

### Test 3: Medical Terms
**Say:** "I have hypertension and diabetes. Recently experiencing chest pain and shortness of breath."
**Expected:** Correct medical terminology

## 🔍 What to Check

### ✅ Recording Works
- [ ] Microphone button turns red when recording
- [ ] Timer shows recording duration
- [ ] Button pulses during recording
- [ ] Can stop recording

### ✅ Transcription Works
- [ ] "Processing..." message appears
- [ ] Transcript appears within 5 seconds
- [ ] Text is accurate (90%+ match)
- [ ] No errors displayed

### ✅ Submission Works
- [ ] Transcript shows in green box
- [ ] Auto-submits after 1 second
- [ ] Redirects to history page
- [ ] Case appears in database

## 🐛 Common Issues & Fixes

### Issue: "Microphone access denied"
**Fix:** 
1. Click the lock icon in browser address bar
2. Allow microphone access
3. Refresh page and try again

### Issue: No sound being recorded
**Fix:**
1. Check if microphone is plugged in
2. Test microphone in system settings
3. Try different browser (Chrome recommended)

### Issue: Transcription takes too long
**Fix:**
1. Check internet connection
2. Verify Groq API key in .env
3. Try shorter recording (< 1 minute)

### Issue: Inaccurate transcription
**Fix:**
1. Speak more clearly and slowly
2. Reduce background noise
3. Use better microphone
4. Speak closer to microphone

## 📊 Expected Performance

| Metric | Expected Value |
|--------|---------------|
| Recording Start | < 1 second |
| Recording Stop | Instant |
| Transcription Time | 2-5 seconds |
| Accuracy | 95%+ |
| Max Recording | 25MB |

## 🎤 Voice Input Tips

### For Best Results:
1. **Speak clearly** - Enunciate words
2. **Moderate pace** - Not too fast or slow
3. **Quiet environment** - Minimize background noise
4. **Close to mic** - 6-12 inches away
5. **Complete sentences** - Full descriptions work better

### Example Good Input:
> "I've been experiencing a persistent headache for the past two days. It started suddenly on Monday morning. The pain is located on the right side of my head and feels like a throbbing sensation. I also have a fever of around 101 degrees Fahrenheit, body aches, and sensitivity to light. The pain gets worse when I move or bend down."

### Example Poor Input:
> "Head hurts... um... two days... uh... fever... I think... maybe 101... not sure..."

## 🔧 Technical Verification

### Check API Response:
Open browser console (F12) and look for:
```
Sending audio for transcription... [size] bytes
Transcription successful: [your text]
```

### Check Network Tab:
1. Open DevTools (F12)
2. Go to Network tab
3. Record voice
4. Look for POST to `/api/transcribe`
5. Check response has `transcript` field

### Check Database:
```bash
npx prisma studio
```
1. Open TriageCase table
2. Find your case
3. Verify `inputType` = "voice"
4. Check `rawInput` has your transcript

## ✅ Success Criteria

Your voice assistant is working if:
- [x] Can record audio
- [x] Transcription completes in < 10 seconds
- [x] Transcript accuracy > 90%
- [x] No errors in console
- [x] Case saved to database
- [x] Can submit multiple recordings

## 🎉 Next Steps

Once basic voice works:
1. Test with different accents
2. Test with medical terminology
3. Test in noisy environment
4. Test on mobile device
5. Add multilingual support

## 📞 Need Help?

If voice assistant isn't working:
1. Check `VOICE_ASSISTANT_GUIDE.md` for detailed docs
2. Verify Groq API key in `.env`
3. Check browser console for errors
4. Test microphone in system settings
5. Try different browser

---

**Status**: ✅ Ready to Test  
**URL**: http://localhost:3001/patient/triage  
**Feature**: Voice Input Tab  
**Model**: Groq Whisper Large V3
