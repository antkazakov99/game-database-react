"use client";

import {NavDropdown, NavLink} from "react-bootstrap";
import {useState} from "react";
import AuthModal from "@/components/auth-modal";
import {Person} from "react-bootstrap-icons";
import {signOut, useSession} from "next-auth/react";

export default function UserIcon() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {data} = useSession();

    if (!data) {
        return (
            <>
                <NavLink onClick={handleShow}>
                    <picture>
                        <Person className={'rounded-circle img-thumbnail'} width={36} height={36}/>
                    </picture>
                </NavLink>
                <AuthModal show={show} onHide={handleClose}/>
            </>
        )
    } else {
        return (
            <NavDropdown title={
                <picture>
                    <Person className={'rounded-circle img-thumbnail'} width={36} height={36}/>
                </picture>
            }>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={() => signOut()}>Выйти</NavDropdown.Item>
            </NavDropdown>
        )
    }
}
