'use client';

import Image from 'next/image';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const imageGrid = [
    ['/assets/images/masonry-img1.svg', '/assets/images/masonry-img2.svg'],
    ['/assets/images/masonry-img3.svg', '/assets/images/masonry-img4.svg', 'mb-[48px]'],
    ['/assets/images/masonry-img5.svg', undefined, 'mb-[136px]'],
    ['/assets/images/masonry-img6.svg', undefined, 'mb-[187px]'],
    ['/assets/images/masonry-img7.svg', undefined, 'mb-[155px]'],
    ['/assets/images/masonry-img8.svg', undefined, 'mb-[187px]'],
    ['/assets/images/masonry-img9.svg', undefined, 'mb-[133px]'],
    ['/assets/images/masonry-img10.svg', '/assets/images/masonry-img11.svg', 'mb-[48px]'],
    ['/assets/images/masonry-img12.svg', '/assets/images/masonry-img13.svg'],
];
const mobileImages = [
    '/assets/images/masonry-img1.svg',
    '/assets/images/masonry-img4.svg',
    '/assets/images/masonry-img8.svg',
    '/assets/images/masonry-img12.svg',
];

interface MasonryAnimatedProps {
    onComplete?: () => void;
}

const MasonryAnimated: React.FC<MasonryAnimatedProps> = ({ onComplete }) => {

    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.1, // Trigger when 10% of the section is visible
    });
    useEffect(() => {
        if (isInView && onComplete) {
            const timeout = setTimeout(() => {
                onComplete();
            }, 100); // delay before triggering next animation
            return () => clearTimeout(timeout);
        }
    }, [isInView, onComplete]);

    useEffect(() => {
        if (isInView) {
            controls.start((i) => ({
                scale: 1,
                opacity: 1,
                transition: {
                    duration: 0.4,
                    delay: i * 0.2, // Stagger effect
                    ease: 'easeOut',
                },
            }));
        }
    }, [isInView, controls]);

    const centerIndex = Math.floor(imageGrid.length / 2);

    return (
        <div ref={ref} className="w-full py-10">
            {/* Desktop View */}
            <div className="hidden md:flex h-[461px] max-w-[1053px] mx-auto gap-[11px] translate-y-[48px]">
                {imageGrid.map(([img1, img2, mb], i) => {
                    const distanceFromCenter = Math.abs(i - centerIndex);
                    const delay = distanceFromCenter * 0.15;

                    return (
                        <motion.div
                            key={i}
                            initial={{ y: -100, opacity: 0, scale: 0.95 }}
                            animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
                            transition={{
                                delay,
                                type: 'spring',
                                stiffness: 150,
                                damping: 12,
                            }}
                            className={`max-w-[107px] w-full flex flex-col gap-[8px] ${mb ?? ''}`}
                        >
                            <div className="flex-1 w-full rounded-[8px] bg-gradient-to-t from-[#EDEDED] to-transparent" />
                            <div className="group overflow-hidden rounded-[8px]">
                                <Image
                                    src={img1 as string}
                                    alt="image"
                                    height={133}
                                    width={107}
                                    className="transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
                                />
                            </div>
                            {img2 && (
                                <div className="group overflow-hidden rounded-[8px]">
                                    <Image
                                        src={img2}
                                        alt="image"
                                        height={133}
                                        width={107}
                                        className="transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
                                    />
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile layout */}
            <div className="md:hidden ">
                <div className="grid grid-cols-2 gap-4">
                    {mobileImages.map((src, i) => (
                        <motion.div
                            key={i}
                            className="overflow-hidden rounded-[8px] group"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={controls}
                            custom={i}
                        >
                            <Image
                                src={src}
                                alt="image"
                                height={160}
                                width={160}
                                className="w-full h-auto object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MasonryAnimated;
