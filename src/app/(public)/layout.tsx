import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
import UserIcon from "@/components/user-icon";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-bs-theme="light">
      <body>
      <header>
        <Navbar className={'bg-gradient'}>
            <Container>
                <NavbarBrand href={"/"}>GameDatabase</NavbarBrand>
                <Nav className="me-auto">
                    <NavLink href={"/games"}>Игры</NavLink>
                    <NavLink href={"/calendar"}>Календарь</NavLink>
                </Nav>
                <UserIcon />
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
