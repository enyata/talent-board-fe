'use client';
import React from 'react'
import { useFormContext } from 'react-hook-form'
import PersonalInfoForm from './second-form';
import ExperienceForm from './third-form';
import RoleForm from './first-form';
import SuccessComponent from './success';

const OnboardingFlow = () => {
    const { watch } = useFormContext();
    const currentForm = watch("config.currentForm");
    let currentFormComponent;
    switch (currentForm) {
        case 1:
            currentFormComponent = <RoleForm />;
            break;
        case 2:
            currentFormComponent = <PersonalInfoForm/>;
            break;
        case 3:
            currentFormComponent = <ExperienceForm/>;
            break;
        case 4:
            currentFormComponent = <SuccessComponent/>;
            break;
    }
    return (
        <div className='w-full flex justify-center'>
            {currentFormComponent}
        </div>
    )
}

export default OnboardingFlow
