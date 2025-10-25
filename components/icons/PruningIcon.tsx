import React from 'react';

export const PruningIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75l-4.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.625 12a6.375 6.375 0 1112.75 0 6.375 6.375 0 01-12.75 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25v1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25v1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12h-1.5" />
    </svg>
);