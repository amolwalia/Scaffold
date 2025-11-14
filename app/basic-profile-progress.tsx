import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function BasicProfileProgress() {
  const router = useRouter();
  const { profileData } = useProfile();

  // Calculate completion for basic profile section
  const progress = useMemo(() => {
    const fields = [
      profileData.name,
      profileData.dateOfBirth,
      profileData.gender,
      profileData.phone,
      profileData.email,
    ];
    const filled = fields.filter((f) => f).length;
    return Math.round((filled / 5) * 100);
  }, [profileData]);

  const handleContinue = () => {
    router.push("/residence-address");
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
          <View style={[styles.progressFill, { width: "25%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.progressText}>
          Your Basic Profile is <Text style={styles.progressPercent}>{progress}%</Text> complete!
        </Text>

        <View style={styles.progressBarLarge}>
          <View style={[styles.progressFillLarge, { width: `${progress}%` }]} />
        </View>

        <View style={styles.nextStepContainer}>
          <Text style={styles.nextStepLabel}>Next step:</Text>
          <Text style={styles.nextStepValue}>Residence Information</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
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
    alignItems: "center",
  },
  progressText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#8B5CF6",
    textAlign: "center",
    marginBottom: 24,
  },
  progressPercent: {
    color: "#F59E0B",
    fontWeight: "800",
  },
  progressBarLarge: {
    width: "100%",
    height: 14,
    backgroundColor: "#F3F4F6",
    borderRadius: 7,
    overflow: "hidden",
    marginBottom: 40,
  },
  progressFillLarge: {
    height: "100%",
    backgroundColor: "#8B5CF6",
  },
  nextStepContainer: {
    alignItems: "center",
  },
  nextStepLabel: {
    fontSize: 16,
    color: "#0B0B0F",
    marginBottom: 8,
  },
  nextStepValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#8B5CF6",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  continueButton: {
    backgroundColor: "#F59E0B",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

