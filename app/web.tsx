import ApplicationTab from "@/components/ApplicationTab";
import ApplicationTemplet from "@/components/ApplicationTemplet";
import LogInButton from "@/components/LogInButton";
import { grantCatalog } from "@/constants/grants";
import { Theme } from "@/constants/theme";
import { useProfile } from "@/contexts/ProfileContext";
import React, { useMemo, useState } from "react";
import {
    Image,
    ImageBackground,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const featuredGrantTitles = [
    "StrongerBC Future Skills Grant",
    "Youth Work in Trades (WRK) Scholarship",
    "LNG Canada Trades Training Fund",
    "Masonry Institute of BC Training Fund",
    "Soroptimist - Live your dream awards",
    "Women in Skilled Trades Bursary",
    "Indigenous Skills Bridge Fund",
    "Green Building Innovation Grant",
    "Northern Community Relocation Grant",
];

export default function WebOnlyTab() {
    const [selectedApplicationId, setSelectedApplicationId] = useState<
        string | null
    >(null);
    const { profileData } = useProfile();
    const firstName =
        profileData.name?.split(" ")[0]?.trim() || "Full Name";

    const applicationGrants = useMemo(
        () =>
            featuredGrantTitles
                .map((title) =>
                    grantCatalog.find((grant) => grant.title === title)
                )
                .filter((grant): grant is typeof grantCatalog[number] =>
                    Boolean(grant)
                ),
        []
    );

    const selectedGrant = useMemo(
        () =>
            applicationGrants.find(
                (grant) => grant.id === selectedApplicationId
            ) || null,
        [applicationGrants, selectedApplicationId]
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.layout}>
                {/* Left Sidebar */}
                <View style={styles.sidebar}>
                    <View style={styles.profileSection}>
                        <Pressable
                            onPress={() => setSelectedApplicationId(null)}
                            style={({ pressed }) => [
                                styles.profileCircle,
                                pressed && styles.profileCirclePressed,
                            ]}
                        >
                            <View style={styles.profileCircleInner} />
                        </Pressable>
                        <Text style={styles.fullName}>{firstName}</Text>
                    </View>
                    <View style={styles.divider} />
                    <Text style={styles.sectionTitle}>Your applications</Text>
                    <ScrollView
                        style={styles.tabsContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        {applicationGrants.map((grant) => (
                            <ApplicationTab
                                key={grant.id}
                                title={grant.title}
                                isSelected={selectedApplicationId === grant.id}
                                onPress={() =>
                                    setSelectedApplicationId(grant.id)
                                }
                            />
                        ))}
                    </ScrollView>
                    <LogInButton />
                </View>

                {/* Right Main Content */}
                <View style={styles.mainContent}>
                    {selectedGrant ? (
                        <View style={styles.applicationView}>
                            <ApplicationTemplet grant={selectedGrant} />
                        </View>
                    ) : (
                        <ImageBackground
                            source={require("@/assets/images/web_main_bg.png")}
                            style={styles.emptyState}
                            resizeMode="cover"
                            imageStyle={styles.backgroundImage}
                        >
                            <View style={styles.characterContainer}>
                                <Image
                                    source={require("@/assets/images/web_main_icon_white.png")}
                                    style={styles.characterImage}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.emptyStateText}>
                                View Your Generated Applications!
                            </Text>
                        </ImageBackground>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.white,
    },
    layout: {
        flex: 1,
        flexDirection: "row",
    },
    sidebar: {
        width: 350,
        backgroundColor: Theme.colors.white,
        padding: 24,
        paddingBottom: 0,
        borderRightWidth: 1,
        borderRightColor: Theme.colors.lightGrey,
        flexDirection: "column",
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    profileCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    profileCircleInner: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Theme.colors.purple,
    },
    profileCirclePressed: {
        opacity: 0.7,
    },
    fullName: {
        ...Theme.typography.bodyBold,
        color: Theme.colors.black,
    },
    divider: {
        height: 1,
        backgroundColor: Theme.colors.lightGrey,
        marginBottom: 20,
    },
    sectionTitle: {
        ...Theme.typography.bodyBold,
        color: Theme.colors.black,
        marginBottom: 12,
    },
    tabsContainer: {
        flex: 1,
    },
    mainContent: {
        flex: 1,
    },
    applicationView: {
        flex: 1,
        padding: 24,
        paddingBottom: 0,
    },
    emptyState: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 40,
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
    },
    characterContainer: {
        marginBottom: 24,
    },
    characterImage: {
        width: 120,
        height: 120,
    },
    emptyStateText: {
        ...Theme.typography.h3,
        color: Theme.colors.white,
        textAlign: "center",
    },
});
