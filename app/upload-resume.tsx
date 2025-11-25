import { useProfile } from "@/contexts/ProfileContext";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { Image } from "expo-image";
import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { RetrieveResponse } from "roughlyai";

const AI_ICON = require("../assets/images/Ai-icon.png");
const ADD_FILE = require("../assets/images/add-file.png");
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

export default function UploadResume() {
  const router = useRouter();
  const { updateProfileData } = useProfile();
  const [isProcessing, setIsProcessing] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const spinnerAnimation = useRef<Animated.CompositeAnimation | null>(null);
  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "3600deg"],
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

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      setIsProcessing(true);

      const presignResp = await fetch(
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

      if (!presignResp.ok) {
        throw new Error("Failed to fetch presigned URL.");
      }

      const uploadUrl: any = JSON.parse(await presignResp.json());
      if (!uploadUrl?.url?.[0]) {
        throw new Error("Invalid presigned URL.");
      }

      const fileUri = file.uri ?? file.uri;
      const fileResp = await fetch(fileUri);
      const fileBlob = await fileResp.blob();

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
        throw new Error("Failed to upload the file to S3.");
      }

      const trainResp = await fetch(
        "https://m3rcwp4vofeta3kqelrykbgosi0rswzn.lambda-url.ca-central-1.on.aws/",
        {
          method: "POST",
          body: JSON.stringify({
            type: "train",
            project_name: "Scaffold",
          }),
        }
      );

      if (!trainResp.ok) {
        throw new Error("Failed to fetch presigned URL.");
      }

      const trainUrl: any = JSON.parse(await trainResp.json());
      if (!trainUrl?.url) {
        throw new Error("Invalid presigned URL.");
      }

      const trained = await RetrieveResponse(trainUrl.url);
      if (!trained) {
        throw new Error("Training failed.");
      }

      const promptResp = await fetch(
        "https://m3rcwp4vofeta3kqelrykbgosi0rswzn.lambda-url.ca-central-1.on.aws/",
        {
          method: "POST",
          body: JSON.stringify({
            project_name: "Scaffold",
            prompt: `From the document "${file.name}", extract every detail that can populate the profile. Respond ONLY with JSON (no prose) that matches {"first_name":string,"last_name":string,"email":string,"phone":string,"address":string,"postal_code":string,"province":string,"date_of_birth":string,"gender":string,"citizenship_status":string,"household_size":string,"family_composition":string,"annual_family_net_income":string,"guardian_name":string,"guardian_phone":string,"guardian_email":string,"highest_education":string,"school_name":string,"graduation_date":string,"trade_school_name":string,"trade_program_name":string,"trade_graduation_date":string,"trade":string,"apprenticeship_level":string}. When identifying apprenticeship_level, return the exact level label mentioned (e.g., "Level 1", "Level 2", "Level 3", "Level 4", or "Red Seal"). Use empty strings when a value cannot be found.`,
          }),
        }
      );

      if (!promptResp.ok) {
        throw new Error("Failed to fetch presigned URL.");
      }

      const promptUrl: any = JSON.parse(await promptResp.json());
      if (!promptUrl?.url) {
        throw new Error("Invalid presigned URL.");
      }

      const promptResponse: any = await RetrieveResponse(promptUrl.url);
      const answerRaw = promptResponse?.answer;
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
        const pickValue = (...values: unknown[]) => {
          for (const value of values) {
            if (value !== undefined && value !== null) {
              return typeof value === "string"
                ? value.trim()
                : String(value).trim();
            }
          }
          return "";
        };
        const normalizeApprenticeshipLevel = (value: string) => {
          const lower = value.toLowerCase();
          if (!lower) return "";
          if (lower.includes("journeyman") || lower.includes("red seal")) {
            return "Journeyman";
          }
          if (
            lower.includes("fourth") ||
            lower.includes("level 4") ||
            lower.includes("4th")
          ) {
            return "Level 4";
          }
          if (
            lower.includes("third") ||
            lower.includes("level 3") ||
            lower.includes("3rd")
          ) {
            return "Level 3";
          }
          if (
            lower.includes("second") ||
            lower.includes("level 2") ||
            lower.includes("2nd")
          ) {
            return "Level 2";
          }
          if (
            lower.includes("first") ||
            lower.includes("level 1") ||
            lower.includes("1st")
          ) {
            return "Level 1";
          }
          return value.trim();
        };

        updateProfileData({
          name: `${pickValue(parsedAnswer.first_name)} ${pickValue(
            parsedAnswer.last_name
          )}`.trim(),
          email: pickValue(parsedAnswer.email),
          phone: pickValue(parsedAnswer.phone),
          address: pickValue(parsedAnswer.address),
          postalCode: pickValue(parsedAnswer.postal_code),
          province: pickValue(parsedAnswer.province),
          dateOfBirth: pickValue(parsedAnswer.date_of_birth),
          gender: pickValue(parsedAnswer.gender),
          citizenshipStatus: pickValue(parsedAnswer.citizenship_status),
          householdSize: pickValue(parsedAnswer.household_size),
          familyComposition: pickValue(parsedAnswer.family_composition),
          annualFamilyNetIncome: pickValue(
            parsedAnswer.annual_family_net_income
          ),
          guardianName: pickValue(parsedAnswer.guardian_name),
          guardianPhone: pickValue(parsedAnswer.guardian_phone),
          guardianEmail: pickValue(parsedAnswer.guardian_email),
          highestEducation: pickValue(parsedAnswer.highest_education),
          highSchoolName: pickValue(parsedAnswer.school_name),
          graduationDate: pickValue(parsedAnswer.graduation_date),
          tradeSchoolName: pickValue(parsedAnswer.trade_school_name),
          tradeProgramName: pickValue(parsedAnswer.trade_program_name),
          tradeGraduationDate: pickValue(parsedAnswer.trade_graduation_date),
          trade: pickValue(parsedAnswer.trade),
          apprenticeshipLevel: normalizeApprenticeshipLevel(
            pickValue(parsedAnswer.apprenticeship_level)
          ),
        });

        router.replace("/(tabs)");
        return;
      } else {
        Alert.alert(
          "No details found",
          "We couldn't extract profile details from that file. Try another document or fill your profile manually."
        );
      }
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Image
            source={AI_ICON}
            style={styles.sparkle}
            contentFit="contain"
            accessibilityLabel="AI icon"
          />
          <Text style={styles.title}>
            Upload your resume and we’ll build your profile for you!
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickDocument}
            style={styles.uploadBox}
          >
            <Image
              source={ADD_FILE}
              style={styles.addFile}
              contentFit="contain"
              accessibilityLabel="Upload resume"
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/basic-profile-name")}
          >
            <Text style={styles.subText}>
              Or enter your info manually with Scaffold’s AI voice support
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/basic-profile-name")}
          activeOpacity={0.9}
        >
          <Text style={styles.primaryButtonText}>Enter Manually</Text>
        </TouchableOpacity>
      </View>

      {isProcessing && (
        <View style={styles.processingOverlay} pointerEvents="auto">
          <Text style={styles.processingText}>
            Your file is being processed, please wait...
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 24,
    gap: 12,
  },
  sparkle: {
    width: 82,
    height: 82,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    lineHeight: 30,
    paddingHorizontal: 12,
  },
  uploadBox: {
    width: 280,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
  },
  addFile: {
    width: "100%",
    height: "100%",
  },
  subText: {
    textAlign: "center",
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 22,
    paddingHorizontal: 18,
  },
  primaryButton: {
    backgroundColor: "#FF890C",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF890C",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
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
