import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface VoiceInputOverlayProps {
  visible: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
}

const BAR_COUNT = 6;
const BAR_BASE_HEIGHT = 24; // visual baseline for bars

export default function VoiceInputOverlay({
  visible,
  onClose,
  onResult,
}: VoiceInputOverlayProps) {
  const [phase, setPhase] = useState<"idle" | "listening" | "review">("idle");
  const [recognizedText, setRecognizedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // waveform animation setup
  const bars = Array.from(
    { length: BAR_COUNT },
    () => useRef(new Animated.Value(1)).current
  );

  useEffect(() => {
    if (isListening) {
      const loops = bars.map((bar) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(bar, {
              toValue: Math.random() * 2 + 1,
              duration: 250,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(bar, {
              toValue: 1,
              duration: 250,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        )
      );
      loops.forEach((a) => a.start());
      return () => loops.forEach((a) => a.stop());
    }
  }, [isListening]);

  const startListening = async () => {
    try {
      if (Platform.OS === "web" || typeof window !== "undefined") {
        const SpeechRecognition =
          (window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
          alert("Speech recognition not supported on this device.");
          return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          let text = "";
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript + " ";
          }
          setRecognizedText(text.trim());
        };

        recognition.onerror = (err: any) => console.error("Speech error:", err);
        recognition.onend = () => setIsListening(false);

        recognition.start();
        recognitionRef.current = recognition;
        setPhase("listening");
        setIsListening(true);
      } else {
        alert("Speech recognition requires Expo Web or device browser mode.");
      }
    } catch (e) {
      console.error("Speech start failed:", e);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    setPhase("review");
  };

  const handleRetry = () => {
    setRecognizedText("");
    setPhase("idle");
  };

  const handleConfirm = () => {
    onResult(recognizedText);
    setRecognizedText("");
    setPhase("idle");
  };

  const renderWaveform = () => (
    <View style={styles.waveformContainer}>
      {bars.map((bar, i) => (
        <Animated.View
          key={i}
          style={[styles.waveBar, { transform: [{ scaleY: bar }] }]}
        />
      ))}
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.close}>
            <Ionicons name="close" size={24} color="#B0B0B0" />
          </TouchableOpacity>

          {renderWaveform()}

          {phase === "idle" && (
            <>
              <Text style={styles.heading}>Go ahead, I'm listening!</Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={startListening}
              >
                <Ionicons name="mic-outline" size={22} color="#8B5CF6" />
                <Text style={styles.startText}>Start</Text>
              </TouchableOpacity>
            </>
          )}

          {phase === "listening" && (
            <>
              <ScrollView style={styles.scroll}>
                <Text style={styles.transcript}>
                  {recognizedText || "Listening... speak now"}
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.stopButton}
                onPress={stopListening}
              >
                <Ionicons name="pause" size={26} color="#FFF" />
                <Text style={styles.stopText}>Stop</Text>
              </TouchableOpacity>
            </>
          )}

          {phase === "review" && (
            <>
              <Text style={styles.subHeading}>
                Got it. Should I go ahead with this?
              </Text>
              <ScrollView style={styles.scroll}>
                <Text style={styles.transcript}>{recognizedText}</Text>
              </ScrollView>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.circleLight}
                  onPress={handleRetry}
                >
                  <Ionicons name="refresh" size={22} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.circleOutline}
                  onPress={startListening}
                >
                  <Ionicons name="mic-outline" size={22} color="#8B5CF6" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.circleConfirm}
                  onPress={handleConfirm}
                >
                  <Ionicons name="checkmark" size={22} color="#FFF" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    width: "85%",
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  close: { position: "absolute", top: 20, left: 20 },
  heading: {
    fontSize: 16,
    color: "#7C3AED",
    fontWeight: "600",
    marginBottom: 24,
  },
  subHeading: {
    fontSize: 15,
    color: "#7C3AED",
    marginBottom: 16,
  },
  scroll: { maxHeight: 140, marginBottom: 24 },
  transcript: { textAlign: "center", fontSize: 14, color: "#000" },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  startText: { fontSize: 15, fontWeight: "600", color: "#8B5CF6" },
  stopButton: {
    alignItems: "center",
    backgroundColor: "#8B5CF6",
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  stopText: { color: "#FFF", fontWeight: "600", marginTop: 6 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
  },
  circleLight: {
    backgroundColor: "#E9D5FF",
    borderRadius: 50,
    padding: 14,
  },
  circleOutline: {
    borderWidth: 2,
    borderColor: "#8B5CF6",
    borderRadius: 50,
    padding: 14,
  },
  circleConfirm: {
    backgroundColor: "#FF8A00",
    borderRadius: 50,
    padding: 14,
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 16,
    height: BAR_BASE_HEIGHT * 2, // fixed container height
  },
  waveBar: {
    width: 6,
    height: BAR_BASE_HEIGHT, // static height
    marginHorizontal: 3,
    borderRadius: 3,
    backgroundColor: "#8B5CF6",
  },
});
