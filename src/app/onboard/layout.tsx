'use client';

import { FormContext } from '@/components/providers/form-context';
import { onboardFormSchema, OnboardFormSchema } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import React from 'react';
import { Stepper } from './components/stepper';

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
    const form = useForm<OnboardFormSchema>({
        resolver: zodResolver(onboardFormSchema),
        defaultValues: {
            config: {
                currentForm: 1,
            },
            data: {
                role: undefined,
                first_name: '',
                last_name: '',
                location: '',
                portfolio: '',
                work_email: '',
                linkedin: '',
                company_industry: '',
                experience_level: '',
                skills: [],
                roles_looking_for: [],
                resume: undefined,
            },
        },
    });

    const currentStep = form.watch('config.currentForm');
    const role = form.watch('data.role');

    return (
        <div className="relative flex justify-center xl:items-center w-full py-[100px] md:py-[140px]">
            <nav className="fixed w-full top-0 z-50 md:p-[32px] p-[16px] backdrop-blur-sm bg-white/30 border-b border-white/20">
                <div className="max-w-[1198px] mx-auto flex items-center justify-between">
                    <Link href="/" className="font-semibold text-[24px] cursor-pointer">
                        Talentboard
                    </Link>

                    {currentStep !== 1 && (
                        <div className="hidden md:flex items-center gap-4 text-[14px] font-medium">
                            <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-[#7557D3]' : 'text-[#CACACA]'}`}>
                                <span className="text-[22px]">•</span>
                                <span>Personal Details</span>
                            </div>
                            <div className={`flex items-center gap-2 ${currentStep === 3 ? 'text-[#7557D3]' : 'text-[#CACACA]'}`}>
                                <span className="text-[22px]">•</span>
                                <span>{role === 'recruiter' ? 'Other Information' : 'Experience'}</span>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            <FormContext form={form}>
                <div
                    className={`flex flex-col mx-[12px] items-center justify-center gap-[36px] ${currentStep !== 2 ? 'md:max-w-[428px]' : 'md:max-w-[534px]'
                        } px-[24px] py-[32px] rounded-[12px] shadow-sm w-full`}
                >
                    <Stepper currentStep={currentStep} />
                    <div className="w-full">{children}</div>
                </div>
            </FormContext>
        </div>
    );
};

export default OnboardingLayout;
