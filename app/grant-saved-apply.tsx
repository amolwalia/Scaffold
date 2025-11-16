import BottomNavigation from '@/components/BottomNavigation';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function GrantSavedApplyScreen() {
  const router = useRouter();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState<{
    [key: string]: boolean;
  }>({
    step1: false,
    step2: false,
    step3: false,
    step4: false,
  });
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    eligibility1: false,
    eligibility2: false,
    document1: false,
    document2: false,
    document3: false,
    document4: false,
  });

  const isStep1Complete =
    checkedItems.eligibility1 && checkedItems.eligibility2;

  const isStep2Complete =
    checkedItems.document1 &&
    checkedItems.document2 &&
    checkedItems.document3 &&
    checkedItems.document4;

  const grantData = {
    title: 'Masonry Institute of BC Training Fund',
    organization: 'Masonry Institute',
    amount: 'Up to $1,950',
    deadline: '3m before training starts',
    description:
      'The Masonry Institute of BC has evolved from masonry organizations, which have been promoting the local masonry industry for over 50 years.',
    fullDescription:
      'The Masonry Institute of BC has evolved from masonry organizations, which have been promoting the local masonry industry for over 50 years.' +
      '\n' +
      ' We are committed to advancing the masonry trade through education, training, and professional development. Our training fund provides financial support to apprentices and tradespeople pursuing masonry-related education and certification programs.' +
      '\n' +
      'This includes support for various levels of apprenticeship training, specialized masonry techniques, and continuing education opportunities that enhance skills and career advancement in the masonry industry.',
  };

  const toggleStepExpansion = (stepKey: string) => {
    setExpandedSteps((prev) => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  const toggleCheckbox = (key: string) => {
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApplicationResult = (
    result: 'approved' | 'pending' | 'rejected'
  ) => {
    console.log('Application result:', result);
    // Handle application result logic here
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
        {/* Hides the default header */}
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.container}>
          {/* Custom Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back-outline" size={22} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={22} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Grant Title */}
          <View>
            <Text
              style={[
                Theme.typography.h2,
                { color: Theme.colors.black, marginBottom: 12 },
              ]}
            >
              {grantData.title}
            </Text>
          </View>

          {/* Description Section */}
          <View style={{ marginBottom: 30 }}>
            <View
              style={{
                backgroundColor: Theme.colors.lightPurple,
                borderRadius: Theme.radius.card,
                paddingTop: 30,
                paddingHorizontal: 19,
                paddingBottom: Theme.spacing.md,
              }}
            >
              <Text
                style={[Theme.typography.body, { color: Theme.colors.black }]}
              >
                {isDescriptionExpanded
                  ? grantData.fullDescription
                  : grantData.description}
              </Text>
              <TouchableOpacity
                onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-2"
              >
                <View className="flex-row items-center justify-end">
                  <Text
                    style={[
                      Theme.typography.label,
                      { color: Theme.colors.grey, marginRight: 5 },
                    ]}
                  >
                    {isDescriptionExpanded ? 'Show less' : 'Show more'}
                  </Text>
                  <Ionicons
                    name={
                      isDescriptionExpanded
                        ? 'chevron-up-outline'
                        : 'chevron-down-outline'
                    }
                    size={16}
                    color={Theme.colors.grey}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Generate Application Button */}
          <View style={{ marginBottom: 40 }}>
            <TouchableOpacity
              style={{
                backgroundColor: Theme.colors.orange,
                borderRadius: Theme.radius.button,
                ...Theme.padding.buttonLg,
              }}
              onPress={() => router.push('/generated-application')}
            >
              <Text
                style={[
                  Theme.typography.button,
                  { color: Theme.colors.black, textAlign: 'center' },
                ]}
              >
                Generate my application
              </Text>
            </TouchableOpacity>
          </View>

          {/* Progress Tracker Section */}
          <View style={{ marginBottom: 28 }}>
            <Text
              style={[
                Theme.typography.h2,
                { color: Theme.colors.black, marginBottom: Theme.spacing.md },
              ]}
            >
              Progress tracker
            </Text>

            {/* Step 1: Check eligibility */}
            <View
              style={{
                marginBottom: Theme.spacing.md,
              }}
            >
              <View style={styles.progressCard}>
                <TouchableOpacity
                  style={styles.progressCardItem}
                  onPress={() => toggleStepExpansion('step1')}
                >
                  <View style={styles.progressCardItemContent}>
                    <View
                      style={[
                        styles.checkIcon,
                        {
                          backgroundColor: isStep1Complete
                            ? Theme.colors.purple
                            : Theme.colors.grey,
                        },
                      ]}
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                    <View>
                      <Text style={styles.stepText}>Step 1</Text>
                      <Text style={styles.stepTitle}>Check eligibility</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={
                      expandedSteps.step1
                        ? 'chevron-up-outline'
                        : 'chevron-down-outline'
                    }
                    size={16}
                    color={Theme.colors.black}
                  />
                </TouchableOpacity>

                {expandedSteps.step1 && (
                  <View>
                    <View style={styles.progressCheckContent}>
                      <TouchableOpacity
                        style={styles.progressCheckItem}
                        onPress={() => toggleCheckbox('eligibility1')}
                      >
                        <View
                          className="w-[20px] h-[20px] border-[1px] mr-[38px] items-center justify-center"
                          style={{
                            backgroundColor: checkedItems.eligibility1
                              ? Theme.colors.purple
                              : 'transparent',
                            borderColor: checkedItems.eligibility1
                              ? Theme.colors.purple
                              : Theme.colors.purple,
                          }}
                        >
                          {checkedItems.eligibility1 && (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color={Theme.colors.white}
                            />
                          )}
                        </View>
                        <Text style={styles.progressCheckText}>
                          Enrolled for training at the Trowel Trades Training
                          Association
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.progressCheckItem}
                        onPress={() => toggleCheckbox('eligibility2')}
                      >
                        <View
                          className="w-[20px] h-[20px] border-[1px] mr-[38px] items-center justify-center"
                          style={{
                            backgroundColor: checkedItems.eligibility2
                              ? Theme.colors.purple
                              : 'transparent',
                            borderColor: checkedItems.eligibility2
                              ? Theme.colors.purple
                              : Theme.colors.purple,
                          }}
                        >
                          {checkedItems.eligibility2 && (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color={Theme.colors.white}
                            />
                          )}
                        </View>
                        <Text style={styles.progressCheckText}>
                          In Level 1, 2, 3 of their apprenticeship
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Step 2: Gather documents */}
            <View style={{ marginBottom: Theme.spacing.md }}>
              <View style={styles.progressCard}>
                <TouchableOpacity
                  style={styles.progressCardItem}
                  onPress={() => toggleStepExpansion('step2')}
                >
                  <View style={styles.progressCardItemContent}>
                    <View
                      style={[
                        styles.checkIcon,
                        {
                          backgroundColor: isStep2Complete
                            ? Theme.colors.purple
                            : Theme.colors.grey,
                        },
                      ]}
                    >
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={Theme.colors.white}
                      />
                    </View>
                    <View>
                      <Text style={styles.stepText}>Step 2</Text>
                      <Text style={styles.stepTitle}>Gather documents</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={
                      expandedSteps.step2
                        ? 'chevron-up-outline'
                        : 'chevron-down-outline'
                    }
                    size={16}
                    color={Theme.colors.black}
                  />
                </TouchableOpacity>

                {expandedSteps.step2 && (
                  <View>
                    <View style={styles.progressCheckContent}>
                      <TouchableOpacity
                        style={styles.progressCheckItem}
                        onPress={() => toggleCheckbox('document1')}
                      >
                        <View
                          className="w-[20px] h-[20px] border-[1px] mr-[38px] items-center justify-center"
                          style={{
                            backgroundColor: checkedItems.document1
                              ? Theme.colors.purple
                              : 'transparent',
                            borderColor: checkedItems.document1
                              ? Theme.colors.purple
                              : Theme.colors.purple,
                          }}
                        >
                          {checkedItems.document1 && (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color={Theme.colors.white}
                            />
                          )}
                        </View>
                        <Text style={styles.progressCheckText}>
                          Statement of Personal Goals
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.progressCheckItem}
                        onPress={() => toggleCheckbox('document2')}
                      >
                        <View
                          className="w-[20px] h-[20px] border-[1px] mr-[38px] items-center justify-center"
                          style={{
                            backgroundColor: checkedItems.document2
                              ? Theme.colors.purple
                              : 'transparent',
                            borderColor: checkedItems.document2
                              ? Theme.colors.purple
                              : Theme.colors.purple,
                          }}
                        >
                          {checkedItems.document2 && (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color={Theme.colors.white}
                            />
                          )}
                        </View>
                        <Text style={styles.progressCheckText}>
                          Proof of registration and acceptance in your program
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.progressCheckItem}
                        onPress={() => toggleCheckbox('document3')}
                      >
                        <View
                          className="w-[20px] h-[20px] border-[1px] mr-[38px] items-center justify-center"
                          style={{
                            backgroundColor: checkedItems.document3
                              ? Theme.colors.purple
                              : 'transparent',
                            borderColor: checkedItems.document3
                              ? Theme.colors.purple
                              : Theme.colors.purple,
                          }}
                        >
                          {checkedItems.document3 && (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color={Theme.colors.white}
                            />
                          )}
                        </View>
                        <Text style={styles.progressCheckText}>
                          References - employer and one additional
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.progressCheckItem}
                        onPress={() => toggleCheckbox('document4')}
                      >
                        <View
                          className="w-[20px] h-[20px] border-[1px] mr-[38px] items-center justify-center"
                          style={{
                            backgroundColor: checkedItems.document4
                              ? Theme.colors.purple
                              : 'transparent',
                            borderColor: checkedItems.document4
                              ? Theme.colors.purple
                              : Theme.colors.purple,
                          }}
                        >
                          {checkedItems.document4 && (
                            <Ionicons
                              name="checkmark"
                              size={14}
                              color={Theme.colors.white}
                            />
                          )}
                        </View>
                        <Text style={styles.progressCheckText}>
                          Confirm current membership status in the Masonry
                          Institute of BC
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Step 3: Submit application */}
            <View style={{ marginBottom: Theme.spacing.md }}>
              <View style={styles.progressCard}>
                <TouchableOpacity
                  style={styles.progressCardItem}
                  onPress={() => toggleStepExpansion('step3')}
                >
                  <View style={styles.progressCardItemContent}>
                    <View
                      style={{
                        backgroundColor: Theme.colors.grey,
                        borderRadius: '50%',
                        width: 25,
                        height: 25,
                        marginRight: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                    <View>
                      <Text style={styles.stepText}>Step 3</Text>
                      <Text style={styles.stepTitle}>Submit application</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={
                      expandedSteps.step3
                        ? 'chevron-up-outline'
                        : 'chevron-down-outline'
                    }
                    size={16}
                    color={Theme.colors.black}
                  />
                </TouchableOpacity>

                {expandedSteps.step3 && (
                  <View>
                    <View style={styles.progressCheckContent}>
                      <Text style={styles.progressCheckText}>
                        Submit your application in the{' '}
                        <Text
                          style={[
                            Theme.typography.bodyBold,
                            { color: Theme.colors.black },
                          ]}
                        >
                          Masonry Institute of British Columbia
                        </Text>{' '}
                        portal
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
                          marginTop: 10,
                        }}
                      >
                        <Text
                          style={[
                            Theme.typography.body,
                            { color: Theme.colors.black },
                          ]}
                        >
                          Apply here
                        </Text>
                        <Ionicons name="open-outline" size={20} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>

            {/* Step 4: Wait for results */}
            <View style={{ marginBottom: Theme.spacing.md }}>
              <View style={styles.progressCard}>
                <TouchableOpacity
                  style={styles.progressCardItem}
                  onPress={() => toggleStepExpansion('step4')}
                >
                  <View style={styles.progressCardItemContent}>
                    <View
                      style={{
                        backgroundColor: Theme.colors.grey,
                        borderRadius: '50%',
                        width: 25,
                        height: 25,
                        marginRight: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                    <View>
                      <Text style={styles.stepText}>Step 4</Text>
                      <Text style={styles.stepTitle}>Wait for results</Text>
                    </View>
                  </View>
                  <Ionicons
                    name={
                      expandedSteps.step4
                        ? 'chevron-up-outline'
                        : 'chevron-down-outline'
                    }
                    size={16}
                    color={Theme.colors.black}
                  />
                </TouchableOpacity>

                {expandedSteps.step4 && (
                  <View>
                    <View style={styles.progressCheckContent}>
                      <Text style={styles.progressCheckText}>
                        Did your application get approved? Let us know!
                      </Text>
                      <View
                        style={{
                          flexDirection: 'column',
                          gap: Theme.spacing.md,
                          paddingLeft: 80,
                          paddingRight: 80,
                          marginTop: 5,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            backgroundColor: Theme.colors.green,
                            borderRadius: Theme.radius.button,
                            flex: 1,
                            ...Theme.padding.buttonSm,
                          }}
                          onPress={() => handleApplicationResult('approved')}
                        >
                          <Text
                            style={[
                              Theme.typography.button,
                              {
                                color: Theme.colors.black,
                                textAlign: 'center',
                              },
                            ]}
                          >
                            Approved
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: Theme.colors.yellow,
                            borderRadius: Theme.radius.button,
                            flex: 1,
                            ...Theme.padding.buttonSm,
                          }}
                          onPress={() => handleApplicationResult('pending')}
                        >
                          <Text
                            style={[
                              Theme.typography.button,
                              {
                                color: Theme.colors.black,
                                textAlign: 'center',
                              },
                            ]}
                          >
                            Pending
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: Theme.colors.red,
                            borderRadius: Theme.radius.button,
                            flex: 1,
                            ...Theme.padding.buttonSm,
                          }}
                          onPress={() => handleApplicationResult('rejected')}
                        >
                          <Text
                            style={[
                              Theme.typography.button,
                              {
                                color: Theme.colors.black,
                                textAlign: 'center',
                              },
                            ]}
                          >
                            Rejected
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* {/* Bottom Navigation Bar 
      <View className="bg-white border-t border-gray-200 px-4 py-2">
        <View className="flex-row justify-around items-center">
          <TouchableOpacity 
            className="items-center py-2"
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons name="home-outline" size={24} color="#9CA3AF" />
            <Text className="text-gray-500 text-xs mt-1">home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="items-center py-2"
            onPress={() => router.push('/(tabs)/grants')}
          >
            <Ionicons name="compass" size={24} color="#8B5CF6" />
            <Text className="text-purple-600 text-xs mt-1">Grants</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center py-2">
            <Ionicons name="person-outline" size={24} color="#9CA3AF" />
            <Text className="text-gray-500 text-xs mt-1">Profile</Text>
          </TouchableOpacity>
        </View>} 
        </View>*/}
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
    marginBottom: 12,
  },
  progressCard: {
    borderColor: Theme.colors.purpleStroke,
    borderWidth: 0.5,
    borderRadius: Theme.radius.card,
    overflow: 'hidden',
    ...Theme.shadow.cardShadow,
  },
  progressCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingLeft: 21,
    paddingRight: 21,
    paddingBottom: 13,
  },
  progressCardItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    backgroundColor: Theme.colors.purple,
    borderRadius: '50%',
    width: 25,
    height: 25,
    marginRight: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    color: Theme.colors.black,
    ...Theme.typography.body,
    marginBottom: 4,
  },
  stepTitle: {
    color: Theme.colors.black,
    ...Theme.typography.subhead1,
    marginBottom: 6,
  },
  progressCheckContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    paddingTop: 13,
    paddingLeft: 24,
    paddingRight: 32,
    paddingBottom: 28,
  },
  progressCheckText: {
    color: Theme.colors.black,
    ...Theme.typography.body,
  },
  progressCheckItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
