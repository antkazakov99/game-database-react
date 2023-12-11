'use client';

import React from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

export default function HeaderMenuItem({href, value}: { href: string, value: string}) {

    const pathName = usePathname();
    let active = '';
    if (href === pathName) {
        active = 'active';
    }

    return (
        <Link className={`nav-link ${active}`} href={href}>{value}</Link>
    );
}
