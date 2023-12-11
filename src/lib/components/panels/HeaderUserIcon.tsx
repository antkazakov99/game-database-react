"use client"

import React from "react";
import HeaderUserIconUnauthorized from '@/lib/components/panels/HeaderUserIconUnauthorized';
import HeaderUserIconAuthorized from '@/lib/components/panels/HeaderUserIconAuthorized';
import {useSession} from 'next-auth/react';

export default function HeaderUserIcon() {
    const {data: session} = useSession();
    if (session) {
        return <HeaderUserIconAuthorized/>;
    } else {
        return <HeaderUserIconUnauthorized/>;
    }
}
