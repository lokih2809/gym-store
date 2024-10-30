// auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "./client";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
          placeholder: "jsmith@gmail.com or jsmith",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials.password) return null;

        const existingUser = await db.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          },
        });

        if (!existingUser) return null;

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password,
        );
        if (!passwordMatch) return null;

        return {
          id: `${existingUser.id}`,
          email: existingUser.email,
          username: existingUser.username,
          name: existingUser.name ?? undefined,
          phoneNumber: existingUser.phoneNumber ?? undefined,
          address: existingUser.address ?? undefined,
          role: existingUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          username: user.username,
          name: user.name,
          phoneNumber: user.phoneNumber,
          address: user.address,
          role: user.role,
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          username: token.username,
          name: token.name,
          phoneNumber: token.phoneNumber,
          address: token.address,
          role: token.role,
        },
      };
    },
  },
};
