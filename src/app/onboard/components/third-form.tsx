import React, { useTransition } from 'react'
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ButtonWithLoader } from '@/components/ui/button-with-loader'
import MultipleSelector from '@/components/ui/multi-selector'
import { FileUploadFrame } from './file-upload-frame'
import FormLayout from './formLayout'
import { PATCH } from '@/lib/requests'
import { formSteps, OnboardFormSchema } from '@/types/form';
import { flattenAndSortSkills } from '@/lib/skills_sort';
import skillsLibrary from '../../../../public/skills_library.json';
import rolesLibrary from "../../../../public/roles_library.json"

// const OPTIONS = [
//     { label: 'nextjs', value: 'Nextjs' },
//     { label: 'Vite', value: 'vite' },
//     { label: 'Nuxt', value: 'nuxt' },
//     { label: 'Vue', value: 'vue,', disable: true },
// ];
// const ROLESOPTIONS = [
//     { label: 'product designer', value: 'product-designer' },
//     { label: 'ux designer', value: 'ux-designer' },
//     { label: 'ui designer', value: 'ui-designer' },
//     { label: 'software engineer', value: 'software-engineer' },
//     { label: 'data analyst', value: 'data-analyst' },
//     { label: 'data scientist', value: 'data-scientist' },
// ]

const OPTIONS = flattenAndSortSkills(skillsLibrary);
const ROLESOPTIONS = rolesLibrary.sort((a, b) => a.label.localeCompare(b.label));

const ExperienceForm = () => {
    const { register, watch, setValue, control, formState: { isValid, dirtyFields, errors } } = useFormContext<OnboardFormSchema>();
    const role = watch("data.role");
    const step = watch('config.currentForm');

    let fields = formSteps[step];
    if (role === "recruiter") {
        fields = fields.filter(
            (field) => !["skills", "resume", "experience_level"].includes(field)
        );
    }
    if (role === "talent") {
        fields = fields.filter(
            (field) => !["hiring_for", "company_industry", "roles_looking_for"].includes(field)
        );
    }
    console.log('fields at form 3', fields)

    const isStepValid =
        fields.every((field) => {
            const dirty = dirtyFields?.data?.[field];
            const error = errors?.data?.[field];
            return dirty && !error;
        });

    const form = new FormData();
    const resumeFiles = watch('data.resume') as File[] | undefined;
    if (role === 'talent' && watch('data.portfolio') !== '') {
        form.append('portfolio_url', watch('data.portfolio') ?? '');
    }
    if (role === 'recruiter') {
        form.append('work_email', watch('data.work_email') || '');
    }
    if (role === 'recruiter') {
        form.append('company_industry', watch('data.company_industry') ?? '');
    }
    form.append('country', watch('data.country'));
    form.append('state', watch('data.state'));
    form.append('linkedin_profile', watch('data.linkedin'))
    if (resumeFiles?.length) {
        const firstFile = resumeFiles[0];
        form.append('resume', firstFile);
    }

    if (role === 'talent') {
        form.append('experience_level', watch('data.experience_level') ?? '')
    }
    if (role === 'talent') {
        form.append('skills', JSON.stringify(watch('data.skills')))
    }
    if (role === 'recruiter') {
        form.append('roles_looking_for', JSON.stringify(watch('data.roles_looking_for')))
    }
    if (role === 'recruiter') {
        form.append('hiring_for', watch('data.hiring_for') ?? '')
    }

    const [isPending, startTransition] = useTransition();

    const handleSubmit = () => {
        startTransition(async () => {
            try {
                const res = await PATCH(
                    `/api/v1/onboarding/${role === "talent" ? "talent" : "recruiter"}`,
                    form
                );
                if (res.status === "failure") {
                    toast.error(res.message || "Something went wrong");
                    return;
                }
                // toast.success("You have successfully updated your profile");
                setValue('config.currentForm', 4);
                console.log("Profile update response:", res);
            } catch (error) {
                console.error("Error from form submission:", error);
                toast.error("Something went wrong. Please try again.");
            }
        });
    };

    return (
        <FormLayout>
            <p style={{ wordSpacing: '3px' }} className='text-[30px] font-bold leading-[38px] text-center'>
                Finalise setting up your account
            </p>
            <p className='text-center mt-[12px] text-[14px]'>Be a part of Enyata talentboard today!</p>
            <div className='flex flex-col gap-[36px] mt-[36px] text-[14px] font-normal'>
                {role === 'talent' && (
                    <div>
                        <Label htmlFor='qualification' className='font-normal'>Upload resume*</Label>
                        <div className='mt-2'>
                            <FileUploadFrame />
                        </div>
                    </div>
                )}

                {role === 'recruiter' && (
                    <div>
                        <Label htmlFor='experience-level' className='font-normal'>Who are you hiring for?*</Label>
                        <div id='hiring_for' className='flex gap-[10px] mt-[8px] w-full justify-between'>
                            <ChooseHirer hirer='myself' />
                            <ChooseHirer hirer='my company' />
                        </div>
                    </div>
                )}

                {
                    role === 'recruiter' && (
                        <div>
                            <Label htmlFor='qualification' className='font-normal'>Company Industry*</Label>
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
                    <Label htmlFor='skills' className='font-normal'>{role === 'recruiter' ? 'What roles are you looking to hire for?*' : 'Skills*'}</Label>
                    <Controller

                        name={`data.${role === 'recruiter' ? 'roles_looking_for' : 'skills'}`}
                        control={control}
                        render={({ field }) => (
                            <MultipleSelector
                                className="mt-[8px]"
                                hidePlaceholderWhenSelected={true}
                                hideClearAllButton={true}
                                defaultOptions={role === 'recruiter' ? ROLESOPTIONS : OPTIONS}
                                placeholder="e.g product designer, ux designer"
                                emptyIndicator={
                                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                        no results found.
                                    </p>
                                }
                                value={role === 'recruiter' ? ROLESOPTIONS.filter(opt => field.value?.includes(opt.value)) : OPTIONS.filter(opt => field.value?.includes(opt.value))}
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
                        <Label htmlFor='experience-level' className='font-normal'>Experience Level*</Label>
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
                        isLoading={isPending}
                        disabled={!isStepValid || !isValid || isPending}
                        onClick={() => handleSubmit()}
                        className='bg-primary  h-full max-w-[182px] w-full flex-1 cursor-pointer'>
                        Submit
                    </ButtonWithLoader>

                </div>
            </div>
        </FormLayout>
    )
}
const ChooseExperienceLevel = ({ level }: { level: string }) => {
    const { watch, setValue } = useFormContext();
    const experience_level = watch("data.experience_level");
    return (
        <Button onClick={() => setValue('data.experience_level', level, { shouldDirty: true })} variant={'outline'} className={`cursor-pointer h-[42px] w-full flex-1 capitalize font-normal ${experience_level === level && 'border-px border-primary'}`}>
            {level === 'entry' ? 'Entry Level' : level}
        </Button>
    )
}

const ChooseHirer = ({ hirer }: { hirer: string }) => {
    const { watch, setValue } = useFormContext();
    const hiring_for = watch("data.hiring_for");
    return (
        <Button onClick={() => setValue('data.hiring_for', hirer, { shouldDirty: true })} variant={'outline'} className={`cursor-pointer h-[42px] w-full flex-1 capitalize font-normal ${hiring_for === hirer && 'border-px border-primary'}`}>
            {hirer}
        </Button>
    )
}

export default ExperienceForm
