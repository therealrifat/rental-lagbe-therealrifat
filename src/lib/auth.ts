import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_CLIENT_STRING as string);
const db = client.db("Rental-Lagbe");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: ["customer", "owner", "admin"] as const,
        input: false,
        defaultValue: "customer",
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
