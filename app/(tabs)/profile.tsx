import ProfileProgressCard from "@/components/ProfileProgressCard";
import ProfileSectionCard from "@/components/ProfileSectionCard";
import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import * as DocumentPicker from "expo-document-picker";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ProfileFieldProps {
  label: string;
  value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  const isEmpty = value === "Empty...";
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <Text
        style={[
          styles.fieldValue,
          isEmpty ? styles.emptyValue : styles.filledValue,
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

export default function Profile() {
  const router = useRouter();
  const { profileData } = useProfile();

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // any file type
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        console.log("User canceled document picker");
        return;
      }

      const file = result.assets[0];
      console.log("Selected file:", file);
      // You can now handle the file (upload, display name, etc.)
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };

  // Helper function to display value or "Empty..."
  const displayValue = (value: string) => value || "Empty...";

  // Calculate completion counts
  const basicProfileComplete = useMemo(() => {
    const fields = [
      profileData.name,
      profileData.dateOfBirth,
      profileData.gender,
      profileData.phone,
      profileData.email,
    ];
    const filled = fields.filter((f) => f).length;
    return { filled, total: 5, count: `${filled}/5` };
  }, [profileData]);

  const residenceComplete = useMemo(() => {
    const fields = [
      profileData.address,
      profileData.postalCode,
      profileData.province,
      profileData.citizenshipStatus,
    ];
    const filled = fields.filter((f) => f).length;
    return { filled, total: 4, count: `${filled}/4` };
  }, [profileData]);

  const householdComplete = useMemo(() => {
    const fields = [
      profileData.householdSize,
      profileData.familyComposition,
      profileData.annualFamilyNetIncome,
      profileData.guardianName,
      profileData.guardianPhone,
      profileData.guardianEmail,
    ];
    const filled = fields.filter((f) => f).length;
    return { filled, total: 6, count: `${filled}/6` };
  }, [profileData]);

  const educationComplete = useMemo(() => {
    const fields = [
      profileData.highestEducation,
      profileData.highSchoolName,
      profileData.graduationDate,
      profileData.tradeSchoolName,
      profileData.tradeProgramName,
      profileData.tradeGraduationDate,
      profileData.trade,
      profileData.apprenticeshipLevel,
    ];
    const filled = fields.filter((f) => f).length;
    return { filled, total: 8, count: `${filled}/8` };
  }, [profileData]);

  // Calculate overall progress percentage
  const overallProgress = useMemo(() => {
    const totalFields = 5 + 4 + 6 + 8; // 23 total fields
    const filledFields =
      basicProfileComplete.filled +
      residenceComplete.filled +
      householdComplete.filled +
      educationComplete.filled;
    return Math.round((filledFields / totalFields) * 100);
  }, [
    basicProfileComplete,
    residenceComplete,
    householdComplete,
    educationComplete,
  ]);

  const handleEditBasicProfile = () => {
    // TODO: Navigate to edit basic profile
    console.log("Edit basic profile");
  };

  const handleEditResidence = () => {
    // TODO: Navigate to edit residence
    console.log("Edit residence");
  };

  const handleEditHousehold = () => {
    // TODO: Navigate to edit household
    console.log("Edit household");
  };

  const handleDocuments = () => {
    // TODO: Navigate to documents
    console.log("Navigate to documents");
  };

  const handleContinue = () => {
    router.push("/education-experience");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.profilePictureContainer}>
            <Ionicons name="person" size={48} color="#E9D5FF" />
            <TouchableOpacity style={styles.cameraIcon}>
              <Ionicons name="camera" size={16} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.profileName,
              profileData.name && styles.profileNameFilled,
            ]}
          >
            {profileData.name || "Bob Ross"}
          </Text>

          {/* Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={styles.documentsButton}
              onPress={pickDocument}
              activeOpacity={0.7}
            >
              <Ionicons name="folder" size={20} color="#8B5CF6" />
              <Text style={styles.documentsButtonText}>Documents</Text>
              <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.documentsButton}
              onPress={() => router.push("../education-experience-two")}
              activeOpacity={0.7}
            >
              <Ionicons name="create" size={20} color="#8B5CF6" />
              <Text style={styles.documentsButtonText}>Edit Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Progress */}
        <View style={styles.progressSection}>
          <ProfileProgressCard percent={overallProgress} />
        </View>

        {/* Profile Sections */}
        <View style={styles.sectionsContainer}>
          {/* Basic Profile */}
          <ProfileSectionCard
            title="Basic Profile"
            completed={
              basicProfileComplete.filled === basicProfileComplete.total
            }
            completionCount={basicProfileComplete.count}
            showEditButton={false}
          >
            <ProfileField
              label="Name:"
              value={displayValue(profileData.name)}
            />
            <ProfileField
              label="Date of birth:"
              value={displayValue(profileData.dateOfBirth)}
            />
            <ProfileField
              label="Gender:"
              value={displayValue(profileData.gender)}
            />
            <ProfileField
              label="Phone:"
              value={displayValue(profileData.phone)}
            />
            <ProfileField
              label="Email:"
              value={displayValue(profileData.email)}
            />
          </ProfileSectionCard>

          {/* Residence Information */}
          <ProfileSectionCard
            title="Residence information"
            completed={residenceComplete.filled === residenceComplete.total}
            completionCount={residenceComplete.count}
            showEditButton={false}
          >
            <ProfileField
              label="Address:"
              value={displayValue(profileData.address)}
            />
            <ProfileField
              label="Postal Code:"
              value={displayValue(profileData.postalCode)}
            />
            <ProfileField
              label="Province:"
              value={displayValue(profileData.province)}
            />
            <ProfileField
              label="Citizenship status:"
              value={displayValue(profileData.citizenshipStatus)}
            />
          </ProfileSectionCard>

          {/* Household Information */}
          <ProfileSectionCard
            title="Household information"
            completed={householdComplete.filled === householdComplete.total}
            completionCount={householdComplete.count}
            showEditButton={false}
          >
            <ProfileField
              label="Household size:"
              value={displayValue(profileData.householdSize)}
            />
            <ProfileField
              label="Family composition:"
              value={displayValue(profileData.familyComposition)}
            />
            <ProfileField
              label="Annual Family Net Income:"
              value={displayValue(profileData.annualFamilyNetIncome)}
            />
            <View style={styles.subsection}>
              <Text style={styles.subsectionTitle}>
                Family/Guardian information:
              </Text>
              <ProfileField
                label="Name:"
                value={displayValue(profileData.guardianName)}
              />
              <ProfileField
                label="Phone:"
                value={displayValue(profileData.guardianPhone)}
              />
              <ProfileField
                label="Email:"
                value={displayValue(profileData.guardianEmail)}
              />
            </View>
          </ProfileSectionCard>

          {/* Education/Experience */}
          <ProfileSectionCard
            title="Education/Experience"
            completed={educationComplete.filled === educationComplete.total}
            completionCount={educationComplete.count}
            showEditButton={false}
          >
            <ProfileField
              label="Highest level of Education:"
              value={displayValue(profileData.highestEducation)}
            />
            <ProfileField
              label="High School Name:"
              value={displayValue(profileData.highSchoolName)}
            />
            <ProfileField
              label="Graduation Date:"
              value={displayValue(profileData.graduationDate)}
            />
            <ProfileField
              label="Trade School Name:"
              value={displayValue(profileData.tradeSchoolName)}
            />
            <ProfileField
              label="Trade Program Name:"
              value={displayValue(profileData.tradeProgramName)}
            />
            <ProfileField
              label="Graduation Date:"
              value={displayValue(profileData.tradeGraduationDate)}
            />
            <ProfileField
              label="Trade:"
              value={displayValue(profileData.trade)}
            />
            <ProfileField
              label="Apprenticeship Level/Year:"
              value={displayValue(profileData.apprenticeshipLevel)}
            />
          </ProfileSectionCard>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue...</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E9D5FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    position: "relative",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E9D5FF",
  },
  profileName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0B0B0F",
    marginBottom: 16,
  },
  profileNameFilled: {
    color: "#8B5CF6",
  },
  documentsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F2FF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  documentsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8B5CF6",
  },
  progressSection: {
    paddingHorizontal: 20,
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  fieldContainer: {
    marginBottom: 12,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
  },
  emptyValue: {
    color: "#9CA3AF",
    fontStyle: "italic",
  },
  filledValue: {
    color: "#8B5CF6",
    fontWeight: "600",
  },
  subsection: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  subsectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 8,
  },
  continueButton: {
    backgroundColor: "#F59E0B",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
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
