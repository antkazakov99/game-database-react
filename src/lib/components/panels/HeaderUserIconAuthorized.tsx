'use client';

import {NavDropdown} from 'react-bootstrap';
import DefaultUserIcon from '@/lib/components/utils/DefaultUserIcon';
import {signOut, useSession} from 'next-auth/react';
import DropdownMenuItem from '@/lib/components/utils/DropdownMenuItem';
import {useRouter} from 'next/navigation';

export default function HeaderUserIconAuthorized() {
    const {data: session} = useSession();
    const router = useRouter();

    let adminPanelLink = <></>;
    if (session?.user.role === 'admin') {
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
                <NavDropdown.Item href="#" onClick={() => {signOut({redirect: false}); router.push('/')}}>Выйти</NavDropdown.Item>
            </NavDropdown>
        </div>
    );
}
