import { Splash } from '@/components/Splash'
import { Navigation } from '@/components/Navigation'
import { ProgressLine } from '@/components/ProgressLine'
import { Hero } from '@/components/Hero'
import { Skills } from '@/components/Skills'
import { Work } from '@/components/Work'
import { Certifications } from '@/components/Certifications'
import { Experience } from '@/components/Experience'
import { Achievements } from '@/components/Achievements'
import { Contact, Footer } from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Splash />
      <ProgressLine />
      <Navigation />
      <main>
        <Hero />
        <Experience />
        <Achievements />
        <Skills />
        <Certifications />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
