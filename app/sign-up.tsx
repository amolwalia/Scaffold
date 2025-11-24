import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function SignUp() {
  const router = useRouter();
  const { signUp, authLoading, session } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      router.replace("/(tabs)");
    }
  }, [router, session]);

  const updateField = (
    key: "name" | "email" | "password" | "confirmPassword",
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setNotice(null);
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!isValidEmail(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(null);
    const { error: signUpError, session: newSession } = await signUp(
      form.name.trim(),
      form.email.trim().toLowerCase(),
      form.password
    );
    if (signUpError) {
      setError(signUpError);
      return;
    }
    if (newSession) {
      router.replace("/(tabs)");
    } else {
      setNotice("Check your email to confirm your account, then log in.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.logoBlock}>
          <Image
            source={require("../assets/images/scaf logo.svg")}
            style={{ width: 120, height: 120 }}
            contentFit="contain"
            accessibilityLabel="Scaffold icon"
          />
          <Text style={styles.heroTitle}>
            Sign up to unlock grants made for you.
          </Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor="#A0A0A5"
            autoCapitalize="words"
            value={form.name}
            onChangeText={(value) => updateField("name", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A0A0A5"
            autoCapitalize="none"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => updateField("email", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0A0A5"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => updateField("password", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="#A0A0A5"
            secureTextEntry
            value={form.confirmPassword}
            onChangeText={(value) => updateField("confirmPassword", value)}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {notice ? <Text style={styles.noticeText}>{notice}</Text> : null}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSubmit}
            activeOpacity={0.9}
            disabled={authLoading}
          >
            {authLoading ? (
              <ActivityIndicator color="#0F172A" />
            ) : (
              <Text style={styles.primaryButtonText}>Sign up</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.switchText}>
            Already have an account?{" "}
            <Text
              style={styles.linkText}
              onPress={() => router.replace("/sign-in")}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    minHeight: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 28,
    paddingVertical: 40,
    justifyContent: "center",
  },
  logoBlock: {
    alignItems: "center",
    marginBottom: 32,
  },
  heroTitle: {
    textAlign: "center",
    marginTop: 16,
    color: "#7260CC",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22,
  },
  form: {
    gap: 14,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D6D6DE",
    borderWidth: 1.2,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#0F172A",
  },
  errorText: {
    color: "#E83B4D",
    fontSize: 14,
  },
  noticeText: {
    color: "#6B7280",
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: "#FF890C",
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
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
  switchText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
    color: "#1F2937",
  },
  linkText: {
    textDecorationLine: "underline",
    fontWeight: "700",
  },
});
