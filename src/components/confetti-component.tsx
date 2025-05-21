'use client'

import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import { cn } from "@/lib/utils"

export default function ConfettiComponent({ className }: { className?: string }) {
  useEffect(() => {
    confetti({
      shapes: ['circle', 'star', 'square'],
      particleCount: 100,
      spread: 50,
      origin: { y: 0.6 },
    })
  }, [])

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 136 136"
        width={136}
        height={136}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: 'spring' }}
      >
        <defs>
          <linearGradient id="paint0_linear" x1="68" y1="14" x2="111" y2="91" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D6FFDA" />
            <stop offset="1" stopColor="#79FF86" />
          </linearGradient>
        </defs>
        <circle cx="68" cy="68" r="53.5" fill="url(#paint0_linear)" stroke="#88ECA0" />
        <path
          d="M68 30C78.0782 30 87.7437 34.0036 94.8701 41.1299C101.996 48.2563 106 57.9218 106 68C106 78.0782 101.996 87.7437 94.8701 94.8701C87.7437 101.996 78.0782 106 68 106C57.9218 106 48.2563 101.996 41.1299 94.8701C34.0036 87.7437 30 78.0782 30 68C30 57.9218 34.0036 48.2563 41.1299 41.1299C48.2563 34.0036 57.9218 30 68 30ZM63.2663 75.4969L54.8249 67.05C54.5222 66.7474 54.163 66.5073 53.7676 66.3435C53.3722 66.1798 52.9484 66.0955 52.5204 66.0955C52.0925 66.0955 51.6687 66.1798 51.2733 66.3435C50.8779 66.5073 50.5186 66.7474 50.216 67.05C49.6048 67.6612 49.2615 68.4901 49.2615 69.3544C49.2615 70.2188 49.6048 71.0477 50.216 71.6589L60.9646 82.4074C61.2663 82.7116 61.6253 82.953 62.0208 83.1177C62.4163 83.2825 62.8405 83.3673 63.269 83.3673C63.6974 83.3673 64.1217 83.2825 64.5172 83.1177C64.9127 82.953 65.2717 82.7116 65.5734 82.4074L87.8306 60.1449C88.1372 59.8435 88.3812 59.4844 88.5484 59.0883C88.7156 58.6921 88.8027 58.2668 88.8047 57.8369C88.8067 57.4069 88.7235 56.9808 88.56 56.5832C88.3965 56.1855 88.1559 55.8242 87.8521 55.5199C87.5482 55.2157 87.1872 54.9747 86.7897 54.8107C86.3922 54.6468 85.9662 54.5631 85.5363 54.5646C85.1063 54.5661 84.6809 54.6527 84.2846 54.8194C83.8883 54.9861 83.5289 55.2297 83.2271 55.536L63.2663 75.4969Z"
          fill="#57D375"
        />
      </motion.svg>
    </div>
  )
}
