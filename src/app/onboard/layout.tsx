'use client';

// import { FormContext } from '@/components/providers/form-context';
import { onboardFormSchema, OnboardFormSchema } from '@/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import Link from 'next/link';
import React from 'react';
import { useAuthStore } from '@/store/authStore';

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
    const user = useAuthStore.getState().user;
    console.log('user info here', user);

    const { first_name, last_name } = user || {};
    const form = useForm<OnboardFormSchema>({
        resolver: zodResolver(onboardFormSchema),
        defaultValues: {
            config: {
                currentForm: 1,
            },
            data: {
                role: undefined,
                first_name: first_name || '',
                last_name: last_name || '',
                state: '',
                country: '',
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
    console.log('your form data', form.watch())

    return (
        <div className={`relative flex justify-center items-center w-full py-[100px] md:py-[140px] min-h-screen`}>
            <nav className="fixed w-full top-0 z-50 md:p-[32px] p-[16px] backdrop-blur-sm bg-white/30 border-b border-white/20">
                <div className="max-w-[1198px] mx-auto flex items-center justify-between">
                    <Link href="/" className="font-semibold text-[24px] cursor-pointer">
                        Talentboard
                    </Link>

                    {currentStep !== 1 && currentStep !== 4 && (
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

            <FormProvider {...form}>
                <div className="w-full">{children}</div>
            </FormProvider>
        </div>
    );
};

export default OnboardingLayout;
