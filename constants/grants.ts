import { ProfileData } from "@/contexts/ProfileContext";

export type GrantRequirement = {
  id: string;
  label: string;
  description?: string;
  field?: keyof ProfileData;
  check: (profile: ProfileData) => boolean;
};

export type GrantApplyContent = {
  eligibilityChecks: string[];
  requiredDocuments: string[];
  portal: {
    label: string;
    instructions: string;
    url?: string;
  };
  tips?: string[];
};

export type GrantDetailFact = {
  id: string;
  label: string;
  icon: string;
  bg: string;
  details?: string[];
};

export interface GrantDefinition {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  category: string;
  description: string;
  fullDescription: string;
  summary: string;
  active: boolean;
  tags: string[];
  detailFacts: GrantDetailFact[];
  notes: string[];
  apply: GrantApplyContent;
  requirements: GrantRequirement[];
}

export type EligibilityResult = {
  eligible: boolean;
  unmetRequirements: GrantRequirement[];
  metRequirements: GrantRequirement[];
};

const levelOrder = [
  "Foundation",
  "Level 1",
  "Level 2",
  "Level 3",
  "Level 4",
  "Red Seal",
] as const;

const textValue = (value?: string) => (value || "").trim().toLowerCase();

const includesAny = (value: string, options: string[]) =>
  !!value &&
  options.some((option) => textValue(value).includes(textValue(option)));

const parseIncome = (value: string) => {
  const numeric = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(numeric) ? numeric : NaN;
};

const isIncomeAtMost = (value: string, limit: number) => {
  const numeric = parseIncome(value);
  if (Number.isNaN(numeric)) return false;
  return numeric <= limit;
};

const levelIndex = (value: string) =>
  levelOrder.findIndex((lvl) => textValue(value).includes(textValue(lvl)));

const hasLevelAtLeast = (value: string, required: typeof levelOrder[number]) => {
  const currentIndex = levelIndex(value);
  const requiredIndex = levelOrder.indexOf(required);
  if (currentIndex < 0 || requiredIndex < 0) return false;
  return currentIndex >= requiredIndex;
};

const isBritishColumbia = (province: string) => {
  const normalized = textValue(province);
  return (
    normalized.includes("british columbia") ||
    normalized === "bc" ||
    normalized.endsWith("bc")
  );
};

const defaultFullDescription = (summary: string) =>
  `${summary} This grant supports tradespeople who are investing in their training. Funding can be stacked with other awards unless noted otherwise and is typically paid directly to the training provider or employer once proof of enrollment has been received.`;

export const grantCatalog: GrantDefinition[] = [
  {
    id: "stronger-bc-future-skills",
    title: "StrongerBC Future Skills Grant",
    organization: "WorkBC",
    amount: "Up to $3,500",
    deadline: "Jul 14 - Aug 20",
    category: "Education",
    summary:
      "Covers tuition and material costs for short-term, high-demand skills training programs offered in BC.",
    description:
      "Funding that helps BC residents cover tuition, books, and materials for approved training that can be completed within 12 months.",
    fullDescription: defaultFullDescription(
      "Funding that helps BC residents cover tuition, books, and materials for approved training that can be completed within 12 months."
    ),
    active: true,
    tags: ["tuition", "short program", "bc resident"],
    detailFacts: [
      {
        id: "funding",
        label: "Tuition + books",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["Grant pays tuition, books, and materials up to $3,500 per fiscal year."],
      },
      {
        id: "date",
        label: "Apply 6 weeks prior",
        icon: "calendar-outline",
        bg: "#F59E0B",
        details: ["Processing takes 3–6 weeks. Apply before your intake start date."],
      },
      {
        id: "age",
        label: "18+ or grad",
        icon: "person-circle-outline",
        bg: "#FACC15",
        details: ["Applicants must be at least 18 or have completed secondary school."],
      },
      {
        id: "location",
        label: "BC resident",
        icon: "home-outline",
        bg: "#7B6CF6",
        details: ["Proof of BC residency is required at the time of application."],
      },
    ],
    notes: [
      "Grant is paid directly to the eligible training provider.",
      "Students can only receive one Future Skills Grant per fiscal year.",
    ],
    apply: {
      eligibilityChecks: [
        "You are a current BC resident",
        "You have been accepted into an approved program shorter than 12 months",
        "You have not received this grant earlier in the fiscal year",
      ],
      requiredDocuments: [
        "Proof of residency (BC driver’s licence or utility bill)",
        "Letter of acceptance from the approved institution",
        "Itemized tuition and materials estimate",
      ],
      portal: {
        label: "WorkBC portal",
        instructions: "Submit the verified tuition estimate and program acceptance through WorkBC.",
        url: "https://www.workbc.ca/",
      },
      tips: [
        "Ask the school to complete the tuition confirmation form for faster processing.",
        "Save your receipts in case the ministry requests follow-up.",
      ],
    },
    requirements: [
      {
        id: "bc-resident",
        label: "Lives in British Columbia",
        description: "BC residency is required to access provincial funding.",
        field: "province",
        check: (profile) => isBritishColumbia(profile.province),
      },
      {
        id: "program-identified",
        label: "Training program selected",
        description: "Add your trade school and program so we can confirm eligibility.",
        field: "tradeProgramName",
        check: (profile) => !!profile.tradeProgramName.trim(),
      },
      {
        id: "school",
        label: "Trade school on file",
        field: "tradeSchoolName",
        check: (profile) => !!profile.tradeSchoolName.trim(),
      },
      {
        id: "status",
        label: "Canadian citizen or PR",
        field: "citizenshipStatus",
        description: "The province requires proof of citizenship or permanent residence.",
        check: (profile) =>
          includesAny(profile.citizenshipStatus, ["citizen", "permanent", "pr", "canadian"]),
      },
    ],
  },
  {
    id: "youth-work-in-trades",
    title: "Youth Work in Trades (WRK) Scholarship",
    organization: "ITA BC",
    amount: "Up to $1,000",
    deadline: "Sep 2 - Nov 14",
    category: "Education",
    summary:
      "Recognizes youth who complete 900+ hours of paid work experience while still in secondary school.",
    description:
      "Awards high-performing youth Apprenticeship students who are on track to transition to full-time apprenticeship after graduation.",
    fullDescription: defaultFullDescription(
      "Awards high-performing youth Apprenticeship students who are on track to transition to full-time apprenticeship after graduation."
    ),
    active: true,
    tags: ["youth", "scholarship", "paid hours"],
    detailFacts: [
      {
        id: "funding",
        label: "Cash award",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["$1,000 award is paid directly to you via cheque."],
      },
      {
        id: "date",
        label: "Apply before Nov 14",
        icon: "calendar-outline",
        bg: "#F59E0B",
        details: ["Submit hours and references before the provincial deadline."],
      },
      {
        id: "age",
        label: "Secondary students",
        icon: "school-outline",
        bg: "#F97316",
        details: ["You must still be enrolled in secondary school while applying."],
      },
      {
        id: "location",
        label: "Work experience verified",
        icon: "briefcase-outline",
        bg: "#A855F7",
        details: ["Employers must sign your Work in Trades log sheets."],
      },
    ],
    notes: [
      "You must have a signed work placement agreement with your district.",
      "Hours can span multiple employers if documented through the WBT reporting tool.",
    ],
    apply: {
      eligibilityChecks: [
        "Logged at least 900 hours of paid work",
        "Still registered as a secondary student",
        "In good standing with your Work in Trades coordinator",
      ],
      requiredDocuments: [
        "WEX time sheets signed by employer",
        "School transcript showing completion of four Youth Work in Trades courses",
        "Short supervisor reference",
      ],
      portal: {
        label: "ITA youth portal",
        instructions: "Upload your package through Youth Work in Trades or share with your school coordinator.",
        url: "https://youth.itabc.ca/",
      },
    },
    requirements: [
      {
        id: "high-school",
        label: "High school entered",
        field: "highSchoolName",
        check: (profile) => !!profile.highSchoolName.trim(),
      },
      {
        id: "grad-date",
        label: "Graduation date added",
        field: "graduationDate",
        check: (profile) => !!profile.graduationDate.trim(),
      },
      {
        id: "hours",
        label: "Documented work experience",
        description: "Add your current employer so we can track hours.",
        field: "guardianName",
        check: (profile) => !!profile.guardianName.trim(),
      },
      {
        id: "apprenticeship",
        label: "Apprenticeship level recorded",
        field: "apprenticeshipLevel",
        check: (profile) =>
          includesAny(profile.apprenticeshipLevel, ["youth", "level 1", "level 2"]),
      },
    ],
  },
  {
    id: "lng-canada-training",
    title: "LNG Canada Trades Training Fund",
    organization: "BC Construction Association",
    amount: "Up to $1,300",
    deadline: "Feb 28",
    category: "Training",
    summary:
      "Supports upskilling for Red Seal trades working on LNG Canada-driven projects.",
    description:
      "Provides tuition reimbursement for union and non-union apprentices pursuing specialized LNG-related training in BC.",
    fullDescription: defaultFullDescription(
      "Provides tuition reimbursement for union and non-union apprentices pursuing specialized LNG-related training in BC."
    ),
    active: true,
    tags: ["tuition", "employer match", "lng"],
    detailFacts: [
      {
        id: "funding",
        label: "Up to $1,300",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["Tuition reimbursement is issued after proof of completion."],
      },
      {
        id: "date",
        label: "Apply before Feb 28",
        icon: "calendar-outline",
        bg: "#F59E0B",
        details: ["Funding windows close when yearly allocations are exhausted."],
      },
      {
        id: "location",
        label: "BC employer",
        icon: "business-outline",
        bg: "#0EA5E9",
        details: ["Your employer must operate in British Columbia."],
      },
      {
        id: "notes",
        label: "LNG scope training",
        icon: "construct-outline",
        bg: "#EA580C",
        details: ["Courses must tie directly to LNG Canada project scopes."],
      },
    ],
    notes: [
      "Employers must co-sign the reimbursement request.",
      "Funding can be combined with the Apprenticeship Incentive Grant.",
    ],
    apply: {
      eligibilityChecks: [
        "Working for a BC employer tied to LNG Canada or its contractors",
        "Training improves safety or productivity on LNG-related scopes",
        "You have an apprenticeship level recorded",
      ],
      requiredDocuments: [
        "Employer sponsorship letter",
        "Training schedule or quote",
        "Proof of apprenticeship registration (ITA number)",
      ],
      portal: {
        label: "BCCA training portal",
        instructions: "Employer submits the application on your behalf through the association portal.",
        url: "https://www.bccassn.com/",
      },
    },
    requirements: [
      {
        id: "province-bc",
        label: "BC worksite",
        field: "province",
        check: (profile) => isBritishColumbia(profile.province),
      },
      {
        id: "trade-entered",
        label: "Trade selected",
        field: "trade",
        check: (profile) => !!profile.trade.trim(),
      },
      {
        id: "apprenticeship-level",
        label: "Apprenticeship level on file",
        field: "apprenticeshipLevel",
        check: (profile) => !!profile.apprenticeshipLevel.trim(),
      },
    ],
  },
  {
    id: "masonry-institute-bc",
    title: "Masonry Institute of BC Training Fund",
    organization: "Masonry Institute of BC",
    amount: "Up to $1,950",
    deadline: "3 months before training",
    category: "Training",
    summary:
      "Supports masonry apprentices attending Trowel Trades Training Association programs.",
    description:
      "Provides tuition, books, and small stipend funding for masonry apprentices progressing through level training.",
    fullDescription:
      "The Masonry Institute of BC has promoted the masonry industry for over 50 years. Funding offsets tuition, PPE, and textbook costs for apprentices registered with the Trowel Trades Training Association. Additional top-ups are available for members who participate in industry mentorship events.",
    active: true,
    tags: ["masonry", "tuition", "union"],
    detailFacts: [
      {
        id: "funding",
        label: "Up to $1,950",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["Includes $155 textbook top-up for first-year apprentices."],
      },
      {
        id: "date",
        label: "Apply 3 months ahead",
        icon: "calendar-outline",
        bg: "#F59E0B",
        details: ["Funds are disbursed roughly 4 weeks before class begins."],
      },
      {
        id: "age",
        label: "Level 1-3",
        icon: "build-outline",
        bg: "#EC4899",
        details: ["Only Level 1-3 apprentices are eligible for this fund."],
      },
      {
        id: "location",
        label: "Trowel Trades campus",
        icon: "home-outline",
        bg: "#7B6CF6",
        details: ["Training must take place at the Trowel Trades Training Association."],
      },
    ],
    notes: [
      "First-year apprentices can request an extra $155 for textbooks.",
      "Priority goes to apprentices employed by Masonry Institute member contractors.",
    ],
    apply: {
      eligibilityChecks: [
        "Enrolled in a Trowel Trades Training Association intake",
        "Apprenticeship level 1-3 confirmed",
        "Employer or union reference attached",
      ],
      requiredDocuments: [
        "Proof of enrollment or seat confirmation",
        "Employer/union recommendation letter",
        "Most recent transcript or progress report",
      ],
      portal: {
        label: "Masonry Institute portal",
        instructions: "Applications are emailed to the institute or uploaded in the member portal.",
        url: "https://masonrybc.org/",
      },
      tips: [
        "Book training at least one quarter ahead so funds can be disbursed before class starts.",
      ],
    },
    requirements: [
      {
        id: "trade-masonry",
        label: "Masonry trade selected",
        field: "trade",
        check: (profile) => includesAny(profile.trade, ["mason", "brick"]),
      },
      {
        id: "trowel-school",
        label: "Trowel Trades school on file",
        field: "tradeSchoolName",
        check: (profile) => includesAny(profile.tradeSchoolName, ["trowel", "masonry"]),
      },
      {
        id: "level-1-3",
        label: "Level 1-3 apprentice",
        field: "apprenticeshipLevel",
        check: (profile) =>
          includesAny(profile.apprenticeshipLevel, ["level 1", "level 2", "level 3"]),
      },
    ],
  },
  {
    id: "soroptimist-live-your-dream",
    title: "Soroptimist - Live Your Dream Awards",
    organization: "Soroptimist",
    amount: "Up to $10,000",
    deadline: "Aug 1 - Nov 14",
    category: "Awards",
    summary:
      "Financial support for women who are the primary financial support for their families while pursuing training.",
    description:
      "Awards help women build better lives through education and skills training that lead to sustainable employment.",
    fullDescription: defaultFullDescription(
      "Awards help women build better lives through education and skills training that lead to sustainable employment."
    ),
    active: false,
    tags: ["women", "tuition", "childcare"],
    detailFacts: [
      {
        id: "funding",
        label: "Up to $10,000",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["Local awards range from $1,000-$2,500, federation awards up to $10,000."],
      },
      {
        id: "date",
        label: "Apply by Nov 14",
        icon: "calendar-outline",
        bg: "#F59E0B",
        details: ["Applications close each November with winners notified in January."],
      },
      {
        id: "age",
        label: "Primary caregiver",
        icon: "people-outline",
        bg: "#DB2777",
        details: ["Recipients must be the primary financial support for their dependents."],
      },
      {
        id: "location",
        label: "Any province",
        icon: "home-outline",
        bg: "#0EA5E9",
        details: ["You can apply from anywhere in Canada as long as training is underway."],
      },
    ],
    notes: [
      "Funds can be used for tuition, childcare, or living expenses.",
      "Winners are announced regionally before progressing to federation-level awards.",
    ],
    apply: {
      eligibilityChecks: [
        "Identify as a woman with dependents",
        "Demonstrate financial need",
        "Enrolled or accepted into a training or degree program",
      ],
      requiredDocuments: [
        "Proof of enrollment",
        "Two references (community + employer)",
        "Personal story of goals and challenges",
      ],
      portal: {
        label: "Soroptimist application portal",
        instructions: "Complete the national application and upload references before the deadline.",
        url: "https://www.soroptimist.org/",
      },
    },
    requirements: [
      {
        id: "female",
        label: "Identify as a woman",
        field: "gender",
        check: (profile) => includesAny(profile.gender, ["female", "woman"]),
      },
      {
        id: "dependents",
        label: "Household information entered",
        field: "householdSize",
        check: (profile) => !!profile.householdSize.trim(),
      },
      {
        id: "income",
        label: "Annual family income under $85k",
        field: "annualFamilyNetIncome",
        check: (profile) => isIncomeAtMost(profile.annualFamilyNetIncome, 85000),
      },
    ],
  },
  {
    id: "women-in-skilled-trades",
    title: "Women in Skilled Trades Bursary",
    organization: "SkilledTradesBC",
    amount: "Up to $2,000",
    deadline: "Jan 31",
    category: "Awards",
    summary:
      "Helps women apprentices cover travel, childcare, and tools for Red Seal training.",
    description:
      "Focused bursary for women registered as ITA apprentices attending technical training in BC.",
    fullDescription: defaultFullDescription(
      "Focused bursary for women registered as ITA apprentices attending technical training in BC."
    ),
    active: true,
    tags: ["women", "travel", "tools"],
    detailFacts: [
      {
        id: "funding",
        label: "Up to $2,000",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["Use funds for childcare, PPE, mileage, or tools."],
      },
      {
        id: "date",
        label: "Apply before class",
        icon: "calendar-outline",
        bg: "#F59E0B",
        details: ["Submit paperwork at least 30 days prior to your next technical training."],
      },
      {
        id: "age",
        label: "Registered apprentice",
        icon: "construct-outline",
        bg: "#F97316",
        details: ["Provide your ITA apprentice number when applying."],
      },
      {
        id: "location",
        label: "Training in BC",
        icon: "home-outline",
        bg: "#0EA5E9",
        details: ["Funding is limited to training delivered within British Columbia."],
      },
    ],
    notes: [
      "Eligible costs include childcare, mileage, PPE, and tools.",
      "Recipients agree to share a short testimonial for SkilledTradesBC.",
    ],
    apply: {
      eligibilityChecks: [
        "Registered as an ITA apprentice",
        "Identify as a woman",
        "Training or employer located in BC",
      ],
      requiredDocuments: [
        "ITA apprentice number confirmation",
        "Upcoming training schedule",
        "Expense estimate (childcare, travel, PPE)",
      ],
      portal: {
        label: "SkilledTradesBC forms",
        instructions: "Email the completed PDF or upload it via the SkilledTradesBC support portal.",
        url: "https://skilledtradesbc.ca/",
      },
    },
    requirements: [
      {
        id: "gender",
        label: "Identify as a woman",
        field: "gender",
        check: (profile) => includesAny(profile.gender, ["female", "woman"]),
      },
      {
        id: "province",
        label: "Located in BC",
        field: "province",
        check: (profile) => isBritishColumbia(profile.province),
      },
      {
        id: "apprentice",
        label: "Apprenticeship level recorded",
        field: "apprenticeshipLevel",
        check: (profile) => !!profile.apprenticeshipLevel.trim(),
      },
    ],
  },
  {
    id: "indigenous-skills-bridge",
    title: "Indigenous Skills Bridge Fund",
    organization: "First Peoples' Development",
    amount: "Up to $5,000",
    deadline: "Rolling",
    category: "Training",
    summary:
      "Flexible funding for Indigenous apprentices to cover relocation, tools, or living expenses during training.",
    description:
      "Supports Indigenous trades learners with wrap-around costs not covered by standard tuition grants.",
    fullDescription: defaultFullDescription(
      "Supports Indigenous trades learners with wrap-around costs not covered by standard tuition grants."
    ),
    active: true,
    tags: ["indigenous", "living costs", "travel"],
    detailFacts: [
      {
        id: "funding",
        label: "Up to $5,000",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["Use the fund for relocation, childcare, food security, or equipment."],
      },
      {
        id: "date",
        label: "Rolling intake",
        icon: "calendar-outline",
        bg: "#34D399",
        details: ["Requests are reviewed weekly until the annual allocation is exhausted."],
      },
      {
        id: "location",
        label: "Nation/Community info",
        icon: "flag-outline",
        bg: "#F97316",
        details: ["Provide your Nation, community, or Indigenous training partner details."],
      },
      {
        id: "notes",
        label: "Living supports",
        icon: "leaf-outline",
        bg: "#A3E635",
        details: ["Funding prioritizes essential supports that keep you enrolled."],
      },
    ],
    notes: [
      "Funding can be combined with post-secondary Indigenous awards.",
      "Prioritize requests tied to essential safety or relocation needs.",
    ],
    apply: {
      eligibilityChecks: [
        "Self-identify as Indigenous, Métis, or Inuit",
        "Provide proof of acceptance or current enrollment",
        "Outline how funds reduce a barrier to training",
      ],
      requiredDocuments: [
        "Letter of support from Nation or Indigenous training provider",
        "Budget detailing expenses",
        "Confirmation of enrollment",
      ],
      portal: {
        label: "Indigenous Skills portal",
        instructions: "Submit forms through your Indigenous Skills navigator or upload directly.",
      },
    },
    requirements: [
      {
        id: "citizenship",
        label: "Indigenous identity noted",
        field: "citizenshipStatus",
        check: (profile) =>
          includesAny(profile.citizenshipStatus, [
            "indigenous",
            "first nations",
            "metis",
            "inuit",
          ]),
      },
      {
        id: "address",
        label: "Home address completed",
        field: "address",
        check: (profile) => !!profile.address.trim(),
      },
      {
        id: "program",
        label: "Training program documented",
        field: "tradeProgramName",
        check: (profile) => !!profile.tradeProgramName.trim(),
      },
    ],
  },
  {
    id: "green-building-innovation",
    title: "Green Building Innovation Grant",
    organization: "CleanBC",
    amount: "Up to $4,000",
    deadline: "Oct 30",
    category: "Innovation",
    summary:
      "Helps apprentices earn sustainability-focused add-ons like blower-door testing or heat pump installation tickets.",
    description:
      "Offsets the cost of specialized certifications tied to energy-efficient construction projects.",
    fullDescription: defaultFullDescription(
      "Offsets the cost of specialized certifications tied to energy-efficient construction projects."
    ),
    active: true,
    tags: ["green building", "certifications", "energy"],
    detailFacts: [
      {
        id: "funding",
        label: "Up to $4,000",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["Covers tuition plus exam fees for sustainability add-on courses."],
      },
      {
        id: "date",
        label: "Apply by Oct 30",
        icon: "calendar-outline",
        bg: "#F59E0B",
        details: ["Applications reviewed monthly until the fall deadline."],
      },
      {
        id: "notes",
        label: "Energy upgrades",
        icon: "flash-outline",
        bg: "#38BDF8",
        details: ["Eligible training includes heat pump, blower-door, and passive house courses."],
      },
      {
        id: "location",
        label: "BC projects",
        icon: "home-outline",
        bg: "#0EA5E9",
        details: ["Employer must deliver projects in British Columbia."],
      },
    ],
    notes: [
      "Approved courses include passive house, net-zero builder, and mechanical system upgrades.",
      "Employers must sign off on how the training will be applied on-site.",
    ],
    apply: {
      eligibilityChecks: [
        "Employer delivers projects in BC",
        "Course is on the CleanBC approved list",
        "You have outlined how the training advances your role",
      ],
      requiredDocuments: [
        "Employer commitment letter",
        "Course outline or brochure",
        "Short training plan (1-2 paragraphs)",
      ],
      portal: {
        label: "CleanBC forms",
        instructions: "Upload documents to the CleanBC partner portal or email the program inbox.",
        url: "https://cleanbc.gov.bc.ca/",
      },
    },
    requirements: [
      {
        id: "province",
        label: "BC-based work",
        field: "province",
        check: (profile) => isBritishColumbia(profile.province),
      },
      {
        id: "trade",
        label: "Trade selected",
        field: "trade",
        check: (profile) => !!profile.trade.trim(),
      },
      {
        id: "employer",
        label: "Current employer on file",
        field: "guardianName",
        check: (profile) => !!profile.guardianName.trim(),
      },
    ],
  },
  {
    id: "northern-relocation-support",
    title: "Northern Community Relocation Grant",
    organization: "Province of BC",
    amount: "Up to $6,500",
    deadline: "Rolling",
    category: "Mobility",
    summary:
      "Covers relocation, travel, and housing when apprentices temporarily move to take training unavailable in their community.",
    description:
      "Supports rural and remote apprentices who travel to approved training institutions for block release.",
    fullDescription: defaultFullDescription(
      "Supports rural and remote apprentices who travel to approved training institutions for block release."
    ),
    active: true,
    tags: ["relocation", "northern bc", "living costs"],
    detailFacts: [
      {
        id: "funding",
        label: "Up to $6,500",
        icon: "cash-outline",
        bg: "#22C55E",
        details: ["Covers travel, per diem, and temporary housing costs."],
      },
      {
        id: "date",
        label: "Apply once per intake",
        icon: "calendar-outline",
        bg: "#F59E0B",
        details: ["One application per training block; submit 30 days before travel."],
      },
      {
        id: "location",
        label: "Proof of rural address",
        icon: "navigate-outline",
        bg: "#A855F7",
        details: ["Postal code must be located 200km or more from the training campus."],
      },
      {
        id: "notes",
        label: "Travel + rent",
        icon: "car-outline",
        bg: "#FB7185",
        details: ["Attach estimates for mileage, airfare, and rental housing."],
      },
    ],
    notes: [
      "Expenses covered include mileage, temporary housing, and per diem.",
      "You must live at least 200km from the training campus.",
    ],
    apply: {
      eligibilityChecks: [
        "Live in a rural or northern postal code",
        "Travelling 200km+ for training",
        "Provide cost estimates for travel and housing",
      ],
      requiredDocuments: [
        "Proof of address (utility bill or lease)",
        "Training acceptance letter",
        "Travel and accommodation budget",
      ],
      portal: {
        label: "Apprenticeship travel portal",
        instructions: "Upload receipts and budget prior to travel for pre-approval.",
      },
    },
    requirements: [
      {
        id: "postal",
        label: "Postal code entered",
        field: "postalCode",
        check: (profile) => !!profile.postalCode.trim(),
      },
      {
        id: "address",
        label: "Home address on file",
        field: "address",
        check: (profile) => !!profile.address.trim(),
      },
      {
        id: "province",
        label: "Based in BC",
        field: "province",
        check: (profile) => isBritishColumbia(profile.province),
      },
    ],
  },
];

export const grantMap = grantCatalog.reduce<Record<string, GrantDefinition>>(
  (acc, grant) => {
    acc[grant.id] = grant;
    return acc;
  },
  {}
);

export const getGrantById = (id?: string) => {
  if (!id) return undefined;
  return grantMap[id];
};

export const evaluateGrantEligibility = (
  grant: GrantDefinition,
  profile: ProfileData
): EligibilityResult => {
  const unmetRequirements = grant.requirements.filter(
    (requirement) => !requirement.check(profile)
  );
  const metRequirements = grant.requirements.filter((requirement) =>
    requirement.check(profile)
  );

  return {
    eligible: unmetRequirements.length === 0,
    unmetRequirements,
    metRequirements,
  };
};
