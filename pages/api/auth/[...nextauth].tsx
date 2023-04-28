import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      type: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        // // find user from db
        // if (response.status !== 200) {
        //   throw new Error("Invalid username or password");
        // }
        // // if everything is fine
        // const user = { email, password };
        // return user;
        return { id: "1", email, password };
      }
    })
  ]
};

export default (req, res) => NextAuth(req, res, authOptions);
