import React from 'react';

export const PestIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3.375c-2.435 0-4.606.865-6.33 2.343-1.725 1.478-2.67 3.61-2.67 5.862 0 2.253.945 4.385 2.67 5.863 1.724 1.478 3.895 2.342 6.33 2.342 2.435 0 4.606-.864 6.33-2.342 1.725-1.478 2.67-3.61 2.67-5.863 0-2.252-.945-4.384-2.67-5.862C18.106 4.24 15.935 3.375 13.5 3.375z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2.25 2.25L15.75 9.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 9.375h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.125 9.375h1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25V.75" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 23.25v-1.5" />
    </svg>
);