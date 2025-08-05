import React from 'react'
import HeroSection from './hero-section'
import ServiceSection from './service-section'
import CommunityComponent from '@/components/community-component'
import Footer from '@/components/footer'

const TermsOfService = () => {
    return (
        <div className=''>
            <HeroSection />
            <ServiceSection />
            <div className='md:pb-[96px] pb-[40px]'>
                <CommunityComponent />
            </div>
            <Footer />
        </div>
    )
}

export default TermsOfService
