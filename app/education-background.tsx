import VoiceInputOverlay from "@/utilities/useVoiceToText";
import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function EducationBackground() {
  const router = useRouter();
  const { profileData, updateProfileData } = useProfile();
  const [highestEducation, setHighestEducation] = useState(profileData.highestEducation || "");
  const [highSchoolName, setHighSchoolName] = useState(profileData.highSchoolName || "");
  const [graduationDate, setGraduationDate] = useState(profileData.graduationDate || "");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [showEducationPicker, setShowEducationPicker] = useState(false);

  const EDUCATION_LEVELS = [
    "High School",
    "Some College",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
  ];

  const handleVoiceResult = (text: string) => {
    if (activeField === "highestEducation") {
      const match = EDUCATION_LEVELS.find((e) =>
        text.toLowerCase().includes(e.toLowerCase())
      );
      if (match) {
        setHighestEducation(match);
        updateProfileData({ highestEducation: match });
      }
    } else if (activeField === "highSchoolName") {
      setHighSchoolName(text);
      updateProfileData({ highSchoolName: text });
    } else if (activeField === "graduationDate") {
      setGraduationDate(text);
      updateProfileData({ graduationDate: text });
    }
    setShowVoiceOverlay(false);
    setActiveField(null);
  };

  const handleNext = () => {
    updateProfileData({
      highestEducation,
      highSchoolName,
      graduationDate,
    });
    router.push("/education-experience");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education/Experience</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
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
            {EDUCATION_LEVELS.map((level) => (
              <TouchableOpacity
                key={level}
                style={styles.pickerOption}
                onPress={() => {
                  setHighestEducation(level);
                  setShowEducationPicker(false);
                  updateProfileData({ highestEducation: level });
                }}
              >
                <Text style={styles.pickerOptionText}>{level}</Text>
              </TouchableOpacity>
            ))}
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
          onPress={() => {
            setActiveField("highestEducation");
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

