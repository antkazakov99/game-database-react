'use client';

import {NavDropdown} from 'react-bootstrap';
import DefaultUserIcon from '@/lib/components/utils/DefaultUserIcon';
import {signOut, useSession} from 'next-auth/react';
import DropdownMenuItem from '@/lib/components/utils/DropdownMenuItem';
import {useState} from 'react';

export default function HeaderUserIconAuthorized() {
    const [isAdmin, setIsAdmin] = useState(false);
    const {data: session} = useSession();

    const userName = session?.user?.name;

    if (userName) {
        fetch(`/api/users/role?username=${userName}`)
            .then((response) => response.json())
            .then((response) => {
                if (response.role) {
                    setIsAdmin(response.role === 'admin');
                }
            })
        ;
    }

    let adminPanelLink = <></>;
    if (isAdmin) {
        adminPanelLink = (
            <>
                <DropdownMenuItem href={'/admin'} value={'Административный раздел'} iconPath={'/icons/gear.svg'}/>
                <NavDropdown.Divider/>
            </>
        );
    }

    return (
        <div className={'navbar-nav user-icon-authorized'}>
            <NavDropdown title={<DefaultUserIcon className={'d-inline-block shadow'}/>} menuVariant={'dark'} align={'end'}>
                {adminPanelLink}
                <NavDropdown.Item href="#" onClick={() => signOut()}>Выйти</NavDropdown.Item>
            </NavDropdown>
        </div>
    );
}
