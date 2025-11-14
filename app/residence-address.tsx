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

export default function ResidenceAddress() {
  const router = useRouter();
  const { profileData, updateProfileData } = useProfile();
  const [addressLine1, setAddressLine1] = useState(profileData.address.split(",")[0] || "");
  const [addressLine2, setAddressLine2] = useState(profileData.address.split(",")[1] || "");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState(profileData.postalCode || "");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleVoiceResult = (text: string) => {
    if (activeField === "addressLine1") {
      setAddressLine1(text);
    } else if (activeField === "addressLine2") {
      setAddressLine2(text);
    } else if (activeField === "city") {
      setCity(text);
    } else if (activeField === "postalCode") {
      setPostalCode(text);
    }
    const fullAddress = [addressLine1, addressLine2, city].filter(Boolean).join(", ");
    updateProfileData({ address: fullAddress, postalCode });
    setShowVoiceOverlay(false);
    setActiveField(null);
  };

  const handleNext = () => {
    const fullAddress = [addressLine1, addressLine2, city].filter(Boolean).join(", ");
    updateProfileData({ address: fullAddress, postalCode });
    router.push("/residence-province");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Residence information</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
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
          placeholder="Address line1"
          placeholderTextColor="#9CA3AF"
          value={addressLine1}
          onChangeText={(text) => {
            setAddressLine1(text);
            const fullAddress = [text, addressLine2, city].filter(Boolean).join(", ");
            updateProfileData({ address: fullAddress });
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Address line2"
          placeholderTextColor="#9CA3AF"
          value={addressLine2}
          onChangeText={(text) => {
            setAddressLine2(text);
            const fullAddress = [addressLine1, text, city].filter(Boolean).join(", ");
            updateProfileData({ address: fullAddress });
          }}
        />

        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.cityInput]}
            placeholder="City"
            placeholderTextColor="#9CA3AF"
            value={city}
            onChangeText={(text) => {
              setCity(text);
              const fullAddress = [addressLine1, addressLine2, text].filter(Boolean).join(", ");
              updateProfileData({ address: fullAddress });
            }}
          />

          <TextInput
            style={[styles.input, styles.postalInput]}
            placeholder="Postal Code"
            placeholderTextColor="#9CA3AF"
            value={postalCode}
            onChangeText={(text) => {
              setPostalCode(text);
              updateProfileData({ postalCode: text });
            }}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => {
            setActiveField("addressLine1");
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
  row: {
    flexDirection: "row",
    gap: 12,
  },
  cityInput: {
    flex: 2,
  },
  postalInput: {
    flex: 1,
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

