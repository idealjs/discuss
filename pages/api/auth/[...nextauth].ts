import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Providers, { AppProviders } from "next-auth/providers";

import {
  emailEnabled,
  emailHost,
  emailPassword,
  emailUsername,
  jwtSecret,
} from "../../../lib/config";

const prisma = new PrismaClient();

const providers: AppProviders = [
  Providers.Credentials({
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const user = { name: credentials.username };
      return user;
    },
  }),
  emailEnabled &&
    Providers.Email({
      server: {
        host: emailHost,
        port: 25,
        auth: {
          user: emailUsername,
          pass: emailPassword,
        },
      },
      from: emailUsername,
    }),
].filter((p) => p != null) as AppProviders;

export default NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: providers,
  jwt: {
    secret: jwtSecret,
  },
  callbacks: {},
});
