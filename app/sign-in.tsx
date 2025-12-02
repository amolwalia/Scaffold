import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Fonts } from "@/constants/theme";

import {
  ActivityIndicator,
  Alert,
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

export default function SignIn() {
  const router = useRouter();
  const { signIn, authLoading, session } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const resetRedirect = process.env.EXPO_PUBLIC_SUPABASE_RESET_REDIRECT_URL;

  useEffect(() => {
    if (session) {
      router.replace("/eligibility-info");
    }
  }, [router, session]);

  const updateField = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      setError("Please enter your email and password.");
      return;
    }
    setError(null);
    const { error: signInError } = await signIn(
      form.email.trim(),
      form.password
    );
    if (signInError) {
      setError(signInError);
      return;
    }
    router.replace("/eligibility-info");
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      Alert.alert("Enter email", "Please enter your email to reset password.");
      return;
    }
    if (!resetRedirect) {
      Alert.alert(
        "Reset link unavailable",
        "Set EXPO_PUBLIC_SUPABASE_RESET_REDIRECT_URL to enable password resets."
      );
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      form.email.trim(),
      { redirectTo: resetRedirect }
    );
    if (resetError) {
      Alert.alert("Unable to send reset link", resetError.message);
    } else {
      Alert.alert(
        "Check your email",
        "We sent a reset link to your inbox. Follow it to update your password."
      );
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
        <View style={styles.logoWrapper}>
          <Image
            source={require("../assets/images/scaffold logo.svg")}
            style={{ width: 133, height: 156 }}
            contentFit="contain"
            accessibilityLabel="Scaffold logo"
          />
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#A0A0A5"
            autoCapitalize="none"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => updateField("email", value)}
          />
          <View style={styles.passwordRow}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              placeholder="Password"
              placeholderTextColor="#A0A0A5"
              secureTextEntry
              value={form.password}
              onChangeText={(value) => updateField("password", value)}
            />
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleSubmit}
            activeOpacity={0.9}
            disabled={authLoading}
          >
            {authLoading ? (
              <ActivityIndicator color="#0F172A" />
            ) : (
              <Text style={styles.primaryButtonText}>Log in</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.switchText}>
            Don’t have an account?{" "}
            <Text
              style={styles.linkText}
              onPress={() => router.push("/sign-up")}
            >
              Sign up
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
  logoWrapper: {
    alignItems: "center",
    marginBottom: 67,
  },
  form: {
    gap: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#C9C9D2",
    borderWidth: 1.2,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 20,
    fontSize: 14,
    color: "#0F172A",
    fontFamily: Fonts.medium,
  },
  passwordRow: {
    gap: 8,
  },
  passwordInput: {
    paddingRight: 16,
  },
  forgotText: {
    alignSelf: "flex-end",
    marginTop: -2,
    color: "#9696A1",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: Fonts.medium,
  },
  errorText: {
    color: "#E83B4D",
    fontSize: 14,
    fontFamily: Fonts.medium,
  },
  primaryButton: {
    backgroundColor: "#FF890C",
    borderRadius: 999,
    paddingVertical: 16,
    marginTop: 36, 
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#0F172A",
    fontSize: 15,
    fontFamily: Fonts.medium,
  },
  switchText: {
    textAlign: "center",
    marginTop: 27,
    fontSize: 14,
    color: "#1F2937",
    fontFamily: Fonts.medium,
  },
  linkText: {
    textDecorationLine: "underline",
    fontWeight: "700",
    fontFamily: Fonts.bold,
  },
});
