import { NextRequest, NextResponse } from 'next/server';
import { transcribeAudio } from '@/lib/groq';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }
    
    // Validate file type
    const validTypes = ['audio/webm', 'audio/wav', 'audio/mp3', 'audio/mpeg', 'audio/ogg'];
    if (!validTypes.includes(audioFile.type)) {
      return NextResponse.json(
        { error: `Invalid audio format. Supported: ${validTypes.join(', ')}` },
        { status: 400 }
      );
    }
    
    // Validate file size (max 25MB for Whisper)
    const maxSize = 25 * 1024 * 1024; // 25MB
    if (audioFile.size > maxSize) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25MB' },
        { status: 400 }
      );
    }
    
    console.log(`Transcribing audio: ${audioFile.name}, size: ${audioFile.size} bytes`);
    
    // Transcribe using Groq Whisper
    const transcript = await transcribeAudio(audioFile);
    
    return NextResponse.json({
      transcript,
      success: true,
      audioSize: audioFile.size,
      audioType: audioFile.type,
    });
    
  } catch (error: any) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: error.message || 'Transcription failed' },
      { status: 500 }
    );
  }
}
