'use client'

import React from 'react'
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const skillsList = [
    '🔌 API Integration', '☁️ AWS', '🧩 Flutter', '🛠️ CI/CD', '🛡️ DevOps',
    '🎯 Product Management', '📱 React Native', '📊 Data Analysis', '🔐 Firebase',
    '🧠 Machine Learning', '🐍 Python', '⚡ Next.js', '🔧 JavaScript', '🖼️ UI/UX Design',
    '🧪 TypeScript', '🛢️ PostgreSQL', '🚢 Docker', '🖥️ Backend Development', '🌐 GraphQL',
    '📦 NPM', '📐 Responsive Design', '💡 System Design', '🌍 SEO Optimization',
    '🖋️ Technical Writing', '📂 Git', '🖼️ Figma', '🔄 Redux', '🪄 Tailwind CSS',
    '📦 Vite', '📡 WebSockets', '🌊 Stream APIs', '🪄 Zustand', '🦴 Prisma'
]

const SkillsRow = ({
    reverse = false,
    baseSpeed = 50
}: {
    reverse?: boolean
    baseSpeed?: number
}) => {
    const duplicated = [...skillsList, ...skillsList]

    const { scrollY } = useScroll()
    const scrollOffset = useTransform(scrollY, [0, 1000], [0, 10])
    const scrollSmooth = useSpring(scrollOffset, { damping: 20, stiffness: 100 })

    return (
        <section className="overflow-hidden w-full">
            <motion.div
                className="flex gap-2 w-max group hover:[animation-play-state:paused]"
                style={{
                    animation: `${reverse ? 'scroll-right' : 'scroll-left'} ${baseSpeed}s linear infinite`,
                    transform: scrollSmooth ? `translateY(${scrollSmooth.get()}px)` : undefined,
                }}
            >
                {duplicated.map((skill, index) => (
                    <Button
                        key={`${skill}-${index}`}
                        variant="outline"
                        className="h-[38px] whitespace-nowrap text-sm md:text-base px-3 md:px-4"
                    >
                        {skill}
                    </Button>
                ))}
            </motion.div>
        </section>
    )
}

const SkillsSection = () => {
    return (
        <div className="mt-[64px] flex flex-col gap-4 max-w-full">
            <SkillsRow reverse={false} baseSpeed={60} />
            <SkillsRow reverse={true} baseSpeed={60} />
        </div>
    )
}

export default SkillsSection
