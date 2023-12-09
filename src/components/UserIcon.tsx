"use client";

import {NavDropdown, NavLink} from "react-bootstrap";
import {useState} from "react";
import {Person} from "react-bootstrap-icons";
import {signOut, useSession} from "next-auth/react";
import AuthModal from "@/components/auth/AuthModal";

export default function UserIcon() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {data} = useSession();

    if (data === null) {
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
                <span>
                    <span className={'link-secondary me-2'}>{data!!.user!!.name}</span>
                    <Person className={'rounded-circle img-thumbnail'} width={36} height={36}/>
                </span>
            }>
                <NavDropdown.Item href={`/user/${data.user?.name}`}>Профиль</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item onClick={() => signOut()}>Выйти</NavDropdown.Item>
            </NavDropdown>
        )
    }
}
