import { EVENT_TYPES } from "@/lib/constants";
import type { EventFormValues } from "@/lib/types/event";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateName = (name: string): string | null => {
    const value = name.trim();
    if (value.length < 2) return "Name must be at least 2 characters";
    if (value.length > 60) return "Name must be 60 characters or fewer";
    return null;
};

export const validateEmail = (email: string): string | null => {
    const value = email.trim();
    if (!value) return "Email is required";
    if (!EMAIL_PATTERN.test(value)) return "Enter a valid email address";
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) {
        return "Password must include an uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must include a lowercase letter";
    }
    return null;
};

export const validatePhotoUrl = (value: string): string | null => {
    const url = value.trim();
    if (!url) return "Photo URL is required";
    try {
        const parsed = new URL(url);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
            return "Photo URL must start with http or https";
        }
    } catch {
        return "Enter a valid photo URL";
    }
    return null;
};

// Only allows same-site paths such as "/create-event"; blocks "//evil.com" and full URLs.
export const getSafeCallbackUrl = (raw: string | null): string => {
    if (!raw || !raw.startsWith("/") || raw.startsWith("//") || raw.includes("\\")) {
        return "/";
    }
    return raw;
};


export const validateThumbnailUrl = (value: string): string | null => {
    const url = value.trim();
    if (!url) return "Thumbnail URL is required";
    try {
        if (new URL(url).protocol !== "https:") {
            return "Thumbnail URL must start with https://";
        }
    } catch {
        return "Enter a valid thumbnail URL";
    }
    return null;
};

export type EventFormErrors = Partial<Record<keyof EventFormValues, string>>;

// minDate is "today" (YYYY-MM-DD). currentDate lets an owner keep an old event's date unchanged.
export const validateEventForm = (
    values: EventFormValues,
    minDate: string,
    currentDate?: string,
): EventFormErrors => {
    const errors: EventFormErrors = {};
    const title = values.title.trim();
    const description = values.description.trim();
    const location = values.location.trim();

    if (title.length < 3 || title.length > 100) {
        errors.title = "Title must be between 3 and 100 characters";
    }
    if (description.length < 10 || description.length > 2000) {
        errors.description = "Description must be between 10 and 2000 characters";
    }
    if (!EVENT_TYPES.some((type) => type === values.type)) {
        errors.type = "Choose an event type";
    }
    const thumbnailError = validateThumbnailUrl(values.thumbnail);
    if (thumbnailError) errors.thumbnail = thumbnailError;
    if (location.length < 2 || location.length > 150) {
        errors.location = "Location must be between 2 and 150 characters";
    }

    if (!values.date) {
        errors.date = "Event date is required";
    } else if (
        !/^\d{4}-\d{2}-\d{2}$/.test(values.date) ||
        Number.isNaN(Date.parse(values.date))
    ) {
        errors.date = "Enter a valid date";
    } else if (values.date !== currentDate && values.date < minDate) {
        errors.date = "Event date must be today or later";
    }

    return errors;
};