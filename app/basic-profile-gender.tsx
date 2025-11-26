import ProfileExitModal from "@/components/ProfileExitModal";
import { Theme } from "@/constants/theme";
import VoiceInputOverlay from "@/utilities/useVoiceToText";
import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GENDERS = ["Male", "Female", "Non-Binary", "Prefer Not to Say"];

export default function BasicProfileGender() {
  const router = useRouter();
  const { mode, returnTo } = useLocalSearchParams<{
    mode?: string;
    returnTo?: string;
  }>();
  const editingMode = typeof mode === "string" ? mode : undefined;
  const returnToPath =
    typeof returnTo === "string" ? returnTo : "/(tabs)/profile";
  const isEditingBasic = editingMode === "edit-basic";
  const { profileData, updateProfileData } = useProfile();
  const [selectedGender, setSelectedGender] = useState(profileData.gender || "");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const handleVoiceResult = (text: string) => {
    const lowerText = text.toLowerCase();
    const match = GENDERS.find(
      (g) => g.toLowerCase() === lowerText || lowerText.includes(g.toLowerCase())
    );
    if (match) {
      setSelectedGender(match);
      updateProfileData({ gender: match });
    }
    setShowVoiceOverlay(false);
  };

  const navigateForward = (path: string) => {
    if (isEditingBasic && editingMode) {
      router.push({
        pathname: path as any,
        params: { mode: editingMode, returnTo: returnToPath },
      });
    } else {
      router.push(path as any);
    }
  };

  const handleNext = () => {
    if (selectedGender) {
      updateProfileData({ gender: selectedGender });
      navigateForward("/basic-profile-contact");
    }
  };

  const handleExit = () => {
    setShowExitModal(false);
    router.replace(returnToPath as any);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basic Profile</Text>
        <TouchableOpacity
          onPress={() => setShowExitModal(true)}
          style={styles.headerButton}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "25%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>Choose Your Gender</Text>

        <View style={styles.genderContainer}>
          {GENDERS.map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[
                styles.genderButton,
                selectedGender === gender && styles.genderButtonSelected,
              ]}
              onPress={() => {
                setSelectedGender(gender);
                updateProfileData({ gender });
              }}
            >
              <Text
                style={[
                  styles.genderText,
                  selectedGender === gender && styles.genderTextSelected,
                ]}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => setShowVoiceOverlay(true)}
        >
          <Ionicons name="mic" size={24} color="#8B5CF6" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.nextButton, !selectedGender && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!selectedGender}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <VoiceInputOverlay
        visible={showVoiceOverlay}
        onClose={() => setShowVoiceOverlay(false)}
        contextField="gender"
        onResult={handleVoiceResult}
      />

      <ProfileExitModal
        visible={showExitModal}
        onCancel={() => setShowExitModal(false)}
        onExit={handleExit}
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
    justifyContent: "center",
  },
  instruction: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B0B0F",
    textAlign: "center",
    marginBottom: 32,
  },
  genderContainer: {
    gap: 16,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  genderButtonSelected: {
    borderColor: "#8B5CF6",
    backgroundColor: "#F3F2FF",
  },
  genderText: {
    fontSize: 16,
    color: "#9CA3AF",
    textAlign: "center",
  },
  genderTextSelected: {
    color: "#8B5CF6",
    fontWeight: "600",
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
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.black,
    textAlign: "center",
  },
});
