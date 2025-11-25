import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";

export default function ConfirmEmail() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require("../assets/images/scaf logo.svg")}
            style={styles.logo}
            contentFit="contain"
            accessibilityLabel="Scaffold logo"
          />
          <Text style={styles.title}>
            Scaffold will send you an email{"\n"}Please confirm!
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => router.replace("/sign-in")}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>Continue to Log in</Text>
          </TouchableOpacity>

          <Text style={styles.linkRow}>
            Don&apos;t have an email?{" "}
            <Text
              style={styles.linkText}
              onPress={() => router.replace("/sign-up")}
            >
              Try again
            </Text>
          </Text>
        </View>
      </View>
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
    justifyContent: "center",
    gap: 24,
  },
  logo: {
    width: 220,
    height: 220,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
    lineHeight: 28,
  },
  actions: {
    gap: 14,
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
  linkRow: {
    textAlign: "center",
    fontSize: 16,
    color: "#1F2937",
  },
  linkText: {
    textDecorationLine: "underline",
    fontWeight: "700",
  },
});
