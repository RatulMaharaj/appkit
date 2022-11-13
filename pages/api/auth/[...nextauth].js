import { prisma } from "../../../lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import sha256 from "crypto-js/sha256";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // fetch user from database here
        const user = await prisma.user.findUnique({
          where: { username: credentials.username.toLowerCase() },
        });
        // validate the users credentials
        if (user && sha256(credentials.password).toString() === user.password) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {},
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/404",
  },
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (!token.surname && user.surname) {
        token.surname = user.surname;
        token.username = user.username;
        token.image = user.image;
        token.position = user.position;
        token.role = user.role;
        return token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.surname = token.surname;
      session.user.role = token.role;
      session.user.email = token.username;
      session.user.username = token.username;
      session.user.image = token.image;
      session.user.position = token.position;
      return session;
    },
  },
  events: {},
  theme: {
    colorScheme: "light",
  },
  debug: false,
});
