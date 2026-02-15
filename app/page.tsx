import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { InteractiveExplorer } from "@/components/interactive-explorer"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Navbar />

      <main className="relative z-10 pt-14">
        <HeroSection />
        <InteractiveExplorer />
      </main>

      <Footer />
    </div>
  )
}
