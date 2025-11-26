import ProfileExitModal from "@/components/ProfileExitModal";
import { Theme } from "@/constants/theme";
import { useProfile } from "@/contexts/ProfileContext";
import VoiceInputOverlay from "@/utilities/useVoiceToText";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CITIZENSHIP_OPTIONS = [
  "Citizen",
  "Indigenous Citizen",
  "Permanent Resident",
  "Temporary Resident",
  "Protected Person",
] as const;

export default function ResidenceCitizenship() {
  const router = useRouter();
  const { mode, returnTo } = useLocalSearchParams<{
    mode?: string;
    returnTo?: string;
  }>();
  const editingMode = typeof mode === "string" ? mode : undefined;
  const returnToPath =
    typeof returnTo === "string" ? returnTo : "/(tabs)/profile";
  const isEditingResidence = editingMode === "edit-residence";
  const { profileData, updateProfileData } = useProfile();
  const [citizenshipStatus, setCitizenshipStatus] = useState(
    profileData.citizenshipStatus || ""
  );
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownLabel = useMemo(
    () => citizenshipStatus || "Select status",
    [citizenshipStatus]
  );

  const handleVoiceResult = (text: string) => {
    setCitizenshipStatus(text);
    updateProfileData({ citizenshipStatus: text });
    setShowVoiceOverlay(false);
  };

  const handleNext = () => {
    updateProfileData({ citizenshipStatus });
    if (isEditingResidence) {
      router.replace(returnToPath as any);
    } else {
      router.push("/residence-progress");
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Residence information</Text>
        <TouchableOpacity
          onPress={() => setShowExitModal(true)}
          style={styles.headerButton}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "50%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Citizenship Status</Text>

        <TouchableOpacity
          style={[styles.input, styles.dropdownTrigger]}
          activeOpacity={0.8}
          onPress={() => setShowDropdown((prev) => !prev)}
        >
          <Text
            style={[
              styles.dropdownLabel,
              !citizenshipStatus && styles.dropdownPlaceholder,
            ]}
          >
            {dropdownLabel}
          </Text>
          <Ionicons
            name={showDropdown ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
        {showDropdown && (
          <View style={styles.dropdown}>
            {CITIZENSHIP_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.dropdownOption,
                  option === citizenshipStatus && styles.dropdownOptionActive,
                ]}
                onPress={() => {
                  setCitizenshipStatus(option);
                  updateProfileData({ citizenshipStatus: option });
                  setShowDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownOptionText,
                    option === citizenshipStatus &&
                      styles.dropdownOptionTextActive,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => setShowVoiceOverlay(true)}
        >
          <Ionicons name="mic" size={24} color="#8B5CF6" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>
            {isEditingResidence ? "Save & Close" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

      <VoiceInputOverlay
        visible={showVoiceOverlay}
        onClose={() => setShowVoiceOverlay(false)}
        contextField="citizenshipStatus"
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
  },
  input: {
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
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownLabel: {
    fontSize: 16,
    color: "#0B0B0F",
  },
  dropdownPlaceholder: {
    color: "#9CA3AF",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginTop: -4,
    marginBottom: 16,
    overflow: "hidden",
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#FFFFFF",
  },
  dropdownOptionActive: {
    backgroundColor: "#F3F2FF",
  },
  dropdownOptionText: {
    fontSize: 16,
    color: "#0B0B0F",
  },
  dropdownOptionTextActive: {
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
  nextButtonText: {
    ...Theme.typography.button,
    color: Theme.colors.black,
    textAlign: "center",
  },
});
