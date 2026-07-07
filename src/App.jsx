import { Analytics } from '@vercel/analytics/react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { ApprovalDive } from './components/ApprovalDive'
import { FeaturesGrid } from './components/FeaturesGrid'
import { FinanceDive } from './components/FinanceDive'
import { TeamDive } from './components/TeamDive'
import { Pricing } from './components/Pricing'
import { Platforms } from './components/Platforms'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <ApprovalDive />
      <FeaturesGrid />
      <FinanceDive />
      <TeamDive />
      <Pricing />
      <Platforms />
      <FinalCTA />
      <Footer />
      <Analytics />
    </>
  )
}
