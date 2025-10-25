import React from 'react';

export const GrowthIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V3m-5.25 6l5.25-6 5.25 6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 15h13.5" />
    </svg>
);