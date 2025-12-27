import React from 'react'
import Hero from '@/components/hero'
import Pricing from '@/components/pricing'
import Contact from '@/components/contact'

function LandingPage() {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <Pricing/>
      <Contact/>
    </div>
  )
}

export default LandingPage
