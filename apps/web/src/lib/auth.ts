import axios from "axios";
import type { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

declare module "next-auth" {
  interface Session extends DefaultSession {
    id: string;
    jwt: string;
  }
  interface User extends DefaultUser {
    jwt: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    jwt: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 60 * 60 * 24 * 14,
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "local",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`,
            {
              identifier: credentials?.email,
              password: credentials?.password,
            }
          );
          const result = response.data;
          if (result.user) {
            return {
              id: "" + result.user.id ?? "",
              name: result.user.username,
              email: result.user.email,
              jwt: result.jwt,
            };
          }
        } catch {
          return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.jwt = token.jwt;
      return session;
    },
    jwt: async ({ token, user, account }) => {
      if (account?.provider == "github") {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/github/callback?access_token=${account?.access_token}`
          );

          const result = response?.data;
          if (result.user) {
            token.jwt = result.jwt;
          }
        } catch {}
      }
      if (account?.provider == "credentials") {
        if (user.jwt) {
          token.jwt = user.jwt;
        }
      }

      return token;
    },
  },
};
