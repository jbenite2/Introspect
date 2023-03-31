import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "jesus@christ.com",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********",
                },
            },
        }),
    ],
});
