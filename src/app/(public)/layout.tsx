import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
import UserIcon from "@/lib/components/UserIcon";
import '@/css/public.css'

export default async function PublicRootLayout({children}: { children: React.ReactNode }) {
    return (
        <html data-bs-theme="light">
        <body>
        <header className={'mb-3'}>
            <Navbar>
                <Container>
                    <NavbarBrand href={"/"}>GameDatabase</NavbarBrand>
                    <Nav className="me-auto">
                        <NavLink href={"/games"}>Игры</NavLink>
                        <NavLink href={"/calendar"}>Календарь</NavLink>
                    </Nav>
                    <UserIcon/>
                </Container>
            </Navbar>
        </header>
        <main>
            <Container>{children}</Container>
        </main>
        </body>
        </html>
    )
}