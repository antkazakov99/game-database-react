import NextAuth, {NextAuthConfig, User} from "next-auth"
import Credentials from "@auth/core/providers/credentials";
import Registry from "@/lib/Registry";

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

                if (user?.id && user.password === credentials.password) {
                    return {
                        id: user.id.toString(),
                        name: user.username,
                        email: user.email,
                        role: user.isAdmin ? 'admin' : 'user'
                    };
                } else {
                    return null;
                }
            }
        })
    ],
    callbacks: {
        jwt({token, user}) {
            if (user) {
                token.role = user.role;
                token.id = parseInt(user.id);
            }
            return token;
        },
        session({session, token}) {
            if (session?.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        error: "/"
    },
    trustHost: true
}

export const {handlers: {GET, POST}, auth} = NextAuth(authConfig);