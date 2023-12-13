import {DefaultSession, DefaultUser} from 'next-auth';
import {DefaultJWT, JWT} from '@auth/core/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: number,
            role: string,
        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        role: string
    }
}

declare module "@auth/core/jwt" {
    interface JWT extends DefaultJWT {
        id: number
        role: string
    }
}