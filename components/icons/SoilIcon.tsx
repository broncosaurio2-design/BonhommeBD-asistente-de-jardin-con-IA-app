
import React from 'react';

export const SoilIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 3.22c.23-.13.48-.23.75-.32a6.002 6.002 0 015.5 0c.27.09.52.19.75.32" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 8.868a6.002 6.002 0 015.5 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 12.146a6.002 6.002 0 015.5 0" />
    </svg>
);
