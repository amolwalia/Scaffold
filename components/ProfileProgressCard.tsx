import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProfileProgressCardProps {
  percent: number; 
}

export default function ProfileProgressCard({
  percent = 60,
}: ProfileProgressCardProps) {
  const pct = Math.max(0, Math.min(100, percent));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Finish your profile!</Text>
      <Text style={styles.description}>
        Your profile is {pct}% complete. Fill out the rest of questions to save
        time on future applications.
      </Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${pct}%` }]}>
          <LinearGradient
            colors={["#F59E0B", "#8B5CF6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B0B0F",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
  },
  gradient: {
    flex: 1,
  },
});

