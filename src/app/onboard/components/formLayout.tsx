import React from 'react'
import { Stepper } from './stepper'
import { useFormContext } from 'react-hook-form';

const FormLayout = ({ children }: { children: React.ReactNode }) => {
    const { watch } = useFormContext()
    const currentStep = watch('config.currentForm');
    return (
        <div
            className={`flex flex-col mx-4 items-center justify-center gap-[36px] ${currentStep !== 2 ? 'md:max-w-[428px]' : 'md:max-w-[534px]'
                } px-[24px] py-[32px] rounded-[12px] shadow-sm w-full`}
        >
            <Stepper currentStep={currentStep} />
            <div className="w-full">{children}</div>
        </div>
    )
}

export default FormLayout
