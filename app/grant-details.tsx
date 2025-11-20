import BottomNavigation from '@/components/BottomNavigation';

import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalPopover from '../components/ModalPopover';

/* -----------------------------------------------------
   Local chip component — bullet-proof on iPhone
----------------------------------------------------- */
type ChipProps = {
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconBg: string;
  onPress?: () => void;
};
function Chip({ label, iconName, iconBg, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        chipStyles.container,
        pressed && chipStyles.pressed,
      ]}
    >
      <View style={[chipStyles.iconCircle, { backgroundColor: iconBg }]}>
        <Ionicons name={iconName} size={16} color="#fff" />
      </View>

      <View style={chipStyles.labelWrap}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={chipStyles.label}>
          {label}
        </Text>
      </View>
      <View style={chipStyles.chevWrap}>
        <Ionicons
          name="chevron-forward-outline"
          size={12}
          color={Theme.colors.black}
        />
      </View>
    </Pressable>
  );
}

const chipStyles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.lightGrey,
    borderRadius: Theme.radius.card,
    minHeight: 46,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    width: '100%',
    overflow: 'hidden',
  },
  pressed: { opacity: 0.95 },
  iconCircle: {
    width: 25,
    height: 25,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flexShrink: 0,
  },
  labelWrap: {
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    marginRight: 6,
  },
  label: {
    ...Theme.typography.body,
    color: Theme.colors.black,
  },
  chevWrap: {
    width: 18,
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexShrink: 0,
  },
});

/* -----------------------------------------------------
   Screen
----------------------------------------------------- */
type Key = 'eligible' | 'funding' | 'date' | 'age' | 'location' | 'notes';

type ChipItem = {
  key: Key;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  bg: string;
};

export default function GrantDetails() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    title?: string;
    organization?: string;
    amount?: string;
    deadline?: string;
    description?: string;
    eligible?: string;
    saved?: string;
  }>();
  const [open, setOpen] = useState<null | Key>(null);
  const close = () => setOpen(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const grantData = useMemo(() => {
    const desc =
      params.description ||
      'The Masonry Institute of BC has evolved from masonry organizations, which have been promoting the local masonry industry for over 50 years.';
    return {
      id: params.id ?? '',
      title: params.title ?? 'Grant Details',
      organization: params.organization ?? 'Unknown organization',
      amount: params.amount ?? 'Up to $0',
      deadline: params.deadline ?? 'TBD',
      description: desc,
      fullDescription:
        desc +
        '\n' +
        ' We are committed to advancing the masonry trade through education, training, and professional development. Our training fund provides financial support to apprentices and tradespeople pursuing masonry-related education and certification programs.' +
        '\n' +
        'This includes support for various levels of apprenticeship training, specialized masonry techniques, and continuing education opportunities that enhance skills and career advancement in the masonry industry.',
      eligible: params.eligible === 'true',
      saved: params.saved === 'true',
    };
  }, [params]);
  const [isSaved, setIsSaved] = useState(grantData.saved);

  const data: ChipItem[] = [
    {
      key: 'eligible',
      label: grantData.eligible ? 'You’re eligible' : 'Check requirements',
      icon: grantData.eligible
        ? 'checkmark-circle-outline'
        : 'alert-circle-outline',
      bg: grantData.eligible ? Theme.colors.blue : Theme.colors.orange,
    },
    {
      key: 'funding',
      label: grantData.amount,
      icon: 'cash-outline',
      bg: Theme.colors.green,
    },
    {
      key: 'date',
      label: grantData.deadline,
      icon: 'calendar-outline',
      bg: Theme.colors.orange,
    },
    {
      key: 'age',
      label: 'Gr 10+',
      icon: 'person-circle-outline',
      bg: Theme.colors.orange,
    },
    {
      key: 'location',
      label: 'Legal Work Permit',
      icon: 'home-outline',
      bg: Theme.colors.orange,
    },
    {
      key: 'notes',
      label: 'Notes',
      icon: 'information-circle-outline',
      bg: Theme.colors.purple,
    },
  ];

  const renderItem = ({ item }: ListRenderItemInfo<ChipItem>) => (
    <View style={styles.gridItem}>
      <Chip
        label={item.label}
        iconName={item.icon}
        iconBg={item.bg}
        onPress={() => setOpen(item.key)}
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 24,
          paddingTop: Theme.spacing.md,
        }}
      >
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.container}>
          {/* Top bar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={22} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsSaved((prev) => !prev)}
          hitSlop={10}
          accessibilityRole="button"
        >
          <Ionicons
            name={isSaved ? 'bookmark' : 'bookmark-outline'}
            size={22}
            color={isSaved ? Theme.colors.brightPurple : '#9CA3AF'}
          />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>
        {grantData.title}
      </Text>

          {/* Chips grid — robust on iOS/Android/Web */}
          <FlatList
            data={data}
            keyExtractor={(it) => it.key}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              gap: 6,
              marginBottom: 8,
            }}
            scrollEnabled={false}
          />

          {/* About section */}
          <View style={{ marginBottom: 28, marginTop: 19 }}>
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

          {/* Candidate messages */}
          <View>
            <Text style={styles.strong}>You are a strong candidate.</Text>
            <Text style={styles.sub}>
              Your profile is missing some information for this grant
              application.
            </Text>
          </View>

          {/* CTA */}
          <Pressable
            style={styles.cta}
            onPress={() => router.push('/grant-saved-apply')}
          >
            <Text style={styles.ctaText}>Get started</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* MODALS */}
      <ModalPopover
        visible={open === 'eligible'}
        onClose={close}
        title="You’re eligible"
        titleIconName="checkmark-circle"
        titleIconBg="#3B82F6"
        titleIconColor="#FFFFFF"
        lines={[
          'You appear to qualify for this grant. Please verify your details in the grant portal to confirm eligibility.',
        ]}
      />
      <ModalPopover
        visible={open === 'funding'}
        onClose={close}
        title="Up to $1950"
        titleIconName="cash-outline"
        titleIconBg="#22C55E"
        titleIconColor="#FFFFFF"
        lines={[
          'You can receive up to $1950 to be applied to tuition.',
          'First year masons may be eligible to receive an additional $155 to cover textbook costs.',
        ]}
      />
      <ModalPopover
        visible={open === 'date'}
        onClose={close}
        title="3 Months Before"
        titleIconName="calendar-outline"
        titleIconBg="#F59E0B"
        titleIconColor="#FFFFFF"
        lines={[
          'Application to this grant must be received 3 months prior to the month training starts.',
        ]}
      />
      <ModalPopover
        visible={open === 'age'}
        onClose={close}
        title="Gr 10+"
        titleIconName="person-circle-outline"
        titleIconBg="#F59E0B"
        titleIconColor="#FFFFFF"
        lines={[
          'You must be minimum in Grade 10 and enrolled in the Trowel Trades Training Association.',
        ]}
      />
      <ModalPopover
        visible={open === 'location'}
        onClose={close}
        title="Legal Work Permit"
        titleIconName="home-outline"
        titleIconBg="#F59E0B"
        titleIconColor="#FFFFFF"
        lines={['You must be legally allowed to work in Canada.']}
      />
      <ModalPopover
        visible={open === 'notes'}
        onClose={close}
        title="Notes"
        titleIconName="information-circle-outline"
        titleIconBg="#7B6CF6"
        titleIconColor="#FFFFFF"
      >
        <View style={{ marginTop: 4 }}>
          <Text
            style={{
              ...Theme.typography.body,
              marginBottom: 15,
            }}
          >
            Successful applicants must be:
          </Text>
          {[
            'Enrolled at the Trowel Trades Training Association',
            'In Level 1, 2, or 3 of their apprenticeship',
            'Priority will be given to applicants who are members of the Masonry Institute of BC',
          ].map((t, i) => (
            <View key={i} style={{ flexDirection: 'row', marginBottom: 8 }}>
              <Text
                style={{
                  ...Theme.typography.body,
                  marginRight: 8,
                }}
              >
                {'\u2022'}
              </Text>
              <Text
                style={{
                  flex: 1,
                  ...Theme.typography.body,
                }}
              >
                {t}
              </Text>
            </View>
          ))}
        </View>
      </ModalPopover>

      <BottomNavigation activeTab="grants" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Theme.typography.h2,
    color: Theme.colors.black,
    marginBottom: 22,
  },
  gridItem: {
    flex: 1,
  },
  strong: {
    textAlign: 'center',
    ...Theme.typography.subhead1,
    color: Theme.colors.purple,
    marginBottom: 10,
  },
  sub: {
    textAlign: 'center',
    ...Theme.typography.body,
    color: Theme.colors.lightOrange,
    marginBottom: 10,
  },
  cta: {
    backgroundColor: Theme.colors.orange,
    borderRadius: Theme.radius.button,
    ...Theme.padding.buttonLg,
  },
  ctaText: {
    ...Theme.typography.button,
    color: Theme.colors.black,
    textAlign: 'center',
  },
});
