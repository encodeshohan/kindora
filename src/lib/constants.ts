export const EVENT_TYPES = [
    "Cleanup",
    "Plantation",
    "Donation",
    "Education",
    "Health Camp",
    "Awareness",
    "Food Drive",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];
export const SOCIAL_LOGIN_FLAG = "kindora:social-login";