'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
    Bookmark,
    ChevronUp,
    Mail,
    MapPinned,
    SquareArrowOutUpRight,
    ChevronLeft,
    CircleArrowDown,
    BookmarkCheck,
    ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTalentApi } from "@/hooks/useTalents";
import { notFound } from "next/navigation";
import TalentCardSkeleton from "./talent-skeleton";
import { talentProp } from "@/types/user";
import { getSkillLabelByValue } from "@/lib/skills_sort";
import skillsLibrary from "../../../../../../public/skills_library.json";
import { env } from "@/lib/env";
import { getCountryNameByCode } from "@/lib/countryfromIsocode";
import { useSaveTalentMutation, useUpvoteTalentMutation } from "@/hooks/mutations/talent";
import { toast } from "react-toastify";


const TalentComponent = ({ talentID }: { talentID: string }) => {
    const { fetchTalentById } = useTalentApi()
    const { data, isLoading, isError } = useQuery<talentProp>({
        queryKey: [`talent`, talentID],
        queryFn: async () => await fetchTalentById(talentID),
    });
    console.log('data at single talent page', data)

    const [bookmarked, setBookmarked] = useState(false);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [upvotes, setUpvotes] = useState<number | undefined>(undefined);
    useEffect(() => {
        if (data) {
            setBookmarked(data.is_saved ?? false);
            setIsUpvoted(data.is_upvoted ?? false);
            setUpvotes(data.upvotes ?? 0);
        }
    }, [data]);

    const { mutate: upvoteATalent, isPending: isUpvoting } = useUpvoteTalentMutation();
    const { mutate: saveATalent, isPending: isSaving } = useSaveTalentMutation()

    if (isError) {
        notFound();
    }
    const handleLinkClick = (external_link: string = '') => {
        window.open(external_link, '_blank')
    }
    const handleUpvote = () => {
        if (!isUpvoted) {
            setUpvotes((prev) => (prev || 0) + 1)
        } else {
            setUpvotes((prev) => (prev || 0) - 1)
        }
        setIsUpvoted(prev => !prev)
        upvoteATalent(talentID, {
            onSuccess: () => {
                toast.success(`Talent ${!isUpvoted ? 'upvoted' : 'downvoted'} successfully!`);
            },
            onError: () => {
                toast.error(`Failed to ${!isUpvoted ? 'upvote' : 'downvote'} talent.`);
            },
        });
    }
    const handleBookmark = () => {
        setBookmarked(prev => !prev)
        saveATalent(talentID, {
            onSuccess: () => {
                toast.success(`Talent ${!bookmarked ? 'bookmarked' : 'removed from bookmarks'} successfully!`)
            },
            onError: () => {
                toast.error(`Failed to ${!bookmarked ? 'bookmark' : 'remove bookmark'} talent.`)
            },
        });
    }

    const handleDownloadResume = (resumePath: string) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = `${env('apiUrl')}/${resumePath}`;
        downloadLink.download = `${data?.first_name}-${data?.last_name}-resume.pdf`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    return (
        <div className="max-w-[951px] w-full flex flex-col gap-9 px-4 md:px-0">
            <Link href={'/talents'} className="flex items-center gap-2 text-[#09090B] text-[14px]">
                <ChevronLeft size={14} strokeWidth={2.5} className="text-[#71717A]" />
                Back to results
            </Link>

            {isLoading ?
                <TalentCardSkeleton />
                :
                <div className="border border-[#E4E7EC] rounded-xl">
                    {/* div wrapper for name and uppoer part of profile */}
                    <div className="flex flex-col md:flex-row justify-between border-b border-[#E4E7EC] p-4 md:items-center">
                        <div className="flex gap-6 items-center">
                            <div className="rounded-lg overflow-hidden relative max-w-[109px] w-full h-[140px]">
                                <Image
                                    src={data?.avatar || "/assets/images/placeholder-img.svg"}
                                    alt="talent-image"
                                    width={109}
                                    height={140}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-1 w-[101px] flex items-center justify-center h-5 left-1/2 -translate-x-1/2 rounded-full bg-[#FFFFFFCC]">
                                    <p className="text-[10px]">Available to work</p>
                                </span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div>
                                    <p className="font-semibold text-[14px] capitalize">{data?.first_name} {data?.last_name}</p>
                                    <p className="font-normal text-[#5F5F5F] text-[13px]">
                                        {data?.job_title}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 text-[#5F5F5F] font-normal text-[13px]">
                                    <span>
                                        <MapPinned size={14} strokeWidth={2} />
                                    </span>
                                    <p>{data?.state} {getCountryNameByCode(data?.country || '')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-2 md:mt-0">
                            <Button
                                disabled={isUpvoting || isSaving}
                                onClick={handleUpvote}
                                variant={"outline"}
                                className="h-[28px] border-[0.5px] w-[96px] gap-1 text-[#5F5F5F] rounded-[3px] text-[12px] flex">
                                {
                                    isUpvoted ?
                                        <ChevronDown size={14} strokeWidth={2.5} /> :
                                        <ChevronUp size={14} strokeWidth={2.5} />
                                }
                                <p className="font-normal">
                                    Upvote <span className="font-bold">{upvotes}</span>
                                </p>
                            </Button>

                            <Button
                                disabled={isUpvoting || isSaving}
                                onClick={handleBookmark}
                                variant={"outline"}
                                className="h-[28px] w-[60px] border-[0.5px] rounded-[3px] text-[12px] text-[#5F5F5F] font-medium gap-1">
                                {bookmarked ?
                                    <BookmarkCheck size={14} strokeWidth={2.5} /> :
                                    <Bookmark size={14} strokeWidth={2.5} />
                                }
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>

                    {/* div wrapper for bio, skills, experience and resume */}
                    <div className="flex flex-col md:flex-row">
                        <div className="max-w-[521px] w-full p-4 text-[#5F5F5F] md:border-r border-[#E4E7EC] flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <h2 className="text-[12px] font-semibold">Bio:</h2>
                                <p className="text-[13px] font-normal">
                                    {data?.bio || 'No bio available.'}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="text-[12px] font-semibold">Skills:</h2>
                                <div className="flex gap-2 flex-wrap">
                                    {data?.skills && data?.skills.map((skill, index) => (
                                        <Button
                                            key={index}
                                            className="bg-[#F5F5F5] text-[#5F5F5F] h-[24px] border-[#696969] border-[1px] rounded-[3px] p-[6px] text-[12px]">
                                            {getSkillLabelByValue(skill, skillsLibrary)}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="text-[12px] font-semibold">Experience:</h2>
                                <p className="text-[13px] font-normal capitalize">{data?.experience_level}</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="text-[12px] font-semibold">Resume:</h2>

                                <div className="flex gap-4 items-center justify-between max-w-[361px] w-full">
                                    <div className="flex gap-2 items-center">
                                        <Image
                                            src={"/assets/images/pdfholder.png"}
                                            alt="pdf-holder"
                                            width={48}
                                            height={60}
                                            className="w-[48px] h-[60px] object-cover"
                                        />

                                        <div>
                                            <p className="text-[11px] text-[#9E9E9E] capitalize">
                                                {data?.first_name} {data?.last_name}&apos;s resume
                                            </p>
                                            <p className="text-[11px] font-medium text-[#5F5F5F]">
                                                108.3kb
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handleDownloadResume(data?.resume_path || '')}
                                        variant={"outline"}
                                        className="text-[12px] font-medium gap-1 w-[94px] h-[28px] rounded-[3px]">
                                        <CircleArrowDown />
                                        Download
                                    </Button>

                                </div>
                            </div>
                        </div>

                        <div className="max-w-[430px] w-full p-4">
                            <div className="p-4 text-[#5F5F5F] flex flex-col gap-2 rounded-xl border border-[#E4E7EC]">
                                <p className="text-[12px] font-semibold">Contact Information:</p>

                                <div className="flex flex-wrap gap-2">
                                    {data?.portfolio_url &&
                                        <Button
                                            onClick={() => handleLinkClick(data?.portfolio_url)}
                                            variant={"outline"}
                                            className="text-[12px] font-medium gap-1 max-w-[114px] h-[28px] rounded-[3px]">
                                            <SquareArrowOutUpRight strokeWidth={2.25} />
                                            Visit Portfolio
                                        </Button>
                                    }
                                    {data?.linkedin_profile &&
                                        <Button
                                            onClick={() => handleLinkClick(data?.linkedin_profile)}
                                            variant={"outline"}
                                            className="text-[12px] font-medium gap-1 max-w-[119px] h-[28px] rounded-[3px]">
                                            <Image
                                                src={"/assets/icons/linkedin-01.svg"}
                                                alt="icon for linkedin"
                                                width={16}
                                                height={16}
                                                className="w-[16px] h-[16px]"
                                            />
                                            Go to Linkedin
                                        </Button>
                                    }

                                    <Button
                                        onClick={() => {
                                            window.location.href = `mailto:${data?.email || ''}`;
                                        }}
                                        variant={"outline"}
                                        className="text-[12px] font-medium gap-1 max-w-[117px] h-[28px] rounded-[3px]">
                                        <Mail strokeWidth={2.25} />
                                        Send an email
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default TalentComponent
