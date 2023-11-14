import React from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html data-bs-theme="dark">
      <body>
      <header>
        <Navbar bg={'secondary'} className={'bg-gradient'}>
            <Container>
                <NavbarBrand href={"/"}>GameDatabase</NavbarBrand>
                <Nav className="me-auto">
                    <NavLink href={"/games"}>Игры</NavLink>
                </Nav>
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
