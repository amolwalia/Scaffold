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

export default function HouseholdSize() {
  const router = useRouter();
  const { profileData, updateProfileData } = useProfile();
  const [householdSize, setHouseholdSize] = useState(profileData.householdSize || "");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleVoiceResult = (text: string) => {
    if (activeField === "householdSize") {
      setHouseholdSize(text);
      updateProfileData({ householdSize: text });
    } else if (activeField === "member1") {
      setMember1(text);
    } else if (activeField === "member2") {
      setMember2(text);
    } else if (activeField === "member3") {
      setMember3(text);
    }
    const composition = [member1, member2, member3].filter(Boolean).join(", ");
    updateProfileData({ familyComposition: composition });
    setShowVoiceOverlay(false);
    setActiveField(null);
  };

  const handleNext = () => {
    const composition = [member1, member2, member3].filter(Boolean).join(", ");
    updateProfileData({ householdSize, familyComposition: composition });
    router.push("/household-income");
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
          <View style={[styles.progressFill, { width: "66%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Household size /{'\n'}Family Composition</Text>

        <TextInput
          style={styles.input}
          placeholder="# Number of household..."
          placeholderTextColor="#9CA3AF"
          value={householdSize}
          onChangeText={(text) => {
            setHouseholdSize(text);
            updateProfileData({ householdSize: text });
          }}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.input}
          placeholder="Composition Member 1"
          placeholderTextColor="#9CA3AF"
          value={member1}
          onChangeText={(text) => {
            setMember1(text);
            const composition = [text, member2, member3].filter(Boolean).join(", ");
            updateProfileData({ familyComposition: composition });
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Composition Member 2"
          placeholderTextColor="#9CA3AF"
          value={member2}
          onChangeText={(text) => {
            setMember2(text);
            const composition = [member1, text, member3].filter(Boolean).join(", ");
            updateProfileData({ familyComposition: composition });
          }}
        />

        <TextInput
          style={styles.input}
          placeholder="Composition Member 3"
          placeholderTextColor="#9CA3AF"
          value={member3}
          onChangeText={(text) => {
            setMember3(text);
            const composition = [member1, member2, text].filter(Boolean).join(", ");
            updateProfileData({ familyComposition: composition });
          }}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.voiceButton}
          onPress={() => {
            setActiveField("householdSize");
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

