"use client";

import Link from 'next/link';
import DefaultUserIcon from '@/lib/components/utils/DefaultUserIcon';
import AuthModal from '@/lib/components/auth/AuthModal';
import React, {useState} from 'react';

export default function HeaderUserIconUnauthorized() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className={'navbar-nav'}>
            <Link href={'#'} onClick={handleShow}><DefaultUserIcon/></Link>
            <AuthModal show={show} onHide={handleClose}/>
        </div>
    );
}