'use client';

import {NavDropdown} from 'react-bootstrap';
import DefaultUserIcon from '@/lib/components/utils/DefaultUserIcon';
import {signOut} from 'next-auth/react';
import DropdownMenuItem from '@/lib/components/utils/DropdownMenuItem';

export default function HeaderUserIconAuthorized() {
    return (
        <div className={'navbar-nav user-icon-authorized'}>
            <NavDropdown title={<DefaultUserIcon className={'d-inline-block'}/>} menuVariant={'dark'} align={'end'}>
                <DropdownMenuItem href={'/admin'} value={'Административный раздел'} iconPath={'/icons/gear.svg'} />
                <NavDropdown.Divider/>
                <NavDropdown.Item href="#" onClick={() => signOut()}>Выйти</NavDropdown.Item>
            </NavDropdown>
        </div>
    );
}
