
import React from 'react';

export const WaterIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-3.866 0-7-2.015-7-4.5s3.134-4.5 7-4.5 7 2.015 7 4.5S15.866 21 12 21z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12V3m0 0a3.5 3.5 0 10-7 0 3.5 3.5 0 007 0z" />
    </svg>
);
