import BottomNavigation from '@/components/BottomNavigation';
import SparkleIcon from '@/components/SparkleIcon';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PRESET_GOAL =
  'My future goal as a mason is to become a certified journeyman and eventually run my own small contracting business. I want to focus on custom stone and brickwork for residential homes.';

export default function GeneratedApplicationScreen() {
  const router = useRouter();
  const [writtenAnswers, setWrittenAnswers] = useState({
    goal: '',
    career: '',
  });

  const profileData = {
    fullName: 'Mateo Alvarez',
    streetAddress: '123 Main Street',
    city: 'Vancouver, BC',
    email: 'mateo.alvarez@email.com',
    phone: '(604) 555-0123',
    currentEmployer: 'ABC Construction Ltd.',
    tuitionCost: '$2,500',
    apprenticeshipLevel: 'Level 2',
  };

  const handleApplyPress = () => {
    console.log('Apply button pressed - navigate to external portal');
  };

  const handleUploadDocuments = () => {
    console.log('Upload documents pressed');
  };

  const insertPresetGoal = () => {
    setWrittenAnswers((prev) => ({ ...prev, goal: PRESET_GOAL }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          paddingTop: Theme.spacing.md,
        }}
      >
        <Stack.Screen options={{ headerShown: false }} />

        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="bookmark-outline" size={22} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Top Section */}
        <View
          style={{
            marginBottom: 34,
          }}
        >
          <Text
            style={[
              Theme.typography.body,
              { color: Theme.colors.black, marginBottom: 10 },
            ]}
          >
            You're almost done!
          </Text>
          <Text
            style={[
              Theme.typography.h2,
              { color: Theme.colors.black, marginBottom: 10 },
            ]}
          >
            Masonry Institute of BC Training Fund
          </Text>
          <Text
            style={[
              Theme.typography.body,
              { color: Theme.colors.black, marginBottom: 23 },
            ]}
          >
            We've auto-filled your application using your profile{' '}
            <Text
              style={[Theme.typography.body, { color: Theme.colors.purple }]}
            >
              Finish applying through the{' '}
              <Text
                style={[
                  Theme.typography.bodyBold,
                  { color: Theme.colors.purple },
                ]}
              >
                portal
              </Text>
            </Text>
            .
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: Theme.colors.green,
              borderRadius: Theme.radius.card,
              paddingTop: 25,
              paddingBottom: 25,
              paddingLeft: 16,
              paddingRight: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onPress={handleApplyPress}
          >
            <Text
              style={[Theme.typography.body, { color: Theme.colors.black }]}
            >
              Apply here
            </Text>
            <Ionicons name="open-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Application Template Section */}
        <View style={{ marginBottom: 32 }}>
          <Text
            style={[
              Theme.typography.h2,
              { color: Theme.colors.black, marginBottom: 20 },
            ]}
          >
            Your application
          </Text>

          {/* Basic Profile */}
          <View style={styles.applicationCard}>
            <Text style={styles.applicationCardTitle}>Basic Profile</Text>

            <View style={styles.applicationCardContent}>
              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>Full Name</Text>
                <Text style={styles.applicationCardItemValue}>
                  {profileData.fullName}
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>
                  Street Address
                </Text>
                <Text style={styles.applicationCardItemValue}>
                  {profileData.streetAddress}
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>City</Text>
                <Text style={styles.applicationCardItemValue}>
                  {profileData.city}
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>Email</Text>
                <Text style={styles.applicationCardItemValue}>
                  {profileData.email}
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>Phone</Text>
                <Text style={styles.applicationCardItemValue}>
                  {profileData.phone}
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>
                  Current Employer
                </Text>
                <Text style={styles.applicationCardItemValue}>
                  {profileData.currentEmployer}
                </Text>
              </View>
            </View>
          </View>

          {/* Education and training */}
          <View style={styles.applicationCard}>
            <Text style={styles.applicationCardTitle}>
              Education and training
            </Text>

            <View style={styles.applicationCardContent}>
              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>
                  Cost of Tuition
                </Text>
                <Text style={styles.applicationCardItemValue}>
                  {profileData.tuitionCost}
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>
                  Apprenticeship Level
                </Text>
                <Text style={styles.applicationCardItemValue}>
                  {profileData.apprenticeshipLevel}
                </Text>
              </View>
            </View>
          </View>

          {/* References */}
          <View style={styles.applicationCard}>
            <Text style={styles.applicationCardTitle}>References</Text>

            <View style={styles.applicationCardContent}>
              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>Full Name</Text>
                <Text style={styles.applicationCardItemValue}>
                  Not provided
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Text style={styles.applicationCardItemLabel}>Phone</Text>
                <Text style={styles.applicationCardItemValue}>
                  Not provided
                </Text>
              </View>
            </View>
          </View>

          {/* Written Answers */}
          <View style={styles.applicationCard}>
            <Text style={styles.applicationCardTitle}>Written Answers</Text>

            <View style={styles.applicationCardContent}>
              <View>
                {/* Label + sparkle icon */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={[
                      Theme.typography.body,
                      {
                        color: Theme.colors.darkGrey,
                        marginBottom: Theme.spacing.sm,
                        fontStyle: 'italic',
                      },
                    ]}
                  >
                    What is your future goal as a mason?
                  </Text>

                  <TouchableOpacity
                    style={{ position: 'absolute', right: 0, top: 0 }}
                    onPress={insertPresetGoal}
                    hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                    accessibilityRole="button"
                    accessibilityLabel="Insert suggested answer"
                  >
                    <SparkleIcon />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={{
                    backgroundColor: Theme.colors.white,
                    borderRadius: Theme.radius.card,
                    padding: Theme.spacing.md,
                    minHeight: 80,
                    marginBottom: Theme.spacing.sm,
                    ...Theme.typography.body,
                  }}
                  placeholderTextColor={Theme.colors.grey}
                  placeholder="Enter your response here..."
                  value={writtenAnswers.goal}
                  onChangeText={(text) =>
                    setWrittenAnswers((prev) => ({ ...prev, goal: text }))
                  }
                  multiline
                  textAlignVertical="top"
                />
              </View>

              <View>
                <Text
                  style={[
                    Theme.typography.body,
                    {
                      color: Theme.colors.darkGrey,
                      marginBottom: Theme.spacing.sm,
                      fontStyle: 'italic',
                      paddingRight: 10,
                    },
                  ]}
                >
                  Why have you chosen a career in masonry?
                </Text>
                <TouchableOpacity
                  style={{ position: 'absolute', right: 0, top: 0 }}
                  onPress={insertPresetGoal}
                  hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                  accessibilityRole="button"
                  accessibilityLabel="Insert suggested answer"
                >
                  <SparkleIcon />
                </TouchableOpacity>
                <TextInput
                  style={{
                    backgroundColor: Theme.colors.white,
                    borderRadius: Theme.radius.card,
                    padding: Theme.spacing.md,
                    minHeight: 80,
                    marginBottom: Theme.spacing.sm,
                    ...Theme.typography.body,
                  }}
                  placeholderTextColor={Theme.colors.grey}
                  placeholder="Enter your response here..."
                  value={writtenAnswers.career}
                  onChangeText={(text) =>
                    setWrittenAnswers((prev) => ({ ...prev, career: text }))
                  }
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>
          </View>

          {/* Documents */}
          <View style={styles.applicationCard}>
            <Text style={styles.applicationCardTitle}>Documents</Text>

            <View style={styles.applicationCardContent}>
              <View style={styles.applicationCardItem}>
                <Ionicons name="folder" size={20} color={Theme.colors.orange} />
                <Text style={styles.documentItem}>
                  Unofficial transcript (high school or post-secondary)
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Ionicons name="folder" size={20} color={Theme.colors.orange} />
                <Text style={styles.documentItem}>
                  Proof of registration and acceptance in your program
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Ionicons name="folder" size={20} color={Theme.colors.orange} />
                <Text style={styles.documentItem}>
                  Letter of support from your current employer
                </Text>
              </View>

              <View style={styles.applicationCardItem}>
                <Ionicons name="folder" size={20} color={Theme.colors.orange} />
                <Text style={styles.documentItem}>
                  Confirmation of membership status with the Masonry Institute
                  of BC
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: Theme.spacing.md,
                }}
                onPress={handleUploadDocuments}
              >
                <Ionicons
                  name="cloud-upload-outline"
                  size={20}
                  color={Theme.colors.darkGrey}
                />
                <Text
                  style={[
                    Theme.typography.body,
                    {
                      color: Theme.colors.darkGrey,
                      marginLeft: Theme.spacing.sm,
                    },
                  ]}
                >
                  Upload documents
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNavigation activeTab="grants" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 26,
  },
  applicationCard: {
    backgroundColor: Theme.colors.lightGrey,
    borderWidth: 1,
    borderColor: Theme.colors.green,
    borderRadius: Theme.radius.card,
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 12,
  },
  applicationCardTitle: {
    ...Theme.typography.subhead1,
    color: Theme.colors.black,
    marginBottom: 20,
  },
  applicationCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  applicationCardItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  applicationCardItemLabel: {
    ...Theme.typography.body,
    color: Theme.colors.darkGrey,
  },
  applicationCardItemValue: {
    ...Theme.typography.body,
    color: Theme.colors.black,
  },
  documentItem: {
    ...Theme.typography.body,
    color: Theme.colors.black,
    marginLeft: Theme.spacing.md,
  },
});
