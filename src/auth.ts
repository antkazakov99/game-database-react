import NextAuth, {NextAuthConfig, Session, User} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import Registry from "@/lib/Registry";
import {JWT} from '@auth/core/jwt';

export const authConfig: NextAuthConfig = {
    providers: [
        Credentials({
            type: "credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials: Partial<Record<"email" | "password", any>>, req): Promise<User | null> {
                const userClient = Registry.instance.userService;
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
    },
    trustHost: true
}

export const {handlers: {GET, POST}, auth} = NextAuth(authConfig);