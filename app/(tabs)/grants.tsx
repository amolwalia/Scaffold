import GrantFilterSheet, { GRANT_SORT_OPTIONS, GrantSortId } from "@/components/GrantFilterSheet";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  active?: boolean;
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
    active: true,
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
    active: true,
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
    active: true,
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
    active: true,
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
    active: false,
  },
];

const getAmountValue = (amount: string) => {
  const numeric = amount.replace(/[^0-9.]/g, "");
  const value = parseFloat(numeric);
  return Number.isNaN(value) ? 0 : value;
};

const getDeadlineTimestamp = (deadline: string) => {
  const year = new Date().getFullYear();
  const parts = deadline.split("-").map((part) => part.trim());
  const target = parts[parts.length - 1] || deadline;
  if (!target.includes("/")) return 0;
  const sanitized = target.replace(/[^0-9/]/g, "");
  const [monthStr, dayStr] = sanitized.split("/");
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (Number.isNaN(month) || Number.isNaN(day)) return 0;
  return new Date(year, month - 1, day).getTime();
};

const normalizeTab = (value?: string): "All" | "Eligible" | "My Grants" => {
  if (value === "Eligible") return "Eligible";
  if (value === "My Grants") return "My Grants";
  return "All";
};

const readTabParam = (
  value: string | string[] | undefined
): "All" | "Eligible" | "My Grants" => {
  if (!value) return "All";
  const raw = Array.isArray(value) ? value[0] : value;
  return normalizeTab(raw);
};

export default function GrantsScreen() {
  const router = useRouter();
  const params = useGlobalSearchParams<{ tab?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<
    "All" | "Eligible" | "My Grants"
  >(() => readTabParam(params.tab));
  const [selectedSubFilter, setSelectedSubFilter] =
    useState<"Saved" | "Applied">("Saved");
  const [grants, setGrants] = useState<GrantData[]>(sampleGrants);
  const [selectedSortId, setSelectedSortId] = useState<GrantSortId>("all");
  const [sortVisible, setSortVisible] = useState(false);

  useEffect(() => {
    setSelectedTab(readTabParam(params.tab));
  }, [params.tab]);

  const tabs: ("All" | "Eligible" | "My Grants")[] = [
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

    let result = grants.filter(bySearch);

    if (selectedTab === "Eligible") {
      result = result.filter((g) => g.eligible);
    } else if (selectedTab === "My Grants") {
      if (selectedSubFilter === "Saved")
        result = result.filter((g) => g.saved);
      else if (selectedSubFilter === "Applied")
        result = result.filter((g) => g.applied);
      else result = result.filter((g) => g.saved || g.applied);
    }

    let finalResult = [...result];
    switch (selectedSortId) {
      case "active":
        finalResult = finalResult.filter((g) => g.active);
        break;
      case "newest":
        finalResult = finalResult.sort(
          (a, b) => getDeadlineTimestamp(b.deadline) - getDeadlineTimestamp(a.deadline)
        );
        break;
      case "oldest":
        finalResult = finalResult.sort(
          (a, b) => getDeadlineTimestamp(a.deadline) - getDeadlineTimestamp(b.deadline)
        );
        break;
      case "amountHigh":
        finalResult = finalResult.sort(
          (a, b) => getAmountValue(b.amount) - getAmountValue(a.amount)
        );
        break;
      case "amountLow":
        finalResult = finalResult.sort(
          (a, b) => getAmountValue(a.amount) - getAmountValue(b.amount)
        );
        break;
      default:
        break;
    }

    return finalResult;
  }, [
    grants,
    searchQuery,
    selectedTab,
    selectedSubFilter,
    selectedSortId,
  ]);

  const selectedSortLabel =
    GRANT_SORT_OPTIONS.find((option) => option.id === selectedSortId)?.label ??
    "All";

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
        saved: grant.saved ? "true" : "false",
        description: grant.description,
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
        <TouchableOpacity
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          onPress={() => setSortVisible(true)}
          style={styles.sortTrigger}
        >
          <Ionicons name="swap-vertical" size={20} color={Theme.colors.darkGrey} />
          <Text
            style={[
              Theme.typography.label,
              { marginLeft: 6, color: Theme.colors.darkGrey },
            ]}
          >
            {selectedSortLabel}
          </Text>
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
            id={item.id}
            title={item.title}
            organization={item.organization}
            amount={item.amount}
            deadline={item.deadline}
            category={item.category}
            description={item.description}
            eligible={item.eligible}
            saved={item.saved}
            applied={item.applied}
            active={item.active}
            imageUrl={item.imageUrl}
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

      <GrantFilterSheet
        visible={sortVisible}
        selectedId={selectedSortId}
        onSelect={setSelectedSortId}
        onClose={() => setSortVisible(false)}
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
    paddingTop: 24,
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
  sortTrigger: {
    flexDirection: "row",
    alignItems: "center",
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
