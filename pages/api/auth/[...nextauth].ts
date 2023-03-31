import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { hashPassword, verifyPassword } from "../../../lib/auth/passwords";


const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      id: "app-login",
      name: "App Login",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        try {
          let maybeUser = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              email: true,
              password: true,
            },
          });

          if (!maybeUser) {
            if (!credentials.password || !credentials.email) {
              throw new Error("Invalid Credentials");
            }

          } else {
            const isValid = await verifyPassword(
              credentials.password,
              maybeUser.password
            );

            if (!isValid) {
              throw new Error("Invalid Credentials");
            }
          }

          return {
            id: maybeUser.id,
            email: maybeUser.email,
          };
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      const sess = {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          role: token.role as string,
        },
      };

      return sess;
    },
  },

});
