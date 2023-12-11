import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container} from "react-bootstrap";
import '@/css/public.css'
import HeaderNavPanel from '@/lib/components/panels/HeaderNavPanel';

export default async function PublicRootLayout({children}: { children: React.ReactNode }) {
    return (
        <html>
        <body>
        <header>
            <HeaderNavPanel/>
        </header>
        <main>
            <Container>{children}</Container>
        </main>
        </body>
        </html>
    )
};