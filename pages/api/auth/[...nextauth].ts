import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { jwtSecret } from "../../../lib/config";

const prisma = new PrismaClient();

export default NextAuth({
  debug: true,
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
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
    Providers.Email({
      server: {
        host: process.env.EMAIL_HOST,
        port: 25,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      from: process.env.EMAIL_USERNAME,
    }),
  ],
  jwt: {
    secret: jwtSecret,
  },
  callbacks: {},
});
