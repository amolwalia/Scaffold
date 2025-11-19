import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileSectionCardProps {
  title: string;
  completed: boolean;
  completionCount: string; 
  children: React.ReactNode;
  showEditButton?: boolean;
  onEdit?: () => void;
}

export default function ProfileSectionCard({
  title,
  completed,
  completionCount,
  children,
  showEditButton = true,
  onEdit,
}: ProfileSectionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <View style={styles.card}>

      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons
            name={completed ? "checkmark-circle" : "checkmark-circle-outline"}
            size={24}
            color={completed ? "#8B5CF6" : "#9CA3AF"}
          />
          <Text style={styles.title}>{title}</Text>
          <Text
            style={[
              styles.completionCount,
              { color: completed ? "#8B5CF6" : "#9CA3AF" },
            ]}
          >
            {completionCount}
          </Text>
        </View>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={20}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.content}>
          {children}
          {showEditButton && onEdit && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={onEdit}
              activeOpacity={0.7}
            >
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0B0B0F",
    flex: 1,
  },
  completionCount: {
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  editButton: {
    borderWidth: 2,
    borderColor: "#7CD23E",
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 32,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  editButtonText: {
    color: "#3EB208",
    fontSize: 16,
    fontWeight: "600",
  },
});
