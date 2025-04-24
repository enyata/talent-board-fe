'use client';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import FirstForm from './first-form';
import SecoondForm from './second-form';
import ThirdForm from './third-form';

const OnboardingFlow = () => {
    const { watch } = useFormContext();
    const currentForm = watch("config.currentForm");
    let currentFormComponent;
    switch (currentForm) {
        case 1:
            currentFormComponent = <FirstForm />;
            break;
        case 2:
            currentFormComponent = <SecoondForm />;
            break;
        case 3:
            currentFormComponent = <ThirdForm />;
            break;
    }
    return (
        <div className='w-full'>
            {currentFormComponent}
        </div>
    )
}

export default OnboardingFlow
