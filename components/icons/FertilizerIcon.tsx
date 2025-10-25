
import React from 'react';

export const FertilizerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v12m-6-12v12m12-12v12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.521 9C3.582 9 2 7.418 2 5.479c0-1.94 1.582-3.521 3.521-3.521 .15 0 .3.01.444.032" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.479 9c1.94 0 3.521-1.582 3.521-3.521C22 3.54 20.418 2 18.479 2c-.15 0-.3.01-.444.032" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9c-2.485 0-4.5-2.015-4.5-4.5S9.515 0 12 0s4.5 2.015 4.5 4.5S14.485 9 12 9z" />
    </svg>
);
