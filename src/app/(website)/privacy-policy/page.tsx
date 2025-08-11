import React from 'react'
import HeroSection from './hero-section'
import PolicySection from './policy-section'
import Footer from '@/components/footer'
import CommunityComponent from '@/components/community-component'

const PrivacyPolicyPage = () => {
  return (
    <div className=''>
      <HeroSection />
      <PolicySection />
      <div className='md:pb-[96px] pb-[40px] px-4'>
        <CommunityComponent />
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicyPage
