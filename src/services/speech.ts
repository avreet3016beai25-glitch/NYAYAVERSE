// Web Speech API wrapper for Voice Input & Speech Synthesis in NYAYAVERSE

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      isFinal: boolean;
    };
    length: number;
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export class SpeechService {
  private recognition: SpeechRecognitionInstance | null = null;
  public isListening = false;
  private synth: SpeechSynthesis | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
      }
      if ('speechSynthesis' in window) {
        this.synth = window.speechSynthesis;
      }
    }
  }

  public isSupported(): boolean {
    return this.recognition !== null;
  }

  public isTTSSupported(): boolean {
    return this.synth !== null;
  }

  public startListening(
    onResult: (text: string) => void,
    onEnd: () => void,
    onError?: (err: unknown) => void,
    lang: string = 'en-IN'
  ) {
    if (!this.recognition) {
      if (onError) onError('Speech recognition not supported in this browser');
      return;
    }

    try {
      this.recognition.lang = lang;
      this.recognition.onresult = (event: SpeechRecognitionEvent) => {
        const text = event.results[0][0].transcript;
        onResult(text);
      };
      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };
      this.recognition.onerror = (err) => {
        this.isListening = false;
        if (onError) onError(err);
      };

      this.isListening = true;
      this.recognition.start();
    } catch {
      this.isListening = false;
      onEnd();
    }
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public speak(text: string, lang: string = 'en-IN') {
    if (!this.synth) return;
    this.synth.cancel(); // cancel any active speech

    // Clean markdown/symbols
    const cleanText = text.replace(/[*#_`]/g, '').slice(0, 350);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang;
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    this.synth.speak(utterance);
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

export const speechService = new SpeechService();
