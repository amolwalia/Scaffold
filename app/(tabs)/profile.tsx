import ProfileProgressCard from "@/components/ProfileProgressCard";
import ProfileSectionCard from "@/components/ProfileSectionCard";
import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { SvgXml } from "react-native-svg";
import { RetrieveResponse } from "roughlyai";
const LOADING_WHEEL = require("@/assets/images/loading-wheel.png");
const LOADING_CHARACTER_SVG = `<svg width="93" height="93" viewBox="0 0 93 93" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dii_2088_5100)">
<g filter="url(#filter1_iii_2088_5100)">
<path d="M2 42.5C2 20.1325 20.1325 2 42.5 2V2C64.8675 2 83 20.1325 83 42.5V42.5C83 64.8675 64.8675 83 42.5 83H17C8.71573 83 2 76.2843 2 68V42.5Z" fill="url(#paint0_linear_2088_5100)"/>
</g>
<g style="mix-blend-mode:soft-light">
<path d="M2 42.5C2 20.1325 20.1325 2 42.5 2V2C64.8675 2 83 20.1325 83 42.5V42.5C83 64.8675 64.8675 83 42.5 83H17C8.71573 83 2 76.2843 2 68V42.5Z" fill="url(#paint1_linear_2088_5100)" fill-opacity="0.3"/>
</g>
<path d="M2 42.5C2 20.1325 20.1325 2 42.5 2V2C64.8675 2 83 20.1325 83 42.5V42.5C83 64.8675 64.8675 83 42.5 83H17C8.71573 83 2 76.2843 2 68V42.5Z" fill="white" fill-opacity="0.1"/>
<g filter="url(#filter2_dii_2088_5100)">
<circle cx="22.2512" cy="42.5002" r="3.55" fill="white" stroke="white"/>
<path d="M27.1406 34.581C27.1406 34.581 25.3096 32.75 22.4458 32.75C19.582 32.75 17.751 34.581 17.751 34.581" stroke="white" stroke-width="2" stroke-linecap="round"/>
<circle cx="4.05" cy="4.05" r="3.55" transform="matrix(-1 0 0 1 66.8008 38.4502)" fill="white" stroke="white"/>
<path d="M58.25 34.581C58.25 34.581 60.081 32.75 62.9448 32.75C65.8086 32.75 67.6396 34.581 67.6396 34.581" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M38.4492 54.6497C38.4492 60.0497 46.5492 60.0497 46.5492 54.6497" stroke="white" stroke-width="2" stroke-linecap="round"/>
</g>
</g>
<defs>
<filter id="filter0_dii_2088_5100" x="0" y="0" width="93" height="93" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="4" dy="4"/>
<feGaussianBlur stdDeviation="3"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2088_5100"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2088_5100" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="0.2" dy="0.2"/>
<feGaussianBlur stdDeviation="0.1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2088_5100"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-0.2" dy="-0.2"/>
<feGaussianBlur stdDeviation="0.1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="effect2_innerShadow_2088_5100" result="effect3_innerShadow_2088_5100"/>
</filter>
<filter id="filter1_iii_2088_5100" x="0" y="0" width="84" height="85" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-2" dy="-2"/>
<feGaussianBlur stdDeviation="3.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.556863 0 0 0 0 0.470588 0 0 0 0 1 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="shape" result="effect1_innerShadow_2088_5100"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="2"/>
<feGaussianBlur stdDeviation="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.7 0"/>
<feBlend mode="normal" in2="effect1_innerShadow_2088_5100" result="effect2_innerShadow_2088_5100"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2"/>
<feGaussianBlur stdDeviation="0.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/>
<feBlend mode="normal" in2="effect2_innerShadow_2088_5100" result="effect3_innerShadow_2088_5100"/>
</filter>
<filter id="filter2_dii_2088_5100" x="16.552" y="31.35" width="52.8867" height="28.7497" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="0.4"/>
<feGaussianBlur stdDeviation="0.2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2088_5100"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2088_5100" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-0.2" dy="-0.2"/>
<feGaussianBlur stdDeviation="0.1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.984314 0 0 0 0 0.886275 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2088_5100"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="0.2" dy="0.2"/>
<feGaussianBlur stdDeviation="0.1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect2_innerShadow_2088_5100" result="effect3_innerShadow_2088_5100"/>
</filter>
<linearGradient id="paint0_linear_2088_5100" x1="66.8" y1="10.1" x2="2" y2="83" gradientUnits="userSpaceOnUse">
<stop offset="0.389423" stop-color="#8E78FF"/>
<stop offset="0.75" stop-color="#A89BFF"/>
<stop offset="1" stop-color="#CCCCFF"/>
</linearGradient>
<linearGradient id="paint1_linear_2088_5100" x1="-8.63063" y1="1.20467" x2="32.3288" y2="37.3921" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0"/>
</linearGradient>
</defs>
</svg>`;

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
  const { profileData, updateProfileData } = useProfile();
  const [isProcessing, setIsProcessing] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const spinnerAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    if (isProcessing) {
      spinnerAnimation.current?.stop();
      rotation.setValue(0);
      spinnerAnimation.current = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 12000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      spinnerAnimation.current.start();
    } else {
      spinnerAnimation.current?.stop();
      rotation.stopAnimation(() => rotation.setValue(0));
    }

    return () => {
      spinnerAnimation.current?.stop();
    };
  }, [isProcessing, rotation]);

  const displayValue = (value: string) => value || "Empty...";

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
      setIsProcessing(true);

      //upload documents
      console.log("Selected file:", file);
      const _resp = await fetch(
        "https://m3rcwp4vofeta3kqelrykbgosi0rswzn.lambda-url.ca-central-1.on.aws/",
        {
          method: "POST",
          body: JSON.stringify({
            type: "upload",
            project_name: "Scaffold",
            filename: file.name.toLocaleLowerCase(),
          }),
        }
      );
      if (!_resp.ok) {
        throw new Error(`Failed to fetch presigned URL.`);
      }

      const uploadUrl: any = JSON.parse(await _resp.json());
      console.log("what is url", uploadUrl);
      if (!uploadUrl?.url[0]) {
        throw new Error(`Invalid presigned URL.`);
      }

      // upload file to S3 using the presigned PUT URL
      const fileUri = file.uri ?? file.uri;

      const resp = await fetch(fileUri);
      const fileBlob = await resp.blob();

      console.log("what is happening", uploadUrl.url[0]);
      const uploadResponse = await fetch(uploadUrl.url[0], {
        method: "PUT",
        headers: {
          "Content-Type":
            file.mimeType ||
            (file.mimeType as string) ||
            "application/octet-stream",
        },
        body: fileBlob,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload the file to S3.`);
      }

      //training documents
      const _resp_train = await fetch(
        "https://m3rcwp4vofeta3kqelrykbgosi0rswzn.lambda-url.ca-central-1.on.aws/",
        {
          method: "POST",
          body: JSON.stringify({
            type: "train",
            project_name: "Scaffold",
          }),
        }
      );

      if (!_resp_train.ok) {
        throw new Error(`Failed to fetch presigned URL.`);
      }

      const trainUrl: any = JSON.parse(await _resp_train.json());
      console.log("what is train url", trainUrl.url);
      if (!trainUrl?.url) {
        throw new Error(`Invalid presigned URL.`);
      }

      const _trained = await RetrieveResponse(trainUrl.url);

      if (!_trained) {
        throw new Error(`Training failed.`);
      }

      //prompting documents
      const _prompt = await fetch(
        "https://m3rcwp4vofeta3kqelrykbgosi0rswzn.lambda-url.ca-central-1.on.aws/",
        {
          method: "POST",
          body: JSON.stringify({
            project_name: "Scaffold",
            prompt: `From the document "${file.name}", extract the first name, last name, email address, phone number, school/college/university name, residential address, postal code, and province/state. Respond ONLY with JSON that matches {"first_name":string,"last_name":string,"school_name":string,"email":string,"phone":string,"address":string,"postal_code":string,"province":string}. If any value is missing, return an empty string for that field.`,
          }),
        }
      );

      if (!_prompt.ok) {
        throw new Error(`Failed to fetch presigned URL.`);
      }

      const _promptUrl: any = JSON.parse(await _prompt.json());
      console.log("what is prompt url", _promptUrl.url);

      if (!_promptUrl?.url) {
        throw new Error(`Invalid presigned URL.`);
      }

      const _prompt_response: any = await RetrieveResponse(_promptUrl.url);

      const answerRaw = _prompt_response?.answer;
      let parsedAnswer: Record<string, string> | null = null;
      try {
        if (typeof answerRaw === "string") {
          parsedAnswer = JSON.parse(answerRaw);
        } else if (answerRaw && typeof answerRaw === "object") {
          parsedAnswer = answerRaw;
        }
      } catch (parseError) {
        console.error("Failed to parse extracted profile info", parseError);
      }

      if (parsedAnswer) {
        const first = (parsedAnswer.first_name ?? "").trim();
        const last = (parsedAnswer.last_name ?? "").trim();
        const school = (parsedAnswer.school_name ?? "").trim();
        const email = (parsedAnswer.email ?? "").trim();
        const phone = (parsedAnswer.phone ?? parsedAnswer.phone_number ?? "")
          .toString()
          .trim();
        const address = (parsedAnswer.address ?? "").trim();
        const postal = (
          parsedAnswer.postal_code ??
          parsedAnswer.postalCode ??
          ""
        ).trim();
        const province = (
          parsedAnswer.province ??
          parsedAnswer.state ??
          ""
        ).trim();

        const updates: Record<string, string> = {};
        const fullName = [first, last].filter(Boolean).join(" ").trim();
        if (fullName) updates.name = fullName;
        if (school) updates.highSchoolName = school;
        if (email) updates.email = email;
        if (phone) updates.phone = phone;
        if (address) updates.address = address;
        if (postal) updates.postalCode = postal;
        if (province) updates.province = province;

        if (Object.keys(updates).length) {
          updateProfileData(updates);
        }
      }

      // You can now handle the file (upload, display name, etc.)
    } catch (error) {
      console.error("Error picking document:", error);
      Alert.alert(
        "Upload failed",
        "We couldn't process that document. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const startEditingField = (field: ProfileFieldKey) => {
    setEditingField(field);
    setDraftValue(profileData[field] ?? "");
  };

  const cancelEditing = () => {
    setEditingField(null);
    setDraftValue("");
  };

  const saveEditingField = (field: ProfileFieldKey) => {
    const nextValue = draftValue.trim();
    updateProfileData({
      [field]: nextValue,
    } as Partial<typeof profileData>);
    cancelEditing();
  };


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

  const openProfilePicture = () => {
    router.push("/profile-picture?source=profile");
  };

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
    router.push("/basic-profile-name");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.profilePictureContainer}
            activeOpacity={0.85}
            onPress={openProfilePicture}
          >
            {profileData.profileImageUri ? (
              <Image
                source={{ uri: profileData.profileImageUri }}
                style={styles.profilePicture}
                contentFit="cover"
              />
            ) : (
              <Ionicons name="person" size={48} color="#FFFFFF" />
            )}
            {!profileData.profileImageUri && (
              <TouchableOpacity
                style={styles.cameraIcon}
                onPress={openProfilePicture}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={16} color="#8B5CF6" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
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
            <ProfileField label="Name:" value={displayValue(profileData.name)} />
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
      {isProcessing && (
        <View style={styles.processingOverlay} pointerEvents="auto">
          <Text style={styles.processingText}>
            Your application is processing
          </Text>
          <View style={styles.loadingArt}>
            <Animated.Image
              source={LOADING_WHEEL}
              style={[styles.loadingRing, { transform: [{ rotate: spin }] }]}
            />
            <View style={styles.loadingCharacter}>
              <SvgXml xml={LOADING_CHARACTER_SVG} width={90} height={90} />
            </View>
          </View>
        </View>
      )}
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
    overflow: "hidden",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
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
  processingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  processingText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#7C3AED",
    textAlign: "center",
    marginBottom: 32,
  },
  loadingArt: {
    width: 190,
    height: 190,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingRing: {
    width: 190,
    height: 190,
  },
  loadingCharacter: {
    position: "absolute",
    width: 110,
    height: 110,
    alignItems: "center",
    justifyContent: "center",
  },
});
