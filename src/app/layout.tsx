import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";

export default async function RootLayout({children}: { children: React.ReactNode }) {
    const session = await auth();
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}