'use client';

import React from 'react';
import {usePathname} from 'next/navigation';

export default function MenuItem({href, value, iconPath}: { href: string, value: string, iconPath?: string }) {
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

    const pathName = usePathname();
    let color = 'link-dark';
    let active = '';
    if (href === pathName) {
        active = 'active';
        color = '';
    }

    return (
        <a className={`nav-link ${color} ${active}`} href={href}>
            {icon} {value}
        </a>
    );
}