import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client";
import {PrismaAdapter} from "@next-auth/prisma-adapter"

const prisma = new PrismaClient();

interface Credentials {
    email: string;
    password: string;
  }

// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    // https://next-auth.js.org/configuration/providers/oauth
    providers: [
        /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    */ 
         CredentialsProvider({
             name: "Credentials",
             credentials: {
                 email: {
                     label: "Email",
                     type: "text",
                     placeholder: "srodri25@nd.edu",
                 },
                 password: { label: "Password", 
                             type: "password",
                             placeholder: "********" 
                     },
             },
             async authorize(credentials: Credentials) {
                 const { email, password } = credentials as {
                     email: string;
                     password: string;
                 };

                 const user = await prisma.user.findUnique({
                    where:{
                        email: email,
                    }
                 });
                 if(user){
                    // validate password
                    return user;
                 }

                 return null;
             },
         }),
        // AppleProvider({
        //     clientId: process.env.APPLE_ID,
        //     clientSecret: process.env.APPLE_SECRET,
        // }),
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID,
        //     clientSecret: process.env.GITHUB_SECRET,
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET,
        // }),
        // TwitterProvider({
        //     clientId: process.env.TWITTER_ID,
        //     clientSecret: process.env.TWITTER_SECRET,
        // }),
    ],
    theme: {
        colorScheme: "light",
    },
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin";
            return token;
        },
    },
};

export default NextAuth(authOptions);
