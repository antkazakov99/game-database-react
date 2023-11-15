"use client";

import {NavLink} from "react-bootstrap";
import {useState} from "react";
import AuthModal from "@/components/auth-modal";
import {Person} from "react-bootstrap-icons";

export default function UserIcon() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <NavLink onClick={handleShow}>
                <picture>
                    <Person className={'rounded-circle img-thumbnail'} width={36} height={36} />
                </picture>
            </NavLink>
            <AuthModal show={show} onHide={handleClose} />
        </>
    )
}
