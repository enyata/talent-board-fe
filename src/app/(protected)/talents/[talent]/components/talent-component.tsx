'use client'
import Image from "next/image";
import React from "react";
import {
    Bookmark,
    ChevronUp,
    Mail,
    MapPinned,
    SquareArrowOutUpRight,
    ChevronLeft,
    CircleArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useTalentApi } from "@/hooks/useTalents";
import { notFound } from "next/navigation";
import { SKILLSET } from "@/constants";
import TalentCardSkeleton from "./talent-skeleton";


const TalentComponent = ({ talentID }: { talentID: string }) => {
    console.log('talentID at single talent page', talentID)
    const { fetchTalentById } = useTalentApi()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['talent'],
        queryFn: async() => await fetchTalentById(talentID),
    });
    console.log('data at single talent page', data)

    if (isError) {
        notFound();
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
                                    src={"/assets/images/talentimage.png"}
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
                                    <p className="font-semibold text-[14px]">Cameron Williamson</p>
                                    <p className="font-normal text-[#5F5F5F] text-[13px]">
                                        Senior Frontend Developer
                                    </p>
                                </div>

                                <div className="flex items-center gap-1 text-[#5F5F5F] font-normal text-[13px]">
                                    <span>
                                        <MapPinned size={14} strokeWidth={2} />
                                    </span>
                                    <p>San Francisco CA</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-2 md:mt-0">
                            <Button
                                variant={"outline"}
                                className="h-[28px] border-[0.5px] w-[96px] gap-1 text-[#5F5F5F] rounded-[3px] text-[12px] flex">
                                <ChevronUp size={14} strokeWidth={2.5} />
                                <p className="font-normal">
                                    Upvote <span className="font-bold">45</span>
                                </p>
                            </Button>

                            <Button
                                variant={"outline"}
                                className="h-[28px] w-[60px] border-[0.5px] rounded-[3px] text-[12px] text-[#5F5F5F] font-medium gap-1">
                                <Bookmark size={14} strokeWidth={2.5} />
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
                                    Passionate frontend developer with expertise in building
                                    responsive and accessible web applications. Focused on user
                                    experience and performance optimization.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="text-[12px] font-semibold">Skills:</h2>
                                <div className="flex gap-2 flex-wrap">
                                    {SKILLSET.slice(0, 9).map((skill, index) => (
                                        <Button
                                            key={index}
                                            className="bg-[#F5F5F5] text-[#5F5F5F] h-[24px] border-[#696969] border-[1px] rounded-[3px] p-[6px] text-[12px]">
                                            {skill}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h2 className="text-[12px] font-semibold">Experience:</h2>
                                <p className="text-[13px] font-normal">10 years</p>
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
                                            <p className="text-[11px] text-[#9E9E9E]">
                                                David Adurotimi&apos;s resume
                                            </p>
                                            <p className="text-[11px] font-medium text-[#5F5F5F]">
                                                108.3kb
                                            </p>
                                        </div>
                                    </div>

                                    <Button
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
                                    <Button
                                        variant={"outline"}
                                        className="text-[12px] font-medium gap-1 max-w-[114px] h-[28px] rounded-[3px]">
                                        <SquareArrowOutUpRight strokeWidth={2.25} />
                                        Visit Portfolio
                                    </Button>

                                    <Button
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

                                    <Button
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
