"use client";

import {NavDropdown, NavLink} from "react-bootstrap";
import {useState} from "react";
import {Person} from "react-bootstrap-icons";
import {signOut, useSession} from "next-auth/react";
import AuthModal from "@/components/auth/auth-modal";

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
            <NavDropdown align={'end'} title={
                <picture>
                    <Person className={'rounded-circle img-thumbnail'} width={36} height={36}/>
                </picture>
            }>
                <NavDropdown.Item onClick={() => signOut()}>Выйти</NavDropdown.Item>
            </NavDropdown>
        )
    }
}
