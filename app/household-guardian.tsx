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

export default function HouseholdGuardian() {
  const router = useRouter();
  const { profileData, updateProfileData } = useProfile();
  const [firstName, setFirstName] = useState(profileData.guardianName.split(" ")[0] || "");
  const [lastName, setLastName] = useState(profileData.guardianName.split(" ").slice(1).join(" ") || "");
  const [phone, setPhone] = useState(profileData.guardianPhone || "");
  const [email, setEmail] = useState(profileData.guardianEmail || "");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleVoiceResult = (text: string) => {
    if (activeField === "firstName") {
      setFirstName(text);
    } else if (activeField === "lastName") {
      setLastName(text);
    } else if (activeField === "phone") {
      setPhone(text);
      updateProfileData({ guardianPhone: text });
    } else if (activeField === "email") {
      setEmail(text);
      updateProfileData({ guardianEmail: text });
    }
    const fullName = `${firstName} ${lastName}`.trim();
    updateProfileData({ guardianName: fullName });
    setShowVoiceOverlay(false);
    setActiveField(null);
  };

  const handleNext = () => {
    const fullName = `${firstName} ${lastName}`.trim();
    updateProfileData({ guardianName: fullName, guardianPhone: phone, guardianEmail: email });
    router.push("/household-progress");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Household information</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "75%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Parents / Guardian information</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#9CA3AF"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            const fullName = `${text} ${lastName}`.trim();
            updateProfileData({ guardianName: fullName });
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#9CA3AF"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            const fullName = `${firstName} ${text}`.trim();
            updateProfileData({ guardianName: fullName });
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone #"
          placeholderTextColor="#9CA3AF"
          value={phone}
          onChangeText={(text) => {
            setPhone(text);
            updateProfileData({ guardianPhone: text });
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
            updateProfileData({ guardianEmail: text });
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

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

