'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext, Controller } from 'react-hook-form'
import FormLayout from './formLayout'
import { Country, State } from 'country-state-city';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { formSteps, OnboardFormSchema } from '@/types/form'

const PersonalInfoForm = () => {
    const { register, control, setValue, watch, formState: { isValid, errors, touchedFields, dirtyFields }, } = useFormContext<OnboardFormSchema>();
    const role = watch("data.role");
    const step = watch('config.currentForm');
    const selectedCountryCode = watch('data.country');
    const countries = Country.getAllCountries();
    const states = selectedCountryCode ? State.getStatesOfCountry(selectedCountryCode) : [];

    let fields = formSteps[step];
    if (role !== "recruiter") {
        fields = fields.filter((field) => field !== "work_email");
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
                    {/* Country Select */}
                    <div className="w-full">
                        <Label htmlFor="country" className="font-normal">Country*</Label>
                        <Controller
                            control={control}
                            name="data.country"
                            render={({ field }) => (
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value);
                                        setValue('data.state', ''); // reset state
                                    }}
                                    value={field.value}

                                >
                                    <SelectTrigger className="w-full mt-2" id="country">
                                        <SelectValue placeholder="Select your country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem className='flex gap-1 items-center' key={country.isoCode} value={country.isoCode}>
                                                <span>{country.flag}</span>
                                                <span>   {country.name}</span>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* State Select */}
                    <div className="w-full">
                        <Label htmlFor="state" className="font-normal">State*</Label>
                        <Controller
                            control={control}
                            name="data.state"
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    disabled={!selectedCountryCode}
                                >
                                    <SelectTrigger className=" w-full mt-2" id="state">
                                        <SelectValue placeholder={selectedCountryCode ? "Select your state" : "Select a country first"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {states.map((state) => (
                                            <SelectItem key={state.isoCode} value={state.name}>
                                                {state.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
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
                        {touchedFields?.data?.work_email && errors?.data && "work_email" in errors.data && (
                            <p className="text-sm text-red-500 mt-1">
                                {(errors.data.work_email as { message?: string })?.message}
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
