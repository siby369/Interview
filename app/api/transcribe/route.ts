import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Maximum file size: 25MB (OpenAI's limit for audio files)
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB in bytes

// Supported audio formats for Whisper API
const SUPPORTED_FORMATS = [
  "audio/mpeg",
  "audio/mp3",
  "audio/mp4",
  "audio/mpeg",
  "audio/mpga",
  "audio/m4a",
  "audio/wav",
  "audio/webm",
  "audio/x-m4a",
];

interface TranscribeResponse {
  transcript: string;
  language?: string;
}

interface ErrorResponse {
  error: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check for OpenAI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json<ErrorResponse>(
        { error: "OpenAI API key is not configured. Please set OPENAI_API_KEY in your environment variables." },
        { status: 500 }
      );
    }

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Parse form data
    const formData = await request.formData();
    const audioFile = formData.get("audio") as File | null;

    // Validate audio file
    if (!audioFile) {
      return NextResponse.json<ErrorResponse>(
        { error: "No audio file provided. Please include an 'audio' field in your form data." },
        { status: 400 }
      );
    }

    // Check file size
    if (audioFile.size > MAX_FILE_SIZE) {
      return NextResponse.json<ErrorResponse>(
        { error: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB.` },
        { status: 400 }
      );
    }

    // Check file type (basic validation)
    const fileType = audioFile.type;
    if (fileType && !SUPPORTED_FORMATS.includes(fileType)) {
      // If type is not in list, still try to process (Whisper is flexible)
      console.warn(`Unrecognized audio type: ${fileType}. Attempting to process anyway.`);
    }

    // Convert File to a format OpenAI can use
    // Create a File-like object for the API
    const audioBlob = new Blob([await audioFile.arrayBuffer()], {
      type: audioFile.type || "audio/mpeg",
    });

    // Create a File object for OpenAI SDK
    const file = new File([audioBlob], audioFile.name || "audio.mp3", {
      type: audioFile.type || "audio/mpeg",
    });

    // Call OpenAI Whisper API
    // Using verbose_json to get language detection
    const transcription = await openai.audio.transcriptions.create({
      file: file,
      model: "whisper-1",
      // language: "en", // Optional: specify language or let Whisper detect automatically
      response_format: "verbose_json", // Get additional info like language detection
    });

    // Handle response - verbose_json format returns object with text and language
    // The transcription object should have text property, and language if verbose_json is used
    const transcriptText = typeof transcription === "string" 
      ? transcription 
      : (transcription as any).text || "";
    
    const detectedLanguage = (transcription as any).language;

    const response: TranscribeResponse = {
      transcript: transcriptText,
      language: detectedLanguage || undefined,
    };

    return NextResponse.json<TranscribeResponse>(response, { status: 200 });
  } catch (error: any) {
    console.error("Transcription error:", error);

    // Handle OpenAI API errors
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json<ErrorResponse>(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }

    // Handle other errors
    return NextResponse.json<ErrorResponse>(
      { error: error.message || "An unexpected error occurred during transcription." },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json<ErrorResponse>(
    { error: "Method not allowed. Use POST to transcribe audio." },
    { status: 405 }
  );
}

