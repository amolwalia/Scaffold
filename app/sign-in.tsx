import { InputFieldWithVoice } from "@/components/InputField";
import VoiceInputOverlay from "@/components/VoiceInputOverlay";
import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function SignIn() {
  const router = useRouter();
  const { profileData, updateProfileData } = useProfile();
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    postalCode: "",
    province: "",
    citizenshipStatus: "",
    highestEducation: "",
    highSchoolName: "",
    graduationDate: "",
    tradeSchoolName: "",
    tradeProgramName: "",
    trade: "",
    apprenticeshipLevel: "",
  });

  // Load existing profile data into form on mount (only once)
  const [hasLoadedInitialData, setHasLoadedInitialData] = useState(false);
  
  useEffect(() => {
    // Only load once when component mounts and profileData is available
    if (!hasLoadedInitialData) {
      setFormData((prev) => ({
        ...prev,
        email: profileData.email,
        name: profileData.name,
        dateOfBirth: profileData.dateOfBirth,
        phone: profileData.phone,
        address: profileData.address,
        postalCode: profileData.postalCode,
        province: profileData.province,
        citizenshipStatus: profileData.citizenshipStatus,
        highestEducation: profileData.highestEducation,
        highSchoolName: profileData.highSchoolName,
        graduationDate: profileData.graduationDate,
        tradeSchoolName: profileData.tradeSchoolName,
        tradeProgramName: profileData.tradeProgramName,
        trade: profileData.trade,
        apprenticeshipLevel: profileData.apprenticeshipLevel,
      }));
      setHasLoadedInitialData(true);
    }
  }, [profileData, hasLoadedInitialData]);

  const handleVoiceInput = (fieldName: string) => {
    setActiveField(fieldName);
    setShowVoiceOverlay(true);
  };

  const handleTranscribe = (text: string) => {
    if (activeField) {
      const updatedData = {
        ...formData,
        [activeField]: text,
      };
      setFormData(updatedData);
      // Update profile context immediately
      updateProfileField(activeField, text);
    }
    setShowVoiceOverlay(false);
    setActiveField(null);
  };

  // Helper function to update a single field in profile context
  const updateProfileField = (fieldName: string, value: string) => {
    // Map form field names to profile context field names
    const fieldMap: Record<string, string> = {
      name: "name",
      dateOfBirth: "dateOfBirth",
      phone: "phone",
      email: "email",
      address: "address",
      postalCode: "postalCode",
      province: "province",
      citizenshipStatus: "citizenshipStatus",
      highestEducation: "highestEducation",
      highSchoolName: "highSchoolName",
      graduationDate: "graduationDate",
      tradeSchoolName: "tradeSchoolName",
      tradeProgramName: "tradeProgramName",
      trade: "trade",
      apprenticeshipLevel: "apprenticeshipLevel",
    };

    const profileField = fieldMap[fieldName];
    if (profileField) {
      // Update profile context immediately - this triggers real-time updates
      updateProfileData({ [profileField]: value } as any);
    }
  };

  // Update profile context in real-time as user types
  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    // Update profile context immediately
    updateProfileField(fieldName, value);
  };

  const handleSignIn = () => {
    console.log("Sign in with data:", formData);
    // Ensure all data is saved (already done in real-time, but double-check)
    updateProfileData({
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      postalCode: formData.postalCode,
      province: formData.province,
      citizenshipStatus: formData.citizenshipStatus,
      highestEducation: formData.highestEducation,
      highSchoolName: formData.highSchoolName,
      graduationDate: formData.graduationDate,
      tradeSchoolName: formData.tradeSchoolName,
      tradeProgramName: formData.tradeProgramName,
      trade: formData.trade,
      apprenticeshipLevel: formData.apprenticeshipLevel,
    });
    router.push("/(tabs)/profile");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sign In</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Education Profile</Text>
          <Text style={styles.subtitle}>
            Fill in your information using voice input or typing
          </Text>


          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Information</Text>
            <InputFieldWithVoice
              placeholder="Name..."
              value={formData.name}
              onChangeText={(text) => handleFieldChange("name", text)}
              onVoiceInput={() => handleVoiceInput("name")}
            />
            <InputFieldWithVoice
              placeholder="Email..."
              value={formData.email}
              onChangeText={(text) => handleFieldChange("email", text)}
              onVoiceInput={() => handleVoiceInput("email")}
            />
            <InputFieldWithVoice
              placeholder="Phone..."
              value={formData.phone}
              onChangeText={(text) => handleFieldChange("phone", text)}
              onVoiceInput={() => handleVoiceInput("phone")}
            />
            <InputFieldWithVoice
              placeholder="Date of Birth..."
              value={formData.dateOfBirth}
              onChangeText={(text) => handleFieldChange("dateOfBirth", text)}
              onVoiceInput={() => handleVoiceInput("dateOfBirth")}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Address</Text>
            <InputFieldWithVoice
              placeholder="Address..."
              value={formData.address}
              onChangeText={(text) => handleFieldChange("address", text)}
              onVoiceInput={() => handleVoiceInput("address")}
            />
            <InputFieldWithVoice
              placeholder="Postal Code..."
              value={formData.postalCode}
              onChangeText={(text) => handleFieldChange("postalCode", text)}
              onVoiceInput={() => handleVoiceInput("postalCode")}
            />
            <InputFieldWithVoice
              placeholder="Province..."
              value={formData.province}
              onChangeText={(text) => handleFieldChange("province", text)}
              onVoiceInput={() => handleVoiceInput("province")}
            />
            <InputFieldWithVoice
              placeholder="Citizenship Status..."
              value={formData.citizenshipStatus}
              onChangeText={(text) => handleFieldChange("citizenshipStatus", text)}
              onVoiceInput={() => handleVoiceInput("citizenshipStatus")}
            />
          </View>
           
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <InputFieldWithVoice
              placeholder="Highest Level of Education..."
              value={formData.highestEducation}
              onChangeText={(text) => handleFieldChange("highestEducation", text)}
              onVoiceInput={() => handleVoiceInput("highestEducation")}
            />
            <InputFieldWithVoice
              placeholder="High School Name..."
              value={formData.highSchoolName}
              onChangeText={(text) => handleFieldChange("highSchoolName", text)}
              onVoiceInput={() => handleVoiceInput("highSchoolName")}
            />
            <InputFieldWithVoice
              placeholder="Graduation Date..."
              value={formData.graduationDate}
              onChangeText={(text) => handleFieldChange("graduationDate", text)}
              onVoiceInput={() => handleVoiceInput("graduationDate")}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Trade-Specific Education</Text>
            <InputFieldWithVoice
              placeholder="Trade School / Vocational School Name..."
              value={formData.tradeSchoolName}
              onChangeText={(text) => handleFieldChange("tradeSchoolName", text)}
              onVoiceInput={() => handleVoiceInput("tradeSchoolName")}
            />
            <InputFieldWithVoice
              placeholder="Trade / Vocational Program Name..."
              value={formData.tradeProgramName}
              onChangeText={(text) => handleFieldChange("tradeProgramName", text)}
              onVoiceInput={() => handleVoiceInput("tradeProgramName")}
            />
            <InputFieldWithVoice
              placeholder="Trade..."
              value={formData.trade}
              onChangeText={(text) => handleFieldChange("trade", text)}
              onVoiceInput={() => handleVoiceInput("trade")}
            />
            <InputFieldWithVoice
              placeholder="Apprenticeship Level / Year..."
              value={formData.apprenticeshipLevel}
              onChangeText={(text) => handleFieldChange("apprenticeshipLevel", text)}
              onVoiceInput={() => handleVoiceInput("apprenticeshipLevel")}
              isDropdown={true}
            />
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B0B0F",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0B0B0F",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B0B0F",
    marginBottom: 16,
  },
  signInButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 40,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});

