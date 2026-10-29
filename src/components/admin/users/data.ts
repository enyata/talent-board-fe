// Placeholder users matching the Figma design until the admin user-management
// endpoints are available. The shape mirrors what the list/profile screens need.

export type AdminUserRole = "talent" | "recruiter";
export type AdminUserStatus = "active" | "suspended";

export type AdminUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  joinedAt: string;
  lastActiveAt: string;
  jobTitle: string;
  location: string;
  availableToWork: boolean;
  bio: string;
  skills: string[];
  experience: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
  activity: {
    connections: number;
    interviewing: number;
    contacted: number;
    hired: number;
  };
};

export const SUSPENSION_REASONS = [
  "Policy Violation",
  "Fraudulent Profile",
  "User Request",
  "Other",
] as const;

const NAMES = [
  ["Kate", "Morrison"],
  ["Cameron", "Williamson"],
  ["Adaeze", "Okafor"],
  ["Tunde", "Bakare"],
  ["Leslie", "Alexander"],
  ["Chiamaka", "Eze"],
  ["Jerome", "Bell"],
  ["Ngozi", "Adeyemi"],
  ["Darrell", "Steward"],
  ["Ifeoma", "Nwosu"],
  ["Kristin", "Watson"],
  ["Emeka", "Obi"],
] as const;

const JOB_TITLES = [
  "Senior Frontend Developer",
  "Product Designer",
  "Backend Engineer",
  "Talent Partner",
  "Data Analyst",
];

const LOCATIONS = ["San Francisco  CA", "Lagos  NG", "Abuja  NG", "London  UK"];

// Values from public/skills_library.json; labels are resolved at render time.
const SKILLS = ["Node.js", "JavaScript", "Next.js"];

const BASE_DATE = Date.UTC(2026, 6, 6, 19);
const DAY = 24 * 60 * 60 * 1000;

export const mockUsers: AdminUser[] = Array.from({ length: 64 }, (_, i) => {
  const [firstName, lastName] = NAMES[i % NAMES.length];
  const handle = `${firstName}${lastName}`.toLowerCase();
  const role: AdminUserRole = i % 7 === 2 ? "recruiter" : "talent";

  return {
    id: `usr_${(i + 1).toString().padStart(4, "0")}`,
    firstName,
    lastName,
    email: `${handle}${i >= NAMES.length ? i : ""}@gmail.com`,
    role,
    status: [1, 3, 5].includes(i % 9) ? "suspended" : "active",
    joinedAt: new Date(BASE_DATE - i * 3 * DAY).toISOString(),
    lastActiveAt: new Date(BASE_DATE - (i % 5) * DAY).toISOString(),
    jobTitle: role === "recruiter" ? "Talent Partner" : JOB_TITLES[i % JOB_TITLES.length],
    location: LOCATIONS[i % LOCATIONS.length],
    availableToWork: role === "talent" && i % 3 !== 0,
    bio: "Passionate frontend developer with expertise in building responsive and accessible web applications. Focused on user experience and performance optimization.",
    skills: Array.from({ length: 13 }, (_, s) => SKILLS[s % SKILLS.length]),
    experience: "Intermediate",
    portfolioUrl: `https://${handle}.com`,
    linkedinUrl: `https://linkedin.com/in/${handle}`,
    resumeUrl: undefined,
    activity: {
      connections: 3,
      interviewing: 3,
      contacted: 3,
      hired: 0,
    },
  };
});

export const fullName = (user: Pick<AdminUser, "firstName" | "lastName">) =>
  `${user.firstName} ${user.lastName}`;

// --- Activity log & admin actions -------------------------------------------

export type ActivityType = "login" | "message" | "pipeline" | "interview" | "profile";

export type UserActivity = {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  ip: string;
  device: string;
  location: string;
};

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  login: "Logins",
  message: "Messages",
  pipeline: "Pipeline",
  interview: "Interviews",
  profile: "Profile updates",
};

export type AdminActionType = "User suspended" | "User reactivated" | "Report resolved";

export const ADMIN_ACTION_TYPES: AdminActionType[] = [
  "User suspended",
  "User reactivated",
  "Report resolved",
];

export type AdminAction = {
  id: string;
  timestamp: string;
  admin: { name: string; email: string; avatar?: string };
  action: AdminActionType;
  note?: string;
};

const HOUR = 60 * 60 * 1000;

// Anchor mock timestamps to the current hour so the 7/30 day filters have data.
const recentBase = () => Math.floor(Date.now() / HOUR) * HOUR;

const ACTIVITY_TEMPLATES: Pick<UserActivity, "type" | "title" | "description">[] = [
  { type: "login", title: "Login", description: "Signed in from a new device, Chrome on macOS." },
  { type: "message", title: "Replied to a message", description: "Responded to a message request from a recruiter at Flux." },
  { type: "pipeline", title: "Moved to Interviewing", description: "Pipeline stage updated for the Senior Frontend Developer role at Flux." },
  { type: "interview", title: "Interview confirmed", description: "Confirmed an interview slot for 4 Sep 2026, 2:00pm." },
  { type: "profile", title: "Uploaded resume", description: "Replaced the previous resume with a new version." },
  { type: "message", title: "Message request accepted", description: "Accepted a message request from a recruiter at Flux." },
];

const DEVICES = ["Samsung Galaxy S23", "MacBook Pro", "iPhone 15"];
const PLACES = ["Lagos, Nigeria", "Abuja, Nigeria", "London, UK"];

export function getUserActivity(userId: string): UserActivity[] {
  const base = recentBase();
  return Array.from({ length: 40 }, (_, i) => ({
    ...ACTIVITY_TEMPLATES[i % ACTIVITY_TEMPLATES.length],
    id: `${userId}_act_${i}`,
    // Roughly two entries a day going back ~3 weeks.
    timestamp: new Date(base - i * 13 * HOUR).toISOString(),
    ip: `105.112.45.${(i * 37) % 255}`,
    device: DEVICES[i % DEVICES.length],
    location: PLACES[i % PLACES.length],
  }));
}

const SEED_ACTIONS: Pick<AdminAction, "action" | "note">[] = [
  { action: "User suspended", note: "Fraud activities" },
  { action: "Report resolved", note: "No policy violation found" },
  { action: "User reactivated" },
];

export function seedAdminActions(userId: string): AdminAction[] {
  const base = recentBase();
  return Array.from({ length: 24 }, (_, i) => {
    const [firstName, lastName] = NAMES[(i + 3) % NAMES.length];
    return {
      ...SEED_ACTIONS[i % SEED_ACTIONS.length],
      id: `${userId}_adm_${i}`,
      timestamp: new Date(base - (i * 2 + 1) * 24 * HOUR).toISOString(),
      admin: {
        name: `${firstName} ${lastName}`,
        email: `${firstName}${lastName}@enyata.com`.toLowerCase(),
      },
    };
  });
}
