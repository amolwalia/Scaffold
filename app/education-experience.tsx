import { InputFieldWithVoice } from "@/components/InputField";
import VoiceInputOverlay from "@/components/VoiceInputOverlay";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function EducationExperience() {
  const router = useRouter();
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    tradeSchoolName: "",
    tradeProgramName: "",
    graduationDate: "",
    trade: "",
    apprenticeshipLevel: "",
  });

  const handleVoiceInput = (fieldName: string) => {
    setActiveField(fieldName);
    setShowVoiceOverlay(true);
  };

  const handleTranscribe = (text: string) => {
    if (activeField) {
      setFormData((prev) => ({
        ...prev,
        [activeField]: text,
      }));
    }
    setShowVoiceOverlay(false);
    setActiveField(null);
  };

  const handleNext = () => {
    // TODO: Navigate to next step or save data
    console.log("Form data:", formData);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education/Experience</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "85%" }]} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        <Text style={styles.sectionTitle}>Trade-Specific Education</Text>

        <View style={styles.formContainer}>
          <InputFieldWithVoice
            placeholder="Trade School / Vocational School Name..."
            value={formData.tradeSchoolName}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, tradeSchoolName: text }))
            }
            onVoiceInput={() => handleVoiceInput("tradeSchoolName")}
          />

          <InputFieldWithVoice
            placeholder="Trade / Vocational Program Name..."
            value={formData.tradeProgramName}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, tradeProgramName: text }))
            }
            onVoiceInput={() => handleVoiceInput("tradeProgramName")}
          />

          <InputFieldWithVoice
            placeholder="Graduation / Completion Date..."
            value={formData.graduationDate}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, graduationDate: text }))
            }
            onVoiceInput={() => handleVoiceInput("graduationDate")}
          />

          <InputFieldWithVoice
            placeholder="Trade..."
            value={formData.trade}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, trade: text }))
            }
            onVoiceInput={() => handleVoiceInput("trade")}
          />

          <InputFieldWithVoice
            placeholder="Apprenticeship Level / Year..."
            value={formData.apprenticeshipLevel}
            onChangeText={(text) =>
              setFormData((prev) => ({ ...prev, apprenticeshipLevel: text }))
            }
            onVoiceInput={() => handleVoiceInput("apprenticeshipLevel")}
            isDropdown={true}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.voiceButton}
            onPress={() => handleVoiceInput("general")}
            activeOpacity={0.7}
          >
            <Ionicons name="mic" size={24} color="#8B5CF6" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNext}
            activeOpacity={0.8}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Voice Input Overlay */}
      <VoiceInputOverlay
        visible={showVoiceOverlay}
        onClose={() => {
          setShowVoiceOverlay(false);
          setActiveField(null);
        }}
        onTranscribe={handleTranscribe}
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
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B0B0F",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },
  voiceButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F2FF",
    justifyContent: "center",
    alignItems: "center",
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

