import NextAuth, {NextAuthConfig} from "next-auth"
import Credentials from "@auth/core/providers/credentials";

export const authConfig = {
    providers: [
        Credentials({
            type: "credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            authorize(credentials, req) {
                if (credentials.username === "admin" && credentials.password === "123") {
                    return {id: "1", name: credentials.username, email: "jsmith@example.com"};
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