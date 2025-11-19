import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileExitModalProps {
  visible: boolean;
  onCancel: () => void;
  onExit: () => void;
}

export default function ProfileExitModal({
  visible,
  onCancel,
  onExit,
}: ProfileExitModalProps) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Do you want to stop profile creation?</Text>
          <Text style={styles.subtitle}>
            The profile helps you to create the eligibility check and
            application form.
          </Text>
          <Text style={styles.highlight}>
            But you can come back anytime to continue it.
          </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exit} onPress={onExit}>
              <Text style={styles.exitText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 28,
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F1F2B",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 10,
  },
  highlight: {
    fontSize: 15,
    color: "#8B5CF6",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  cancel: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#7DD321",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3EB208",
  },
  exit: {
    flex: 1,
    backgroundColor: "#FF8A00",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
  },
  exitText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F1F2B",
  },
});
