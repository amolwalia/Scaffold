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

export default function BasicProfileName() {
  const router = useRouter();
  const { profileData, updateProfileData } = useProfile();
  const [firstName, setFirstName] = useState(profileData.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(profileData.name.split(" ").slice(1).join(" ") || "");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [activeField, setActiveField] = useState<"firstName" | "lastName" | null>(null);

  const handleVoiceResult = (text: string) => {
    if (activeField === "firstName") {
      setFirstName(text);
      updateProfileData({ name: `${text} ${lastName}`.trim() });
    } else if (activeField === "lastName") {
      setLastName(text);
      updateProfileData({ name: `${firstName} ${text}`.trim() });
    }
    setShowVoiceOverlay(false);
    setActiveField(null);
  };

  const handleNext = () => {
    const fullName = `${firstName} ${lastName}`.trim();
    updateProfileData({ name: fullName });
    router.push("/basic-profile-dob");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basic Profile</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "15%" }]} />
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.instruction}>Enter Your Full Name</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#9CA3AF"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            updateProfileData({ name: `${text} ${lastName}`.trim() });
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#9CA3AF"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            updateProfileData({ name: `${firstName} ${text}`.trim() });
          }}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => {
            setActiveField("firstName");
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
    justifyContent: "center",
  },
  instruction: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B0B0F",
    textAlign: "center",
    marginBottom: 32,
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

