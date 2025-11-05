import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
    Animated,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface VoiceInputOverlayProps {
  visible: boolean;
  onClose: () => void;
  onTranscribe: (text: string) => void;
}

export default function VoiceInputOverlay({
  visible,
  onClose,
  onTranscribe,
}: VoiceInputOverlayProps) {
  const [isListening, setIsListening] = useState(false);
  const [waveformAnimations] = useState(
    Array.from({ length: 20 }, () => new Animated.Value(0))
  );

  useEffect(() => {
    if (isListening) {
      // Animate each waveform bar independently
      const animations = waveformAnimations.map((anim, index) => {
        return Animated.loop(
          Animated.sequence([
            Animated.delay(index * 50),
            Animated.timing(anim, {
              toValue: 1,
              duration: 300 + Math.random() * 200,
              useNativeDriver: true,
            }),
            Animated.timing(anim, {
              toValue: 0,
              duration: 300 + Math.random() * 200,
              useNativeDriver: true,
            }),
          ])
        );
      });
      
      animations.forEach(anim => anim.start());
      
      return () => {
        animations.forEach(anim => anim.stop());
      };
    } else {
      waveformAnimations.forEach(anim => anim.setValue(0));
    }
  }, [isListening]);

  const getBarHeight = (index: number) => {
    if (!isListening) return 10;
    const baseHeight = 20 + index * 2;
    return waveformAnimations[index].interpolate({
      inputRange: [0, 1],
      outputRange: [baseHeight * 0.3, baseHeight * 1.5],
    });
  };

  // Generate waveform bars
  const bars = Array.from({ length: 20 }, (_, i) => i);

  const handleStartListening = () => {
    setIsListening(true);
    // TODO: Integrate with actual voice recognition library (e.g., expo-speech, @react-native-voice/voice)
    // For now, simulate transcription after 3 seconds
    setTimeout(() => {
      setIsListening(false);
      onTranscribe("Sample transcribed text from voice input");
    }, 3000);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Waveform Visualization */}
          <View style={styles.waveformContainer}>
            {bars.map((index) => {
              const animatedHeight = getBarHeight(index);
              return (
                <Animated.View
                  key={index}
                  style={[
                    styles.waveformBar,
                    {
                      height: isListening ? animatedHeight : 10,
                      backgroundColor: isListening
                        ? "#E9D5FF"
                        : "#F3F4F6",
                    },
                  ]}
                />
              );
            })}
          </View>

          {/* Instruction Text */}
          <Text style={styles.instructionText}>
            Go ahead, I'm listening!
          </Text>

          {/* Microphone Button */}
          <TouchableOpacity
            style={styles.micButton}
            onPress={handleStartListening}
            activeOpacity={0.8}
          >
            <Ionicons name="mic" size={32} color="#8B5CF6" />
          </TouchableOpacity>

          {/* Start Label */}
          <Text style={styles.startLabel}>Start</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 8,
  },
  waveformContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    marginTop: 60,
    marginBottom: 20,
    gap: 4,
  },
  waveformBar: {
    width: 4,
    backgroundColor: "#E9D5FF",
    borderRadius: 2,
    minHeight: 10,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#8B5CF6",
    marginBottom: 40,
    textAlign: "center",
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
  },
  startLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B5CF6",
  },
});

