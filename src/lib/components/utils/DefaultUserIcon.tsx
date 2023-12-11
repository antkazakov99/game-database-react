'use client';
import React, {CSSProperties} from 'react';

export default function DefaultUserIcon({className, style}: {className?: string,style?: CSSProperties}) {
    return (
        <div className={`user-icon-border ${className}`} style={style}>
            <div className={'user-icon'}/>
        </div>
    );
}