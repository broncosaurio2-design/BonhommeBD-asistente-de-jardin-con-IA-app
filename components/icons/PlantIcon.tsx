
import React from 'react';

export const PlantIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0 1.172 1.953 1.172 5.119 0 7.072z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-4.925 9-11.008V8.125c0-.987-.426-1.905-1.144-2.553-1.146-1.027-3.097-1.027-4.243 0L12 8.47l-1.613-2.9-4.243 0C5.013 4.545 3 6.667 3 9.25v2.008C3 15.325 7.03 20.25 12 20.25z" />
    </svg>
);
