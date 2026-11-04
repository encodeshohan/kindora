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