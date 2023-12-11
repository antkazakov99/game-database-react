'use client';

import React from 'react';
import {usePathname} from 'next/navigation';
import {NavDropdown} from 'react-bootstrap';

export default function DropdownMenuItem({href, value, iconPath}: { href: string, value: string, iconPath?: string }) {
    let icon = <></>;
    if (iconPath) {
        icon = <div
            className={'menu-icon me-2'}
            style={{
                WebkitMask: `url(${iconPath}) center no-repeat`,
                width: 16,
                height: 16
            }}
        />;
    }

    return (
        <NavDropdown.Item className={'dropdown-item'} href={href}>
            {icon} {value}
        </NavDropdown.Item>
    );
}