'use client';
import React from 'react'
import { ProgressProvider } from '@bprogress/next/app';

const ProtectedFragment = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <ProgressProvider
                height="3px"
                color="#7557D3"
                options={{ showSpinner: false }}
                shallowRouting
            />
            {children}
        </>
    )
}

export default ProtectedFragment
