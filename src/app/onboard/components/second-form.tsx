'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from "@hookform/error-message"
import FormLayout from './formLayout'

const PersonalInfoForm = () => {
    const { register, setValue, watch, formState: { isValid, errors }, } = useFormContext();
    const role = watch("data.role");
    const values = watch();
    const requiredFields = ['data.first_name', 'data.last_name', 'data.location', 'data.linkedin'];
    const allFieldsFilled = requiredFields.every((field) => {
        const value = field.split('.').reduce((acc, key) => acc?.[key], values);
        return value?.toString().trim() !== '';
    })

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
                <div className='w-full'>
                    <Label htmlFor='location' className='font-normal'>Add your Location*</Label>
                    <Input
                        id='location'
                        className='h-[42px] mt-2'
                        placeholder='enter your location'
                        {...register('data.location')}
                    />
                </div>
                {role === 'recruiter' && (
                    <div className='w-full'>
                        <Label htmlFor='work-email' className='font-normal'>Work Email</Label>
                        <Input
                            id='work-email'
                            className='h-[42px] mt-2'
                            placeholder='example@workdomain.com'
                            {...register('data.work_email')}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="data.work_email"
                            render={({ message }) => <p>{message}</p>}
                        />
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
                        <ErrorMessage
                            errors={errors}
                            name="data.portfolio"
                            render={({ message }) => <p>{message}</p>}
                        />
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
                    <ErrorMessage
                        errors={errors}
                        name="data.linkedin"
                        render={({ message }) => <p>{message}</p>}
                    />
                </div>
                <div className='flex justify-center gap-3 h-[42px] w-full'>
                    <Button
                        onClick={() => setValue('config.currentForm', 1)}
                        variant={'outline'} className='h-full flex-1 cursor-pointer'>
                        Go Back
                    </Button>
                    <Button
                        disabled={!allFieldsFilled || !isValid}
                        onClick={() => setValue('config.currentForm', 3)}
                        className='bg-primary  h-full flex-1 cursor-pointer'>
                        Continue
                    </Button>

                </div>
            </div>
        </FormLayout>
    )
}

export default PersonalInfoForm
