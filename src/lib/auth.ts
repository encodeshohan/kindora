import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("kindora");

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