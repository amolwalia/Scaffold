import VoiceInputOverlay from "@/utilities/useVoiceToText";
import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EducationExperience() {
  const router = useRouter();
  const { profileData, updateProfileData } = useProfile();
  const [tradeSchoolName, setTradeSchoolName] = useState(profileData.tradeSchoolName || "");
  const [tradeProgramName, setTradeProgramName] = useState(profileData.tradeProgramName || "");
  const [graduationDate, setGraduationDate] = useState(profileData.tradeGraduationDate || "");
  const [trade, setTrade] = useState(profileData.trade || "");
  const [apprenticeshipLevel, setApprenticeshipLevel] = useState(profileData.apprenticeshipLevel || "");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showApprenticeshipPicker, setShowApprenticeshipPicker] = useState(false);

  const APPRENTICESHIP_LEVELS = ["Level 1", "Level 2", "Level 3", "Level 4", "Year 1", "Year 2", "Year 3", "Year 4"];

  const handleVoiceResult = (text: string) => {
    if (activeField === "tradeSchoolName") {
      setTradeSchoolName(text);
      updateProfileData({ tradeSchoolName: text });
    } else if (activeField === "tradeProgramName") {
      setTradeProgramName(text);
      updateProfileData({ tradeProgramName: text });
    } else if (activeField === "graduationDate") {
      setGraduationDate(text);
      updateProfileData({ tradeGraduationDate: text });
    } else if (activeField === "trade") {
      setTrade(text);
      updateProfileData({ trade: text });
    } else if (activeField === "apprenticeshipLevel") {
      const match = APPRENTICESHIP_LEVELS.find((l) =>
        text.toLowerCase().includes(l.toLowerCase())
      );
      if (match) {
        setApprenticeshipLevel(match);
        updateProfileData({ apprenticeshipLevel: match });
      }
    }
    setShowVoiceOverlay(false);
    setActiveField(null);
  };

  const handleNext = () => {
    updateProfileData({
      tradeSchoolName,
      tradeProgramName,
      tradeGraduationDate: graduationDate,
      trade,
      apprenticeshipLevel,
    });
    router.push("/profile-picture?source=onboarding");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education/Experience</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "85%" }]} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Trade-Specific Education</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Trade School / Vocational School Name..."
            placeholderTextColor="#9CA3AF"
            value={tradeSchoolName}
            onChangeText={(text) => {
              setTradeSchoolName(text);
              updateProfileData({ tradeSchoolName: text });
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Trade / Vocational Program Name..."
            placeholderTextColor="#9CA3AF"
            value={tradeProgramName}
            onChangeText={(text) => {
              setTradeProgramName(text);
              updateProfileData({ tradeProgramName: text });
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Graduation / Completion Date..."
            placeholderTextColor="#9CA3AF"
            value={graduationDate}
            onChangeText={(text) => {
              setGraduationDate(text);
              updateProfileData({ tradeGraduationDate: text });
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Trade..."
            placeholderTextColor="#9CA3AF"
            value={trade}
            onChangeText={(text) => {
              setTrade(text);
              updateProfileData({ trade: text });
            }}
          />

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowApprenticeshipPicker(!showApprenticeshipPicker)}
          >
            <Text style={apprenticeshipLevel ? styles.inputText : styles.placeholderText}>
              {apprenticeshipLevel || "Apprenticeship Level / Year..."}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          {showApprenticeshipPicker && (
            <View style={styles.picker}>
              {APPRENTICESHIP_LEVELS.map((level) => (
                <TouchableOpacity
                  key={level}
                  style={styles.pickerOption}
                  onPress={() => {
                    setApprenticeshipLevel(level);
                    setShowApprenticeshipPicker(false);
                    updateProfileData({ apprenticeshipLevel: level });
                  }}
                >
                  <Text style={styles.pickerOptionText}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => {
            setActiveField("tradeSchoolName");
            setShowVoiceOverlay(true);
          }}
        >
          <Ionicons name="mic" size={24} color="#8B5CF6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <VoiceInputOverlay
        visible={showVoiceOverlay}
        onClose={() => {
          setShowVoiceOverlay(false);
          setActiveField(null);
        }}
        onResult={handleVoiceResult}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B0B0F",
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#8B5CF6",
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B0B0F",
    paddingHorizontal: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0B0B0F",
    marginBottom: 16,
  },
  inputText: {
    fontSize: 16,
    color: "#0B0B0F",
  },
  placeholderText: {
    fontSize: 16,
    color: "#9CA3AF",
  },
  picker: {
    marginTop: -16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    maxHeight: 200,
    backgroundColor: "#FFFFFF",
  },
  pickerOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  pickerOptionText: {
    fontSize: 16,
    color: "#0B0B0F",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 16,
  },
  voiceButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#F59E0B",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});
