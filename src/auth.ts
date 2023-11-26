import NextAuth, {NextAuthConfig} from "next-auth"
import Credentials from "@auth/core/providers/credentials";

export const authConfig = {
    providers: [
        Credentials({
            type: "credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            authorize(credentials, req) {
                if (credentials.email === "ant.kazakov99@gmail.com" && credentials.password === "123") {
                    return {id: "1", name: "", email: credentials.email};
                } else {
                    return null;
                }
            }
        })
    ],
    pages: {
        error: "/"
    }
}

export const {handlers: {GET, POST}, auth} = NextAuth(authConfig);