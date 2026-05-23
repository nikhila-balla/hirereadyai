import { useState, useRef, useCallback, useEffect } from "react";

interface SpeechRecognitionWindow extends Window {
  SpeechRecognition?: new () => SpeechRecognitionInstance;
  webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

interface SpeechRecognitionEvent {
  results: {
    length: number;
    [index: number]: {
      isFinal: boolean;
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface UseInterviewAIOptions {
  questions: string[];
  onInterviewComplete: (answers: string[]) => void;
}

export const useInterviewAI = ({ questions, onInterviewComplete }: UseInterviewAIOptions) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsListening(false);
    clearTimers();
  }, [clearTimers]);

  const speakText = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.05;
      utterance.volume = 0.9;

      const voices = speechSynthesis.getVoices();
      const enVoice = voices.find((v) => v.lang.startsWith("en") && v.name.includes("Google")) || voices.find((v) => v.lang.startsWith("en")) || voices[0];
      if (enVoice) utterance.voice = enVoice;

      utterance.onend = () => {
        setIsSpeaking(false);
        resolve();
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        resolve();
      };

      setIsSpeaking(true);
      speechSynthesis.speak(utterance);
    });
  }, []);

  const startListening = useCallback(() => {
    const SR = ((window as unknown) as SpeechRecognitionWindow).SpeechRecognition || ((window as unknown) as SpeechRecognitionWindow).webkitSpeechRecognition;
    if (!SR) return;

    stopListening();
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    let fullTranscript = "";

    rec.onresult = (event: SpeechRecognitionEvent) => {
      clearTimers();
      let interim = "";
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          fullTranscript += event.results[i][0].transcript + " ";
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setTranscript((fullTranscript + interim).trim());

      // Reset silence timer
      silenceTimerRef.current = setTimeout(() => {
        speakText("Please respond to the question.");
      }, 5000);
    };

    rec.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === "no-speech") {
        silenceTimerRef.current = setTimeout(() => {
          speakText("Please respond to the question.");
        }, 5000);
      }
    };

    rec.onend = () => {
      // Restart if still in listening mode
      if (recognitionRef.current === rec) {
        try { rec.start(); } catch {
          // Ignore start error if already running
        }
      }
    };

    rec.start();
    recognitionRef.current = rec;
    setIsListening(true);
  }, [stopListening, clearTimers, speakText]);

  const speakQuestion = useCallback(async (idx: number) => {
    setTranscript("");
    await speakText(questions[idx]);
    startListening();
  }, [questions, speakText, startListening]);

  const submitAnswer = useCallback((text: string) => {
    if (!text.trim()) return;
    clearTimers();
    stopListening();

    const newAnswers = [...answers, text.trim()];
    setAnswers(newAnswers);
    setTranscript("");

    const nextIdx = currentQuestion + 1;
    if (nextIdx < questions.length) {
      setCurrentQuestion(nextIdx);
      setTimeout(() => speakQuestion(nextIdx), 1500);
    } else {
      onInterviewComplete(newAnswers);
    }
  }, [answers, currentQuestion, questions, clearTimers, stopListening, speakQuestion, onInterviewComplete]);

  const startInterview = useCallback(() => {
    setCurrentQuestion(0);
    setAnswers([]);
    setTranscript("");
    setTimeout(() => speakQuestion(0), 800);
  }, [speakQuestion]);

  const completeNow = useCallback(() => {
    clearTimers();
    stopListening();
    speechSynthesis.cancel();
    const finalAnswers = transcript.trim() ? [...answers, transcript.trim()] : answers;
    onInterviewComplete(finalAnswers);
  }, [clearTimers, stopListening, answers, transcript, onInterviewComplete]);

  useEffect(() => {
    // Load voices
    speechSynthesis.getVoices();
    return () => {
      clearTimers();
      stopListening();
      speechSynthesis.cancel();
    };
  }, [clearTimers, stopListening]);

  return {
    currentQuestion,
    isSpeaking,
    isListening,
    transcript,
    answers,
    startInterview,
    submitAnswer,
    completeNow,
    startListening,
    stopListening,
    setTranscript,
  };
};
