'use client'
import { Button } from '@/components/ui/button'
import { ButtonWithLoader } from '@/components/ui/button-with-loader'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UploadAvatar } from '@/components/ui/picture-upload'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/store/authStore'
import { ProfileSchema, profileSchema } from '@/types/profile-edit'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const EditProfile = ({ setOpenDialog }: { setOpenDialog: (arg0: boolean) => void }) => {
    const user = useAuthStore.getState().user;
    const { first_name, last_name, avatar } = user || {};
    const { register, watch, control, formState: { isDirty, isValid, errors } } = useForm<ProfileSchema>(
        {
            resolver: zodResolver(profileSchema),
            mode: 'onChange',
            defaultValues: {
                display_photo: avatar || '',
                first_name: first_name || '',
                last_name: last_name || '',
                bio: ''
            }
        }
    )
    const photo = watch("display_photo");

    const handleProfileEdit = async () => {
        setOpenDialog(false)
    }
    return (
        <DialogContent className='w-[448px]'>
            <DialogTitle className='hidden' />
            <div>
                <div className='text-center'>
                    <p className='text-[20px] font-semibold'>Make your profile shine.</p>
                    <p className='text-[14px]'>Add a fresh photo, tweak your bio, or update your name. It only takes a minute.</p>
                </div>
                <div>
                    <Controller
                        name="display_photo"
                        control={control}
                        render={({ field }) => (
                            <UploadAvatar
                                className="mt-[47px]"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        field.onChange(file);
                                    }
                                }}
                                src={
                                    photo instanceof File
                                        ? URL.createObjectURL(photo)
                                        : typeof photo === "string"
                                            ? photo
                                            : ""
                                }
                            />
                        )}
                    />
                    {errors.display_photo && (
                        <p className='text-red-500 text-[12px] mt-1'>{errors.display_photo.message}</p>
                    )}
                </div>
                <div className='flex flex-col md:flex-row gap-4 mt-6 justify-between'>
                    <div className='w-full'>
                        <Label htmlFor='first_name' className='font-normal'>First Name</Label>
                        <Input
                            id='first_name'
                            className='h-[42px] mt-2'
                            placeholder='enter your first name'
                            {...register('first_name')}
                        />
                        {errors.first_name && (
                            <p className='text-red-500 text-[12px] mt-1'>{errors.first_name.message}</p>
                        )}
                    </div>
                    <div className='w-full'>
                        <Label htmlFor='last_name' className='font-normal'>Last Name</Label>
                        <Input
                            id='last_name'
                            className='h-[42px] mt-2'
                            placeholder='enter your last name'
                            {...register('last_name')}
                        />
                        {errors.last_name && (
                            <p className='text-red-500 text-[12px] mt-1'>{errors.last_name.message}</p>
                        )}
                    </div>
                </div>
                <div className='w-full mt-6'>
                    <Label htmlFor='bio' className='font-normal'>Bio</Label>
                    <Textarea
                        id='bio'
                        className='h-[100px] mt-2'
                        placeholder='I am a full time developer who likes to eat a lot'
                        {...register('bio')}
                    />
                    {errors.bio && (
                        <p className='text-red-500 text-[12px] mt-1'>{errors.bio.message}</p>
                    )}
                </div>
            </div>
            <div className=' flex justify-between items-center gap-[4px]'>
                <Button
                    className='rounded-[6px] h-[48px] w-full flex-1'
                    variant={'outline'}
                    onClick={() => setOpenDialog(false)}
                >
                    Cancel
                </Button>
                <ButtonWithLoader
                    disabled={!isDirty || !isValid}
                    className='rounded-[6px] h-[48px] w-full flex-1'
                    onClick={handleProfileEdit}
                >
                    Save
                </ButtonWithLoader>
            </div>
        </DialogContent>
    )
}

export default EditProfile
