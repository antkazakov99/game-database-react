import {CSSProperties, HTMLAttributes} from 'react';

export default function CustomIcon({iconPath, className, style}:{iconPath: string, className?: string, style?: CSSProperties}) {
    return (
        <div className={className} style={{...style, WebkitMask: `url("${iconPath}") center no-repeat`}}></div>
    );
}