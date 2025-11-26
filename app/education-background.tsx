import ProfileExitModal from "@/components/ProfileExitModal";
import { Theme } from "@/constants/theme";
import { useProfile } from "@/contexts/ProfileContext";
import VoiceInputOverlay, {
  VoiceResultExtras,
} from "@/utilities/useVoiceToText";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EducationBackground() {
  const router = useRouter();
  const { mode, returnTo } = useLocalSearchParams<{
    mode?: string;
    returnTo?: string;
  }>();
  const editingMode = typeof mode === "string" ? mode : undefined;
  const returnToPath =
    typeof returnTo === "string" ? returnTo : "/(tabs)/profile";
  const isEditingEducation = editingMode === "edit-education";
  const { profileData, updateProfileData } = useProfile();
  const [highestEducation, setHighestEducation] = useState(profileData.highestEducation || "");
  const [highSchoolName, setHighSchoolName] = useState(profileData.highSchoolName || "");
  const [graduationDate, setGraduationDate] = useState(profileData.graduationDate || "");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showEducationPicker, setShowEducationPicker] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const EDUCATION_LEVELS = [
    "High School",
    "Some College",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
  ];

  const handleVoiceResult = (text: string, extras?: VoiceResultExtras) => {
    const structured = extras?.structuredData;
    const nextEducation = structured?.highestEducation || text;
    const matchedEducation = nextEducation
      ? EDUCATION_LEVELS.find((level) =>
          nextEducation.toLowerCase().includes(level.toLowerCase())
        )
      : null;

    if (matchedEducation) {
      setHighestEducation(matchedEducation);
      updateProfileData({ highestEducation: matchedEducation });
    }

    if (structured?.highSchoolName?.trim()) {
      setHighSchoolName(structured.highSchoolName.trim());
      updateProfileData({ highSchoolName: structured.highSchoolName.trim() });
    } else if (!structured && text && !matchedEducation) {
      setHighSchoolName(text);
      updateProfileData({ highSchoolName: text });
    }

    if (structured?.graduationDate?.trim()) {
      setGraduationDate(structured.graduationDate.trim());
      updateProfileData({ graduationDate: structured.graduationDate.trim() });
    }

    setShowVoiceOverlay(false);
  };

  const handleNext = () => {
    updateProfileData({
      highestEducation,
      highSchoolName,
      graduationDate,
    });
    if (isEditingEducation && editingMode) {
      router.push({
        pathname: "/education-experience",
        params: { mode: editingMode, returnTo: returnToPath },
      });
    } else {
      router.push("/education-experience");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education/Experience</Text>
        <TouchableOpacity
          onPress={() => setShowExitModal(true)}
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

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Educational Background</Text>

        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowEducationPicker(!showEducationPicker)}
        >
          <Text style={highestEducation ? styles.inputText : styles.placeholderText}>
            {highestEducation || "Highest level of education"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {showEducationPicker && (
          <View style={styles.picker}>
            <ScrollView>
              {EDUCATION_LEVELS.map((level, index) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.pickerOption,
                    index === EDUCATION_LEVELS.length - 1 &&
                      styles.pickerOptionLast,
                  ]}
                  onPress={() => {
                    setHighestEducation(level);
                    setShowEducationPicker(false);
                    updateProfileData({ highestEducation: level });
                  }}
                >
                  <Text style={styles.pickerOptionText}>{level}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="High School Name"
          placeholderTextColor="#9CA3AF"
          value={highSchoolName}
          onChangeText={(text) => {
            setHighSchoolName(text);
            updateProfileData({ highSchoolName: text });
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Graduation / Completion Date"
          placeholderTextColor="#9CA3AF"
          value={graduationDate}
          onChangeText={(text) => {
            setGraduationDate(text);
            updateProfileData({ graduationDate: text });
          }}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => setShowVoiceOverlay(true)}
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
        }}
        contextFields={["highestEducation", "highSchoolName", "graduationDate"]}
        onResult={handleVoiceResult}
      />

      <ProfileExitModal
        visible={showExitModal}
        onCancel={() => setShowExitModal(false)}
        onExit={() => {
          setShowExitModal(false);
          router.replace(returnToPath as any);
        }}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B0B0F",
    marginBottom: 24,
    textAlign: "center",
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
    maxHeight: 220,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
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
    alignItems: "center",
    backgroundColor: Theme.colors.orange,
    borderRadius: Theme.radius.button,
    ...Theme.padding.buttonLg,
  },
  nextButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.black,
    textAlign: "center",
  },
});
