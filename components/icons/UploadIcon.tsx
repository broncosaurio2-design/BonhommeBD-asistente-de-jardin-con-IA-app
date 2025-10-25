
import React from 'react';

export const UploadIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-green-400 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M12 12v9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l3-3 3 3" />
    </svg>
);
