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

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function BasicProfileDOB() {
  const router = useRouter();
  const { profileData, updateProfileData } = useProfile();
  const [month, setMonth] = useState("January");
  const [day, setDay] = useState("15");
  const [year, setYear] = useState("2003");
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const handleVoiceResult = (text: string) => {
    // Parse date from voice input (e.g., "January 15 2003")
    const parts = text.trim().split(/\s+/);
    if (parts.length >= 3) {
      const m = parts[0];
      const d = parts[1];
      const y = parts[2];
      if (MONTHS.includes(m)) setMonth(m);
      if (!isNaN(Number(d)) && Number(d) >= 1 && Number(d) <= 31) setDay(d);
      if (!isNaN(Number(y)) && Number(y) >= 1900 && Number(y) <= 2010) setYear(y);
    }
    updateProfileData({ dateOfBirth: `${month} ${day}, ${year}` });
    setShowVoiceOverlay(false);
  };

  const handleNext = () => {
    updateProfileData({ dateOfBirth: `${month} ${day}, ${year}` });
    router.push("/basic-profile-gender");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Basic Profile</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "20%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.instruction}>Enter Your Date of Birth</Text>

        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowMonthPicker(!showMonthPicker)}
          >
            <Text style={styles.dateLabel}>Month</Text>
            <View style={styles.dateValueContainer}>
              <Text style={styles.dateValue}>{month}</Text>
              <Ionicons name="chevron-down" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>day</Text>
            <TextInput
              style={styles.dateValueInput}
              value={day}
              onChangeText={(text) => {
                setDay(text);
                updateProfileData({ dateOfBirth: `${month} ${text}, ${year}` });
              }}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>

          <View style={styles.dateInput}>
            <Text style={styles.dateLabel}>year</Text>
            <TextInput
              style={styles.dateValueInput}
              value={year}
              onChangeText={(text) => {
                setYear(text);
                updateProfileData({ dateOfBirth: `${month} ${day}, ${text}` });
              }}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
        </View>

        {showMonthPicker && (
          <View style={styles.monthPicker}>
            {MONTHS.map((m) => (
              <TouchableOpacity
                key={m}
                style={styles.monthOption}
                onPress={() => {
                  setMonth(m);
                  setShowMonthPicker(false);
                  updateProfileData({ dateOfBirth: `${m} ${day}, ${year}` });
                }}
              >
                <Text style={styles.monthOptionText}>{m}</Text>
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
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      <VoiceInputOverlay
        visible={showVoiceOverlay}
        onClose={() => setShowVoiceOverlay(false)}
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
  dateContainer: {
    flexDirection: "row",
    gap: 12,
  },
  dateInput: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  dateValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  dateValue: {
    fontSize: 16,
    color: "#0B0B0F",
  },
  dateValueInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0B0B0F",
    backgroundColor: "#FFFFFF",
  },
  monthPicker: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    maxHeight: 200,
  },
  monthOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  monthOptionText: {
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

