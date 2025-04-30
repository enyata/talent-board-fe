import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ButtonWithLoader } from '@/components/ui/button-with-loader'
import MultipleSelector from '@/components/ui/multi-selector'
import { FileUploadFrame } from './file-upload-frame'

const OPTIONS = [
    { label: 'nextjs', value: 'Nextjs' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue,', disable: true },
];

const ExperienceForm = () => {
    const { register, watch, setValue, control } = useFormContext();
    const role = watch("data.role");
    const handleSubmit = () => {
        console.log('your form data here', watch())
    }
    return (
        <div>
            <p style={{ wordSpacing: '3px' }} className='text-[30px] font-bold leading-[38px] text-center'>
                Finalise setting up your account
            </p>
            <p className='text-center mt-[12px] text-[14px]'>Be a part of Enyata talentboard today!</p>
            <div className='flex flex-col gap-[36px] mt-[36px] text-[14px] font-normal'>
                {role === 'talent' && (
                    <div>
                        <Label htmlFor='qualification' className='font-normal'>Upload resume</Label>
                        <div className='mt-2'>
                            <FileUploadFrame />
                        </div>
                    </div>
                )}

                {
                    role === 'recruiter' && (
                        <div>
                            <Label htmlFor='qualification' className='font-normal'>Company Industry</Label>
                            <Input
                                id='qualification'
                                type='text'
                                className='mt-2'
                                placeholder='enter company industry'
                                {...register('data.company_industry',)}
                            />
                        </div>
                    )
                }

                <div>
                    <Label htmlFor='skills' className='font-normal'>{role === 'recruiter' ? 'What roles are you looking to hire for?' : 'Skills'}</Label>
                    <Controller

                        name="data.skills"
                        control={control}
                        render={({ field }) => (
                            <MultipleSelector
                                className="mt-[8px]"
                                hidePlaceholderWhenSelected={true}
                                hideClearAllButton={true}
                                defaultOptions={OPTIONS}
                                placeholder="e.g product designer, ux designer"
                                emptyIndicator={
                                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                        no results found.
                                    </p>
                                }
                                value={OPTIONS.filter(opt => field.value?.includes(opt.value))}
                                onChange={(selected) => {
                                    const valuesOnly = selected.map(opt => opt.value)
                                    field.onChange(valuesOnly)
                                }}
                            />
                        )}
                    />
                </div>

                {role === 'talent' && (
                    <div>
                        <Label htmlFor='experience-level' className='font-normal'>Experience Level</Label>
                        <div id='experience-level' className='flex gap-[10px] mt-[8px] w-full justify-between'>
                            <ChooseExperienceLevel level='entry' />
                            <ChooseExperienceLevel level='intermediate' />
                            <ChooseExperienceLevel level='expert' />
                        </div>
                    </div>
                )}
                <div className='flex justify-between gap-3 h-[42px] w-full'>
                    <Button
                        onClick={() => setValue('config.currentForm', 2)}
                        variant={'outline'} className='h-full flex-1 cursor-pointer'>
                        Go Back
                    </Button>
                    <ButtonWithLoader
                        onClick={() => handleSubmit()}
                        className='bg-primary  h-full max-w-[182px] w-full flex-1 cursor-pointer'>
                        Submit
                    </ButtonWithLoader>

                </div>
            </div>
        </div>
    )
}
const ChooseExperienceLevel = ({ level }: { level: string }) => {
    const { watch, setValue } = useFormContext();
    const experience_level = watch("data.experience_level");
    return (
        <Button onClick={() => setValue('data.experience_level', level)} variant={'outline'} className={`cursor-pointer h-[42px] w-full flex-1 capitalize font-normal ${experience_level === level && 'border-px border-primary'}`}>
            {level === 'entry' ? 'Entry Level' : level}
        </Button>
    )
}

export default ExperienceForm
