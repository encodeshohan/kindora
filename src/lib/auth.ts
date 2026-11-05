import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";
import { APIError, createAuthMiddleware } from "better-auth/api";
import {
    validateEmail,
    validateName,
    validatePassword,
    validatePhotoUrl,
} from "@/lib/validation";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db(process.env.DB_NAME ?? "kindora");

const socialProviders = {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
        }
        : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
        ? {
            github: {
                clientId: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
            },
        }
        : {}),
};

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },
    socialProviders,
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            const body = ctx.body as
                | { name?: string; email?: string; password?: string; image?: string }
                | undefined;

            if (ctx.path === "/sign-up/email") {
                const message =
                    validateName(body?.name ?? "") ??
                    validateEmail(body?.email ?? "") ??
                    validatePassword(body?.password ?? "") ??
                    validatePhotoUrl(body?.image ?? "");
                if (message) {
                    throw new APIError("BAD_REQUEST", { message });
                }
            }

            if (ctx.path === "/update-user") {
                const message =
                    (body?.name === undefined ? null : validateName(body.name)) ??
                    (body?.image === undefined ? null : validatePhotoUrl(body.image));
                if (message) {
                    throw new APIError("BAD_REQUEST", { message });
                }
            }
        }),
    },
    plugins: [
        jwt({
            jwt: {
                definePayload: ({ user }) => ({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                }),
            },
        }),
    ],
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60,
        },
    },
});