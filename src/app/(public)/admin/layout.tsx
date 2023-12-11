import React from "react";
import Registry from '@/lib/Registry';
import {auth} from '@/auth';
import {notFound} from 'next/navigation';
import MenuItem from '@/lib/components/utils/MenuItem';
import {Grid} from 'react-bootstrap-icons';

export default async function AdminDashboard({children}: { children: React.ReactNode }) {
    const session = await auth();
    const user = session?.user?.name ? await Registry.instance.userService.getByUsername(session.user.name) : null;

    if (!user?.isAdmin) {
        notFound()
    }

    return (
        <div className={'container-fluid'}>
            <div className={'row'}>
                <div className={'flex-column bg-light p-3 rounded'} style={{width: '280px'}}>
                    <ul className={'nav nav-pills flex-column'}>
                        <li><MenuItem href={'/admin/games'} value={'Игры'} iconPath={'/icons/joystick.svg'}/></li>
                        <li><MenuItem href={'/admin/users'} value={'Пользователи'} iconPath={'/icons/people-fill.svg'}/></li>
                    </ul>
                </div>
                <div className={'vr p-0 ms-3 me-4 bg-secondary'}></div>
                <div className={'col bg-light p-3 rounded'}>
                </div>
            </div>
        </div>
    )
}
