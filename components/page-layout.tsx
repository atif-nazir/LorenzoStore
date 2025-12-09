import { ReactNode } from "react"
import Header from "./header"
import { AnimatedBackground } from "./background"

interface PageLayoutProps {
  children: ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="relative min-h-screen bg-lorenzo-dark">
      <AnimatedBackground />
      <Header />
      <div className="relative z-10 pt-24 pb-20 px-6 md:px-12">{children}</div>
    </main>
  )
}

