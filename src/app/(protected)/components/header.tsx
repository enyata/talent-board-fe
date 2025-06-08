'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import EditProfile from './edit-profile';
import LogoutModal from './logout-modal';

const ProtectedHeader = () => {
    const user = useAuthStore.getState().user;
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <div className="flex items-center justify-between w-full p-6 fixed top-0 z-50 bg-white border-b">
            <Link href={'/dashboard'} className="font-semibold text-[24px]">Talentboard</Link>

            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar className="size-[38.8px] border border-[#34A9FF]">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback>{user ? user.first_name.trim().charAt(0).toUpperCase() : ''}</AvatarFallback>
                        </Avatar>
                        {hasMounted && !isMobile && (
                            <>
                                <span className="text-sm">
                                    {user?.first_name} {user?.last_name}
                                </span>
                                <Image
                                    src={'/assets/icons/arrow-down.svg'}
                                    alt='arrow'
                                    height={10}
                                    width={8.33}
                                    className='ml-2'
                                />
                            </>
                        )}
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[221.8px] mt-8 rounded-sm">
                    <DropdownMenuGroup className='text-[14px]'>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger className='w-full'>
                                <div className='flex gap-2 items-center hover:bg-[#FAFAFAFA] rounded-sm p-2 cursor-pointer w-full'>
                                    <Image
                                        src={'/assets/icons/user-square.svg'}
                                        alt='profile'
                                        height={16}
                                        width={16}
                                    />
                                    Edit Profile
                                </div>
                            </DialogTrigger>
                            <EditProfile setOpenDialog={setOpen} />
                        </Dialog>
                        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                            <DialogTrigger className={`flex gap-2 items-center hover:bg-[#FAFAFAFA] rounded-sm p-2 cursor-pointer w-full`}>
                                <Image
                                    src={'/assets/icons/logout.svg'}
                                    alt='logout'
                                    height={16}
                                    width={16}
                                />
                                Logout
                            </DialogTrigger>
                            <LogoutModal setOpenDialog={setOpenDelete} />
                        </Dialog>

                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default ProtectedHeader;
