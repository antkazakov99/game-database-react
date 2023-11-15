"use client";

import {Image} from "react-bootstrap";
import {useState} from "react";
import AuthModal from "@/components/auth-modal";

export default function UserIcon() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Image src={"/person.svg"} width={32} height={32} roundedCircle={true} thumbnail={true} onClick={handleShow}></Image>

            <AuthModal show={show} onHide={handleClose} />
        </>
    )
}
