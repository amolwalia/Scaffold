import VoiceInputOverlay from "@/components/VoiceInputOverlay";
import { Ionicons } from "@expo/vector-icons";
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from "expo-audio";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EducationExperience2() {
  const router = useRouter();
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [highSchoolName, setHighSchoolName] = useState("");
  const [graduationDate, setGraduationDate] = useState("");

  // receives final voice text
  const handleVoiceInput = (transcribedText: string) => {
    setHighSchoolName(transcribedText);
    setShowVoiceOverlay(false);
  };

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
    await audioRecorder.stop();
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Education/Experience</Text>
          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Educational Background</Text>

        {/* Input 1 with mic */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, { paddingRight: 36 }]}
            placeholder="High School Name"
            value={highSchoolName}
            onChangeText={setHighSchoolName}
            placeholderTextColor="#A1A1A1"
          />
          <TouchableOpacity
            style={styles.micButton}
            onPress={() => setShowVoiceOverlay(true)}
            activeOpacity={0.7}
          >
            <Ionicons name="mic-outline" size={18} color="#8B5CF6" />
          </TouchableOpacity>
        </View>

        {/* Input 2 */}
        <TextInput
          style={styles.input}
          placeholder="Graduation / Completion Date"
          value={graduationDate}
          onChangeText={setGraduationDate}
          placeholderTextColor="#A1A1A1"
        />

        {/* Next button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/profile")}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>

        {/* Voice modal */}
        {showVoiceOverlay && (
          <VoiceInputOverlay
            visible={showVoiceOverlay}
            onClose={() => setShowVoiceOverlay(false)}
            onResult={handleVoiceInput} // keep consistent naming
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  progressBarBackground: {
    borderRadius: 8,
    backgroundColor: "#E9D5FF",
    overflow: "hidden",
  },
  progressBarFill: {
    width: "70%",
    aspectRatio: 20, // avoids “height not supported” warning
    borderRadius: 8,
    backgroundColor: "#8B5CF6",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    color: "#000",
  },
  micButton: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -9 }],
  },
  nextButton: {
    backgroundColor: "#FF8A00",
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 40,
  },
  nextButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#000",
  },
});
