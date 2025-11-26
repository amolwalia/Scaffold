import ProfileExitModal from "@/components/ProfileExitModal";
import { Theme } from "@/constants/theme";
import VoiceInputOverlay, {
  VoiceResultExtras,
} from "@/utilities/useVoiceToText";
import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function BasicProfileContact() {
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
  const [phone, setPhone] = useState(profileData.phone || "");
  const [email, setEmail] = useState(profileData.email || "");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const handleVoiceResult = (text: string, extras?: VoiceResultExtras) => {
    const structured = extras?.structuredData;
    const nextPhone = structured?.phone?.trim();
    const nextEmail = structured?.email?.trim();

    if (nextPhone) {
      setPhone(nextPhone);
      updateProfileData({ phone: nextPhone });
    } else if (!structured && text) {
      setPhone(text);
      updateProfileData({ phone: text });
    }

    if (nextEmail) {
      setEmail(nextEmail);
      updateProfileData({ email: nextEmail });
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
    updateProfileData({ phone, email });
    if (isEditingBasic) {
      router.replace(returnToPath as any);
    } else {
      navigateForward("/basic-profile-progress");
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
          <View style={[styles.progressFill, { width: "33%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <TextInput
          style={styles.input}
          placeholder="Phone #"
          placeholderTextColor="#9CA3AF"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            updateProfileData({ phone: text });
          }}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            updateProfileData({ email: text });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
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
          <Text style={styles.nextButtonText}>
            {isEditingBasic ? "Save & Close" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

      <VoiceInputOverlay
        visible={showVoiceOverlay}
        onClose={() => {
          setShowVoiceOverlay(false);
        }}
        contextFields={["phone", "email"]}
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
