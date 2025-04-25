'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'

const PersonalInfoForm = () => {
    const { register, setValue, formState: { isValid, isDirty }, } = useFormContext();
    return (
        <form>
            <p style={{ wordSpacing: '3px' }} className='text-[30px] font-bold leading-[38px] text-center'>
                Let’s continue setting up <br />your account
            </p>
            <p className='text-center mt-[12px] text-[14px]'>Be a part of Enyata talentboard today!</p>
            <div className='flex flex-col gap-[36px] mt-[36px] text-[14px] font-normal'>
                <div className='flex flex-col md:flex-row gap-[24px] justify-between'>
                    <div className='w-full'>
                        <Label htmlFor='first_name' className='font-normal'>First Name</Label>
                        <Input
                            id='first_name'
                            className='h-[42px] mt-2'
                            placeholder='enter your first name'
                            {...register('data.first_name')}
                        />
                    </div>
                    <div className='w-full'>
                        <Label htmlFor='last_name' className='font-normal'>Last Name</Label>
                        <Input
                            id='last_name'
                            className='h-[42px] mt-2'
                            placeholder='enter your last name'
                            {...register('data.last_name')}
                        />
                    </div>
                </div>
                <div className='w-full'>
                    <Label htmlFor='location' className='font-normal'>Add your Location</Label>
                    <Input
                        id='location'
                        className='h-[42px] mt-2'
                        placeholder='enter your location'
                        {...register('data.location')}
                    />
                </div>
                <div className='w-full'>
                    <Label htmlFor='portfolio' className='font-normal'>Portfolion Link</Label>
                    <Input
                        id='portfolio'
                        className='h-[42px] mt-2'
                        placeholder='enter your portfolio link here'
                        {...register('data.portfolio')}
                    />
                </div>
                <div className='w-full'>
                    <Label htmlFor='linkedin' className='font-normal'>Linkedin Profile</Label>
                    <Input
                        id='portfolio'
                        className='h-[42px] mt-2'
                        placeholder='e.g https://www.linkedin.com/in/example/'
                        {...register('data.linkedin')}
                    />
                </div>
                <div className='flex justify-center gap-3 h-[42px] w-full'>
                    <Button
                    disabled={isDirty}
                        onClick={() => setValue('config.currentForm', 3)}
                        variant={'outline'} className='h-full flex-1 cursor-pointer'>I
                        ’ll do this later
                    </Button>
                    <Button
                        disabled={!isDirty || !isValid}
                        onClick={() => setValue('config.currentForm', 3)}
                        className='bg-primary  h-full flex-1 cursor-pointer'>
                        Continue
                    </Button>

                </div>
            </div>
        </form>
    )
}

export default PersonalInfoForm
