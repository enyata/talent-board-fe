'use client';

import { motion } from 'framer-motion';
import { FormContext } from '@/components/providers/form-context';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

const steps = [
    { step: 1, requiredFields: ["data.role"] },
    { step: 2, requiredFields: ["data.first_name", "data.last_name", "data.location", "data.linkedin", "data.portfolio"] },
    { step: 3, requiredFields: ["data.qualification", "data.skills", "data.experience_level"] },
];

interface FormDataProps {
    config: {
        currentForm: number;
    };
    data: {
        role?: string;
        first_name?: string;
        last_name?: string;
        location?: string;
        portfolio?: string;
        linkedin?: string;
        qualification?: string;
        skills?: string[];
        experience_level?: string;
    };
}

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
    const form = useForm<FormDataProps>({
        defaultValues: {
            config: {
                currentForm: 1,
            },
            data: {
                role: "",
                first_name: "",
                last_name: "",
                location: "",
                portfolio: "",
                linkedin: "",
                qualification: "",
                skills: undefined,
                experience_level: "",
            },
        },
    });
    const { getValues, watch } = form;

    const currentStep = watch("config.currentForm");


    const isStepValid = (requiredFields: string[]) => {
        const values = getValues();

        return requiredFields.every((field) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const value = field.split(".").reduce((obj: any, key) => obj?.[key], values);
            return value !== undefined && value !== "";
        });
    };

    const isStepCompleted = (step: number) => {
        return currentStep > step && isStepValid(steps[step - 1].requiredFields);
    };

    return (
        <div className='md:h-screen w-full flex items-center justify-center relative'>
            <Link href='/' className="font-semibold text-[24px] cursor-pointer p-[32px] absolute top-0 left-0">Talentboard</Link>
            <FormContext form={form}>
                <div className={`flex flex-col items-center justify-center gap-[36px] ${currentStep !== 2 ? 'md:max-w-[428px]' : 'md:max-w-[534px]'} px-[24px] py-[32px] rounded-[12px] shadow-sm w-full`}>
                    {
                        watch("config.currentForm") !== 1 && (

                            <div className='hidden md:flex items-center absolute top-0 right-0 p-[32px] gap-4 text-[14px] font-medium'>
                                <div className={`flex items-center gap-2 ${watch("config.currentForm") === 2 ? 'text-[#7557D3]' : 'text-[#CACACA]'}`}>
                                    <span className='text-[22px]'>•</span>
                                    <span>Personal Details</span>
                                </div>
                                <div className={`flex items-center gap-2 ${watch("config.currentForm") === 3 ? 'text-[#7557D3]' : 'text-[#CACACA]'}`}>
                                    <span className='text-[22px]'>•</span>
                                    <span>Experience</span>
                                </div>
                            </div>
                        )
                    }

                    <div className="max-w-[340px] w-full flex">
                        {steps.map((stepObj, idx) => {
                            const { step, requiredFields } = stepObj;
                            // const valid = isStepValid(requiredFields);
                            const isCompleted = isStepCompleted(step);
                            const isCurrent = currentStep === step;

                            const showCheck = isCompleted || isCurrent;
                            const showLine = isCompleted || isCurrent;

                            return (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-center ${idx !== steps.length - 1 ? "flex-grow" : "flex-shrink"}`}
                                >
                                    <Image
                                        src={
                                            showCheck
                                                ? "/assets/icons/checked-onboarding.svg"
                                                : "/assets/icons/unchecked-onboarding.svg"
                                        }
                                        alt={`Step ${step}`}
                                        width={40}
                                        height={40}
                                        className="w-[40px]"
                                    />
                                    {idx !== steps.length - 1 && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: showLine ? "100%" : "0%" }}
                                            transition={{ duration: 0.3 }}
                                            className={`mx-[2px] h-[1px] flex-1 transition-colors ${isStepValid(requiredFields) ? "bg-green-500" : "bg-gray-300"
                                                }`}
                                        />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className='w-full'>
                        {children}
                    </div>
                </div>
            </FormContext>
        </div>
    );
}

export default OnboardingLayout;
