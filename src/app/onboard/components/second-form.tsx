'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext, Controller } from 'react-hook-form'
import FormLayout from './formLayout'
import { formSteps, OnboardFormSchema } from '@/types/form'
import { CountrySelect } from '@/components/ui/country-select'
import { StateSelect } from '@/components/ui/state-select'
import { Textarea } from '@/components/ui/textarea'

const PersonalInfoForm = () => {
    const { register, control, setValue, watch, formState: { isValid, errors, touchedFields, dirtyFields }, } = useFormContext<OnboardFormSchema>();
    const role = watch("data.role");
    const step = watch('config.currentForm');
    const selectedCountryCode = watch('data.country');

    let fields = formSteps[step];
    if (role !== "recruiter") {
        fields = fields.filter((field) => field !== "work_email");
    }
    if (role !== "talent") {
        fields = fields.filter((field) => field !== "bio");
    }
    if (role !== "talent") {
        fields = fields.filter((field) => field !== "job_title");
    }
    const onNext = () => {
        setValue('config.currentForm', step + 1)
    };
    const isStepValid =
        fields.every((field) => {
            const dirty = dirtyFields?.data?.[field];
            const error = errors?.data?.[field];
            return dirty && !error;
        });

    console.log('your form data errors', errors)

    return (
        <FormLayout>
            <p style={{ wordSpacing: '3px' }} className='text-[30px] font-bold leading-[38px] text-center'>
                Let’s continue setting up <br />your account
            </p>
            <p className='text-center mt-[12px] text-[14px]'>Be a part of Enyata talentboard today!</p>
            <div className='flex flex-col gap-[36px] mt-[36px] text-[14px] font-normal'>
                <div className='flex flex-col md:flex-row gap-[24px] justify-between'>
                    <div className='w-full'>
                        <Label htmlFor='first_name' className='font-normal'>First Name*</Label>
                        <Input
                            disabled={watch('data.first_name') !== ''}
                            id='first_name'
                            className='h-[42px] mt-2'
                            placeholder='enter your first name'
                            {...register('data.first_name')}
                        />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor='last_name' className='font-normal'>Last Name*</Label>
                        <Input
                            disabled={watch('data.last_name') !== ''}
                            id='last_name'
                            className='h-[42px] mt-2'
                            placeholder='enter your last name'
                            {...register('data.last_name')}
                        />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-[24px] justify-between">
                    {/* Country */}
                    <div className='w-full'>
                        <Controller
                            control={control}
                            name="data.country"
                            render={({ field }) => (
                                <CountrySelect
                                    value={field.value}
                                    onChange={(val) => {
                                        field.onChange(val);
                                        setValue('data.state', ''); // Reset state
                                    }}
                                />
                            )}
                        />
                        {touchedFields?.data?.country && errors?.data && "country" in errors.data && (
                            <p className="text-sm text-red-500 mt-1">
                                {(errors.data.country as { message?: string })?.message}
                            </p>
                        )}
                    </div>

                    {/* State */}
                    <div className='w-full'>
                        <Controller
                            control={control}
                            name="data.state"
                            render={({ field }) => (
                                <StateSelect
                                    countryCode={selectedCountryCode}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={!selectedCountryCode}
                                />
                            )}
                        />
                        {touchedFields?.data?.state && errors?.data && "state" in errors.data && (
                            <p className="text-sm text-red-500 mt-1">
                                {(errors.data.state as { message?: string })?.message}
                            </p>
                        )}
                    </div>
                </div>


                {role === 'recruiter' && (
                    <div className='w-full'>
                        <Label htmlFor='work-email' className='font-normal'>Work Email*</Label>
                        <Input
                            id='work-email'
                            className='h-[42px] mt-2'
                            placeholder='example@workdomain.com'
                            {...register('data.work_email')}
                        />
                        {touchedFields?.data?.work_email && errors?.data && "work_email" in errors.data && (
                            <p className="text-sm text-red-500 mt-1">
                                {(errors.data.work_email as { message?: string })?.message}
                            </p>
                        )}
                    </div>
                )}
                {role === 'talent' && (
                    <div className='w-full'>
                        <Label htmlFor='job_title' className='font-normal'>Professional Title*</Label>
                        <Input
                            id='job_title'
                            className='h-[42px] mt-2'
                            placeholder='e.g. Software Engineer, Product Manager'
                            {...register('data.job_title')}
                        />
                        {touchedFields?.data?.job_title && errors?.data && "job_title" in errors.data && (
                            <p className="text-sm text-red-500 mt-1">
                                {(errors.data.job_title as { message?: string })?.message}
                            </p>
                        )}
                    </div>
                )}

                {role === 'talent' && (
                    <div className='w-full'>
                        <Label htmlFor='bio' className='font-normal'>Bio*</Label>
                        <Textarea
                            id='bio'
                            className='h-[60px] mt-2'
                            placeholder='Tell us a little about yourself.'
                            {...register('data.bio')}
                        />
                        {touchedFields?.data?.bio && errors?.data && "bio" in errors.data && (
                            <p className="text-sm text-red-500 mt-1">
                                {(errors.data.bio as { message?: string })?.message}
                            </p>
                        )}
                    </div>
                )}
                {role === 'talent' && (
                    <div className='w-full'>
                        <Label htmlFor='portfolio' className='font-normal'>Portfolio Link</Label>
                        <Input
                            id='portfolio'
                            className='h-[42px] mt-2'
                            placeholder='enter your portfolio link here'
                            {...register('data.portfolio')}
                        />
                        {touchedFields?.data?.portfolio && errors?.data && "portfolio" in errors.data && (
                            <p className="text-sm text-red-500 mt-1">
                                {(errors.data.portfolio as { message?: string })?.message}
                            </p>
                        )}
                    </div>
                )}

                <div className='w-full'>
                    <Label htmlFor='linkedin' className='font-normal'>Linkedin Profile*</Label>
                    <Input
                        id='portfolio'
                        className='h-[42px] mt-2'
                        placeholder='e.g https://www.linkedin.com/in/example/'
                        {...register('data.linkedin')}
                    />

                    {touchedFields?.data?.linkedin && errors?.data && "linkedin" in errors.data && (
                        <p className="text-sm text-red-500 mt-1">
                            {(errors.data.linkedin as { message?: string })?.message}
                        </p>
                    )}
                </div>
                <div className='flex justify-center gap-3 h-[42px] w-full'>
                    <Button
                        onClick={() => setValue('config.currentForm', 1)}
                        variant={'outline'} className='h-full flex-1 cursor-pointer'>
                        Go Back
                    </Button>
                    <Button
                        disabled={!isStepValid || !isValid}
                        onClick={onNext}
                        className='bg-primary  h-full flex-1 cursor-pointer'>
                        Continue
                    </Button>

                </div>
            </div>
        </FormLayout>
    )
}

export default PersonalInfoForm
