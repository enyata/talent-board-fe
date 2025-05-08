'use client';
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form'
import FormLayout from './formLayout';

const RoleForm = () => {
    const { watch, setValue } = useFormContext();
    const router = useRouter();
    return (
        <FormLayout>
            <div className='w-full'>
                <p style={{ wordSpacing: '3px' }} className='text-[30px] font-bold leading-[38px] text-center'>Choose the type of <br /> <span className=' text-[#7B1FA2] italic'>account</span> you’re creating</p>
                <p className='text-center mt-[12px] text-[14px]'>Be a part of Enyata talentboard today!</p>
                <div className='mt-[36px] flex justify-between gap-[24px]'>
                    <ChooseRole image={'/assets/images/talent-role-img.svg'} title={'talent'} desc={'I am looking for gigs'} />
                    <ChooseRole image={'/assets/images/recruiter-role-img.svg'} title={'recruiter'} desc={' I want to hire talents'} />
                </div>
                <div className='mt-[36px] flex justify-center gap-3 h-[42px] w-full'>
                    <Button onClick={() => router.push('/')} variant={'outline'} className='h-full flex-1 cursor-pointer'>Back</Button>
                    <Button
                        disabled={watch("data.role") === ""}
                        onClick={() => setValue('config.currentForm', 2)}
                        className='bg-primary  h-full flex-1 cursor-pointer'>
                        Continue
                    </Button>

                </div>
            </div>
        </FormLayout>
    )
}

const ChooseRole = ({ image, title, desc }: { image: string; title: string; desc: string }) => {
    const { watch, setValue, reset } = useFormContext();
    const role = watch("data.role");
    const handleRoleChange = (newRole: string) => {
        // reset();
        setValue('data.role', newRole);
    };
    return (
        <div
            className={`relative cursor-pointer max-w-[178px] w-full rounded-[6px] p-[8px] shadow-sm ${role === title && 'border-[1px] border-[#7B1FA2]'}`}
            onClick={() => handleRoleChange(title)}
        >
            <Image
                src={image}
                alt="image"
                width={162}
                height={104}
            />
            {role === title && (
                <span className='absolute top-3 right-3 rounded-full bg-[#7B1FA2]  size-[16px] flex items-center justify-center'>
                    <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cfb9d9] opacity-75'></span>
                    <span className='relative rounded-full size-[12px] bg-[#7B1FA2]'></span>
                    <span></span>
                </span>
            )}
            <p className='mt-[10px] text-[16px] font-bold capitalize'>{title}</p>
            <p className='text-[12px] text-[#475467] mt-[8px]'>{desc}</p>
        </div>
    )
}

export default RoleForm
