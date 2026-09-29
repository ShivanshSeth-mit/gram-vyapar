// Speech synthesis and recognition helpers for rural accessibility

export function speakText(text: string, lang: string = "hi-IN"): () => void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return () => {};
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language preference
  if (lang.startsWith("hi")) {
    utterance.lang = "hi-IN";
  } else if (lang.startsWith("mr")) {
    utterance.lang = "mr-IN";
  } else if (lang.startsWith("bn")) {
    utterance.lang = "bn-IN";
  } else {
    utterance.lang = "en-IN";
  }

  utterance.rate = 0.95; // Slightly measured rate for clear comprehension
  utterance.pitch = 1.0;

  window.speechSynthesis.speak(utterance);

  return () => {
    window.speechSynthesis.cancel();
  };
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
}

export function startVoiceRecognition(
  lang: string,
  onResult: (transcript: string) => void,
  onError?: (err: any) => void
): { stop: () => void } | null {
  if (!isSpeechRecognitionSupported()) {
    if (onError) onError(new Error("Speech recognition not supported"));
    return null;
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;

  if (lang.startsWith("hi")) {
    recognition.lang = "hi-IN";
  } else if (lang.startsWith("mr")) {
    recognition.lang = "mr-IN";
  } else if (lang.startsWith("bn")) {
    recognition.lang = "bn-IN";
  } else {
    recognition.lang = "en-IN";
  }

  recognition.onresult = (event: any) => {
    if (event.results && event.results[0] && event.results[0][0]) {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    }
  };

  recognition.onerror = (err: any) => {
    if (onError) onError(err);
  };

  try {
    recognition.start();
  } catch (e) {
    if (onError) onError(e);
  }

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch (_) {}
    }
  };
}
