import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import Grant from "../../components/grant";
import GrantSubFilters from "../../components/GrantSubFilters";

interface GrantData {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  category: string;
  description: string;
  eligible?: boolean;
  saved?: boolean;
  applied?: boolean;
}

const sampleGrants: GrantData[] = [
  {
    id: "1",
    title: "StrongerBC Future Skills Grant",
    organization: "WorkBC",
    amount: "Up to $3,500",
    deadline: "7/14 - 8/20",
    category: "Education",
    description: "",
    eligible: true,
    saved: false,
    applied: false,
  },
  {
    id: "2",
    title: "Youth Work in Trades (WRK) Scholarship",
    organization: "WorkBC",
    amount: "Up to $1,000",
    deadline: "9/2 - 11/14",
    category: "Education",
    description: "",
    eligible: true,
    saved: false,
    applied: false,
  },
  {
    id: "3",
    title: "LNG Canada Trades Training Fund",
    organization: "BC Ca",
    amount: "Up to $1,300",
    deadline: "2/28",
    category: "Training",
    description: "",
    eligible: true,
    saved: true,
    applied: false,
  },
  {
    id: "4",
    title: "Masonry Institute of BC Training Fund",
    organization: "Masonry Institute",
    amount: "Up to $1,950",
    deadline: "3m before training starts",
    category: "Training",
    description: "",
    eligible: true,
    saved: false,
    applied: true,
  },
  {
    id: "5",
    title: "Soroptimist - Live your dream awards",
    organization: "Soroptimist",
    amount: "Up to $10,000",
    deadline: "8/1 - 11/14",
    category: "Awards",
    description: "",
    eligible: false,
    saved: false,
    applied: false,
  },
];

export default function GrantsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] =
    useState<"All" | "Eligible" | "My Grants">("All");
  const [selectedSubFilter, setSelectedSubFilter] =
    useState<"Saved" | "Applied">("Saved");
  const [grants, setGrants] = useState<GrantData[]>(sampleGrants);

  const tabs: Array<"All" | "Eligible" | "My Grants"> = [
    "All",
    "Eligible",
    "My Grants",
  ];

  const filteredGrants = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const bySearch = (g: GrantData) =>
      !q ||
      g.title.toLowerCase().includes(q) ||
      g.organization.toLowerCase().includes(q);

    if (selectedTab === "Eligible")
      return grants.filter((g) => bySearch(g) && g.eligible);
    if (selectedTab === "My Grants") {
      if (selectedSubFilter === "Saved")
        return grants.filter((g) => bySearch(g) && g.saved);
      if (selectedSubFilter === "Applied")
        return grants.filter((g) => bySearch(g) && g.applied);
      return grants.filter((g) => bySearch(g) && (g.saved || g.applied));
    }
    return grants.filter(bySearch);
  }, [grants, searchQuery, selectedTab, selectedSubFilter]);

  const handleGrantPress = (grant: GrantData) => {
    router.push({
      pathname: "/grant-details",
      params: {
        id: grant.id,
        title: grant.title,
        organization: grant.organization,
        amount: grant.amount,
        deadline: grant.deadline,
        eligible: grant.eligible ? "true" : "false",
      },
    });
  };

  const handleApplyPress = (grant: GrantData) => {
    setGrants((prev) =>
      prev.map((g) => (g.id === grant.id ? { ...g, applied: true } : g))
    );
  };

  const handleSavePress = (grant: GrantData) => {
    setGrants((prev) =>
      prev.map((g) => (g.id === grant.id ? { ...g, saved: !g.saved } : g))
    );
  };

  const sectionTitle =
    selectedTab === "My Grants"
      ? selectedSubFilter === "Saved"
        ? "Saved grants"
        : "Applied grants"
      : selectedTab === "Eligible"
      ? "Eligible grants for you"
      : "Suggested grants for you";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[Theme.typography.h2, { color: Theme.colors.black }]}>
          All Grants
        </Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map((tab, idx) => {
          const active = selectedTab === tab;
          const isLast = idx === tabs.length - 1;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[
                styles.tabBtn,
                !isLast && { marginRight: 8 },
                {
                  backgroundColor: active
                    ? Theme.colors.brightPurple
                    : Theme.colors.lightGrey,
                },
              ]}
            >
              <Text
                style={[
                  Theme.typography.label,
                  { color: active ? Theme.colors.white : Theme.colors.darkGrey },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Subfilters for My Grants */}
      {selectedTab === "My Grants" && (
        <View
          style={{
            paddingHorizontal: Theme.spacing.lg,
            marginBottom: Theme.spacing.sm,
          }}
        >
          <GrantSubFilters
            selectedFilter={selectedSubFilter}
            onFilterChange={setSelectedSubFilter}
          />
        </View>
      )}

      {/* Search */}
      <View style={styles.searchWrap}>
        <View style={styles.searchInner}>
          <TextInput
            style={styles.searchInput}
            placeholder="Find Grants"
            placeholderTextColor={Theme.colors.purple}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons
            name="search"
            size={18}
            color={Theme.colors.grey}
            style={styles.searchIcon}
          />
        </View>
      </View>

      {/* Section title + sort */}
      <View style={styles.sectionHeader}>
        <Text style={[Theme.typography.subhead1, { color: Theme.colors.black }]}>
          {sectionTitle}
        </Text>
        <TouchableOpacity hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="swap-vertical" size={20} color={Theme.colors.darkGrey} />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={filteredGrants}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Grant
            {...item}
            onPress={() => handleGrantPress(item)}
            onView={() => handleApplyPress(item)}
            onSave={() => handleSavePress(item)}
            onNavigateToApply={() => router.push("/grant-details")}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={[Theme.typography.subhead1, { marginTop: Theme.spacing.lg, color: Theme.colors.grey }]}>
              No grants found
            </Text>
            <Text style={[Theme.typography.body, { marginTop: 6, color: Theme.colors.grey}]}>
              Try adjusting your search or tab filter
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  header: {
    alignSelf: "center",
    width: Theme.layout.width,
    paddingTop: 48,
    paddingBottom: Theme.spacing.lg,
    marginTop: Theme.spacing.xl,
  },
  tabsRow: {
    flexDirection: "row",
    alignSelf: "center",
    width: Theme.layout.width,
    justifyContent: "space-between",
    marginBottom: Theme.spacing.md,
  },
  tabBtn: {
    flex: 1,
    alignItems: "center",
    ...Theme.padding.buttonMd,
    borderRadius: Theme.radius.button,
  },
  searchWrap: {
    alignSelf: "center",
    width: Theme.layout.width,
    marginBottom: Theme.spacing.lg,
  },
  searchInner: {
    position: "relative",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: Theme.colors.purpleStroke,
    borderRadius: Theme.radius.search,
    ...Theme.padding.buttonLg,
    paddingHorizontal: Theme.spacing.lg,
    paddingRight: 36,
    fontFamily: Theme.fonts.medium,
    fontSize: 14,
    color: Theme.colors.darkGrey,
    backgroundColor: Theme.colors.white,
  },
  searchIcon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  sectionHeader: {
    alignSelf: "center",
    width: Theme.layout.width,
    marginBottom: Theme.spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContent: {
    paddingBottom: Theme.spacing.md,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
});
