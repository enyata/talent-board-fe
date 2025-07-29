'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import Image from 'next/image'

const cardData = [
  {
    img: '/assets/images/home-card-img1.svg',
    icon: '/assets/icons/home-card-icon1.svg',
    stat: '1OM+',
    desc: 'Skilled Tech Talents Remain Undiscovered',
    bg: 'bg-gradient-to-b from-[#A18BDD] to-[#7644FE]',
    reverse: false,
  },
  {
    img: '/assets/images/home-card-img2.svg',
    icon: '/assets/icons/home-card-icon2.svg',
    stat: '1 in 8',
    desc: 'African Devs Land Global Opportunities',
    bg: 'bg-[#FF9232]',
    reverse: true,
  },
  {
    img: '/assets/images/home-card-img3.svg',
    icon: '/assets/icons/home-card-icon3.svg',
    stat: '70%',
    desc: 'Of Recruiters Struggle to Find Verified Talent',
    bg: 'bg-gradient-to-b from-[#232C4B] to-[#5368B1]',
    reverse: false,
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

const StatSection = () => {
  return (
    <section className="mt-[64px] max-w-[1198px] md:mx-auto md:px-0 px-4 ">
      <motion.div
        className="flex flex-col md:flex-row gap-[8px] justify-between items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {cardData.map((card, index) => (
          <StatCard
            key={index}
            img={card.img}
            icon={card.icon}
            stat={card.stat}
            desc={card.desc}
            bg={card.bg}
            reverse={card.reverse}
          />
        ))}
      </motion.div>
    </section>
  )
}

type StatCardProps = {
  img: string
  icon: string
  stat: string
  desc: string
  bg: string
  reverse: boolean
}

const MotionCard = motion.create(Card)

const StatCard: React.FC<StatCardProps> = ({
  img,
  icon,
  stat,
  desc,
  bg,
  reverse,
}) => {
  return (
    <MotionCard
      variants={cardVariants}
      className={`max-w-[394px] w-full h-[480px] p-[20px] ${reverse ? 'pt-[36px]' : 'pb-[36px]'} ${bg} flex ${reverse ? 'flex-col-reverse' : 'flex-col'} justify-between`}
    >
      <Image
        src={img}
        alt="statImage"
        width={394}
        height={480}
        loading="lazy"
      />
      <div className="flex items-center justify-between">
        <div
          className={`flex flex-col ${reverse ? 'text-black' : 'text-white'
            } font-semibold`}
        >
          <span className="text-[56px]">{stat}</span>
          <p className="text-[18px]">{desc}</p>
        </div>
        <Image src={icon} alt="icon" width={108} height={108} priority />
      </div>
    </MotionCard>
  )
}

export default StatSection
