'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

const steps = [
    { step: 1 },
    { step: 2 },
    { step: 3 },
];

type StepperProps = {
    currentStep: number;
};

export const Stepper = ({ currentStep }: StepperProps) => {
    return (
        <div className="max-w-[340px] w-full flex items-center gap-1">
            {steps.map(({ step }, idx) => {
                const isActive = currentStep >= step;

                return (
                    <React.Fragment key={step}>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={
                                    isActive
                                        ? '/assets/icons/checked-onboarding.svg'
                                        : '/assets/icons/unchecked-onboarding.svg'
                                }
                                alt={`Step ${step}`}
                                width={40}
                                height={40}
                                className="w-[40px]"
                            />
                        </motion.div>

                        {/* Connector line */}
                        {idx < steps.length - 1 && (
                            <div className="flex-1">
                                <Progress
                                    value={currentStep > step ? 100 : currentStep === step ? 50 : 0}
                                    className={`h-[1px] transition-all ${currentStep > step
                                        ? 'bg-[#57D375]/30'
                                        : 'bg-[#E4E7EC]'
                                        }`}
                                />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
