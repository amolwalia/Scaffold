import { GrantDefinition } from "@/constants/grants";
import { Theme } from "@/constants/theme";
import { useProfile } from "@/contexts/ProfileContext";
import React, { useEffect, useMemo, useState } from "react";
import {
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import ApplyHereButton from "./ApplyHereButton";
import SavePDFButton from "./SavePDFButton";
import SparkleIcon from "./SparkleIcon";

const PRESET_GOAL =
    "My future goal is to become a certified journeyperson and eventually lead my own crew on complex builds. I want to keep learning advanced techniques so I can mentor other apprentices.";
const PRESET_CAREER =
    "I chose this trade because I enjoy building tangible projects, solving problems with my hands, and seeing the impact our work has on communities.";

type FormData = {
    // Basic Profile
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    email: string;
    currentEmployer: string;
    // Education and Training
    costOfTuition: string;
    graduationDate: string;
    apprenticeshipLevel: string;
    // References
    refFirstName: string;
    refLastName: string;
    refPhone: string;
    // Written Answers
    futureGoal: string;
    careerChoice: string;
};

type ApplicationTempletProps = {
    grant?: GrantDefinition | null;
};

const buildName = (value: string) => {
    const parts = value.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
        return { first: "", last: "" };
    }
    const [first, ...rest] = parts;
    return { first, last: rest.join(" ") };
};

export default function ApplicationTemplet({ grant }: ApplicationTempletProps) {
    const { profileData } = useProfile();
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        city: "",
        province: "",
        email: "",
        currentEmployer: "",
        costOfTuition: "",
        graduationDate: "",
        apprenticeshipLevel: "",
        refFirstName: "",
        refLastName: "",
        refPhone: "",
        futureGoal: PRESET_GOAL,
        careerChoice: PRESET_CAREER,
    });

    const autoFilledValues = useMemo(() => {
        const { first: nameFirst, last: nameLast } = buildName(
            profileData.name || ""
        );
        const { first: guardianFirst, last: guardianLast } = buildName(
            profileData.guardianName || ""
        );
        const locationLine = [profileData.province, profileData.postalCode]
            .filter(Boolean)
            .join(", ");

        return {
            firstName: nameFirst,
            lastName: nameLast,
            phone: profileData.phone || "",
            address: profileData.address || "",
            city: locationLine,
            province: profileData.province || "",
            email: profileData.email || "",
            currentEmployer:
                profileData.tradeSchoolName ||
                profileData.guardianName ||
                profileData.tradeProgramName ||
                "",
            costOfTuition: grant?.amount || "",
            graduationDate:
                profileData.tradeGraduationDate ||
                profileData.graduationDate ||
                "",
            apprenticeshipLevel: profileData.apprenticeshipLevel || "",
            refFirstName: guardianFirst,
            refLastName: guardianLast,
            refPhone: profileData.guardianPhone || "",
            futureGoal: PRESET_GOAL,
            careerChoice: PRESET_CAREER,
        } satisfies Partial<FormData>;
    }, [profileData, grant]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            ...autoFilledValues,
        }));
    }, [autoFilledValues]);

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const applyUrl = grant?.apply.portal.url;

    const handleApplyPress = () => {
        if (applyUrl) {
            Linking.openURL(applyUrl).catch((err) =>
                console.log("Unable to open portal URL", err)
            );
        }
    };

    return (
        <View style={styles.wrapper}>
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Basic Profile Section */}
                <View>
                    <Text style={styles.sectionTitle}>Basic Profile</Text>

                    <View style={styles.contentContainer}>
                        <View style={styles.row}>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>First</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.firstName}
                                    onChangeText={(text) =>
                                        handleChange("firstName", text)
                                    }
                                    placeholder=""
                                />
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Last</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.lastName}
                                    onChangeText={(text) =>
                                        handleChange("lastName", text)
                                    }
                                    placeholder=""
                                />
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Phone #</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.phone}
                                    onChangeText={(text) =>
                                        handleChange("phone", text)
                                    }
                                    placeholder=""
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.fieldContainer,
                                    styles.fieldFullWidth,
                                ]}
                            >
                                <Text style={styles.label}>Address</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.address}
                                    onChangeText={(text) =>
                                        handleChange("address", text)
                                    }
                                    placeholder=""
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>City</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.city}
                                    onChangeText={(text) =>
                                        handleChange("city", text)
                                    }
                                    placeholder=""
                                />
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Province</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.province}
                                    onChangeText={(text) =>
                                        handleChange("province", text)
                                    }
                                    placeholder=""
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View
                                style={[
                                    styles.fieldContainer,
                                    styles.fieldHalfWidth,
                                ]}
                            >
                                <Text style={styles.label}>Email</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.email}
                                    onChangeText={(text) =>
                                        handleChange("email", text)
                                    }
                                    placeholder=""
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View
                                style={[
                                    styles.fieldContainer,
                                    styles.fieldHalfWidth,
                                ]}
                            >
                                <Text style={styles.label}>
                                    Current Employer
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.currentEmployer}
                                    onChangeText={(text) =>
                                        handleChange("currentEmployer", text)
                                    }
                                    placeholder=""
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Education and Training Section */}
                <View>
                    <Text style={styles.sectionTitle}>
                        Education and Training
                    </Text>

                    <View style={styles.contentContainer}>
                        <View style={styles.row}>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>
                                    Cost of Tuition
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.costOfTuition}
                                    onChangeText={(text) =>
                                        handleChange("costOfTuition", text)
                                    }
                                    placeholder=""
                                    keyboardType="numeric"
                                />
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>
                                    Graduation mm/yy
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.graduationDate}
                                    onChangeText={(text) =>
                                        handleChange("graduationDate", text)
                                    }
                                    placeholder=""
                                />
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>
                                    Apprenticeship Level
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.apprenticeshipLevel}
                                    onChangeText={(text) =>
                                        handleChange(
                                            "apprenticeshipLevel",
                                            text
                                        )
                                    }
                                    placeholder=""
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* References Section */}
                <View>
                    <Text style={styles.sectionTitle}>References</Text>

                    <View style={styles.contentContainer}>
                        <View style={styles.row}>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>First</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.refFirstName}
                                    onChangeText={(text) =>
                                        handleChange("refFirstName", text)
                                    }
                                    placeholder=""
                                />
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Last</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.refLastName}
                                    onChangeText={(text) =>
                                        handleChange("refLastName", text)
                                    }
                                    placeholder=""
                                />
                            </View>

                            <View style={styles.fieldContainer}>
                                <Text style={styles.label}>Phone #</Text>
                                <TextInput
                                    style={styles.input}
                                    value={formData.refPhone}
                                    onChangeText={(text) =>
                                        handleChange("refPhone", text)
                                    }
                                    placeholder=""
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>
                    </View>
                </View>

      {/* Written Answers Section */}
      <View>
        <View style={styles.writtenAnswersHeader}>
          <Text style={styles.writtenAnswersTitle}>Written Answers</Text>
          <SparkleIcon size={18} />
        </View>
        <Text style={styles.subtitle}>
          We&apos;ve generated some answers for you.
        </Text>

                    <View style={styles.writtenAnswersContent}>
                        <View style={styles.writtenAnswersColumn}>
                            <Text style={styles.questionLabel}>
                                What is your future goal as a mason?
                            </Text>
                            <TextInput
                                style={styles.multilineInput}
                                value={formData.futureGoal}
                                onChangeText={(text) =>
                                    handleChange("futureGoal", text)
                                }
                                placeholder=""
                                multiline
                                textAlignVertical="top"
                            />
                        </View>

                        <View style={styles.writtenAnswersColumn}>
                            <Text style={styles.questionLabel}>
                                Why have you chosen a career in masonry?
                            </Text>
                            <TextInput
                                style={styles.multilineInput}
                                value={formData.careerChoice}
                                onChangeText={(text) =>
                                    handleChange("careerChoice", text)
                                }
                                placeholder=""
                                multiline
                                textAlignVertical="top"
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <ApplyHereButton
                    onApplyHere={handleApplyPress}
                    disabled={!applyUrl}
                />
                <SavePDFButton />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Theme.colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: Theme.colors.white,
        paddingTop: 30,
        paddingHorizontal: 24,
    },
    contentContainer: {
        padding: 20,
        paddingBottom: 8,
        backgroundColor: Theme.colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Theme.colors.green,
        marginBottom: Theme.spacing.lg,
    },

    sectionTitle: {
        fontFamily: Theme.fonts.bold,
        fontSize: 15,
        lineHeight: 18.26,
        color: Theme.colors.black,
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: Theme.spacing.sm,
        marginBottom: Theme.spacing.md,
    },
    fieldContainer: {
        flex: 1,
        marginBottom: Theme.spacing.sm,
    },
    fieldFullWidth: {
        flex: 1,
    },
    fieldHalfWidth: {
        flex: 1,
    },
    label: {
        fontFamily: Theme.fonts.semibold,
        fontSize: 10,
        lineHeight: 16,
        color: "#868686",
        marginBottom: Theme.spacing.xs,
    },
    input: {
        backgroundColor: Theme.colors.white,
        borderWidth: 1,
        borderColor: "#E4E4E4",
        borderRadius: 2,
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm,
        ...Theme.typography.body,
        color: Theme.colors.black,
        minHeight: 34,
    },
    writtenAnswersHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: Theme.spacing.sm,
        marginBottom: 4,
    },
    writtenAnswersTitle: {
        fontFamily: Theme.fonts.bold,
        fontSize: 15,
        lineHeight: 18.26,
        color: Theme.colors.black,
    },
    subtitle: {
        fontFamily: Theme.fonts.medium,
        fontSize: 10,
        lineHeight: 16,
        color: Theme.colors.black,
        marginBottom: 15,
    },
    writtenAnswersContent: {
        padding: 20,
        paddingBottom: 20,
        backgroundColor: Theme.colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Theme.colors.green,
        marginBottom: Theme.spacing.lg,
        flexDirection: "row",
        gap: Theme.spacing.md,
    },
    writtenAnswersColumn: {
        flex: 1,
    },
    questionLabel: {
        fontFamily: Theme.fonts.medium,
        fontSize: 12,
        lineHeight: 16,
        color: Theme.colors.black,
        fontStyle: "italic",
        marginBottom: 10,
    },
    multilineInput: {
        backgroundColor: Theme.colors.white,
        borderWidth: 1,
        borderColor: "#E4E4E4",
        borderRadius: 8,
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm,
        ...Theme.typography.body,
        color: Theme.colors.black,
        minHeight: 120,
        textAlignVertical: "top",
    },
    buttonsContainer: {
        flexDirection: "row",
        gap: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "auto",
        paddingTop: 16,
        paddingBottom: 24,
        paddingHorizontal: 0,
    },
});
