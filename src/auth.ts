import NextAuth from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import Registry from "@/lib/Registry";

export const authConfig = {
    providers: [
        Credentials({
            type: "credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: Partial<Record<"email" | "password", any>>, req) {
                const userClient = Registry.instance.userClient;
                const user = await userClient.getByEmail(credentials.email);

                if (user !== null && user.password === credentials.password) {
                    return {id: user.id!!.toString(), name: user.username, email: user.email};
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