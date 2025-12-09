import Header from "@/components/header"
import HeroSection from "@/components/hero"
import MissionSection from "@/components/mission"
import RiderTechSection from "@/components/tech"
import BikeShowcase from "@/components/bike-showcase"
import HelmetHall from "@/components/helmet-hall"
import SocialSection from "@/components/social"
import Footer from "@/components/footer"
import MasonryGallerySection from "@/components/gallery-masonry"
import Image from "next/image"
import { RaceDayCountdown } from "@/components/countdown"
import { AnimatedBackground } from "@/components/background"

export default function Home() {
  return (
    <main className="relative">
      <AnimatedBackground />

      <Header />
      <HeroSection />
      <div className="relative z-10">
        <MissionSection />
        <MasonryGallerySection />
        <RiderTechSection />
        <div className="relative w-full h-[120px] md:h-[160px] lg:h-[200px] overflow-hidden bg-white">
          <Image
            src="/images/trilha2.svg"
            alt="Tire track divider"
            fill
            className="object-cover object-center"
            priority={false}
          />
        </div>
        <HelmetHall />
        <div className="relative w-full h-[120px] md:h-[160px] lg:h-[200px] overflow-hidden bg-white">
          <Image
            src="/images/splash.svg"
            alt="Tire track divider"
            fill
            className="object-cover object-center bg-lorenzo-dark"
            priority={false}
          />
        </div>
        <BikeShowcase />

        <RaceDayCountdown />

        <SocialSection />
        <Footer />
      </div>
    </main>
  )
}
