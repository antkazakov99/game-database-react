import HeaderMenuItem from '@/lib/components/utils/HeaderMenuItem';
import React from 'react';
import HeaderUserIcon from '@/lib/components/panels/HeaderUserIcon';

export default function HeaderNavPanel() {
    return (
        <nav className={'navbar navbar-expand nav-underline navbar-dark bg-dark p-3 mb-3'}>
            <div className={'container'}>
                <a href={'/'} className={'navbar-brand'}>GameDatabase</a>
                <ul className={'navbar-nav me-auto'}>
                    <li className={'nav-item me-2'}><HeaderMenuItem href={'/games'} value={'Игры'}/></li>
                    <li className={'nav-item me-2'}><HeaderMenuItem href={'/calendar'} value={'Календарь'}/></li>
                </ul>
                <HeaderUserIcon/>
            </div>
        </nav>
    );
}
